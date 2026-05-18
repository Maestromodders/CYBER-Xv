/*
╔════════════════════════════════╗
║                  ║
╠════════════════════════════════╣
║ bot      : SPECTRE II
║ dev      : sudo
║ base     : spectre-core
║ tg       : t.me/sudo
╚════════════════════════════════╝
*/
require('dotenv').config();
const { makeWASocket, getContentType, useMultiFileAuthState, fetchLatestBaileysVersion, Browsers, makeCacheableSignalKeyStore, DisconnectReason, jidDecode, makeInMemoryStore, generateWAMessageFromContent, downloadContentFromMessage } = require("@whiskeysockets/baileys");
const TelegramBot = require('node-telegram-bot-api');
const fs = require("fs");
const path = require("path");
const yts = require('yt-search');
const ytdl = require('@distube/ytdl-core');
const fg = require('api-dylux');
const axios = require('axios');
const NodeCache = require('node-cache');
const pino = require('pino');
const speed = require("performance-now");
const moment = require("moment-timezone");
const createToxxicStore = require('./queen/basestore');

const store = createToxxicStore('./store', {
  logger: pino().child({ level: 'silent', stream: 'store' })
});

const token = process.env.TELEGRAM_BOT_TOKEN;
let OWNER_ID = process.env.OWNER_ID;

const SPECTRE_THUMB = 'https://files.catbox.moe/tk1xpz.jpeg';

if (!token) {
  console.error('Telegram bot token is not set. Please set the TELEGRAM_BOT_TOKEN environment variable.');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
const pairingCodes = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
const requestLimits = new NodeCache({ stdTTL: 120, checkperiod: 60 });
let connectedUsers = {};
const connectedUsersFilePath = path.join(__dirname, 'queen/connectedUsers.json');
const { smsg } = require("./queen/function");

// ── Active session tracking ──────────────────────────────────────────────────
// Maps phoneNumber -> { conn, retryCount, retryTimer, keepAliveTimer }
const activeSessions = new Map();

// ── Exponential back-off constants ───────────────────────────────────────────
const RETRY_BASE_MS   = 5_000;
const RETRY_MAX_MS    = 120_000;
const KEEPALIVE_MS    = 25_000;   // send presence every 25 s to keep connection alive

let isFirstLog = true;

function loadConnectedUsers() {
  if (fs.existsSync(connectedUsersFilePath)) {
    try {
      const data = fs.readFileSync(connectedUsersFilePath);
      connectedUsers = JSON.parse(data);
    } catch (e) {
      console.error('[connectedUsers] parse error, resetting:', e.message);
      connectedUsers = {};
    }
  }
}

function saveConnectedUsers() {
  try {
    fs.writeFileSync(connectedUsersFilePath, JSON.stringify(connectedUsers, null, 2));
  } catch (e) {
    console.error('[connectedUsers] save error:', e.message);
  }
}

// ── Start / restart a WhatsApp session ───────────────────────────────────────
async function startWhatsAppBot(phoneNumber, telegramChatId = null, retryCount = 0) {
  const sessionPath = path.join(__dirname, 'trash_baileys', `session_${phoneNumber}`);

  if (!fs.existsSync(sessionPath)) {
    console.log(`[WA] Session directory for ${phoneNumber} was not found.`);
    return;
  }

  // Clear any existing timers for this number
  const existing = activeSessions.get(phoneNumber);
  if (existing) {
    if (existing.keepAliveTimer) clearInterval(existing.keepAliveTimer);
    if (existing.retryTimer)    clearTimeout(existing.retryTimer);
  }

  let { version, isLatest } = await fetchLatestBaileysVersion();
  if (isFirstLog) {
    console.log(`[WA] Using Baileys version: ${version} (Latest: ${isLatest})`);
    isFirstLog = false;
  }

  const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
  const msgRetryCounterCache = new NodeCache({ stdTTL: 300 });

  const conn = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.ubuntu('Chrome'),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
    connectTimeoutMs: 60_000,
    keepAliveIntervalMs: KEEPALIVE_MS,
    retryRequestDelayMs: 250,
    maxMsgRetryCount: 5,
  });

  store.bind(conn.ev);

  // Track this session entry
  const sessionEntry = { conn, retryCount, keepAliveTimer: null, retryTimer: null };
  activeSessions.set(phoneNumber, sessionEntry);

  if (conn.authState.creds.registered) {
    await saveCreds();
    console.log(`[WA] Credentials reloaded for ${phoneNumber}`);
  } else {
    if (telegramChatId) {
      setTimeout(async () => {
        try {
          let code = await conn.requestPairingCode(phoneNumber);
          code = code?.match(/.{1,4}/g)?.join("-") || code;
          pairingCodes.set(code, { count: 0, phoneNumber });
          bot.sendMessage(telegramChatId, `✅ *Tap code to copy*\n\n📱 Number: \`${phoneNumber}\`\n🔐 Code: \`${code}\``, { parse_mode: 'Markdown' });
          console.log(`[WA] Pairing code for ${phoneNumber}: ${code}`);
        } catch (e) {
          console.error(`[WA] Pairing code request failed for ${phoneNumber}:`, e.message);
        }
      }, 3000);
    }
  }

  conn.public = true;

  // ── Keep-alive heartbeat ────────────────────────────────────────────────
  const keepAliveTimer = setInterval(async () => {
    try {
      if (conn.ws?.readyState === 1 /* WebSocket.OPEN */) {
        await conn.sendPresenceUpdate('available');
      }
    } catch (_) { /* silent — connection may be mid-restart */ }
  }, KEEPALIVE_MS);
  sessionEntry.keepAliveTimer = keepAliveTimer;

  conn.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'open') {
      sessionEntry.retryCount = 0;
      await saveCreds();
      console.log(`[WA] Connected: ${phoneNumber}`);

      if (telegramChatId) {
        if (!connectedUsers[telegramChatId]) connectedUsers[telegramChatId] = [];
        if (!connectedUsers[telegramChatId].some(u => u.phoneNumber === phoneNumber)) {
          connectedUsers[telegramChatId].push({ phoneNumber });
          saveConnectedUsers();
        }

        const caption = `
◆━━━━━━━━━━━━━━━━━━━━◆
     ✅  CONNECTION SUCCESS
◆━━━━━━━━━━━━━━━━━━━━◆

📱 *Phone:* \`${phoneNumber}\`
⏰ *Time:* ${moment().format('HH:mm:ss')}
📅 *Date:* ${moment().format('DD/MM/YYYY')}

━━━━━━━━━━━━━━━━━━━━━
🎯 *CYBERPUNK-BULLY is now live!*
━━━━━━━━━━━━━━━━━━━━━

💡 *Support:* @redshiftsupportbot
`;
        bot.sendPhoto(telegramChatId, SPECTRE_THUMB, {
          caption,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: "📱 My Connections", callback_data: "list_my_connections" }],
              [{ text: "❌ Disconnect", callback_data: `disconnect_${phoneNumber}` }],
              [{ text: "🏠 Main Menu", callback_data: "main_menu" }]
            ]
          }
        }).catch(e => console.error('[TG] sendPhoto error:', e.message));
        console.log(`[WA] ✅ Connection successful for ${phoneNumber}`);
      }

    } else if (connection === 'close') {
      clearInterval(keepAliveTimer);
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const isLoggedOut = statusCode === DisconnectReason.loggedOut;

      if (isLoggedOut) {
        console.log(`[WA] Logged out: ${phoneNumber}. Cleaning session.`);
        activeSessions.delete(phoneNumber);
        if (telegramChatId) {
          bot.sendMessage(telegramChatId,
            `⚠️ *${phoneNumber}* was logged out from WhatsApp.\nUse /pair to reconnect.`,
            { parse_mode: 'Markdown' }
          ).catch(() => {});
        }
      } else {
        const delay = Math.min(RETRY_BASE_MS * Math.pow(2, retryCount), RETRY_MAX_MS);
        const nextRetry = retryCount + 1;
        console.log(`[WA] Connection closed for ${phoneNumber} (code=${statusCode}). Retry #${nextRetry} in ${Math.round(delay / 1000)}s`);
        const retryTimer = setTimeout(() => {
          startWhatsAppBot(phoneNumber, telegramChatId, nextRetry).catch(err => {
            console.error(`[WA] Reconnect error for ${phoneNumber}:`, err.message);
          });
        }, delay);
        sessionEntry.retryTimer = retryTimer;
      }
    }
  });

  conn.ev.on('creds.update', saveCreds);

  conn.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return decode.user && decode.server && `${decode.user}@${decode.server}` || jid;
    } else return jid;
  };

  conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, {
    text: text,
    ...options
  }, {
    quoted,
    ...options
  });

  conn.ev.on('messages.upsert', async (chatUpdate) => {
    try {
      let mek = chatUpdate.messages[0];
      if (!mek?.message) return;
      mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;
      if (mek.key && mek.key.remoteJid === 'status@broadcast') return;
      let m = smsg(conn, mek, store);
      require("./anime.js")(conn, m, chatUpdate, store);
    } catch (err) {
      console.log('[WA] messages.upsert error:', err.message || err);
    }
  });

  return conn;
}

// ── Graceful shutdown ─────────────────────────────────────────────────────────
process.on('SIGTERM', () => {
  console.log('[SPECTRE] SIGTERM — cleaning up sessions...');
  for (const [, session] of activeSessions) {
    if (session.keepAliveTimer) clearInterval(session.keepAliveTimer);
    if (session.retryTimer)    clearTimeout(session.retryTimer);
    try { session.conn?.end?.(); } catch (_) {}
  }
  process.exit(0);
});
process.on('SIGINT', () => process.emit('SIGTERM'));

// ── Restore sessions that were active before restart ─────────────────────────
async function restoreExistingSessions() {
  const baileysDir = path.join(__dirname, 'trash_baileys');
  if (!fs.existsSync(baileysDir)) return;
  const entries = fs.readdirSync(baileysDir).filter(e => e.startsWith('session_'));
  for (const entry of entries) {
    const phoneNumber = entry.replace('session_', '');
    let telegramChatId = null;
    for (const [chatId, conns] of Object.entries(connectedUsers)) {
      if (conns.some(c => c.phoneNumber === phoneNumber)) {
        telegramChatId = chatId;
        break;
      }
    }
    console.log(`[WA] Restoring session for ${phoneNumber}...`);
    startWhatsAppBot(phoneNumber, telegramChatId).catch(err => {
      console.error(`[WA] Failed to restore ${phoneNumber}:`, err.message);
    });
    // Stagger session restores to avoid flooding
    await new Promise(r => setTimeout(r, 1500));
  }
}

let userIds = [];
let groups = [];
let users = {};
let groupMembers = {};

bot.on('text', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const username = msg.from.username;
  const command = text.split(' ')[0].toLowerCase();
  if (command.startsWith('/')) {
    console.log(`\x1b[35m◆ CMD: ${command} | User: @${username} | ID: ${chatId}\x1b[0m`);
  }
});

bot.on('message', (msg) => {
  if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
    const groupId = msg.chat.id;
    const groupName = msg.chat.title;
    if (!groups.find(g => g.id === groupId)) {
      groups.push({ id: groupId, name: groupName });
    }
  }
});

bot.on('message', (msg) => {
  const userId = msg.from.id;
  if (!users[userId]) users[userId] = msg.from;
  if (!userIds.includes(msg.chat.id)) userIds.push(msg.chat.id);
});

bot.on('message', (msg) => {
  if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
    const userId = msg.from.id;
    if (!groupMembers[userId]) groupMembers[userId] = msg.from;
  }
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  const messageId = query.message.message_id;

  if (data === 'main_menu') {
    const menuText = `
◆━━━━━━━━━━━━━━━━━━━━◆
      CYBERPUNK-BULLY— MENU
◆━━━━━━━━━━━━━━━━━━━━◆

*🕵️ CYBERPUNK-BULLY Pairing Bot*
━━━━━━━━━━━━━━━━━━━━━

▸ Connect your WhatsApp
▸ Manage connections
▸ Get support

━━━━━━━━━━━━━━━━━━━━━
_Select an option below:_
`;
    bot.editMessageCaption(menuText, {
      message_id: messageId,
      chat_id: chatId,
      caption: menuText,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: "📱 Pair WhatsApp", callback_data: "pair_info" }],
          [{ text: "📋 My Connections", callback_data: "list_my_connections" }],
          [{ text: "ℹ️ Bot Info", callback_data: "bot_info" }],
          [{ text: "💬 Support", url: `https://t.me/redshiftsupportbot` }]
        ]
      }
    }).catch(() => {});

  } else if (data === 'pair_info') {
    const pairText = `
◆━━━━━━━━━━━━━━━━━━━━◆
      📱  HOW TO PAIR
◆━━━━━━━━━━━━━━━━━━━━◆

*Step-by-step:*

1️⃣ Command: \`/pair <number>\`
2️⃣ Example: \`/pair 254xxx\`
3️⃣ Get your pairing code
4️⃣ Enter code in WhatsApp

━━━━━━━━━━━━━━━━━━━━━
⚠️ *Notes:*
▸ Use international format
▸ No + or 0 prefix
▸ One connection per number
━━━━━━━━━━━━━━━━━━━━━
`;
    bot.editMessageCaption(pairText, {
      message_id: messageId,
      chat_id: chatId,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back", callback_data: "main_menu" }]]
      }
    }).catch(() => {});

  } else if (data === 'list_my_connections') {
    const userConnections = connectedUsers[chatId] || [];
    if (userConnections.length === 0) {
      bot.answerCallbackQuery(query.id, { text: "❌ No active connections found", show_alert: true });
      return;
    }
    let connectionList = `
◆━━━━━━━━━━━━━━━━━━━━◆
      📱  MY CONNECTIONS
◆━━━━━━━━━━━━━━━━━━━━◆

`;
    userConnections.forEach((conn, index) => {
      connectionList += `${index + 1}. 📞 \`${conn.phoneNumber}\`\n`;
    });
    connectionList += `\n━━━━━━━━━━━━━━━━━━━━━\n📊 Total: ${userConnections.length} connection(s)`;
    const buttons = userConnections.map(conn => [
      { text: `❌ Disconnect ${conn.phoneNumber}`, callback_data: `disconnect_${conn.phoneNumber}` }
    ]);
    buttons.push([{ text: "🔙 Back", callback_data: "main_menu" }]);
    bot.editMessageCaption(connectionList, {
      message_id: messageId,
      chat_id: chatId,
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: buttons }
    }).catch(() => {});

  } else if (data === 'bot_info') {
    const uptime = process.uptime();
    const days = Math.floor(uptime / (60 * 60 * 24));
    const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const infoText = `
◆━━━━━━━━━━━━━━━━━━━━◆
      ℹ️  CYBERPUNK-BULLY INFO
◆━━━━━━━━━━━━━━━━━━━━◆

⏱ *Uptime:* ${days}d ${hours}h ${minutes}m
👥 *Users:* ${userIds.length}
🔗 *Active Sessions:* ${activeSessions.size}
📡 *Status:* Online ✅

━━━━━━━━━━━━━━━━━━━━━
🛠 *Developer:* @cyberpunkbully
📦 *Version:* 1.0.0
🤖 *Bot:* CYBERPUNK-BULLY
━━━━━━━━━━━━━━━━━━━━━
`;
    bot.editMessageCaption(infoText, {
      message_id: messageId,
      chat_id: chatId,
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: [[{ text: "🔙 Back", callback_data: "main_menu" }]] }
    }).catch(() => {});

  } else if (data.startsWith('disconnect_')) {
    const phoneNumber = data.replace('disconnect_', '');
    const sessionPath = path.join(__dirname, 'trash_baileys', `session_${phoneNumber}`);
    try {
      const session = activeSessions.get(phoneNumber);
      if (session) {
        if (session.keepAliveTimer) clearInterval(session.keepAliveTimer);
        if (session.retryTimer)    clearTimeout(session.retryTimer);
        try { session.conn?.end?.(); } catch (_) {}
        activeSessions.delete(phoneNumber);
      }
      if (fs.existsSync(sessionPath)) {
        fs.rmSync(sessionPath, { recursive: true, force: true });
        if (connectedUsers[chatId]) {
          connectedUsers[chatId] = connectedUsers[chatId].filter(user => user.phoneNumber !== phoneNumber);
          saveConnectedUsers();
        }
        bot.answerCallbackQuery(query.id, { text: `✅ Disconnected ${phoneNumber} successfully!`, show_alert: true });
      } else {
        bot.answerCallbackQuery(query.id, { text: `❌ Session not found for ${phoneNumber}`, show_alert: true });
      }
    } catch (error) {
      bot.answerCallbackQuery(query.id, { text: "❌ Error disconnecting session", show_alert: true });
    }
  }
});

bot.onText(/\/(\w+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const command = match[1];

  switch (command) {
    case "menu":
    case "start": {
      const welcomeText = `
◆━━━━━━━━━━━━━━━━━━━━━━━━◆
       CYBERPUNK-BULLY
◆━━━━━━━━━━━━━━━━━━━━━━━━◆

*🕵️ CYBERPUNK-BULLY Pairing Bot*
━━━━━━━━━━━━━━━━━━━━━━━━━

✦ Available Commands:

📱 /pair — Connect WhatsApp
🗑 /delpair — Disconnect session
📋 /listpaired — View connections
⏱ /uptime — Bot uptime
🆔 /getmyid — Your ID
📊 /botinfo — Statistics
🏓 /ping — Speed check

━━━━━━━━━━━━━━━━━━━━━━━━━
💡 *Developed by* @cyberpunkbully
`;
      bot.sendPhoto(chatId, SPECTRE_THUMB, {
        caption: welcomeText,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "📱 Pair WhatsApp", callback_data: "pair_info" }],
            [{ text: "📋 My Connections", callback_data: "list_my_connections" }],
            [{ text: "ℹ️ Bot Info", callback_data: "bot_info" }],
            [{ text: "💬 Support", url: `https://t.me/redshiftsupportbot` }]
          ]
        }
      }).catch(() => {});
      break;
    }

    case "uptime": {
      const uptime = process.uptime();
      const days = Math.floor(uptime / (60 * 60 * 24));
      const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((uptime % (60 * 60)) / 60);
      const seconds = Math.floor(uptime % 60);
      bot.sendMessage(chatId, `
◆━━━━━━━━━━━━━━━━━━━━◆
      ⏱  BOT UPTIME
◆━━━━━━━━━━━━━━━━━━━━◆

📆 *Days:* ${days}
🕐 *Hours:* ${hours}
⏰ *Minutes:* ${minutes}
⏱ *Seconds:* ${seconds}

━━━━━━━━━━━━━━━━━━━━━
✅ *Status:* Running Smoothly
🤖 *Bot:* CYBERPUNK-BULLY
🔗 *Active Sessions:* ${activeSessions.size}
`, { parse_mode: 'Markdown' });
      break;
    }

    case "getmyid": {
      const username = msg.from.username ? `@${msg.from.username}` : 'No username';
      bot.sendMessage(chatId, `
◆━━━━━━━━━━━━━━━━━━━━◆
      👤  YOUR INFO
◆━━━━━━━━━━━━━━━━━━━━◆

🆔 *ID:* \`${userId}\`
📝 *Username:* ${username}
👤 *Name:* ${msg.from.first_name || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━
`, { parse_mode: 'Markdown' });
      break;
    }

    case "ping": {
      const start = speed();
      const sent = await bot.sendMessage(chatId, '🏓 *Pinging...*', { parse_mode: 'Markdown' });
      const end = speed();
      const responseTime = (end - start).toFixed(2);
      bot.editMessageText(
        `🏓 *Pong!*\n\n⚡ *Speed:* ${responseTime}ms\n🤖 *รקєςtгє II* is alive.`,
        { chat_id: chatId, message_id: sent.message_id, parse_mode: 'Markdown' }
      );
      break;
    }

    case 'pair': {
      const phoneNumber = msg.text.split(' ')[1];
      if (!phoneNumber) {
        bot.sendMessage(chatId, `
◆━━━━━━━━━━━━━━━━━━━━◆
      ❌  INVALID FORMAT
◆━━━━━━━━━━━━━━━━━━━━◆

*Provide a phone number:*

✅ *Correct:* \`/pair 254xxx\`
❌ *Wrong:* \`/pair +254xxx\`
❌ *Wrong:* \`/pair 070xxx\`

━━━━━━━━━━━━━━━━━━━━━
⚠️ *No + or 0 prefix!*
`, { parse_mode: 'Markdown' });
        break;
      }

      if (phoneNumber.startsWith('+') || phoneNumber.startsWith('0')) {
        bot.sendMessage(chatId, `
◆━━━━━━━━━━━━━━━━━━━━◆
      ❌  INVALID PREFIX
◆━━━━━━━━━━━━━━━━━━━━◆

❌ *Error:* No + or 0 prefix

*Example:*
✅ Correct: \`254xxx\`
❌ Wrong: \`+254xxx\`

━━━━━━━━━━━━━━━━━━━━━
`, { parse_mode: 'Markdown' });
        break;
      }

      // Rate limiting: max 3 attempts per user per 2 min window
      const rateKey = `pair_${userId}`;
      const attempts = requestLimits.get(rateKey) || 0;
      if (attempts >= 3) {
        bot.sendMessage(chatId, `⏳ *Too many requests.* Please wait a moment and try again.`, { parse_mode: 'Markdown' });
        break;
      }
      requestLimits.set(rateKey, attempts + 1);

      const sessionPath = path.join(__dirname, 'trash_baileys', `session_${phoneNumber}`);

      if (!fs.existsSync(sessionPath)) {
        fs.mkdirSync(sessionPath, { recursive: true });
        bot.sendMessage(chatId, `
◆━━━━━━━━━━━━━━━━━━━━◆
      🔄  GENERATING...
◆━━━━━━━━━━━━━━━━━━━━◆

📱 *Number:* \`${phoneNumber}\`
⏳ *Status:* Generating pairing code...

━━━━━━━━━━━━━━━━━━━━━
_Please wait..._
`, { parse_mode: 'Markdown' });
        startWhatsAppBot(phoneNumber, chatId).catch(err => {
          console.log('[WA] Pair start error:', err);
          bot.sendMessage(chatId, '❌ An error occurred while connecting.');
        });
      } else {
        const isAlreadyConnected = connectedUsers[chatId] && connectedUsers[chatId].some(u => u.phoneNumber === phoneNumber);
        if (isAlreadyConnected) {
          bot.sendMessage(chatId, `
◆━━━━━━━━━━━━━━━━━━━━◆
      ⚠️  ALREADY PAIRED
◆━━━━━━━━━━━━━━━━━━━━◆

📱 *Number:* \`${phoneNumber}\`
✅ *Status:* Already connected

━━━━━━━━━━━━━━━━━━━━━
*Use /delpair to remove first*
`, { parse_mode: 'Markdown' });
        } else {
          bot.sendMessage(chatId, `
◆━━━━━━━━━━━━━━━━━━━━◆
      ℹ️  SESSION EXISTS
◆━━━━━━━━━━━━━━━━━━━━◆

📱 *Number:* \`${phoneNumber}\`

▸ Use /delpair to remove
▸ Then pair again

━━━━━━━━━━━━━━━━━━━━━
`, { parse_mode: 'Markdown' });
        }
      }
      break;
    }

    case "delpair": {
      const phoneNumber = msg.text.split(' ')[1];
      if (!phoneNumber) {
        bot.sendMessage(chatId, `
◆━━━━━━━━━━━━━━━━━━━━◆
      ❌  INVALID FORMAT
◆━━━━━━━━━━━━━━━━━━━━◆

*Provide a phone number:*

✅ *Example:* \`/delpair 254712345678\`

━━━━━━━━━━━━━━━━━━━━━
`, { parse_mode: 'Markdown' });
        break;
      }

      const sessionPath = path.join(__dirname, 'trash_baileys', `session_${phoneNumber}`);
      try {
        const session = activeSessions.get(phoneNumber);
        if (session) {
          if (session.keepAliveTimer) clearInterval(session.keepAliveTimer);
          if (session.retryTimer)    clearTimeout(session.retryTimer);
          try { session.conn?.end?.(); } catch (_) {}
          activeSessions.delete(phoneNumber);
        }
        if (fs.existsSync(sessionPath)) {
          fs.rmSync(sessionPath, { recursive: true, force: true });
          if (connectedUsers[chatId]) {
            connectedUsers[chatId] = connectedUsers[chatId].filter(u => u.phoneNumber !== phoneNumber);
            saveConnectedUsers();
          }
          bot.sendMessage(chatId, `
◆━━━━━━━━━━━━━━━━━━━━◆
      ✅  DISCONNECTED
◆━━━━━━━━━━━━━━━━━━━━◆

📱 *Number:* \`${phoneNumber}\`
🗑 *Status:* Session removed

━━━━━━━━━━━━━━━━━━━━━
`, { parse_mode: 'Markdown' });
        } else {
          bot.sendMessage(chatId, `
◆━━━━━━━━━━━━━━━━━━━━◆
      ❌  NOT FOUND
◆━━━━━━━━━━━━━━━━━━━━◆

📱 *Number:* \`${phoneNumber}\`
❌ *Status:* No session found

━━━━━━━━━━━━━━━━━━━━━
`, { parse_mode: 'Markdown' });
        }
      } catch (error) {
        bot.sendMessage(chatId, '❌ Error removing session.');
      }
      break;
    }

    case "listpaired": {
      const userConnections = connectedUsers[chatId] || [];
      if (userConnections.length === 0) {
        bot.sendMessage(chatId, `
◆━━━━━━━━━━━━━━━━━━━━◆
      📋  MY CONNECTIONS
◆━━━━━━━━━━━━━━━━━━━━◆

❌ *No active connections*

━━━━━━━━━━━━━━━━━━━━━
Use /pair to connect
`, { parse_mode: 'Markdown' });
        break;
      }
      let list = `
◆━━━━━━━━━━━━━━━━━━━━◆
      📋  MY CONNECTIONS
◆━━━━━━━━━━━━━━━━━━━━◆

`;
      userConnections.forEach((conn, index) => {
        list += `${index + 1}. 📞 \`${conn.phoneNumber}\`\n`;
      });
      list += `\n━━━━━━━━━━━━━━━━━━━━━\n📊 Total: ${userConnections.length} connection(s)`;
      bot.sendMessage(chatId, list, { parse_mode: 'Markdown' });
      break;
    }

    case "botinfo": {
      const uptime = process.uptime();
      const days = Math.floor(uptime / (60 * 60 * 24));
      const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((uptime % (60 * 60)) / 60);
      bot.sendMessage(chatId, `
◆━━━━━━━━━━━━━━━━━━━━◆
      ℹ️  CYBERPUNK-BULLY INFO
◆━━━━━━━━━━━━━━━━━━━━◆

⏱ *Uptime:* ${days}d ${hours}h ${minutes}m
👥 *Users:* ${userIds.length}
🔗 *Active Sessions:* ${activeSessions.size}
📡 *Status:* Online ✅

━━━━━━━━━━━━━━━━━━━━━
🛠 *Developer:* @cyberpunkbully
📦 *Version:* 2.0.0
🤖 *Bot:* CYBERPUNK-BULLY
━━━━━━━━━━━━━━━━━━━━━
`, { parse_mode: 'Markdown' });
      break;
    }

    default:
      break;
  }
});

// ── Boot ─────────────────────────────────────────────────────────────────────
loadConnectedUsers();
restoreExistingSessions();

console.log(`\x1b[35m
◆━━━━━━━━━━━━━━━━━━━━━━━━━━━◆
      CYBERPUNK-BULLY — ONLINE
◆━━━━━━━━━━━━━━━━━━━━━━━━━━━◆
  Dev: sudo  |  Bot: CYBERPUNK-BULLY
◆━━━━━━━━━━━━━━━━━━━━━━━━━━━◆
\x1b[0m`);
