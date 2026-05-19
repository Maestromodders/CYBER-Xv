/*
╔════════════════════╗
║  รקєςtгє II        ║
╠════════════════════╣
║ bot    : SPECTRE II
║ dev    : sudo
║ base   : spectre-core
║ tg     : t.me/sudo
╚════════════════════╝
*/

require("./settings")
const fs = require('fs');
const path = require("path")
const os = require('os');
const chalk = require("chalk")
const axios = require('axios')
const dir = (relPath) => path.join(__dirname, relPath);
const util = require('util');
const moment = require('moment-timezone')

const SETTINGS_JS = path.join(__dirname, 'settings.js');
const SETTINGS_JSON = path.join(__dirname, 'settings.json');
const SETTINGS_FILE = path.join(__dirname, 'settings.json');
const ANTILINK_FILE = path.join(__dirname, 'antilink.json');
const AUTOBLOCK_FILE = path.join(__dirname, 'autoblock.json');
const ANTISPAM_FILE = path.join(__dirname, 'antispam.json');
const ANTIMEDIA_FILE = path.join(__dirname, 'antimedia.json');
const AUTOSTATUS_FILE = path.join(__dirname, 'autostatus.json');
const MUTE_FILE = path.join(__dirname, 'muted_users.json');
const CACHE_FILE = path.join(__dirname, 'group_tools_cache.json');
const AUTOPP_TMP = path.join(__dirname, 'temp', 'autopp');
const WELCOME_FILE = path.join(__dirname, 'welcome_settings.json');
const fetch = require("node-fetch")
const { exec } = require('child_process');
const speed = require('performance-now')
const { downloadContentFromMessage, proto, generateWAMessage, getContentType, prepareWAMessageMedia, generateWAMessageFromContent, GroupSettingChange, jidDecode, WAGroupMetadata, emitGroupParticipantsUpdate, emitGroupUpdate, generateMessageID, jidNormalizedUser, generateForwardMessageContent, WAGroupInviteMessageGroupMetadata, GroupMetadata, Headers, delay, WA_DEFAULT_EPHEMERAL, WADefault, getAggregateVotesInPollMessage, generateWAMessageContent, areJidsSameUser, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, makeWaconnet, makeInMemoryStore, MediaType, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, initInMemoryKeyStore, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WAMediaUpload, mentionedJid, processTime, Browser, MessageType,
Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, DisconnectReason, WAconnet, getStream, WAProto, isBaileys, AnyMessageContent, templateMessage, InteractiveMessage, Header } = require("@whiskeysockets/baileys")
const thumb = fs.readFileSync('./media/face.jpeg')
const docu = fs.readFileSync('./media/love.jpeg')


module.exports = james = async (james, m, chatUpdate, store) => {
    try {
        const body = (
            m.mtype === "conversation" ? m.message.conversation :
            m.mtype === "imageMessage" ? m.message.imageMessage.caption :
            m.mtype === "videoMessage" ? m.message.videoMessage.caption :
            m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
            m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
            m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
            m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
            m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
            m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
            m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId ||
            m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
        );
        
        const sender = m.key.fromMe ? james.user.id.split(":")[0] + "@s.whatsapp.net" ||
              sock.user.id : m.key.participant || m.key.remoteJid;
        
        const senderNumber = sender.split('@')[0];
        const budy = (typeof m.text === 'string' ? m.text : '');
        const xprefix = ["", "!", ".", ",", "🐤", "🗿"];

        const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
        const prefix = ['.', '/'] ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : global.xprefix
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const botNumber = await james.decodeJid(james.user.id);
        const isBot = botNumber.includes(senderNumber)
        
        const isCmd = body.startsWith(global.xprefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const command2 = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        

        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const text = q = args.join(" ");
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);
        const groupMetadata = m?.isGroup ? await james.groupMetadata(m.chat).catch(() => ({})) : {};
        const groupName = m?.isGroup ? groupMetadata.subject || '' : '';
        const participants = m?.isGroup ? groupMetadata.participants?.map(p => {
            let admin = null;
            if (p.admin === 'superadmin') admin = 'superadmin';
            else if (p.admin === 'admin') admin = 'admin';
            return {
                id: p.id || null,
                jid: p.jid || null,
                admin,
                full: p
            };
        }) || []: [];
        const groupOwner = m?.isGroup ? participants.find(p => p.admin === 'superadmin')?.jid || '' : '';
        const groupAdmins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.jid || p.id);
        const isBotAdmins = m?.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = m?.isGroup ? groupAdmins.includes(m.sender) : false;
        const isGroupOwner = m?.isGroup ? groupOwner === m.sender : false;
        const isOwner = [botNumber, ...global.owner]
                        .map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
                        .includes(m.sender);
                        
                if (!james.public) {
                        if (!m.fromMe && !isOwner) return;
                };



        const time = moment().tz("Africa/Nairobi").format("HH:mm:ss");
                let ucapanWaktu;
                if (time >= "19:00:00" && time < "23:59:00") {
                        ucapanWaktu = "夜 🌌";
                } else if (time >= "15:00:00" && time < "19:00:00") {
                        ucapanWaktu = "午後 🌇";
                } else if (time >= "11:00:00" && time < "15:00:00") {
                        ucapanWaktu = "正午 🏞️";
                } else if (time >= "06:00:00" && time < "11:00:00") {
                        ucapanWaktu = "朝 🌁";
                } else {
                        ucapanWaktu = "夜明け 🌆";
                }
                const wib = moment(Date.now()).tz("Africa/Nairobi").locale("en").format("HH:mm:ss z");
                const wita = moment(Date.now()).tz("Africa/Nairobi").locale("en").format("HH:mm:ss z");
                const wit = moment(Date.now()).tz("Africa/Nairobi").locale("en").format("HH:mm:ss z");
                const salam = moment(Date.now()).tz("Africa/Nairobi").locale("en").format("a");
                let d = new Date();
                let gmt = new Date(0).getTime() - new Date("1 January 2024").getTime();
                let weton = ["Day1", "Day2", "Day3", "Day4", "Day5"][Math.floor(((d * 1) + gmt) / 84600000) % 5];
                let week = d.toLocaleDateString("en", { weekday: "long" });
                let calendar = d.toLocaleDateString("en", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                });             

if (isCmd) {
  console.log(chalk.hex('#4a69bd').bold(`
┌───────────────────────────────┐
│ ⟨ CYBER-XMD ⟩
├───────────────────────────────┤
│ 📅 ${chalk.hex('#fdcb6e').bold(time)}
│ 💬 ${chalk.hex('#fdcb6e').bold(command)}
│ 🗣️ ${chalk.hex('#fdcb6e').bold(pushname)}
│ 👤 ${chalk.hex('#fdcb6e').bold(m.sender)}
└───────────────────────────────┘
`));
}

const cina = ["https://files.catbox.moe/rklhyy.jpeg","https://files.catbox.moe/tk1xpz.jpeg","https://files.catbox.moe/7dp07q.jpg","https://files.catbox.moe/9m8z4i.jpeg"]
 
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * cina.length);
    return cina[randomIndex];
}
const cinahitam = getRandomImage()

async function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
        
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const hunterx = (m) => ({
  key: {
    participant: "0@s.whatsapp.net",
    ...(m.chat ? { remoteJid: "status@broadcast" } : {})
  },
  message: {
    listResponseMessage: {
      title: "𝑹𝒀𝑼𝑪𝑯𝑰 𝑪𝑹𝑨𝑺𝑯"
    }
  }
})     
// ---------- Robust settings loader (paste at top of main file) ----------
// ------------- Autoblock helpers (paste once near top) -------------

// ========== Autostatus helpers (paste near top, once) ==========

// ---------- Autobio helpers ----------
// ---------- Autobio init (place near top with other globals) ----------
// runtime watchers map
if (typeof global.runtimeWatchers === 'undefined') global.runtimeWatchers = {};
if (typeof global.autobio === 'undefined') {
  global.autobio = {
    enabled: false,            // on/off
    interval: 10 * 60 * 1000, // default 10 minutes in ms
    templates: [
      "รקєςtгє II • {uptime}",
      "SPECTRE II — owner: sudo",
      "Running on {platform} • users:{userCount}",
      "spectre-bot active"
    ],
    index: 0,
    timerRef: null,
    debug: false
  };
}
function formatUptime() {
  const s = Math.floor(process.uptime());
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}h ${m}m ${sec}s`;
}

function formatTemplate(tpl, client, store) {
  const userCount = (store && store.chats && typeof store.chats === 'object') ? Object.keys(store.chats).length : 0;
  return tpl
    .replace(/{uptime}/gi, formatUptime())
    .replace(/{platform}/gi, process.platform)
    .replace(/{userCount}/gi, String(userCount))
    .replace(/{owner}/gi, (global.owner && global.owner[0]) ? global.owner[0] : 'owner');
}

// Attempts to set profile status using several common method names used by Baileys forks.
// ---------- Welcome system init & helpers ----------

if (!global.welcomeSettings) {
  try {
    if (fs.existsSync(WELCOME_FILE)) {
      global.welcomeSettings = JSON.parse(fs.readFileSync(WELCOME_FILE, 'utf8') || '{}');
    } else {
      global.welcomeSettings = {}; // keyed by chat id -> { enabled: true, template: "...", sendImage: true }
      fs.writeFileSync(WELCOME_FILE, JSON.stringify(global.welcomeSettings, null, 2));
    }
  } catch (e) {
    console.error('[welcome] failed to load settings', e);
    global.welcomeSettings = {};
  }
}

function saveWelcomeSettings() {
  try {
    fs.writeFileSync(WELCOME_FILE, JSON.stringify(global.welcomeSettings || {}, null, 2));
  } catch (e) {
    console.error('[welcome] save failed', e);
  }
}

/**
 * welcomeParticipantUpdate
 * - call this from your connection/group participants update event:
 *   conn.ev.on('group-participants.update', async (update) => await welcomeParticipantUpdate(conn, update, store))
 *
 * update shape example: { id: '12345-678@g.us', participants: ['254...@s.whatsapp.net'], action: 'add'|'remove'|'promote'|'demote' }
 */
async function welcomeParticipantUpdate(james, update, store) {
  try {
    if (!update || !update.id || !Array.isArray(update.participants)) return;
    const chatId = update.id; // group jid
    const action = update.action; // 'add' / 'remove' / ...
    // only act on added users
    if (action !== 'add') return;

    const cfg = (global.welcomeSettings && global.welcomeSettings[chatId]) || { enabled: false };
    if (!cfg.enabled) return; // not enabled for this chat

    // gather group metadata (name, description)
    let subject = chatId;
    try {
      const meta = await james.groupMetadata(chatId).catch(()=>null);
      if (meta && meta.subject) subject = meta.subject;
    } catch (e) {}

    // build mention list and send a message per new participant
    for (const participant of update.participants) {
      const user = participant.split('@')[0];
      const mentions = [participant];

      // choose message template (support placeholders)
      // placeholders: {user}, {user_mention}, {group}, {member_count}
      const template = (cfg.template && cfg.template.trim().length > 0) ?
          cfg.template :
          "👋 Welcome @{{user}}!\nYou joined *{{group}}*.\nSay hi!";

      // replace placeholders
      let text = template
        .replace(/\{\{user\}\}/g, user)
        .replace(/\{\{user_mention\}\}/g, '@' + user)
        .replace(/\{\{group\}\}/g, subject);

      // try to get group member count
      try {
        const meta = await james.groupMetadata(chatId).catch(()=>null);
        const memberCount = meta && meta.participants ? meta.participants.length : undefined;
        if (memberCount) text = text.replace(/\{\{member_count\}\}/g, String(memberCount));
      } catch (e) {}

      // optionally send group profile picture or a default thumbnail
      let pic = null;
      if (cfg.sendImage) {
        try {
          pic = await james.profilePictureUrl(participant, 'image').catch(()=>null);
          // if no user PP, try group picture
          if (!pic) pic = await james.profilePictureUrl(chatId, 'image').catch(()=>null);
        } catch (e) { pic = null; }
      }

      // send message (if pic available, send image + caption with mentions)
      try {
        if (pic) {
          await james.sendMessage(chatId, { image: { url: pic }, caption: text, mentions }, { });
        } else {
          await james.sendMessage(chatId, { text, mentions }, { });
        }
      } catch (e) {
        // fallback to plain text
        try { await james.sendMessage(chatId, { text, mentions }, {}); } catch(e2){ console.error('[welcome] send failed', e2); }
      }
    }

  } catch (err) {
    console.error('[welcomeParticipantUpdate] error', err);
  }
}

async function setBio(client, text) {
  try {
    // try common method names in order
    if (typeof client.updateProfileStatus === 'function') {
      if (global.autobio.debug) console.log('[autobio] using updateProfileStatus');
      return await client.updateProfileStatus(text);
    }
    if (typeof client.setStatus === 'function') {
      if (global.autobio.debug) console.log('[autobio] using setStatus');
      return await client.setStatus(text);
    }
    // some forks expose profile update under 'updateProfile' => updateProfile({ status: '...' })
    if (typeof client.updateProfile === 'function') {
      if (global.autobio.debug) console.log('[autobio] using updateProfile');
      return await client.updateProfile({ status: text });
    }
    // another fallback pattern: setProfileStatus
    if (typeof client.setProfileStatus === 'function') {
      if (global.autobio.debug) console.log('[autobio] using setProfileStatus');
      return await client.setProfileStatus(text);
    }
    // last fallback: try direct query (likely to fail on some forks) — keep it non-throwing
    console.warn('[autobio] No supported status update method found on client');
    throw new Error('No supported method to update profile status on this Baileys client. Check your fork API.');
  } catch (e) {
    console.error('[autobio] setBio error:', e && (e.stack || e.message || e));
    throw e;
  }
}

// Start the auto-bio loop (call once after connection ready)
function startAutoBio(client, store) {
  try {
    // clear existing timer
    if (global.autobio.timerRef) {
      clearInterval(global.autobio.timerRef);
      global.autobio.timerRef = null;
    }
    if (!global.autobio.enabled) {
      if (global.autobio.debug) console.log('[autobio] disabled, not starting loop');
      return;
    }
    // immediate run once
    (async () => {
      try {
        const tpl = global.autobio.templates[global.autobio.index % global.autobio.templates.length] || global.autobio.templates[0];
        const text = formatTemplate(tpl, client, store);
        if (global.autobio.debug) console.log('[autobio] setting bio ->', text);
        await setBio(client, text);
      } catch (e) {
        console.error('[autobio] immediate set failed', e);
      }
    })();

    // set interval
    global.autobio.timerRef = setInterval(async () => {
      try {
        global.autobio.index = (global.autobio.index + 1) % Math.max(1, global.autobio.templates.length);
        const tpl = global.autobio.templates[global.autobio.index];
        const text = formatTemplate(tpl, client, store);
        if (global.autobio.debug) console.log('[autobio] interval set bio ->', text);
        await setBio(client, text);
      } catch (e) {
        console.error('[autobio] interval set failed', e);
      }
    }, global.autobio.interval);

    if (global.autobio.debug) console.log('[autobio] started with interval', global.autobio.interval);
  } catch (err) {
    console.error('[autobio] startAutoBio error', err);
  }
}

// Stop the loop
function stopAutoBio() {
  try {
    if (global.autobio.timerRef) {
      clearInterval(global.autobio.timerRef);
      global.autobio.timerRef = null;
    }
  } catch (e) {
    console.error('[autobio] stop error', e);
  }
}
if (typeof global.autostatusSettings === 'undefined') {
  global.autostatusSettings = {
    enabled: false,        // master switch for auto-view
    likeEnabled: false,    // NEW: auto-like statuses
    onlyFrom: []           // e.g. ["2547xxxxxxx@s.whatsapp.net"]
  };
}

// ─── ANTIDELETE INBOX (save deleted messages to bot DM) ──────────────────────
if (typeof global.antideleteSettings === 'undefined') {
  global.antideleteSettings = {
    enabled: false,    // global on/off
    groups: false,     // intercept group deletes
    dm: false,         // intercept DM deletes
    inbox: []          // saved deleted messages: [{from, sender, type, content, time, caption}]
  };
}
const ANTIDELETE_FILE = path.join(__dirname, 'antidelete.json');
function loadAntideleteSettings() {
  try {
    if (fs.existsSync(ANTIDELETE_FILE)) {
      const raw = JSON.parse(fs.readFileSync(ANTIDELETE_FILE, 'utf8') || '{}');
      global.antideleteSettings = Object.assign(global.antideleteSettings, raw);
    } else {
      fs.writeFileSync(ANTIDELETE_FILE, JSON.stringify(global.antideleteSettings, null, 2));
    }
  } catch(e) { console.error('[antidelete] load error', e); }
}
function saveAntideleteSettings() {
  try {
    fs.writeFileSync(ANTIDELETE_FILE, JSON.stringify({
      enabled: global.antideleteSettings.enabled,
      groups: global.antideleteSettings.groups,
      dm: global.antideleteSettings.dm
    }, null, 2));
  } catch(e) { console.error('[antidelete] save error', e); }
}
loadAntideleteSettings();

// ─── VIEW-ONCE INBOX (vvi/vvinbox — reveal & send to sender's DM) ────────────
// No global buffer store needed: media is downloaded on-demand when .vvi is used

// ─── WINGMAN PICKUP LINES ─────────────────────────────────────────────────────
if (typeof global.wingmanLines === 'undefined') {
  global.wingmanLines = [
    "Are you a WiFi signal? Because I'm feeling a connection. 📶",
    "Do you have a map? I keep getting lost in your eyes. 🗺️",
    "Are you made of copper and tellurium? Because you're CuTe. ⚗️",
    "Is your name Google? Because you have everything I've been searching for. 🔍",
    "Do you believe in love at first text, or should I send another? 💬",
    "Are you a parking ticket? Because you've got 'fine' written all over you. 🎫",
    "Is your dad a boxer? Because you're a knockout. 🥊",
    "If you were a vegetable, you'd be a cute-cumber. 🥒",
    "Are you a bank loan? Because you have my interest. 💰",
    "Do you have a BandAid? Because I just scraped my knee falling for you. 🩹",
    "Are you a time traveler? Because I see you in my future. ⏳",
    "Is your name Ariel? Because I think we mermaid for each other. 🧜",
    "Do you like science? Because I've got great chemistry with you. 🧪",
    "Are you an interior decorator? Because when I saw you, the entire room became beautiful. 🏡",
    "If you were a song, you'd be the best track on the album. 🎵",
    "Are you a camera? Every time I look at you, I smile. 📷",
    "Do you like Star Wars? Because Yoda one for me. 🌌",
    "Is there an airport nearby? Because my heart just took off. ✈️",
    "Are you a magician? Because whenever I look at you, everyone else disappears. 🎩",
    "If looks could kill, you'd be a weapon of mass destruction. 💣",
    "Are you a charger? Because I'm dead without you. 🔋",
    "Do you have a sunburn, or are you always this hot? ☀️",
    "Are you a dictionary? Because you add meaning to my life. 📖",
    "Is your name Bluetooth? Because I feel a connection. 📡",
    "If you were a triangle, you'd be acute one. 📐",
    "Are you a shooting star? Because I've been wishing for someone like you. ⭐",
    "Do you like raisins? How do you feel about a date? 🍇",
    "Are you a 90-degree angle? Because you're looking right! ↗️",
    "Is your name Eleventy? Because you're beyond perfect. 💯",
    "Are you a keyboard? Because you're just my type. ⌨️",
  ];
}

// ─── AURA SYSTEM — module-level helpers ──────────────────────────────────────
if (typeof global.jamesAuraData === 'undefined') {
  const _aPath = require('path').join(__dirname, 'aura_data.json');
  try { global.jamesAuraData = JSON.parse(require('fs').readFileSync(_aPath, 'utf-8')); }
  catch(e) { global.jamesAuraData = {}; }
}
function _saveAura() {
  const _aPath = require('path').join(__dirname, 'aura_data.json');
  try { require('fs').writeFileSync(_aPath, JSON.stringify(global.jamesAuraData, null, 2)); } catch(e) {}
}
function _getAuraLevel(count) {
  if (count >= 10000) return { level: 7, emoji: '🌟', title: 'Mythic' };
  if (count >= 5000)  return { level: 6, emoji: '👑', title: 'Legend' };
  if (count >= 2500)  return { level: 5, emoji: '💎', title: 'Elite' };
  if (count >= 1000)  return { level: 4, emoji: '🔥', title: 'Hot' };
  if (count >= 500)   return { level: 3, emoji: '⚡', title: 'Active' };
  if (count >= 100)   return { level: 2, emoji: '💫', title: 'Rising' };
  return { level: 1, emoji: '🌱', title: 'Newbie' };
}
function _auraBar(count) {
  const steps = [0, 100, 500, 1000, 2500, 5000, 10000];
  const lvl = _getAuraLevel(count).level;
  const lo  = steps[lvl - 1], hi = steps[lvl] || lo + 15000;
  const pct = Math.min((count - lo) / (hi - lo), 1);
  const f = Math.round(pct * 10);
  return '▰'.repeat(f) + '▱'.repeat(10 - f);
}
// ─── END AURA HELPERS ─────────────────────────────────────────────────────────

function loadAutostatusSettings(){
// ---------- group tools helpers (paste near top once) ----------
if (typeof global.jamesOnlineCache === 'undefined') global.jamesOnlineCache = {};   // { jid: { lastSeen: timestamp, online: bool, lastPresence: {}}}
if (typeof global.jamesStatusViewers === 'undefined') global.jamesStatusViewers = {}; // { statusOwnerJid: Set([...viewerJids]) }

function notePresence(jid, info = {}) {
  // jid like '2547xxx@s.whatsapp.net'
  if (!jid) return;
  if (!global.jamesOnlineCache[jid]) global.jamesOnlineCache[jid] = { lastSeen: 0, online: false, lastPresence: {} };
  global.jamesOnlineCache[jid].lastPresence = Object.assign(global.jamesOnlineCache[jid].lastPresence || {}, info);
  if (info.type === 'available' || info.presence === 'available' || info.isOnline) {
    global.jamesOnlineCache[jid].online = true;
    global.jamesOnlineCache[jid].lastSeen = Date.now();
  } else if (info.type === 'unavailable' || info.presence === 'unavailable' || info.isOnline === false) {
    global.jamesOnlineCache[jid].online = false;
    global.jamesOnlineCache[jid].lastSeen = Date.now();
  } else if (info.timestamp) {
    global.jamesOnlineCache[jid].lastSeen = info.timestamp;
  } else {
    // fallback: update lastSeen to now when we get any presence
    global.jamesOnlineCache[jid].lastSeen = Date.now();
  }
}

function registerStatusViewer(statusOwnerJid, viewerJid) {
  if (!statusOwnerJid || !viewerJid) return;
  if (!global.jamesStatusViewers[statusOwnerJid]) global.jamesStatusViewers[statusOwnerJid] = new Set();
  global.jamesStatusViewers[statusOwnerJid].add(viewerJid);
}

// helper to pretty time difference
function prettyTime(ms) {
  if (!ms) return 'unknown';
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

// Save/Load caches (optional) — useful for persistent listdead across restarts

function saveGroupToolsCache() {
  try {
    const plain = {
      online: Object.entries(global.jamesOnlineCache || {}).map(([k,v])=>[k,v.lastSeen,v.online]),
      statusViewers: Object.entries(global.jamesStatusViewers || {}).map(([k, set]) => [k, [...set]])
    };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(plain, null,2), 'utf8');
  } catch (e) { console.error('[group_tools] save cache failed', e); }
}
function loadGroupToolsCache() {
  try {
    if (!fs.existsSync(CACHE_FILE)) return;
    const raw = JSON.parse(fs.readFileSync(CACHE_FILE,'utf8') || '{}');
    if (Array.isArray(raw.online)) {
      raw.online.forEach(([jid,lastSeen,online]) => {
        global.jamesOnlineCache[jid] = { lastSeen: lastSeen || 0, online: !!online, lastPresence:{} };
      });
    }
    if (Array.isArray(raw.statusViewers)) {
      raw.statusViewers.forEach(([owner,arr]) => {
        global.jamesStatusViewers[owner] = new Set(arr || []);
      });
    }
  } catch (e) { console.error('[group_tools] load cache failed', e); }
}
loadGroupToolsCache();
// --------- end helpers ----------
  try {
    if (fs.existsSync(AUTOSTATUS_FILE)) {
      const raw = fs.readFileSync(AUTOSTATUS_FILE, 'utf8') || '{}';
      const parsed = JSON.parse(raw);
      global.autostatusSettings = Object.assign(global.autostatusSettings, parsed);
    } else {
      fs.writeFileSync(AUTOSTATUS_FILE, JSON.stringify(global.autostatusSettings, null, 2), 'utf8');
    }
  } catch (e) {
    console.error('[autostatus] failed to load settings', e);
  }
}
function saveAutostatusSettings(){
  try {
    fs.writeFileSync(AUTOSTATUS_FILE, JSON.stringify(global.autostatusSettings, null, 2), 'utf8');
  } catch (e) {
    console.error('[autostatus] failed to save settings', e);
  }
}

loadAutostatusSettings();

// default settings
if (typeof global.autoblockSettings === 'undefined') {
  global.autoblockSettings = {
    enabled: false,                     // overall on/off
    mode: 'silent',                     // 'silent' | 'notify'
    whitelist: [],                      // array of phone numbers (digits only) to never block
    blockedCache: {}                    // runtime cache { '<jid>': timestamp } to avoid duplicates
  };
}

function loadAutoblockSettings() {
  try {
    if (fs.existsSync(AUTOBLOCK_FILE)) {
      const raw = fs.readFileSync(AUTOBLOCK_FILE, 'utf8') || '{}';
      const parsed = JSON.parse(raw);
      global.autoblockSettings = Object.assign(global.autoblockSettings, parsed);
    } else {
      fs.writeFileSync(AUTOBLOCK_FILE, JSON.stringify(global.autoblockSettings, null, 2), 'utf8');
    }
  } catch (e) {
    console.error('[autoblock] failed to load settings', e);
  }
}
function saveAutoblockSettings() {
  try {
    fs.writeFileSync(AUTOBLOCK_FILE, JSON.stringify(global.autoblockSettings, null, 2), 'utf8');
  } catch (e) {
    console.error('[autoblock] failed to save settings', e);
  }
}

// Helper: normalize phone string to digits-only
function normalizePhone(x) {
  if (!x) return '';
  return String(x).replace(/[^0-9]/g, '');
}

// Helper: is a jid owner-listed?
function isOwnerJid(jid) {
  try {
    const owners = (global.owner || []).map(v => normalizePhone(v));
    const phone = normalizePhone(String(jid || '').split('@')[0]);
    return owners.includes(phone);
  } catch (e) { return false; }
}

// Helper: do not block these jids
function isProtectedJid(jid) {
  if (!jid) return true;
  const phone = normalizePhone(jid.split('@')[0] || '');
  // never block owners, whitelist, or bot itself
  const botJid = (james && james.user && String(james.user.id || '')).split(':')[0] + '@s.whatsapp.net';
  if (jid === botJid) return true;
  if (isOwnerJid(jid)) return true;
  if ((global.autoblockSettings.whitelist || []).map(normalizePhone).includes(phone)) return true;
  return false;
}

// init load
loadAutoblockSettings();
// ---------- Auto Profile Picture (autopp) helper / init ----------
// Place this near other global initializations at the top of your file.


// ensure temp dir

if (!fs.existsSync(AUTOPP_TMP)) fs.mkdirSync(AUTOPP_TMP, { recursive: true });

if (typeof global.autopp === 'undefined') {
  global.autopp = {
    enabled: false,          // whether rotating is currently running
    intervalSec: 3600,      // default interval (seconds)
    images: [],             // array of { source: 'local'|'url', data: '<path or url>' }
    timerId: null,
    debug: false
  };
}

/**
 * Helper: fetch image buffer from either a local path or URL or quoted message buffer
 * Accepts:
 *  - { quotedMsg } to download via m.quoted.download() if provided by caller
 *  - or imagePathOrUrl string
 */
async function autopProfileFetchBuffer(james, imagePathOrUrl, quotedMsg) {
  // 1) If quotedMsg provided and has a download method in your base, try that first
  if (quotedMsg) {
    try {
      // your base has m.quoted.download() style in many places: try it if available
      if (typeof quotedMsg.download === 'function') {
        const buf = await quotedMsg.download();
        if (buf && buf.length) return Buffer.from(buf);
      }
      // also attempt using your downloadContentFromMessage helper if available
      if (typeof downloadContentFromMessage === 'function') {
        const stream = await downloadContentFromMessage(quotedMsg, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
        if (buffer.length) return buffer;
      }
    } catch (e) {
      if (global.autopp.debug) console.error('[autopp] quoted download error', e);
    }
  }

  // 2) If imagePathOrUrl is a local path and exists
  if (imagePathOrUrl && fs.existsSync(imagePathOrUrl)) {
    try {
      return fs.readFileSync(imagePathOrUrl);
    } catch (e) {
      if (global.autopp.debug) console.error('[autopp] read local failed', e);
    }
  }

  // 3) If it's a web URL -> fetch via axios
  if (imagePathOrUrl && /^https?:\/\//i.test(imagePathOrUrl)) {
    try {
      const resp = await axios.get(imagePathOrUrl, { responseType: 'arraybuffer', timeout: 20000 });
      return Buffer.from(resp.data);
    } catch (e) {
      if (global.autopp.debug) console.error('[autopp] fetch url failed', e.message || e);
    }
  }

  return null;
}

/**
 * Helper: set profile picture buffer for the bot
 * Tries a few fallbacks. Replace or adapt if your Baileys variant has a different method.
 */
async function autopProfileSet(james, buffer) {
  if (!buffer || !Buffer.isBuffer(buffer)) throw new Error('No buffer provided');

  // decode bot jid
  const botJid = (await james.decodeJid(james.user.id)).split(':')[0] + '@s.whatsapp.net';

  // 1) preferred method: many baileys versions implement updateProfilePicture
  try {
    if (typeof james.updateProfilePicture === 'function') {
      await james.updateProfilePicture(botJid, buffer);
      if (global.autopp.debug) console.log('[autopp] updated profile via updateProfilePicture');
      return true;
    }
  } catch (e) {
    if (global.autopp.debug) console.error('[autopp] updateProfilePicture failed', e);
  }

  // 2) another common pattern: send a "setProfilePicture" query via WABinary (less universal)
  try {
    // some forks accept this query shape; it's best-effort and may fail — catch silently
    await james.query({
      tag: 'iq', attrs: { to: 's.whatsapp.net', type: 'set', xmlns: 'w:profile:picture' },
      content: [{ tag: 'picture', attrs: {}, content: [{ tag: 'image', attrs: {} , content: buffer }] }]
    });
    if (global.autopp.debug) console.log('[autopp] updated via query fallback');
    return true;
  } catch (e) {
    if (global.autopp.debug) console.error('[autopp] query fallback failed', e);
  }

  // 3) As last fallback, attempt to upload file then call updateProfilePicture with url (some forks accept urls)
  try {
    if (typeof james.waUploadToServer === 'function') {
      // upload as image to WhatsApp servers and send updateProfilePicture with returned image
      const media = await james.waUploadToServer(buffer);
      if (media && media.url) {
        try {
          await james.updateProfilePicture(botJid, { url: media.url });
          if (global.autopp.debug) console.log('[autopp] updated via upload url fallback');
          return true;
        } catch (e) { if (global.autopp.debug) console.error('[autopp] upload-url update failed', e); }
      }
    }
  } catch (e) {
    if (global.autopp.debug) console.error('[autopp] waUploadToServer fallback failed', e);
  }

  throw new Error('All profile-update methods failed for this Baileys variant.');
}

/**
 * Core: pick random image from global.autopp.images and set it as profile
 */
async function autopProfileRunOnce(james) {
  if (!global.autopp.images || global.autopp.images.length === 0) {
    if (global.autopp.debug) console.log('[autopp] no images configured');
    return false;
  }

  const pick = global.autopp.images[Math.floor(Math.random() * global.autopp.images.length)];
  if (!pick) return false;

  // fetch buffer using either stored url or local path or by using the raw quoted data
  const buffer = await autopProfileFetchBuffer(james, pick.data, null);
  if (!buffer) {
    if (global.autopp.debug) console.log('[autopp] failed to fetch chosen image buffer');
    return false;
  }

  await autopProfileSet(james, buffer);
  return true;
}

/**
 * Start/stop the interval runner. Controlled by cases only (no auto start on connection).
 */
function autopProfileStart(james) {
  if (global.autopp.timerId) clearInterval(global.autopp.timerId);
  const intervalMs = (global.autopp.intervalSec || 3600) * 1000;
  global.autopp.timerId = setInterval(async () => {
    try {
      await autopProfileRunOnce(james);
    } catch (e) {
      console.error('[autopp] periodic change error', e);
    }
  }, intervalMs);
  global.autopp.enabled = true;
  if (global.autopp.debug) console.log('[autopp] started with interval', global.autopp.intervalSec);
}

function autopProfileStop() {
  if (global.autopp.timerId) {
    clearInterval(global.autopp.timerId);
    global.autopp.timerId = null;
  }
  global.autopp.enabled = false;
  if (global.autopp.debug) console.log('[autopp] stopped');
}
// ---------- antispam/antimedia helpers (top of file) ----------


// default objects
if (typeof global.antispamSettings === 'undefined') global.antispamSettings = {}; // per chat: { modeGroup:'off'|'on', modeDM:'off'|'on', threshold: 5, windowMs:60000, records:{} }
if (typeof global.antimediaSettings === 'undefined') global.antimediaSettings = {}; // per chat: { group:'off'|'on', dm:'off'|'on' }

function loadJsonSafe(filePath, fallback) {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8') || '{}';
      return JSON.parse(raw);
    } else {
      fs.writeFileSync(filePath, JSON.stringify(fallback || {}, null, 2), 'utf8');
      return fallback || {};
    }
  } catch (e) {
    console.error(`[loadJsonSafe] error reading ${filePath}`, e);
    return fallback || {};
  }
}
function saveJsonSafe(filePath, obj) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf8');
  } catch (e) {
    console.error(`[saveJsonSafe] error writing ${filePath}`, e);
  }
}

// init load
global.antispamSettings = loadJsonSafe(ANTISPAM_FILE, global.antispamSettings);
global.antimediaSettings = loadJsonSafe(ANTIMEDIA_FILE, global.antimediaSettings);

// get per-chat antispam config (init default)
function getSpamConfig(chatId) {
  if (!global.antispamSettings[chatId]) {
    global.antispamSettings[chatId] = {
      modeGroup: 'off', // 'off'|'on'
      modeDM: 'off',    // 'off'|'on'
      threshold: 5,     // number messages allowed per window
      windowMs: 60000,  // window size in ms (60s)
      records: {}       // { jid: [timestamp, timestamp, ...] }
    };
    saveJsonSafe(ANTISPAM_FILE, global.antispamSettings);
  }
  return global.antispamSettings[chatId];
}

function getAntimediaConfig(chatId) {
  if (!global.antimediaSettings[chatId]) {
    global.antimediaSettings[chatId] = { group: 'off', dm: 'off' };
    saveJsonSafe(ANTIMEDIA_FILE, global.antimediaSettings);
  }
  return global.antimediaSettings[chatId];
}

// utility: attempt to delete message robustly
async function tryDeleteMessage(conn, chatId, key) {
  try {
    // preferred new API shape
    if (typeof conn.sendMessage === 'function') {
      await conn.sendMessage(chatId, { delete: key });
      return true;
    }
  } catch (e) {
    // ignore and try fallback
    console.warn('[tryDeleteMessage] delete via sendMessage failed', e?.message || e);
  }
  try {
    // fallback: protocolMessage revoke
    const proto = {
      protocolMessage: {
        key,
        type: 0
      }
    };
    const waMsg = generateWAMessageFromContent(chatId, proto, { quoted: key });
    await conn.relayMessage(chatId, waMsg.message, { messageId: waMsg.key.id });
    return true;
  } catch (e2) {
    console.warn('[tryDeleteMessage] protocol revoke fallback failed', e2?.message || e2);
  }
  try {
    // final fallback: request to WhatsApp to delete (older versions)
    if (typeof conn.deleteMessage === 'function') {
      await conn.deleteMessage(chatId, key);
      return true;
    }
  } catch (e3) {
    console.warn('[tryDeleteMessage] final delete fallback failed', e3?.message || e3);
  }
  return false;
}

// helper: is a sender protected (owner/admin/bot)
async function isProtected(senderJid) {
  try {
    if (!senderJid) return true;
    // owner list
    const owners = (global.owner || []).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net');
    if (owners.includes(senderJid)) return true;
    // bot id
    const botJid = (james && james.user && String(james.user.id || '')).split(':')[0] + '@s.whatsapp.net';
    if (botJid === senderJid) return true;
    // group admin checks must be done in runtime where group metadata is available (use isAdmins variable)
    return false;
  } catch (e) { return true; }
}
// ========== markStatusAsRead helper ==========
/**
 * Try multiple known Baileys functions to mark a status message as read.
 * Accepts: conn = james, key = message.key (object containing remoteJid, id, participant)
 */
async function markStatusAsRead(conn, key) {
  if (!conn || !key) return false;
  try {
    // Normalize key shape
    const remote = key.remoteJid || key.from || 'status@broadcast';
    const id = key.id || key.stanzaId || key.messageId || (key.key && key.key.id) || undefined;
    const participant = key.participant || key.key?.participant || key.author || undefined;

    // Try multiple method names/variations (most Baileys versions use sendReadReceipt or readMessages)
    const attempts = [];

    // 1) conn.sendReadReceipt(remoteJid, participant, messageId) - common form
    attempts.push(async () => {
      if (typeof conn.sendReadReceipt === 'function') {
        return await conn.sendReadReceipt(remote, participant || conn.user?.id, id);
      }
      throw new Error('sendReadReceipt not available');
    });

    // 2) conn.readMessages([ key ]) or conn.readMessages(remoteJid, [id]) - some variants
    attempts.push(async () => {
      if (typeof conn.readMessages === 'function') {
        // try array form
        if (Array.isArray(conn.readMessages)) throw new Error('readMessages exists but is not callable as expected');
        return await conn.readMessages([ { key } ]);
      }
      throw new Error('readMessages not available');
    });

    // 3) conn.sendPresenceUpdate('available', remoteJid) + sendReadReceipt alternative (best-effort)
    attempts.push(async () => {
      if (typeof conn.sendPresenceUpdate === 'function') {
        await conn.sendPresenceUpdate('available', remote);
        // some bailey forks require a follow-up sendReadReceipt
        if (typeof conn.sendReadReceipt === 'function') {
          return await conn.sendReadReceipt(remote, participant || conn.user?.id, id);
        }
        return true;
      }
      throw new Error('sendPresenceUpdate not available');
    });

    // 4) conn.relayMessage with protocolMessage type 0 (revoke-style read) - best-effort (non-destructive)
    const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');
    attempts.push(async () => {
      // try to craft a protocolMessage read receipt
      const proto = {
        protocolMessage: {
          key: { remoteJid: remote, id: id, participant },
          type: 0
        }
      };
      const waMsg = generateWAMessageFromContent(remote, proto, {});
      await conn.relayMessage(remote, waMsg.message, { messageId: waMsg.key.id });
      return true;
    });

    // Execute attempts in sequence until success
    for (const fn of attempts) {
      try {
        await Promise.race([fn(), new Promise((_,reject) => setTimeout(()=>reject(new Error('attempt timeout')), 8000))]);
        // success
        return true;
      } catch (e) {
        // log debug but continue
        // console.debug('[autostatus] attempt failed:', e.message || e);
        continue;
      }
    }
    return false;
  } catch (err) {
    console.error('[autostatus] markStatusAsRead error:', err);
    return false;
  }
}
// ---------- AntiSimp init (paste near top of file) ----------
if (typeof global.antisimp === 'undefined') {
  global.antisimp = { group: false, dm: false }; // toggles
  global.antisimpWords = [
    'love','lover','sexy','sex','nasty','hot','flirt','baby','babe','darling','kiss','loveu','imat','horny',
    'smut','fuck','naughty','romantic','relations','sext','i love you','i miss you'
  ];
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  global._antisimpRegex = new RegExp('\\b(' + global.antisimpWords.map(esc).join('|') + ')\\b', 'i');
  // turn on to see debugging output in console
  global.antisimpDebug = false;
}
// ---------- AntiSimp handler ----------
async function antiSimpHandler(james, m, opts = {}) {
  try {
    const { from, isGroup, isBotAdmins, isOwner, reply } = opts;

    // Build text to check from many shapes
    const textCandidates = [];
    if (typeof m.text === 'string') textCandidates.push(m.text);
    if (m.message) {
      // conversation / extendedText / image/video captions
      const conv = m.message.conversation; if (conv) textCandidates.push(conv);
      const ext = m.message.extendedTextMessage?.text; if (ext) textCandidates.push(ext);
      const cap = m.message.imageMessage?.caption || m.message.videoMessage?.caption || m.message.documentMessage?.caption; if (cap) textCandidates.push(cap);
    }
    // fallback to 'body' variable if you use it
    if (typeof body === 'string' && body) textCandidates.push(body);

    const bodyText = textCandidates.find(t => typeof t === 'string' && t.trim()) || '';

    if (!bodyText) {
      if (global.antisimpDebug) console.log('[antisimp] no text to check');
      return;
    }

    // skip checks for owner and bot
    const sender = m.sender || (m.key && m.key.participant) || '';
    if (!sender) return;
    if (isOwner) { if (global.antisimpDebug) console.log('[antisimp] skip owner'); return; }

    // do regex test
    if (!global._antisimpRegex.test(bodyText)) {
      if (global.antisimpDebug) console.log('[antisimp] no match:', bodyText);
      return;
    }
    if (global.antisimpDebug) console.log('[antisimp] match:', bodyText);

    // build mention
    const mention = [sender];

    // Group case
    if (isGroup) {
      if (!global.antisimp.group) return;
      // if bot admin -> attempt delete
      if (isBotAdmins) {
        try {
          // Preferred: try delete via protocol message
          try {
            await james.relayMessage(from, {
              protocolMessage: {
                key: m.key,
                type: 0
              }
            }, { messageId: generateMessageID() });
          } catch (e1) {
            // Fallback: attempt send delete object (some forks)
            try {
              await james.sendMessage(from, { delete: m.key });
            } catch (e2) {
              // last resort: use delete API if available
              if (typeof james.deleteMessage === 'function') {
                await james.deleteMessage(from, { id: m.key.id, remoteJid: from, fromMe: false }).catch(()=>null);
              } else throw e2;
            }
          }

          // notify group
          const txt = `*ANTI-SIMP* — Removed message from *@${sender.split('@')[0]}* containing prohibited words.`;
          await james.sendMessage(from, { text: txt, mentions: mention });

        } catch (delErr) {
          console.error('[antisimp] delete failed', delErr);
          await james.sendMessage(from, { text: `*ANTI-SIMP DETECTED* — @${sender.split('@')[0]}\nDetected prohibited words but I failed to delete it (check bot admin rights).`, mentions: mention });
        }
      } else {
        // bot not admin -> warn
        await james.sendMessage(from, { text: `*SIMP DETECTED*\n@${sender.split('@')[0]} sent a message containing prohibited words. I am not admin so I couldn't delete it.`, mentions: mention });
      }
      return;
    }

    // DM case
    if (!isGroup) {
      if (!global.antisimp.dm) return;
      await james.sendMessage(from, { text: `*SIMP DETECTED (DM)*\n@${sender.split('@')[0]} sent a message with prohibited words. Please keep it respectful.`, mentions: mention });
      return;
    }

  } catch (e) {
    console.error('[antiSimpHandler] error', e);
  }
}
// ------------- Antilink helpers (paste near top, once) -------------


if (typeof global.antiLinkSettings === 'undefined') {
  global.antiLinkSettings = {}; // shape: { [chatId]: { mode: 'off'|'warn'|'delete'|'kick', threshold: 3, warns: { '<userJid>': count } } }
}

// Load on startup
function loadAntiLinkSettings() {
  try {
    if (fs.existsSync(ANTILINK_FILE)) {
      const raw = fs.readFileSync(ANTILINK_FILE, 'utf8') || '{}';
      global.antiLinkSettings = JSON.parse(raw);
    } else {
      fs.writeFileSync(ANTILINK_FILE, JSON.stringify(global.antiLinkSettings, null, 2), 'utf8');
    }
  } catch (e) {
    console.error('[antilink] load failed', e);
    global.antiLinkSettings = {};
  }
}
function saveAntiLinkSettings() {
  try {
    fs.writeFileSync(ANTILINK_FILE, JSON.stringify(global.antiLinkSettings, null, 2), 'utf8');
  } catch (e) {
    console.error('[antilink] save failed', e);
  }
}

// get or init chat config
function getAntiConfig(chatId) {
  if (!global.antiLinkSettings[chatId]) {
    global.antiLinkSettings[chatId] = { mode: 'off', threshold: 3, warns: {} };
  }
  return global.antiLinkSettings[chatId];
}

// reset warns for a chat if you want (helper)
function resetWarns(chatId) {
  const cfg = getAntiConfig(chatId);
  cfg.warns = {};
  saveAntiLinkSettings();
}

loadAntiLinkSettings();
// ------------- end antlink helpers -------------

// ════════════════════════════════════════════════════════
// ── MUTE SYSTEM — delete messages from muted WA users ──
// ════════════════════════════════════════════════════════
// Structure: { "<groupJid>": ["<userJid>", ...] }
if (typeof global.mutedUsers === 'undefined') global.mutedUsers = {};

function loadMutedUsers() {
  try {
    if (fs.existsSync(MUTE_FILE)) {
      global.mutedUsers = JSON.parse(fs.readFileSync(MUTE_FILE, 'utf8') || '{}');
    } else {
      fs.writeFileSync(MUTE_FILE, JSON.stringify({}, null, 2), 'utf8');
    }
  } catch (e) {
    console.error('[mute] load failed', e);
    global.mutedUsers = {};
  }
}
function saveMutedUsers() {
  try {
    fs.writeFileSync(MUTE_FILE, JSON.stringify(global.mutedUsers, null, 2), 'utf8');
  } catch (e) {
    console.error('[mute] save failed', e);
  }
}
function isMuted(groupJid, userJid) {
  if (!groupJid || !userJid) return false;
  return (global.mutedUsers[groupJid] || []).includes(userJid);
}
function muteUser(groupJid, userJid) {
  if (!groupJid || !userJid) return;
  if (!global.mutedUsers[groupJid]) global.mutedUsers[groupJid] = [];
  if (!global.mutedUsers[groupJid].includes(userJid)) {
    global.mutedUsers[groupJid].push(userJid);
    saveMutedUsers();
  }
}
function unmuteUser(groupJid, userJid) {
  if (!groupJid || !userJid) return;
  if (!global.mutedUsers[groupJid]) return;
  global.mutedUsers[groupJid] = global.mutedUsers[groupJid].filter(j => j !== userJid);
  if (global.mutedUsers[groupJid].length === 0) delete global.mutedUsers[groupJid];
  saveMutedUsers();
}
loadMutedUsers();
// ── end mute helpers ──
// ------------- Antilink runtime check (paste BEFORE switch(command)) -------------
// ========== Autostatus runtime - dedicated listener for status@broadcast ==========
// Register ONCE: auto-view and auto-like statuses via messages.upsert event
if (!global._autostatusListenerAttached) {
  global._autostatusListenerAttached = true;
  try {
    james.ev.on('messages.upsert', async ({ messages: statusMsgs, type }) => {
      try {
        if (type !== 'notify') return;
        for (const msg of statusMsgs) {
          if (msg.key?.remoteJid !== 'status@broadcast') continue;
          if (msg.key?.fromMe) continue;
          const statusOwner = msg.key.participant || msg.sender || '';
          // ── AUTO STATUS VIEW ──────────────────────────────────────────────
          if (global.autostatusSettings?.enabled) {
            const onlyFrom = Array.isArray(global.autostatusSettings.onlyFrom) ? global.autostatusSettings.onlyFrom : [];
            const norm = jid => String(jid || '').split('@')[0];
            const shouldView = !onlyFrom.length || onlyFrom.some(s => norm(s) === norm(statusOwner));
            if (shouldView) {
              try {
                if (typeof james.readMessages === 'function') {
                  await james.readMessages([msg.key]).catch(() => {});
                } else if (typeof james.sendReadReceipt === 'function') {
                  await james.sendReadReceipt('status@broadcast', statusOwner, msg.key.id).catch(() => {});
                }
              } catch(e) { console.error('[autostatus view]', e?.message || e); }
            }
            // ── AUTO STATUS LIKE ──────────────────────────────────────────
            if (global.autostatusSettings?.likeEnabled && shouldView && statusOwner) {
              const likeEmojis = ['❤️','🔥','😍','👏','😮','🥰','👌','💯','🤩','✨'];
              const emoji = likeEmojis[Math.floor(Math.random() * likeEmojis.length)];
              setTimeout(async () => {
                try {
                  await james.sendMessage('status@broadcast', {
                    react: { text: emoji, key: msg.key }
                  }).catch(() => {});
                } catch(e) { /* noop */ }
              }, 1500 + Math.random() * 3000);
            }
          }
        }
      } catch(e) { console.error('[autostatus listener]', e); }
    });
  } catch(e) { console.error('[autostatus listener register]', e); }
}
try {
  // only run for groups
  if (m?.isGroup) {
    const cfg = getAntiConfig(from);
    if (cfg.mode && cfg.mode !== 'off') {
      // ignore messages from groups owner/admins or from bot itself
      const sender = m.sender || (m.key && m.key.participant) || '';
      const isFromOwner = isOwner; // your isOwner boolean variable (true if sender is owner)
      const isGroupAdmin = isAdmins; // your isAdmins boolean in base
      const isBotAdmin = isBotAdmins; // your isBotAdmins boolean in base

      // ignore owner, group admins and bot itself
      if (isFromOwner || isGroupAdmin || sender === (await james.decodeJid(james.user.id)).split(':')[0] + '@s.whatsapp.net') {
        // do nothing
      } else {
        // detect link or invite
        const textToCheck = (m.text || m.message?.conversation || m.message?.extendedTextMessage?.text || '') + '';
        const hasLink = /(?:https?:\/\/|www\.|chat\.whatsapp\.com\/|t\.me\/|telegram\.me\/|\.com\/\S+)/i.test(textToCheck);
        // Also check if message has a "url" entity inside buttons/list etc - check for message object shapes
        const protoMsg = m.message || {};
        try {
          // check if an external url field exists in message object
          const jsonStr = JSON.stringify(protoMsg);
          if (!hasLink && /chat\.whatsapp\.com\//i.test(jsonStr)) hasLink = true;
        } catch(e){}

        if (hasLink) {
          // perform according to cfg.mode
          try {
            // If mode is delete -> delete the message for everyone (bot must be admin)
            if (cfg.mode === 'delete') {
              if (!isBotAdmin) {
                // can't delete; inform group admins
                await james.sendMessage(from, { text: `⚠️ I need admin to delete links.` }, { quoted: m });
              } else {
                // delete for everyone
                try {
                  await james.sendMessage(from, { delete: m.key });
                } catch (e) {
                  // fallback: try relay revoke style
                  try {
                    await james.sendMessage(from, { protocolMessage: { key: m.key, type: 0 }});
                  } catch(e2){}
                }
              }
            }

            // If mode is warn -> increment warn count and maybe escalate
            if (cfg.mode === 'warn' || cfg.mode === 'kick') {
              const uid = sender;
              cfg.warns = cfg.warns || {};
              cfg.warns[uid] = (cfg.warns[uid] || 0) + 1;
              saveAntiLinkSettings();

              // send warn message
              const warnMsg = `⚠️ AntiLink: <@${uid.split('@')[0]}> posted a link.\nWarning ${cfg.warns[uid]} / ${cfg.threshold}`;
              try {
                await james.sendMessage(from, { text: warnMsg, mentions: [uid] });
              } catch(e){}

              // if threshold reached -> escalate
              if (cfg.warns[uid] >= (cfg.threshold || 3)) {
                // reset warn for that user
                cfg.warns[uid] = 0;
                saveAntiLinkSettings();

                if (cfg.mode === 'kick') {
                  // kick flow requires bot admin
                  if (!isBotAdmin) {
                    await james.sendMessage(from, { text: `⚠️ I need to be group admin to kick members on threshold.` }, { quoted: m });
                  } else {
                    try {
                      await james.groupParticipantsUpdate(from, [uid], 'remove');
                      await james.sendMessage(from, { text: `✅ <@${uid.split('@')[0]}> has been removed for repeated anti-link.` , mentions: [uid]});
                    } catch (e) {
                      console.error('[antilink] kick failed', e);
                      await james.sendMessage(from, { text: `❌ Failed to remove <@${uid.split('@')[0]}>. Make sure I have permission.`}, { quoted: m });
                    }
                  }
                } else if (cfg.mode === 'warn') {
                  // if in warn mode and threshold reached - delete message if possible
                  if (isBotAdmin) {
                    try { await james.sendMessage(from, { delete: m.key }); } catch (e) {}
                  }
                }
              }
            } // end warn/kick

          } catch (eInner) {
            console.error('[antilink] handler error', eInner);
          } // end try escalate
        } // end if hasLink
      } // end else not owner/admin
    } // end if enabled
  }
} catch (eAll) {
  console.error('[antilink runtime] unexpected', eAll);
}
// ------------- end antlink runtime check -------------
// helper: safe backup
function backupFile(p) {
  try {
    if (fs.existsSync(p)) {
      const bak = p + '.bak.' + Date.now();
      fs.copyFileSync(p, bak);
      console.warn(`[BOOT] Backed up ${p} -> ${bak}`);
      return bak;
    }
  } catch (e) { console.error('[BOOT] backupFile failed', e); }
  return null;
}
// ========== Autoreply helpers (paste near top, once) ==========

const AUTOREPLY_FILE = path.join(__dirname, 'autoreply.json');

// default shape
if (typeof global.autoreplySettings === 'undefined') {
  global.autoreplySettings = {
    enabled: false,
    sticker: 'https://i.ibb.co/your-default-sticker.webp' // change later
  };
}

// load
function loadAutoreplySettings() {
  try {
    if (fs.existsSync(AUTOREPLY_FILE)) {
      const raw = fs.readFileSync(AUTOREPLY_FILE, 'utf8') || '{}';
      const parsed = JSON.parse(raw);
      global.autoreplySettings = Object.assign(global.autoreplySettings, parsed);
    } else {
      // create default file
      fs.writeFileSync(AUTOREPLY_FILE, JSON.stringify(global.autoreplySettings, null, 2), 'utf8');
    }
  } catch (e) {
    console.error('[autoreply] failed to load settings', e);
  }
}

// save
function saveAutoreplySettings() {
  try {
    fs.writeFileSync(AUTOREPLY_FILE, JSON.stringify(global.autoreplySettings, null, 2), 'utf8');
  } catch (e) {
    console.error('[autoreply] failed to save settings', e);
  }
}

// helper to get owner JIDs from global.owner (keeps same format used in your bot)
function getOwnerJids() {
  try {
    if (!global.owner) return [];
    return (global.owner || []).map(v => v.toString().replace(/[^0-9]/g, '') + '@s.whatsapp.net');
  } catch (e) { return []; }
}

// init load
loadAutoreplySettings();
// ========== Autoreply runtime check (paste BEFORE switch(command) ) ==========
try {
  // only run in groups and only if enabled
  if (m?.isGroup && global.autoreplySettings && global.autoreplySettings.enabled) {
    // m.mentionedJid may be present (Baileys recent) — fallback to parsing message text for @mentions
    const mentions = (m.mentionedJid && Array.isArray(m.mentionedJid)) ? m.mentionedJid : [];

    // also check extendedTextMessage context info (older shapes)
    try {
      const ctxMent = m.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      if (Array.isArray(ctxMent)) ctxMent.forEach(x => mentions.push(x));
    } catch (e) {}

    // normalize owners
    const ownerJids = getOwnerJids();

    // check intersection
    const didMentionOwner = mentions.some(j => ownerJids.includes(j));
    if (didMentionOwner) {
      try {
        const stickerSource = global.autoreplySettings.sticker || '';
        // send sticker: accept http(s) or local file path
        if (/^https?:\/\//i.test(stickerSource)) {
          await james.sendMessage(m.chat, { sticker: { url: stickerSource } }, { quoted: m });
        } else {
          // local file
          const p = path.isAbsolute(stickerSource) ? stickerSource : path.join(__dirname, stickerSource);
          if (fs.existsSync(p)) {
            await james.sendMessage(m.chat, { sticker: fs.readFileSync(p) }, { quoted: m });
          } else {
            // fallback: send text to notify owner about missing sticker file
            await james.sendMessage(m.chat, { text: `📎 Autoreply sticker not found: ${stickerSource}` }, { quoted: m });
          }
        }
      } catch (errAuto) {
        console.error('[autoreply runtime] failed to send sticker', errAuto);
      }
    }
  }
} catch (eAutoAll) {
  console.error('[autoreply check] unexpected', eAutoAll);
}
// helper: attempt to clean non-JSON syntax from a JSON-like file (strip comments, =, ;, trailing commas)
function cleanJsonLike(src) {
  // remove block comments /* ... */
  let s = src.replace(/\/\*[\s\S]*?\*\//g, '');
  // remove line comments //
  s = s.replace(/(^|[^\\:])\/\/.*$/gm, (m, p1) => p1);
  // remove trailing semicolons after values (e.g. "key": "val";)
  s = s.replace(/;(?=\s*[\}\]])/g, '');
  // remove stray equals (e.g. "key": = "val")
  s = s.replace(/=\s*/g, '');
  // fix single quotes -> double quotes for property values (best-effort)
  s = s.replace(/'([^']*)'/g, (m, g1) => {
    // if already valid json string, keep
    if (/^".*"$/.test(m)) return m;
    // escape any double quotes inside g1
    return JSON.stringify(g1);
  });
  // remove trailing commas before closing } or ]
  s = s.replace(/,(\s*[\}\]])/g, '$1');
  return s;
}

// loader function

function loadSettings() {
  let settings = {};

  // 1) Prefer settings.js (module)
  try {
    if (fs.existsSync(SETTINGS_JS)) {
      try {
        // clear cache to ensure fresh load on restart/hot-reload
        try { delete require.cache[require.resolve(SETTINGS_JS)]; } catch (e) {}
        const loaded = require(SETTINGS_JS);
        // If settings.js exported an object
        if (loaded && typeof loaded === 'object' && !Array.isArray(loaded)) {
          settings = Object.assign({}, loaded);
          // copy exported keys to globals if not present
          Object.keys(settings).forEach(k => {
            if (typeof global[k] === 'undefined') global[k] = settings[k];
          });
          console.log('[BOOT] Loaded settings from settings.js (export object).');
          global.settingsSource = 'settings.js (export)';
          global.settings = settings;
          return settings;
        } else {
          // maybe settings.js sets globals directly
          console.log('[BOOT] settings.js executed (no exported object). Checking globals.');
          // gather likely keys that may have been set by settings.js (fallback)
          settings = {};
          for (const name of Object.keys(global)) {
            // avoid copying Node internals; pick reasonable names: small heuristic
            if (['owner','botName','prefix','apiKey','footer','ownerNumber','sessionName'].includes(name)) {
              settings[name] = global[name];
            }
          }
          global.settingsSource = 'settings.js (globals)';
          global.settings = settings;
          return settings;
        }
      } catch (err) {
        console.error('[BOOT] Failed to require settings.js — falling back to JSON. Error:', err && err.message || err);
        // continue to JSON fallback
      }
    }
  } catch (e) {
    console.error('[BOOT] settings.js existence check failed', e);
  }

  // 2) Fallback to settings.json (if exists)
  try {
    if (fs.existsSync(SETTINGS_JSON)) {
      let raw = fs.readFileSync(SETTINGS_JSON, 'utf8');
      try {
        settings = JSON.parse(raw);
        console.log('[BOOT] Loaded settings from settings.json (valid JSON).');
        global.settingsSource = 'settings.json';
        global.settings = settings;
        return settings;
      } catch (errJson) {
        // try to auto-clean and parse
        console.warn('[BOOT] settings.json parse error, attempting auto-clean. Error:', errJson.message || errJson);
        const bak = backupFile(SETTINGS_JSON);
        try {
          const cleaned = cleanJsonLike(raw);
          settings = JSON.parse(cleaned);
          // overwrite with cleaned JSON (safe)
          fs.writeFileSync(SETTINGS_JSON, JSON.stringify(settings, null, 2), 'utf8');
          console.log('[BOOT] Cleaned and wrote back settings.json (original backed up):', bak);
          global.settingsSource = 'settings.json (cleaned)';
          global.settings = settings;
          return settings;
        } catch (errClean) {
          console.error('[BOOT] Failed to auto-clean settings.json. Restoring backup if any. Error:', errClean);
          // restore backup if parse failed (we already backed up original)
          if (bak) {
            try { fs.copyFileSync(bak, SETTINGS_JSON); console.log('[BOOT] Restored original settings.json from backup.'); } catch (e) {}
          }
        }
      }
    }
  } catch (e) {
    console.error('[BOOT] Failed reading settings.json fallback', e);
  }

  // 3) No settings found — create safe defaults (no JSON for settings required)
  console.warn('[BOOT] No usable settings.js or valid settings.json found. Using default empty settings object.');
  settings = {};
  global.settingsSource = 'defaults';
  global.settings = settings;
  return settings;
}

// run loader now
try {
  const s = loadSettings();
  // expose convenient aliases
  global.settings = global.settings || s || {};
  // expose common keys individually for legacy code if they exist
  if (global.settings && typeof global.settings === 'object') {
    Object.keys(global.settings).forEach(k => {
      if (typeof global[k] === 'undefined') global[k] = global.settings[k];
    });
  }
} catch (e) {
  console.error('[BOOT] Unexpected error loading settings', e);
  global.settings = {};
}

// ensure connectedUsers persistence path exists and helper functions
const connectedUsersFilePath = path.join(__dirname, 'connected_users.json');
global.connectedUsersFilePath = connectedUsersFilePath;
if (typeof global.connectedUsers === 'undefined') global.connectedUsers = {};

// loadConnectedUsers safe function (no crash)
function loadConnectedUsersSafe() {
  try {
    if (fs.existsSync(global.connectedUsersFilePath)) {
      const raw = fs.readFileSync(global.connectedUsersFilePath, 'utf8');
      try {
        global.connectedUsers = JSON.parse(raw || '{}');
      } catch(e) {
        console.warn('[BOOT] connected_users.json invalid JSON — backing up and resetting');
        backupFile(global.connectedUsersFilePath);
        global.connectedUsers = {};
        fs.writeFileSync(global.connectedUsersFilePath, JSON.stringify(global.connectedUsers, null, 2), 'utf8');
      }
    } else {
      fs.writeFileSync(global.connectedUsersFilePath, JSON.stringify({}), 'utf8');
      global.connectedUsers = {};
    }
  } catch (e) {
    console.error('[BOOT] loadConnectedUsersSafe failed', e);
    global.connectedUsers = {};
  }
}
loadConnectedUsersSafe();

function saveConnectedUsersSafe() {
  try {
    fs.writeFileSync(global.connectedUsersFilePath, JSON.stringify(global.connectedUsers || {}, null, 2), 'utf8');
  } catch (e) {
    console.error('[BOOT] saveConnectedUsersSafe failed', e);
  }
}
// expose if not defined
if (typeof saveConnectedUsers !== 'function') global.saveConnectedUsers = saveConnectedUsersSafe;

console.log('[BOOT] Settings loader finished. Source:', global.settingsSource);

const loli = {
  key: {
    fromMe: false,
    participant: "13135550002@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    orderMessage: {
      orderId: "2009",
      thumbnail: cina,
      itemCount: "9741",
      status: "INQUIRY",
      surface: "CATALOG",
      message: `Sender : @${m.sender.split('@')[0]}\nCommand : ${command}`,
      token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="
    }
  },
  contextInfo: {
    mentionedJid: ["12036336951410522@s.whatsapp.net"],
    forwardingScore: 999,
    isForwarded: true,
  }
}
//========================================================\\
// ---------- Settings & paths bootstrap (paste at top of your main file) ----------

// ensure both names are defined (some code used SETTING_FILE vs SETTINGS_FILE)
// ---------- antispam + antimedia runtime (paste BEFORE switch) ----------
try {
  // normalize basics
  const chatId = from;
  const sender = m.sender || (m.key && m.key.participant) || '';
  const cfgSpam = getSpamConfig(chatId);
  const cfgMedia = getAntimediaConfig(chatId);

  // determine whether this is group or dm
  const isGroupMsg = !!isGroup;
  const spamModeActive = (isGroupMsg && cfgSpam.modeGroup === 'on') || (!isGroupMsg && cfgSpam.modeDM === 'on');
  const mediaModeActive = (isGroupMsg && cfgMedia.group === 'on') || (!isGroupMsg && cfgMedia.dm === 'on');

  // always ignore owners & admins & bot
  const senderIsProtected = await isProtected(sender) || isOwner || isAdmins || isBotAdmins;
  if (senderIsProtected) {
    // reset spam records for owner/admin if desired (not necessary)
  } else {
    // ---------- ANTISPAM ----------
    if (spamModeActive) {
      try {
        const now = Date.now();
        // keep timestamps array per sender
        cfgSpam.records = cfgSpam.records || {};
        cfgSpam.records[sender] = cfgSpam.records[sender] || [];
        // purge old timestamps outside window
        cfgSpam.records[sender] = cfgSpam.records[sender].filter(ts => now - ts <= (cfgSpam.windowMs || 60000));
        // add current
        cfgSpam.records[sender].push(now);
        // persist occasionally (only when counts change)
        saveJsonSafe(ANTISPAM_FILE, global.antispamSettings);

        // evaluate
        const count = cfgSpam.records[sender].length || 0;
        if (count > (cfgSpam.threshold || 5)) {
          // action: delete offending message and warn
          try {
            const deleted = await tryDeleteMessage(james, chatId, m.key);
            // send a warning message in chat (unless you prefer silent)
            if (deleted) {
              try { await james.sendMessage(chatId, { text: `⚠️ AntiSpam: <@${sender.split('@')[0]}> messages deleted (spam).`, mentions: [sender] }); }
              catch (e) { console.warn('[antispam] warn send failed', e); }
            } else {
              try { await james.sendMessage(chatId, { text: `⚠️ AntiSpam detected for <@${sender.split('@')[0]}> but failed to delete message.`, mentions: [sender] }); }
              catch (e) {}
            }
            // optionally escalate: remove user (requires isBotAdmins)
            // if escalation wanted, you can implement here.
            // clear records for this user to avoid repeated immediate deletes
            cfgSpam.records[sender] = [];
            saveJsonSafe(ANTISPAM_FILE, global.antispamSettings);
          } catch (e) {
            console.error('[antispam] action error', e);
          }
        }
      } catch (e) { console.error('[antispam] runtime error', e); }
    }

    // ---------- ANTIMEDIA ----------
    if (mediaModeActive) {
      try {
        // detect media types
        const mime = (m.msg && (m.msg.mimetype || m.msg.mediaType)) || (m.mtype || '') || '';
        // shapes: m.message.imageMessage, videoMessage, stickerMessage, documentMessage, audioMessage
        const hasImage = !!m.message?.imageMessage || /image\/.*/i.test(mime);
        const hasVideo = !!m.message?.videoMessage || /video\/.*/i.test(mime);
        const hasSticker = !!m.message?.stickerMessage;
        const hasAudio = !!m.message?.audioMessage || /audio\/.*/i.test(mime);
        const hasDocument = !!m.message?.documentMessage;
        const hasAnyMedia = hasImage || hasVideo || hasSticker || hasAudio || hasDocument;

        if (hasAnyMedia) {
          // delete and notify (or silent) — we delete author message
          try {
            const didDelete = await tryDeleteMessage(james, chatId, m.key);
            if (didDelete) {
              try { await james.sendMessage(chatId, { text: `⛔ AntiMedia: Media from <@${sender.split('@')[0]}> removed.`, mentions: [sender] }); }
              catch (e) {}
            } else {
              try { await james.sendMessage(chatId, { text: `⛔ AntiMedia detected but failed to delete media from <@${sender.split('@')[0]}>`, mentions: [sender] }); }
              catch (e) {}
            }
          } catch (e) { console.error('[antimedia] action error', e); }
        }
      } catch (e) { console.error('[antimedia] runtime error', e); }
    }
  }
} catch (watchErr) {
  console.error('[antispam/antimedia watcher] unexpected', watchErr);
}
// ---------- end watcher ----------

if (typeof global.autoread_gc === 'undefined' || typeof global.autoread_dm === 'undefined') {
  // default values
  global.autoread_gc = false;
  global.autoread_dm = false;
}

// load persisted settings if present
try {
  if (fs.existsSync(SETTINGS_FILE)) {
    const raw = fs.readFileSync(SETTINGS_FILE, 'utf8');
    const parsed = JSON.parse(raw || '{}');
    if (typeof parsed.autoread_gc === 'boolean') global.autoread_gc = parsed.autoread_gc;
    if (typeof parsed.autoread_dm === 'boolean') global.autoread_dm = parsed.autoread_dm;
  } else {
    // save defaults file
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify({
      autoread_gc: global.autoread_gc,
      autoread_dm: global.autoread_dm
    }, null, 2));
  }
} catch (e) {
  console.error('Failed to load/save bot_settings.json', e);
}
function saveSettings() {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify({
      autoread_gc: Boolean(global.autoread_gc),
      autoread_dm: Boolean(global.autoread_dm)
    }, null, 2));
  } catch (e) { console.error('Failed to save settings', e); }
}
// ---------- end settings loader ----------
// ---------- Auto-read runner (put near top of handler so it runs for every message) ----------
try {
  // skip if message is from bot itself
  if (m && m.key && !m.key.fromMe) {
    // group auto-read
    if (global.autoread_gc && m.isGroup) {
      (async () => {
        try {
          // Try multiple read APIs (some Baileys versions differ)
          if (typeof james.readMessages === 'function') {
            await james.readMessages([m.key]).catch(()=>{});
          } else if (typeof james.sendReadReceipt === 'function') {
            // sendReadReceipt(remoteJid, participant, messageIds)
            const participant = m.key.participant || m.sender || undefined;
            await james.sendReadReceipt(m.chat, participant, [m.key.id]).catch(()=>{});
          } else if (typeof james.sendReadStatus === 'function') {
            await james.sendReadStatus(m.chat, m.key).catch(()=>{});
          } else {
            // fallback: try to send presence update to mimic 'reading'
            if (typeof james.sendPresenceUpdate === 'function') {
              await james.sendPresenceUpdate('composing', m.chat).catch(()=>{});
              await new Promise(r => setTimeout(r, 500));
              await james.sendPresenceUpdate('paused', m.chat).catch(()=>{});
            }
          }
        } catch (e) {
          console.error('autoread_gc error', e);
        }
      })();
    }

    // dm auto-read (private chats)
    if (global.autoread_dm && !m.isGroup) {
      (async () => {
        try {
          if (typeof james.readMessages === 'function') {
            await james.readMessages([m.key]).catch(()=>{});
          } else if (typeof james.sendReadReceipt === 'function') {
            const participant = m.key.participant || m.sender || undefined;
            await james.sendReadReceipt(m.chat, participant, [m.key.id]).catch(()=>{});
          } else if (typeof james.sendReadStatus === 'function') {
            await james.sendReadStatus(m.chat, m.key).catch(()=>{});
          } else {
            if (typeof james.sendPresenceUpdate === 'function') {
              await james.sendPresenceUpdate('composing', m.chat).catch(()=>{});
              await new Promise(r => setTimeout(r, 500));
              await james.sendPresenceUpdate('paused', m.chat).catch(()=>{});
            }
          }
        } catch (e) {
          console.error('autoread_dm error', e);
        }
      })();
    }
  }
} catch (err) {
  console.error('auto-read runner top error', err);
}
// ---------- end auto-read runner ----------
// ---------- AutoReact listener (put after you calculate m, from, isGroup, etc.) ----------
try {
  // initialize flags if missing
  if (typeof global.autoReact_dm === 'undefined') global.autoReact_dm = false;
  if (typeof global.autoReact_group === 'undefined') global.autoReact_group = false;

  // emojis pool (customize)
  const reactEmojis = ['😁','🔥','😈','❤️','🤡','😎','🤖','💀','🤨','😄','⚡','👑','🗿','😱','👍','👌'];

  // only process real messages with keys
  if (m && m.key && !m.key.fromMe) {
    // do not react to status, protocol messages or notifications
    const isProtocol = m.mtype === 'protocolMessage' || m.message && m.message.protocolMessage;
    if (isProtocol) {
      // skip
    } else {
      // DM (private chat)
      if (!m.isGroup && global.autoReact_dm) {
        try {
          const emoji = reactEmojis[Math.floor(Math.random() * reactEmojis.length)];
          if (typeof james.sendMessage === 'function') {
            await james.sendMessage(m.chat, { react: { text: emoji, key: m.key } });
          }
        } catch (e) {
          console.error('autoReact_dm error', e);
        }
      }

      // GROUP
      if (m.isGroup && global.autoReact_group) {
        try {
          const emoji = reactEmojis[Math.floor(Math.random() * reactEmojis.length)];
          if (typeof james.sendMessage === 'function') {
            await james.sendMessage(m.chat, { react: { text: emoji, key: m.key } });
          }
        } catch (e) {
          console.error('autoReact_group error', e);
        }
      }
    }
  }
} catch (errAutoReact) {
  console.error('AutoReact listener top error', errAutoReact);
}
// ---------- end AutoReact ----------
// ---------- Presence & simple auto-actions ----------
try {
  // ensure globals exist and are boolean
  if (typeof global.autoRecording === 'undefined') global.autoRecording = false;
  if (typeof global.autoTyping === 'undefined') global.autoTyping = false;
  if (typeof global.autorecordtype === 'undefined') global.autorecordtype = false;
  if (typeof global.autoswview === 'undefined') global.autoswview = false;

  // send presence updates according to flags (single call each message)
  if (global.autorecordtype) {
    // choose randomly between 'recording' and 'composing'
    const modes = ['recording', 'composing'];
    const pick = modes[Math.floor(Math.random() * modes.length)];
    if (typeof james.sendPresenceUpdate === 'function') {
      try { await james.sendPresenceUpdate(pick, from); } catch (e) { console.error('presence err', e); }
    }
  } else {
    if (global.autoRecording) {
      if (typeof james.sendPresenceUpdate === 'function') {
        try { await james.sendPresenceUpdate('recording', from); } catch (e) { console.error('presence err', e); }
      }
    }
    if (global.autoTyping) {
      if (typeof james.sendPresenceUpdate === 'function') {
        try { await james.sendPresenceUpdate('composing', from); } catch (e) { console.error('presence err', e); }
      }
    }
  }
// ------------- Autoblock runtime watcher (paste BEFORE switch) -------------
try {
  // only consider direct messages (not groups), and only if enabled
  if (!m?.isGroup && global.autoblockSettings && global.autoblockSettings.enabled) {
    const senderJid = m.sender || (m.key && m.key.participant) || '';
    // safety: if protected, ignore
    if (isProtectedJid(senderJid)) {
      // do nothing for owners/whitelist/bot
    } else {
      // avoid blocking same jid repeatedly within short time (cache 60s)
      const last = global.autoblockSettings.blockedCache[senderJid] || 0;
      const now = Date.now();
      if (now - last < 60 * 1000) {
        // recently processed — skip
      } else {
        // mark processed now
        global.autoblockSettings.blockedCache[senderJid] = now;
        // perform block based on mode
        (async () => {
          try {
            const mode = (global.autoblockSettings.mode || 'silent').toLowerCase();
            // notify then block, or silent block
            if (mode === 'notify') {
              try {
                // non-spam short notification; do not await too long
                await james.sendMessage(senderJid, { text: `You have been blocked by this bot (auto-block).` });
              } catch (e) {
                // ignore send errors (user may have privacy settings)
              }
            }
            // perform block; Baileys exposes updateBlockStatus(jid, action)
            try {
              if (typeof james.updateBlockStatus === 'function') {
                await james.updateBlockStatus(senderJid, 'block');
              } else if (typeof james.updateBlockStatus === 'undefined' && typeof james.contactBlock === 'function') {
                // older wrappers sometimes expose contactBlock
                await james.contactBlock(senderJid);
              } else {
                // fallback: try to call relay/protocol (best-effort)
                console.warn('[autoblock] no known block function on james. Skipping actual block — implement james.updateBlockStatus');
              }
            } catch (e) {
              console.error('[autoblock] block call failed', e?.message || e);
            }
          } catch (eRun) {
            console.error('[autoblock runtime] inner error', eRun);
          }
        })();
      }
    }
  }
} catch (e) {
  console.error('[autoblock watcher] unexpected error', e);
}
// ------------- end watcher -------------
  // ─── AUTO STATUS LIKE/VIEW handled by dedicated listener above ───────────────

  // simple auto status view toggle (if enabled, you may implement view logic elsewhere)
  // autoswview flag is available for other handlers you might add

  // Example group mention reaction (replace number with the one you want)
  if (m.isGroup) {
    // check for mention of specific number (normalize to without + or spaces)
    const mentionNumber = '254704955033'; // change if needed
    if (body && body.includes(`@${mentionNumber}`)) {
      // only call reaction if function exists
      if (typeof reaction === 'function') {
        try { reaction(m.chat, "❓"); } catch (e) { console.error('reaction error', e); }
      } else {
        // fallback: send a small reaction message (non-intrusive)
        try { await james.sendMessage(m.chat, { text: "❓my owner spectre ii was tagged and i dislike it , please behave" }, { quoted: m }); } catch (e) {}
      }
    }
  }
} catch (ePresence) {
  console.error('presence handler error:', ePresence);
}
// ---------- end presence ----------
const replbbby = {
key: {
remoteJid: 'status@broadcast',
fromMe: false,
participant: '0@s.whatsapp.net'
},
message: {
newsletterAdminInviteMessage: {
newsletterJid: `120363404552894723@newsletter`,
newsletterName: `รקєςtгє II`,
jpegThumbnail: "https://files.catbox.moe/tk1xpz.jpeg",
caption: 'fuck you',
inviteExpiration: Date.now() + 1814400000
}
}}

const replyFwd = async(subject) => { 
james.sendMessage(m.chat, { text : subject,
contextInfo: {
mentionedJid: [m.sender],
forwardingScore: 9999, 
isForwarded: true, 
forwardedNewsletterMessageInfo: {
newsletterJid: '120363420443898159@newsletter',
serverMessageId: 20,
newsletterName: 'CYBER-XMD'
},
externalAdReply: {
title: "CYBER-XMD", 
body: "",
thumbnailUrl: "https://files.catbox.moe/tk1xpz.jpeg", 
sourceUrl: null,
mediaType: 1
}}}, { quoted : loli })
}
function stylishReply(text) {
    return `${text}`;
}
const reply = (text) => james.sendMessage(from, { text: stylishReply(text) }, { quoted: m });
const love = fs.readFileSync('./media/love.jpeg')
const face = fs.readFileSync('./media/face.jpeg')


async function reply2(text) {
            james.sendMessage(m.chat, {
                text: text,
                contextInfo: {
                    mentionedJid: [sender],
                    externalAdReply: {
                        title:"CYBERPUNK-BULLY",
                        body:"by sudo",
                        thumbnailUrl: "https://files.catbox.moe/tk1xpz.jpeg",
                        sourceUrl: "https://t.me/sudo",
                        renderLargerThumbnail: false,
                    }
                }
            }, { quoted:m})
        }
        
        
// ════════════════════════════════════════════════
// ── MUTE RUNTIME: delete messages from muted users
// ════════════════════════════════════════════════
try {
  if (m?.isGroup && !m.key.fromMe) {
    const muteTarget = m.sender || m.key?.participant || '';
    if (muteTarget && isMuted(from, muteTarget) && !isOwner && !isAdmins) {
      // Bot must be admin to delete
      if (isBotAdmins) {
        try {
          await james.sendMessage(from, { delete: m.key });
        } catch (e1) {
          try {
            await james.sendMessage(from, { protocolMessage: { key: m.key, type: 0 } });
          } catch (e2) {
            console.warn('[mute] delete failed:', e2?.message || e2);
          }
        }
      }
      return; // Don't process further
    }
  }
} catch (muteErr) {
  console.error('[mute runtime] unexpected:', muteErr?.message || muteErr);
}
// ── end mute runtime ──

// ─── AURA TRACKING: count every group message ────────────────────────────────
try {
  if (m?.isGroup && !m?.key?.fromMe && sender && from) {
    const _gAura = global.jamesAuraData[from];
    if (_gAura && _gAura.enabled) {
      if (!_gAura.members) _gAura.members = {};
      if (!_gAura.members[sender]) _gAura.members[sender] = { messages: 0, lastMessage: 0, name: '' };
      _gAura.members[sender].messages++;
      _gAura.members[sender].lastMessage = Date.now();
      _gAura.members[sender].name = (pushname || sender.split('@')[0] || '').slice(0, 30);
      if (_gAura.members[sender].messages % 20 === 0) _saveAura();
    }
  }
} catch(_auraErr) { /* noop */ }
// ─── END AURA TRACKING ───────────────────────────────────────────────────────

// ─── ANTIDELETE RUNTIME INTERCEPTOR ─────────────────────────────────────────
// Registers TWO listeners ONCE: messages.upsert (cache) + messages.update (recover)
// Supports text, image, video, audio, sticker, document, voice/PTT
const _adMediaTypes = ['image', 'video', 'audio', 'sticker', 'document'];

async function _adDownloadMedia(message) {
  if (!message) return null;
  // Voice/PTT first
  if (message.audioMessage?.ptt) {
    try {
      const stream = await downloadContentFromMessage(message.audioMessage, 'audio');
      const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      return { buffer: Buffer.concat(chunks), type: 'audio', mimetype: message.audioMessage.mimetype };
    } catch {}
  }
  for (const t of _adMediaTypes) {
    const mediaMsg = message[`${t}Message`];
    if (!mediaMsg) continue;
    try {
      const stream = await downloadContentFromMessage(mediaMsg, t);
      const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      return { buffer: Buffer.concat(chunks), type: t, mimetype: mediaMsg.mimetype };
    } catch {}
  }
  return null;
}

if (!global._antideleteListenerRegistered) {
  global._antideleteListenerRegistered = true;

  global._antideleteRegisterListener = (conn) => {
    if (global._antideleteListenerAttached) return;
    global._antideleteListenerAttached = true;

    // ── 1) Cache every incoming message (text + media buffer) ────────────────
    //       Also: auto-view + auto-like status@broadcast messages
    conn.ev.on('messages.upsert', async ({ messages: uMsgs }) => {
      try {
        if (!uMsgs?.length) return;
        for (const msg of uMsgs) {
          if (msg.key.fromMe || !msg.message) continue;

          // ── AUTO STATUS VIEW + LIKE (status@broadcast) ───────────────────
          if (msg.key.remoteJid === 'status@broadcast') {
            const statusOwner = msg.key.participant || msg.sender || '';
            // Auto-view
            if (global.autostatusSettings?.enabled) {
              const onlyFrom = Array.isArray(global.autostatusSettings.onlyFrom) ? global.autostatusSettings.onlyFrom : [];
              const norm = jid => String(jid || '').split('@')[0];
              const shouldView = !onlyFrom.length || onlyFrom.some(s => norm(s) === norm(statusOwner));
              if (shouldView) {
                try {
                  if (typeof conn.readMessages === 'function') {
                    await conn.readMessages([msg.key]).catch(() => {});
                  } else if (typeof conn.sendReadReceipt === 'function') {
                    await conn.sendReadReceipt('status@broadcast', statusOwner, msg.key.id).catch(() => {});
                  } else {
                    await markStatusAsRead(conn, msg.key).catch(() => {});
                  }
                } catch(e) { console.error('[antidelete+autostatus view]', e?.message || e); }
                // Auto-like
                if (global.autostatusSettings?.likeEnabled && statusOwner) {
                  const likeEmojis = ['❤️','🔥','😍','👏','😮','🥰','👌','💯','🤩','✨'];
                  const emoji = likeEmojis[Math.floor(Math.random() * likeEmojis.length)];
                  setTimeout(async () => {
                    try {
                      await conn.sendMessage('status@broadcast', {
                        react: { text: emoji, key: msg.key }
                      }).catch(() => {});
                    } catch(e) { /* noop */ }
                  }, 1500 + Math.random() * 3000);
                }
              }
            }
            // Also cache status messages for antidelete recovery
            if (global.antideleteSettings?.enabled) {
              const content =
                msg.message.conversation                 ||
                msg.message.extendedTextMessage?.text    ||
                msg.message.imageMessage?.caption        ||
                msg.message.videoMessage?.caption        ||
                msg.message.documentMessage?.caption     || '';
              let media = null;
              try { media = await _adDownloadMedia(msg.message); } catch {}
              const entry = {
                key:     msg.key,
                from:    msg.key.remoteJid,
                sender:  statusOwner,
                pushname: '',
                type:    Object.keys(msg.message)[0] || 'unknown',
                content,
                caption: msg.message?.imageMessage?.caption || msg.message?.videoMessage?.caption || '',
                media,
                time:    Date.now(),
                isStatus: true
              };
              if (!Array.isArray(global.antideleteSettings.inbox)) global.antideleteSettings.inbox = [];
              const exists = global.antideleteSettings.inbox.some(e => e.key?.id === msg.key.id);
              if (!exists) {
                global.antideleteSettings.inbox.push(entry);
                if (global.antideleteSettings.inbox.length > 100) global.antideleteSettings.inbox.shift();
              }
            }
            continue; // done with this status message
          }

          // ── CACHE GROUP + DM MESSAGES for antidelete ─────────────────────
          if (!global.antideleteSettings?.enabled) continue;
          const isGrp = msg.key.remoteJid.endsWith('@g.us');
          if (isGrp  && !global.antideleteSettings.groups) continue;
          if (!isGrp && !global.antideleteSettings.dm)     continue;
          const content =
            msg.message.conversation                 ||
            msg.message.extendedTextMessage?.text    ||
            msg.message.imageMessage?.caption        ||
            msg.message.videoMessage?.caption        ||
            msg.message.documentMessage?.caption     || '';
          let media = null;
          try { media = await _adDownloadMedia(msg.message); } catch {}
          const entry = {
            key:     msg.key,
            from:    msg.key.remoteJid,
            sender:  msg.key.participant || msg.key.remoteJid,
            pushname: '',
            type:    Object.keys(msg.message)[0] || 'unknown',
            content,
            caption: msg.message?.imageMessage?.caption || msg.message?.videoMessage?.caption || '',
            media,
            time:    Date.now()
          };
          if (!Array.isArray(global.antideleteSettings.inbox)) global.antideleteSettings.inbox = [];
          global.antideleteSettings.inbox.push(entry);
          if (global.antideleteSettings.inbox.length > 100) global.antideleteSettings.inbox.shift();
        }
      } catch (e) { console.error('[antidelete upsert]', e?.message || e); }
    });

    // ── 2) Detect deletes and recover message ────────────────────────────────
    conn.ev.on('messages.update', async (updates) => {
      try {
        if (!global.antideleteSettings?.enabled) return;
        if (!updates?.length) return;
        for (const update of updates) {
          const { key, update: upd } = update;
          // Catch both proto revoke (type 0) and stub/status DELETED
          const isRevoke =
            upd?.message?.protocolMessage?.type === 0 ||
            upd?.messageStubType === proto.WebMessageInfo.StubType.REVOKE ||
            upd?.status          === proto.WebMessageInfo.Status.DELETED;
          if (!isRevoke || key.fromMe) continue;
          const chatJid = key.remoteJid;
          const isGrp   = chatJid?.endsWith('@g.us');
          const isStatus = chatJid === 'status@broadcast';
          // For group/DM check scope settings; status always allowed if antidelete enabled
          if (!isStatus) {
            if (isGrp  && !global.antideleteSettings.groups) continue;
            if (!isGrp && !global.antideleteSettings.dm)     continue;
          }
          // Find cached entry
          const deletedId = upd?.message?.protocolMessage?.key?.id || key.id;
          const inbox     = global.antideleteSettings.inbox || [];
          const entry     = inbox.find(e => e.key?.id === deletedId && e.from === chatJid);
          if (!entry) continue;
          // Remove from inbox after recovery
          global.antideleteSettings.inbox = global.antideleteSettings.inbox.filter(e => e !== entry);
          // Build info strings
          const ownerJid   = (global.owner?.[0] || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
          const senderNum  = String(entry.sender || '?').split('@')[0];
          const deleterNum = String(
            upd?.message?.protocolMessage?.key?.participant ||
            upd?.participant || key.participant || chatJid || '?'
          ).split('@')[0];
          const sentStr    = new Date(entry.time).toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' });
          const delStr     = new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' });
          const typeName   = (entry.type || 'Message').replace('Message', '').trim() || 'Text';
          const chatLabel  = isStatus ? 'Status Update' : isGrp ? chatJid : 'DM';
          const header =
            `🗑️ *RECOVERED DELETED ${typeName.toUpperCase()}*\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `👤 *Sender:*     +${senderNum}\n` +
            `🗡️ *Deleted by:* +${deleterNum}\n` +
            `💬 *Chat:*       ${chatLabel}\n` +
            `⏰ *Sent:*       ${sentStr}\n` +
            `🕰️ *Deleted:*    ${delStr}\n` +
            `━━━━━━━━━━━━━━━━━━━━`;
          try {
            // ── Send recovered message ONLY to owner inbox (not back to original chat) ──
            if (!ownerJid || ownerJid.startsWith('@')) continue; // skip if owner not set
            if (entry.media?.buffer) {
              // Forward full media + caption to owner DM
              await conn.sendMessage(ownerJid, {
                [entry.media.type]: entry.media.buffer,
                mimetype: entry.media.mimetype,
                caption:  header + (entry.content || entry.caption ? `\n\n📝 *Content:* ${entry.content || entry.caption}` : '')
              }).catch(() => {});
            } else {
              const txt = entry.content || entry.caption
                ? `${header}\n\n📝 *Content:* ${entry.content || entry.caption}`
                : header;
              await conn.sendMessage(ownerJid, { text: txt }).catch(() => {});
            }
            // ── If recovered message was a status, also auto-view + auto-like it ──
            if (isStatus && entry.sender) {
              if (global.autostatusSettings?.enabled) {
                const onlyFrom = Array.isArray(global.autostatusSettings.onlyFrom) ? global.autostatusSettings.onlyFrom : [];
                const norm = jid => String(jid || '').split('@')[0];
                const shouldView = !onlyFrom.length || onlyFrom.some(s => norm(s) === norm(entry.sender));
                if (shouldView) {
                  try {
                    if (typeof conn.readMessages === 'function') {
                      await conn.readMessages([entry.key]).catch(() => {});
                    } else {
                      await markStatusAsRead(conn, entry.key).catch(() => {});
                    }
                  } catch(e) { /* noop */ }
                  if (global.autostatusSettings?.likeEnabled) {
                    const likeEmojis = ['❤️','🔥','😍','👏','😮','🥰','👌','💯','🤩','✨'];
                    const emoji = likeEmojis[Math.floor(Math.random() * likeEmojis.length)];
                    setTimeout(async () => {
                      try {
                        await conn.sendMessage('status@broadcast', {
                          react: { text: emoji, key: entry.key }
                        }).catch(() => {});
                      } catch(e) { /* noop */ }
                    }, 1500 + Math.random() * 3000);
                  }
                }
              }
            }
          } catch (e) { console.error('[antidelete fwd]', e?.message || e); }
        }
      } catch (e) { console.error('[antidelete update]', e?.message || e); }
    });
  };
}
// Register listeners now using the current james reference
try { if (james && james.ev && typeof global._antideleteRegisterListener === 'function') global._antideleteRegisterListener(james); } catch(e) {}

// Cache current incoming message (per-handler, for pushname + body already resolved)
try {
  if (global.antideleteSettings && global.antideleteSettings.enabled && m && m.mtype && !m.key.fromMe) {
    const isGroupMsg = !!isGroup;
    const shouldCapture = (isGroupMsg && global.antideleteSettings.groups) ||
                          (!isGroupMsg && global.antideleteSettings.dm);
    if (shouldCapture) {
      let adMedia = null;
      try { adMedia = await _adDownloadMedia(m.message); } catch {}
      const entry = {
        key:     m.key,
        from,    sender,    pushname,
        type:    m.mtype || '',
        content: body || m.text || '',
        caption: m.message?.imageMessage?.caption || m.message?.videoMessage?.caption || '',
        media:   adMedia,
        time:    Date.now()
      };
      if (!Array.isArray(global.antideleteSettings.inbox)) global.antideleteSettings.inbox = [];
      // Avoid duplicate (already cached by upsert listener above)
      const exists = global.antideleteSettings.inbox.some(e => e.key?.id === m.key.id);
      if (!exists) {
        global.antideleteSettings.inbox.push(entry);
        if (global.antideleteSettings.inbox.length > 100) global.antideleteSettings.inbox.shift();
      }
    }
  }
} catch(adErr) { /* noop */ }

// ─── VIEW-ONCE: no background capture needed — vvi downloads on-demand ────────

switch (command) {

 // ============================================
// รקєςtгє II - MULTIPLE MENU SYSTEM
// ============================================
// Copy all these cases into your bot's command handler

case "menu": {
    let mainMenu = `${readmore}
╭────────────────────╮
│      CYBERPUNK-BULLY
├────────────────────┤
│ 👤 ᴜꜱᴇʀ : ${pushname}
│ 🔧 ʜᴏꜱᴛ : Andromedaxs 
│ 📢 ᴜᴘᴅᴀᴛᴇꜱ : t.me/cyberpunkbully
│ 📁 ᴠᴇʀꜱɪᴏɴ : II
╰────────────────────╯

╭────────────────────
│ .ɪɴꜰᴏᴍᴇɴᴜ 
│ .ᴏᴡɴᴇʀᴍᴇɴᴜ 
│ .ᴅᴇᴠᴍᴇɴᴜ 
│ .ᴜᴛɪʟᴍᴇɴᴜ 
│ .ᴅᴏᴡɴʟᴏᴀᴅᴍᴇɴᴜ 
│ .ɢʀᴏᴜᴘᴍᴇɴᴜ 
│ .ɴᴇᴡᴍᴇɴᴜ
│ .ꜰᴜɴᴍᴇɴᴜ
│ .ɴᴇᴛᴍᴇɴᴜ
│ .ᴛᴏᴏʟꜱᴍᴇɴᴜ
│ .ɪɴʙᴏxᴍᴇɴᴜ
│ .ᴇxᴛʀᴀᴍᴇɴᴜ
╰────────────────────
`

    await james.sendMessage(m.chat, {
        text: mainMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "CYBERPUNK-BULLY",
                body: "by sudo",
                mediaType: 1,
                thumbnailUrl: "https://files.catbox.moe/rklhyy.jpeg",
                sourceUrl: "https://t.me/cyberpunkbully",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;


case "allmenu": {
    let mainMenu = `${readmore}
╭────────────────────╮
│      CYBERPUNK-BULLY
├────────────────────┤
│ 👤 ᴜꜱᴇʀ : ${pushname}
│ 🔧 ʜᴏꜱᴛ : Cyberpunk 
│ 📢 ᴜᴘᴅᴀᴛᴇꜱ : t.me/cyberpunkbully
│ 📁 ᴠᴇʀꜱɪᴏɴ : II
╰────────────────────╯

╭────────────────────
│  📌 INFO
├────────────────────
│  ✦ repo
│  ✦ sc
│  ✦ credits
╰────────────────────

╭────────────────────
│  👑 OWNER CONTROLS
├────────────────────
│  ✦ autoblock
│  ✦ antispam
│  ✦ self
│  ✦ public
│  ✦ >
│  ✦ autoreply
│  ✦ antidelete
│  ✦ block
│  ✦ unblock
│  ✦ autorecording
│  ✦ autotyping
│  ✦ autorecordtype
│  ✦ autoswview
│  ✦ autoreact
│  ✦ autostatus
│  ✦ antimedia
│  ✦ autobio
│  ✦ autoread
│  ✦ autopp
│  ✦ welcome
╰────────────────────

╭────────────────────
│  💻 DEV TOOLS
├────────────────────
│  ✦ fetch
│  ✦ eval
│  ✦ inspect
│  ✦ encrypt
│  ✦ getfile
╰────────────────────

╭────────────────────
│  🛠️ UTIL TOOLS
├────────────────────
│  ✦ ping
│  ✦ owner
│  ✦ script
│  ✦ runtime
╰────────────────────

╭────────────────────
│  📥 DOWNLOADS & FUN
├────────────────────
│  ✦ play
│  ✦ play2
│  ✦ spotify
│  ✦ ai
│  ✦ tourl
│  ✦ shorturl
│  ✦ tiny
│  ✦ idch
│  ✦ toimage
│  ✦ toimg
│  ✦ removebg
│  ✦ facebook
│  ✦ tiktok / tt
│  ✦ ig / instagram
│  ✦ sticker
│  ✦ stickerwm
╰────────────────────

╭────────────────────
│  👥 GROUP COMMANDS
├────────────────────
│  ✦ kick
│  ✦ listonline
│  ✦ listdead
│  ✦ listghosts
│  ✦ listghostviewers
│  ✦ kickdead
│  ✦ promoteall
│  ✦ demoteall
│  ✦ kickall2
│  ✦ getgroupdp
│  ✦ antispam
│  ✦ group open|close
│  ✦ group opentime <minutes>
│  ✦ group changename <name>
│  ✦ group setdp (reply to image)
│  ✦ group setdesc <text>
│  ✦ group link
│  ✦ group revoke
│  ✦ group info
│  ✦ hidetag
│  ✦ tagall
│  ✦ antimedia
│  ✦ promote
│  ✦ demote
│  ✦ antilink
│  ✦ warn
│  ✦ warnlist
│  ✦ resetwarn
│  ✦ poll
│  ✦ mute / unmute
│  ✦ mutelist
╰────────────────────

╭────────────────────
│  🌟 AURA SYSTEM
├────────────────────
│  ✦ aura on/off
│  ✦ aura status
│  ✦ aura reset
│  ✦ auraboard
│  ✦ aurastat [@user]
╰────────────────────

╭────────────────────
│  🎮 EXTRA COMMANDS
├────────────────────
│  ✦ 8ball 
│  ✦ ask
│  ✦ flip
│  ✦ dice 
│  ✦ choose
│  ✦ truth 
│  ✦ dare 
│  ✦ wyr 
│  ✦ roast 
│  ✦ compliment
│  ✦ joke 
│  ✦ riddle 
│  ✦ answer 
│  ✦ funfact
│  ✦ rate 
│  ✦ ship 
│  ✦ quote 
│  ✦ horoscope 
│  ✦ fakenews
│  ✦ calc 
│  ✦ percent 
│  ✦ temp 
│  ✦ convert 
│  ✦ genpass
│  ✦ wordcount 
│  ✦ reverse 
│  ✦ upper 
│  ✦ lower 
│  ✦ morse
│  ✦ encode 
│  ✦ decode 
│  ✦ clap 
│  ✦ aesthetic 
│  ✦ bubble
│  ✦ smallcaps 
│  ✦ banner 
│  ✦ lorem 
│  ✦ rng 
│  ✦ countdown
│  ✦ warn 
│  ✦ warnlist 
│  ✦ resetwarn 
│  ✦ votekick
│  ✦ getpp 
│  ✦ groupinfo 
│  ✦ note 
│  ✦ getnote 
│  ✦ delnote
│  ✦ anon 
│  ✦ broadcast 
│  ✦ report 
│  ✦ setstatus
│  ✦ antisimp 
│  ✦ ping 
│  ✦ status 
│  ✦ owner
│  ✦ cyberbully
╰────────────────────

╭────────────────────
│  ⭐ NEW FEATURES
├────────────────────
│  ✦ fflux
│  ✦ genimg
│  ✦ quoteimg
│  ✦ inspiro
│  ✦ rvo
│  ✦ readviewonce
│  ✦ tiktok 
│  ✦ tt
│  ✦ ig 
│  ✦ instagram
│  ✦ warn 
│  ✦ warnlist 
│  ✦ resetwarn
│  ✦ poll
│  ✦ aura on/off
│  ✦ auraboard
│  ✦ aurastat
╰────────────────────
`

    await james.sendMessage(m.chat, {
        text: mainMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "CYBERPUNK-BULLY",
                body: "by sudo",
                mediaType: 1,
                thumbnailUrl: "https://files.catbox.moe/tk1xpz.jpeg",
                sourceUrl: "https://t.me/+-4jmRbsQY6JmZGJk",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

// ============================================
// IMPORTANT MENU
// ============================================
case "infomenu": {
    let importantMenu = `${readmore}
╭────────────────────╮
│      📌 INFO
╰────────────────────╯
│  ✦ repo
│  ✦ sc
│  ✦ credits
╰────────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: importantMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "CYBERPUNK-BULLY— Important",
                body: "Essential commands",
                mediaType: 1,
                thumbnailUrl: "https://files.catbox.moe/tk1xpz.jpeg",
                sourceUrl: "https://t.me/+-4jmRbsQY6JmZGJk",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

// ============================================
// OWNER MENU
// ============================================
case "ownermenu": {
    let ownerMenu = `${readmore}
╭────────────────────╮
│   👑 OWNER CONTROLS
╰────────────────────╯
│  ✦ autoblock
│  ✦ antispam
│  ✦ self
│  ✦ public
│  ✦ >
│  ✦ autoreply
│  ✦ antidelete on|off
│  ✦ antidelete group|dm on|off
│  ✦ antidelete inbox
│  ✦ vvi / vvinbox (reply to view-once)
│  ✦ rvo / readviewonce (reply to view-once)
│  ✦ block
│  ✦ unblock
│  ✦ autorecording
│  ✦ autotyping
│  ✦ autorecordtype
│  ✦ autoswview
│  ✦ autoreact
│  ✦ autostatus on|off
│  ✦ autostatus like on|off
│  ✦ autolike on|off
│  ✦ antimedia
│  ✦ autobio
│  ✦ autoread
│  ✦ autopp
│  ✦ welcome
╰────────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: ownerMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "Owner",
                body: "Admin & Owner only",
                mediaType: 1,
                thumbnailUrl: "https://files.catbox.moe/9m8z4i.jpeg",
                sourceUrl: "https://t.me/+-4jmRbsQY6JmZGJk",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

// ============================================
// DEVELOPER MENU
// ============================================
case "devmenu": {
    let devMenu = `${readmore}
╭────────────────────╮
│     💻 DEV TOOLS
╰────────────────────╯
│  ✦ fetch
│  ✦ eval
│  ✦ inspect
│  ✦ encrypt
│  ✦ getfile
╰────────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: devMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "Dev",
                body: "Developer tools — sudo",
                mediaType: 1,
                thumbnailUrl: "https://files.catbox.moe/rklhyy.jpeg",
                sourceUrl: "https://t.me/+-4jmRbsQY6JmZGJk",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

// ============================================
// UTILITY MENU
// ============================================
case "utilmenu": {
    let utilityMenu = `${readmore}
╭────────────────────╮
│    🛠️ UTIL TOOLS
╰────────────────────╯
│  ✦ ping
│  ✦ owner
│  ✦ script
│  ✦ runtime
╰────────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: utilityMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "Utility",
                body: "Helpful utility tools",
                mediaType: 1,
                thumbnailUrl: "https://files.catbox.moe/tk1xpz.jpeg",
                sourceUrl: "https://t.me/+-4jmRbsQY6JmZGJk",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

// ============================================
// DOWNLOAD & FUN MENU
// ============================================
case "downloadmenu": {
    let downloadMenu = `${readmore}
╭────────────────────╮
│  📥 DOWNLOADS & FUN
╰────────────────────╯
│  ✦ play
│  ✦ play2
│  ✦ spotify
│  ✦ ai
│  ✦ tourl
│  ✦ shorturl
│  ✦ tiny
│  ✦ idch
│  ✦ toimage
│  ✦ toimg
│  ✦ removebg
│  ✦ facebook
│  ✦ tiktok / tt
│  ✦ ig / instagram
│  ✦ sticker
│  ✦ stickerwm
╰────────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: downloadMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "Downloads",
                body: "Media & entertainment",
                mediaType: 1,
                thumbnailUrl: "https://files.catbox.moe/7dp07q.jpg",
                sourceUrl: "https://t.me/+-4jmRbsQY6JmZGJk",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

// ============================================
// GROUP MENU
// ============================================
case "groupmenu": {
    let groupMenu = `${readmore}
╭────────────────────╮
│   👥 GROUP COMMANDS
╰────────────────────╯
│  ✦ kick
│  ✦ listonline
│  ✦ listdead
│  ✦ listghosts
│  ✦ listghostviewers
│  ✦ kickdead
│  ✦ promoteall
│  ✦ demoteall
│  ✦ kickall2
│  ✦ getgroupdp
│  ✦ antispam
│  ✦ group open|close
│  ✦ group opentime <minutes>
���  ✦ group changename <name>
│  ✦ group setdp (reply to image)
│  ✦ group setdesc <text>
│  ✦ group link
│  ✦ group revoke
│  ✦ group info
│  ✦ hidetag
│  ✦ tagall
│  ✦ antimedia
│  ✦ promote
│  ✦ demote
│  ✦ antilink
│  ✦ warn
│  ✦ warnlist
│  ✦ resetwarn
│  ✦ poll
│  ✦ mute / unmute
│  ✦ mutelist
╰────────────────────╯
│   🌟 AURA SYSTEM
╰────────────────────
│  ✦ aura on/off
│  ✦ aura status
│  ✦ auraboard
│  ✦ aurastat [@user]
╰────────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: groupMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "Groups",
                body: "Group management",
                mediaType: 1,
                thumbnailUrl: "https://files.catbox.moe/tk1xpz.jpeg",
                sourceUrl: "https://t.me/+-4jmRbsQY6JmZGJk",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

// ============================================
// NEW COMMANDS MENU
// ============================================
case "newmenu": {
    let newMenu = `${readmore}
╭────────────────────╮
│    ⭐ NEW FEATURES
╰────────────────────╯
│  ✦ fflux
│  ✦ genimg
│  ✦ quoteimg
│  ✦ inspiro
│  ✦ rvo
│  ✦ readviewonce
│  ✦ tiktok / tt
│  ✦ ig / instagram
│  ✦ warn / warnlist / resetwarn
│  ✦ poll
│  ✦ aura on/off
│  ✦ auraboard
│  ✦ aurastat
╰────────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: newMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "Upcoming_New",
                body: "Latest features",
                mediaType: 1,
                thumbnailUrl: "https://files.catbox.moe/tk1xpz.jpeg",
                sourceUrl: "https://t.me/+-4jmRbsQY6JmZGJk",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

// ---------- Cases: .welcome on | off | status | setmsg | setimg ----------
case 'runtime':
case 'uptime': {
  try {
    const os = require('os');
    const util = require('util');
    const { performance } = require('perf_hooks'); // if speed isn't available use this
    // helper formatters
    const fmtBytes = (n) => {
      if (!n && n !== 0) return '0 B';
      const sizes = ['B','KB','MB','GB','TB'];
      if (n === 0) return '0 B';
      const i = Math.floor(Math.log(n) / Math.log(1024));
      return (n / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    };
    const fmtUptime = sec => {
      sec = Math.floor(sec);
      const d = Math.floor(sec / 86400); sec %= 86400;
      const h = Math.floor(sec / 3600); sec %= 3600;
      const m = Math.floor(sec / 60); sec %= 60;
      const s = sec;
      return `${d}d ${h}h ${m}m ${s}s`;
    };

    // build stats
    const buildStats = async () => {
      const ru = process.uptime();
      const mem = process.memoryUsage();
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const cpus = os.cpus();
      const cpuModel = cpus && cpus[0] ? cpus[0].model : 'unknown';
      const cpuCount = cpus ? cpus.length : 1;
      // quick CPU usage estimation (user/system times sum)
      const cpuTimes = cpus && cpus[0] ? cpus[0].times : null;
      const rss = fmtBytes(mem.rss);
      const heapUsed = fmtBytes(mem.heapUsed);
      const heapTotal = fmtBytes(mem.heapTotal);
      const external = fmtBytes(mem.external || 0);
      const nodeVer = process.version;
      const platform = `${os.type()} ${os.release()} (${os.platform()})`;
      const arch = os.arch();
      let latency = 'n/a';
      try {
        // use speed if available (your base had speed())
        if (typeof speed === 'function') {
          const t0 = speed();
          const t1 = speed();
          latency = `${Math.abs((t1 - t0) * 1000).toFixed(2)} ms`;
        } else {
          const t0 = performance.now();
          const t1 = performance.now();
          latency = `${(t1 - t0).toFixed(2)} ms`;
        }
      } catch (e) { latency = 'n/a'; }

      return (
`📊 *RUNTIME / UPTIME*
• Bot uptime: ${fmtUptime(ru)}
• Process RSS: ${rss}
• Heap: ${heapUsed} / ${heapTotal}
• External mem: ${external}
• System RAM: ${fmtBytes(totalMem - freeMem)} used / ${fmtBytes(totalMem)}
• CPUs: ${cpuCount} × ${cpuModel}
• Platform: ${platform} ${arch}
• Node: ${nodeVer}
• Latency: ${latency}
• Timestamp: ${new Date().toLocaleString()}`
      );
    };

    // send first message
    const initialText = await buildStats();
    let sent = await james.sendMessage(from, { text: initialText }, { quoted: m });

    // update loop: delete previous and send updated message (simulate edit)
    let updates = 3; // number of updates (1 per second). Change if you want more/less.
    const interval = setInterval(async () => {
      try {
        if (!sent || !sent.key) {
          // no previous message info — just send new
          const newText = await buildStats();
          sent = await james.sendMessage(from, { text: newText }, { quoted: m });
          updates--;
          if (updates <= 0) clearInterval(interval);
          return;
        }

        // Attempt deletion of previous message (try a few fallbacks)
        try {
          // Preferred method: send protocolMessage delete (works on many Baileys forks)
          await james.relayMessage(from, {
            protocolMessage: { key: sent.key, type: 0 }
          }, { messageId: generateMessageID() });
        } catch (e1) {
          try {
            // Some forks accept sendMessage with delete payload
            await james.sendMessage(from, { delete: sent.key });
          } catch (e2) {
            try {
              // If library exposes deleteMessage
              if (typeof james.deleteMessage === 'function') {
                await james.deleteMessage(from, { id: sent.key.id, remoteJid: from, fromMe: true });
              } else {
                // if all deletion attempts fail, just continue (we'll just send new message)
                console.warn('[runtime] delete fallback failed', e1, e2);
              }
            } catch (e3) {
              console.warn('[runtime] delete final fallback failed', e3);
            }
          }
        }

        // Send updated content
        const updatedText = await buildStats();
        sent = await james.sendMessage(from, { text: updatedText }, { quoted: m });
      } catch (upErr) {
        console.error('[runtime] update error', upErr);
        // if repeated errors, stop updates to avoid spamming
        updates = 0;
        clearInterval(interval);
      } finally {
        updates--;
        if (updates <= 0) clearInterval(interval);
      }
    }, 1000);

  } catch (err) {
    console.error('[runtime] error', err);
    try { reply('❌ Failed to fetch runtime.'); } catch(e){}
  }
}
break;
case 'welcome': {
  if (!isOwner && !isBotAdmins) {
    // allow owner OR group admins? adjust as needed. Here: owner only to toggle to avoid misuse.
    if (!isOwner) return reply('Only the bot owner can change global welcome toggles.');
  }

  const sub = (args[0] || '').toLowerCase();
  // usage: .welcome on/off/status
  if (!sub || !['on','off','status','setmsg','setimg'].includes(sub)) {
    return reply('Usage:\n.welcome on\n.welcome off\n.welcome status\n.welcome setmsg <message template>\n.welcome setimg on|off\n\nPlaceholders: {{user}}, {{user_mention}}, {{group}}, {{member_count}}');
  }

  // ensure per-chat object
  const chatCfg = global.welcomeSettings[from] || { enabled: false, template: "", sendImage: true };
  if (sub === 'on') {
    chatCfg.enabled = true;
    global.welcomeSettings[from] = chatCfg;
    saveWelcomeSettings();
    return reply(`✅ Welcome enabled for this chat.`);
  }
  if (sub === 'off') {
    chatCfg.enabled = false;
    global.welcomeSettings[from] = chatCfg;
    saveWelcomeSettings();
    return reply(`❌ Welcome disabled for this chat.`);
  }
  if (sub === 'status') {
    const enabled = !!chatCfg.enabled;
    const tmpl = chatCfg.template && chatCfg.template.length ? chatCfg.template : "Default: Welcome @{{user}} to {{group}}";
    const img = (typeof chatCfg.sendImage === 'boolean') ? chatCfg.sendImage : true;
    return reply(`📌 Welcome status for this chat:\nEnabled: ${enabled}\nSend Image: ${img}\nTemplate:\n${tmpl}`);
  }

  if (sub === 'setmsg') {
    // set custom message template for this chat: join the rest of args
    const rest = text.split(' ').slice(1).join(' ').trim();
    if (!rest) return reply('Usage: .welcome setmsg Welcome @{{user}} to {{group}}');
    chatCfg.template = rest;
    global.welcomeSettings[from] = chatCfg;
    saveWelcomeSettings();
    return reply('✅ Welcome template updated for this chat.');
  }

  if (sub === 'setimg') {
    const val = (args[1] || '').toLowerCase();
    if (!['on','off'].includes(val)) return reply('Usage: .welcome setimg on|off');
    chatCfg.sendImage = (val === 'on');
    global.welcomeSettings[from] = chatCfg;
    saveWelcomeSettings();
    return reply(`✅ sendImage set to ${chatCfg.sendImage}`);
  }

}
break;            
            // ---------- Auto profile picture commands (autopp) ----------

case 'autopp': {
  // owner-only
  if (!isOwner) return reply('Owner only.');

  const sub = (args[0] || '').toLowerCase();

  // help
  if (!sub || sub === 'help') {
    return reply(
`AutoPP Commands (owner only):
.autopp add (reply to an IMAGE)      -> add quoted image
.autopp addurl <url>                 -> add image by URL
.autopp list                         -> list configured images
.autopp rm <index>                   -> remove image by index (1-based)
.autopp interval <seconds>           -> set interval seconds
.autopp start                        -> start rotating (runs every interval)
.autopp stop                         -> stop rotating
.autopp once                         -> immediately change profile once
.autopp clear                        -> remove all images
.autopp status                       -> show current status`
    );
  }

  // add by replying to an image
  if (sub === 'add') {
    if (!m.quoted) return reply('Reply to an image to add it.');
    // try to store quoted image as a URL or mark as url to fetch later
    // We will store original URL if it's present or store a temporary file path
    try {
      // try to download buffer and write a local temp file (so it remains even if remote deleted)
      const buf = await autopProfileFetchBuffer(james, null, m.quoted);
      if (!buf) return reply('Failed to download quoted image.');
      const fname = `autopp_${Date.now()}.jpg`;
      const localPath = path.join(AUTOPP_TMP, fname);
      fs.writeFileSync(localPath, buf);
      global.autopp.images.push({ source: 'local', data: localPath });
      return reply(`Added image (local) to autopp list. Index: ${global.autopp.images.length}`);
    } catch (e) {
      console.error('[autopp add] error', e);
      return reply('Failed to add image.');
    }
  }

  // add by url
  if (sub === 'addurl') {
    const url = args[1] || args.slice(1).join(' ');
    if (!url || !/^https?:\/\//i.test(url)) return reply('Usage: .autopp addurl <image-url>');
    global.autopp.images.push({ source: 'url', data: url });
    return reply(`Added URL to autopp list. Index: ${global.autopp.images.length}`);
  }

  // list
  if (sub === 'list') {
    if (!global.autopp.images.length) return reply('No images configured.');
    const list = global.autopp.images.map((it, i) => `${i+1}. [${it.source}] ${it.data}`).join('\n');
    return reply(`Autopp images:\n${list}`);
  }

  // remove
  if (sub === 'rm') {
    const idx = parseInt(args[1] || args[0]);
    if (!idx || idx < 1 || idx > global.autopp.images.length) return reply('Usage: .autopp rm <index>');
    const removed = global.autopp.images.splice(idx - 1, 1)[0];
    // if file was local delete
    if (removed && removed.source === 'local' && fs.existsSync(removed.data)) {
      try { fs.unlinkSync(removed.data); } catch(e){}
    }
    return reply(`Removed index ${idx}.`);
  }

  // clear
  if (sub === 'clear') {
    // delete local files
    for (const it of (global.autopp.images || [])) {
      if (it.source === 'local' && fs.existsSync(it.data)) try { fs.unlinkSync(it.data) } catch(e){}
    }
    global.autopp.images = [];
    return reply('Cleared all autopp images.');
  }

  // interval
  if (sub === 'interval') {
    const sec = parseInt(args[1] || args[0]);
    if (!sec || sec < 10) return reply('Usage: .autopp interval <seconds> (min 10s)');
    global.autopp.intervalSec = sec;
    // if already running restart with new interval
    if (global.autopp.enabled && global.autopp.timerId) {
      autopProfileStop();
      autopProfileStart(james);
    }
    return reply(`Autopp interval set to ${sec} seconds.`);
  }

  // start
  if (sub === 'start') {
    if (global.autopp.images.length === 0) return reply('No images configured. Add images first.');
    if (global.autopp.enabled) return reply('Autopp already running.');
    autopProfileStart(james);
    return reply(`Autopp started. Changing every ${global.autopp.intervalSec} seconds.`);
  }

  // stop
  if (sub === 'stop') {
    if (!global.autopp.enabled) return reply('Autopp not running.');
    autopProfileStop();
    return reply('Autopp stopped.');
  }

  // once (immediately change now)
  if (sub === 'once') {
    try {
      const ok = await autopProfileRunOnce(james);
      return reply(ok ? 'Profile picture updated once.' : 'Failed to update profile picture (see console).');
    } catch (e) {
      console.error('[autopp once] error', e);
      return reply('Error updating profile picture once.');
    }
  }

  // status
  if (sub === 'status') {
    return reply(`Autopp status:
Enabled: ${global.autopp.enabled}
Interval (s): ${global.autopp.intervalSec}
Images: ${global.autopp.images.length}`);
  }

  // unknown
  return reply('Unknown subcommand. Use .autopp help');
}
break;
            case 'tenor': {
  try {
    if (!text) return reply(`Example: ${global.xprefix || '.'}${command} cat`);
    const axios = require('axios');

    // call Tenor API
    const res = await axios.get('https://g.tenor.com/v1/search', {
      params: { q: text, key: 'LIVDSRZULELA', limit: 25 }
    });

    const data = res.data;
    if (!data || !Array.isArray(data.results) || data.results.length === 0) {
      return reply('No results found!');
    }

    // pick a random result
    const pick = typeof pickRandom === 'function' ? pickRandom(data.results) : data.results[Math.floor(Math.random() * data.results.length)];

    // try to find MP4 or GIF url (Tenor has nested media objects)
    let mediaUrl = null;
    try {
      // try common locations (robust)
      const media = pick.media && pick.media[0];
      if (media) {
        if (media.mp4 && media.mp4.url) mediaUrl = media.mp4.url;
        else if (media.gif && media.gif.url) mediaUrl = media.gif.url;
        else if (media.tinygif && media.tinygif.url) mediaUrl = media.tinygif.url;
        else {
          // try deep scan
          const mkeys = Object.keys(media);
          for (const k of mkeys) {
            if (media[k] && media[k].url) {
              mediaUrl = media[k].url;
              break;
            }
          }
        }
      }
    } catch (e) { /* ignore */ }

    if (!mediaUrl) return reply('No playable media found for that result.');

    const caption =
      `👀 Media: ${pick.url || pick.itemurl || 'N/A'}\n` +
      `📋 Description: ${pick.content_description || pick.title || 'N/A'}\n` +
      `🔛 Url: ${pick.itemurl || pick.url || 'N/A'}`;

    // send as video (gifs often accepted as video) and request gifPlayback
    try {
      await james.sendMessage(from, {
        video: { url: mediaUrl },
        caption,
        gifPlayback: true
      }, { quoted: m });
    } catch (sendErr) {
      // fallback: send as image/gif url if video send fails
      try {
        await james.sendMessage(from, { image: { url: mediaUrl }, caption }, { quoted: m });
      } catch (e2) {
        console.error('[tenor] send failed', sendErr, e2);
        return reply('Failed to send media (maybe the media URL is blocked).');
      }
    }
  } catch (err) {
    console.error('[tenor] error', err);
    reply('❌ Error fetching Tenor results.');
  }
}
break;
            case 'antisimp': {
  if (!isOwner) return reply('Only the owner can use this command.');
  if (!args.length) return reply('Usage: .antisimp <group|dm> <on|off>');
  const mode = args[0].toLowerCase();
  const value = (args[1] || '').toLowerCase();
  if (!['group','dm'].includes(mode)) return reply('First arg must be "group" or "dm".');
  if (!['on','off'].includes(value)) return reply('Second arg must be "on" or "off".');
  global.antisimp = global.antisimp || { group:false, dm:false };
  global.antisimp[mode] = (value === 'on');
  reply(`AntiSimp ${mode} set to ${global.antisimp[mode] ? 'ON' : 'OFF'}`);
}
break;
            // ---------- sticker / stickerwm / readviewonce cases ----------
case 's':
case 'sticker':
case 'stiker': {
  try {
    const _fs   = require('fs');
    const _path = require('path');
    const { exec: _exec } = require('child_process');
    const _ffmpeg = require('ffmpeg-static');

    // Resolve media source: direct attachment OR quoted message
    let _stickerMsg  = null;
    let _stickerMime = '';

    if (m.quoted && m.quoted.msg) {
      _stickerMsg  = m.quoted.msg;
      _stickerMime = m.quoted.msg.mimetype || '';
    } else if (m.msg && m.msg.mimetype) {
      _stickerMsg  = m.msg;
      _stickerMime = m.msg.mimetype || '';
    } else if (qmsg && mime) {
      _stickerMsg  = qmsg;
      _stickerMime = mime;
    }

    if (!_stickerMsg || !/image|video/gi.test(_stickerMime)) {
      return reply('📎 Send or reply to an image/video to make a sticker.');
    }

    if (/video/gi.test(_stickerMime) && _stickerMsg.seconds > 15) {
      return reply('⏱️ Video max 15 seconds for sticker.');
    }

    await reply('⏳ Making sticker...');

    const _tmpDir = _path.join(__dirname, 'temp');
    if (!_fs.existsSync(_tmpDir)) _fs.mkdirSync(_tmpDir, { recursive: true });

    const _inputPath = _path.join(_tmpDir, `stk_in_${Date.now()}`);
    const _outWebp   = _path.join(_tmpDir, `stk_out_${Date.now()}.webp`);

    // Download media buffer
    const _mediaType = /video/gi.test(_stickerMime) ? 'video' : 'image';
    let _stream = await downloadContentFromMessage(_stickerMsg, _mediaType);
    let _buf = Buffer.from([]);
    for await (const chunk of _stream) _buf = Buffer.concat([_buf, chunk]);
    if (!_buf || !_buf.length) return reply('❌ Failed to download media.');
    _fs.writeFileSync(_inputPath, _buf);

    // Build ffmpeg command using ffmpeg-static binary
    let _cmd;
    if (/image/gi.test(_stickerMime)) {
      _cmd = `"${_ffmpeg}" -y -i "${_inputPath}" -vcodec libwebp -filter:v "scale=if(gt(iw\\,ih)\\,512\\,-2):if(gt(ih\\,iw)\\,512\\,-2)" -lossless 0 -qscale 60 -preset default -loop 0 -an -vsync 0 "${_outWebp}"`;
    } else {
      _cmd = `"${_ffmpeg}" -y -i "${_inputPath}" -vf "scale=trunc(min(512\\,iw)/2)*2:trunc(min(512\\,ih)/2)*2,fps=15" -vcodec libwebp -lossless 0 -qscale 50 -preset default -loop 0 -an -vsync 0 "${_outWebp}"`;
    }

    await new Promise((resolve, reject) => {
      _exec(_cmd, { maxBuffer: 1024 * 1024 * 50, timeout: 30000 }, (err) => {
        if (err) return reject(new Error('ffmpeg conversion failed: ' + err.message));
        resolve();
      });
    });

    if (!_fs.existsSync(_outWebp)) return reply('❌ Sticker conversion failed (no output).');

    const _stkBuf = _fs.readFileSync(_outWebp);
    await james.sendMessage(from, { sticker: _stkBuf }, { quoted: m });

    try { _fs.unlinkSync(_inputPath); } catch(e) {}
    try { _fs.unlinkSync(_outWebp); }  catch(e) {}

  } catch (err) {
    console.error('[sticker] error:', err.message || err);
    try { reply('❌ Sticker failed: ' + (err.message || 'unknown error')); } catch(e) {}
  }
}
break;

// sticker with watermark (packname shown) - note: not true EXIF metadata
case 'swm':
case 'stickerwm':
case 'stikerwm':
case 'wm': {
  try {
    if (!text) return reply('Usage: .swm <packname> (reply/send an image/video)');
    if (!qmsg || !/image|video/gi.test(mime)) return reply('Please send or reply to an image/video to make a sticker with watermark.');
    if (/video/gi.test(mime) && (qmsg.seconds && qmsg.seconds > 15)) {
      return reply('Video duration max is 15 seconds for sticker.');
    }

    await reply('⏳ Making sticker with pack name, please wait...');

    const fs = require('fs');
    const path = require('path');
    const { exec } = require('child_process');

    const tmpDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    const inputPath = path.join(tmpDir, `in_${Date.now()}`);
    const outWebp = path.join(tmpDir, `sticker_wm_${Date.now()}.webp`);
    const packname = (text || 'Sticker').slice(0, 50);

    // download media
    let stream = await downloadContentFromMessage(qmsg, /video|audio/.test(mime) ? 'video' : 'image');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    if (!buffer || !buffer.length) return reply('❌ Failed to download media for sticker.');

    fs.writeFileSync(inputPath, buffer);

    // Convert with ffmpeg and overlay packname text as watermark (bottom-right)
    if (/image/gi.test(mime)) {
      const cmd = `ffmpeg -y -i "${inputPath}" -vf "scale=if(gt(iw,ih),512,-2):if(gt(ih,iw),512,-2),drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='${packname.replace(/[:'"]/g,'') }':x=w-tw-10:y=h-th-10:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.5" -vcodec libwebp -lossless 0 -qscale 60 -preset default -loop 0 -an -vsync 0 "${outWebp}"`;
      await new Promise((resolve, reject) => {
        exec(cmd, { maxBuffer: 1024 * 500 }, (err) => { if (err) return reject(err); resolve(); });
      });
    } else {
      const cmd = [
        `ffmpeg -y -i "${inputPath}"`,
        `-vf "scale=trunc(min(512\\, iw)/2)*2:trunc(min(512\\, ih)/2)*2,fps=15,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='${packname.replace(/[:'"]/g,'') }':x=w-tw-10:y=h-th-10:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.5"`,
        `-vcodec libwebp -lossless 0 -qscale 50 -preset default -loop 0 -an -vsync 0 "${outWebp}"`
      ].join(' ');
      await new Promise((resolve, reject) => {
        exec(cmd, { maxBuffer: 1024 * 1024 * 50 }, (err) => { if (err) return reject(err); resolve(); });
      });
    }

    // send sticker
    async function sendStickerFile(jid, webpPath, quotedMsg) {
      try {
        await james.sendMessage(jid, { sticker: { url: webpPath } }, { quoted: quotedMsg });
      } catch (e1) {
        const buff = fs.readFileSync(webpPath);
        await james.sendMessage(jid, { sticker: buff }, { quoted: quotedMsg });
      }
    }
    await sendStickerFile(from, outWebp, m);

    // cleanup
    try { fs.unlinkSync(inputPath); } catch (e) {}
    try { fs.unlinkSync(outWebp); } catch (e) {}

  } catch (err) {
    console.error('[stickerwm] error', err);
    try { reply('❌ Failed to create sticker with watermark. Make sure ffmpeg is installed and fonts are available.'); } catch(e){}
  }
}
break;

// read view-once (extracts and sends the media)
case 'rvo':
case 'readviewonce': {
  try {
    if (!m.quoted) return reply('Reply to a view-once message to extract it.');
    const quotedMsg = m.message?.extendedTextMessage?.contextInfo?.quotedMessage || m.quoted?.message || m.quoted;
    const type = Object.keys(quotedMsg || {})[0];

    // ensure it's viewOnce
    const isViewOnce = quotedMsg && quotedMsg[type] && quotedMsg[type].viewOnce;
    if (!isViewOnce) return reply('That message is not a view-once message.');

    await reply('⏳ Extracting view-once content...');

    // choose stream type for download
    const mediaType = type === 'imageMessage' ? 'image' : type === 'videoMessage' ? 'video' : type === 'audioMessage' ? 'audio' : null;
    if (!mediaType) return reply('Unsupported view-once content type.');

    // download stream
    const mediaStream = await downloadContentFromMessage(quotedMsg[type], mediaType);
    let buffer = Buffer.from([]);
    for await (const chunk of mediaStream) buffer = Buffer.concat([buffer, chunk]);
    if (!buffer || !buffer.length) return reply('❌ Failed to download view-once content.');

    // send back according to type
    if (/video/.test(mediaType)) {
      await james.sendMessage(from, { video: buffer, caption: quotedMsg[type].caption || '' }, { quoted: m });
    } else if (/image/.test(mediaType)) {
      await james.sendMessage(from, { image: buffer, caption: quotedMsg[type].caption || '' }, { quoted: m });
    } else if (/audio/.test(mediaType)) {
      await james.sendMessage(from, { audio: buffer, mimetype: 'audio/mpeg', ptt: false }, { quoted: m });
    } else {
      return reply('❌ Unsupported media type extracted.');
    }

  } catch (err) {
    console.error('[readviewonce] error', err);
    try { reply('❌ Failed to extract view-once message.'); } catch(e){}
  }
}
break;
            case 'getpp': {
  try {
    // determine target JID: arg, mention, quoted, or sender
    let target = (q || '').trim();

    if (!target) {
      // if reply to a message, use that sender
      if (m.quoted && m.quoted.sender) target = m.quoted.sender;
      // if mentions exist, use first mention
      else if (m.mentionedJid && m.mentionedJid.length) target = m.mentionedJid[0];
      else target = m.sender; // fallback to the message sender
    }

    // normalize numbers to JID (if user provided plain number)
    if (!target.includes('@')) {
      const clean = target.replace(/[^0-9]/g, '');
      if (clean) target = clean + '@s.whatsapp.net';
    }

    // safe defaults
    const FALLBACK_PP = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    let ppUrl = FALLBACK_PP;

    // attempt to fetch profile picture (Baileys exposes profilePictureUrl in many forks)
    try {
      if (typeof james.profilePictureUrl === 'function') {
        ppUrl = await james.profilePictureUrl(target, 'image').catch(() => FALLBACK_PP);
      } else if (typeof james.fetchProfilePicture === 'function') {
        ppUrl = await james.fetchProfilePicture(target).catch(() => FALLBACK_PP);
      } else {
        // some bases don't expose helper — try store.contacts if available
        const contact = store && store.contacts ? (store.contacts[target] || store.contacts[target.replace(/:.*$/,'')]) : null;
        ppUrl = (contact && (contact.imgUrl || contact.picture)) || FALLBACK_PP;
      }
    } catch (e) {
      ppUrl = FALLBACK_PP;
    }

    // get display name
    let displayName = '';
    try {
      // prefer store contacts
      if (store && store.contacts && store.contacts[target]) {
        displayName = store.contacts[target].name || store.contacts[target].notify || '';
      }
      // fallback to james.getName if available
      if ((!displayName || displayName === '') && typeof james.getName === 'function') {
        displayName = await james.getName(target).catch(()=> '');
      }
      if (!displayName) displayName = target.split('@')[0];
    } catch (e) {
      displayName = target.split('@')[0];
    }

    // is target a group (we only care if we're in a group chat and target is a participant)
    let roleText = 'N/A';
    try {
      if (isGroup) {
        // get latest group metadata (if available)
        const meta = m?.isGroup ? await james.groupMetadata(from).catch(()=>null) : null;
        if (meta && Array.isArray(meta.participants)) {
          const p = meta.participants.find(x => x.id === target || x.jid === target || x.id === target?.split?.(':')?.[0]);
          if (p) {
            if (p.admin === 'superadmin') roleText = 'Group Owner';
            else if (p.admin === 'admin') roleText = 'Group Admin';
            else roleText = 'Member';
          } else {
            roleText = 'Not in this group';
          }
        }
      } else {
        roleText = 'Not a group chat';
      }
    } catch (e) {
      roleText = 'Unknown';
    }

    // is owner?
    const owners = (global.owner || []).map(o => o.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
    const isOwnerTarget = owners.includes(target);
    // is bot itself?
    const botJid = (await james.decodeJid(james.user?.id || '')).split(':')[0] + '@s.whatsapp.net';
    const isBotTarget = botJid === target;

    // build caption
    const caption = [
      `🧾 *Profile Info*`,
      `• *Name:* ${displayName}`,
      `• *JID:* ${target}`,
      `• *Role:* ${roleText}`,
      `• *Owner:* ${isOwnerTarget ? 'Yes' : 'No'}`,
      `• *Bot:* ${isBotTarget ? 'Yes' : 'No'}`,
    ].join('\n');

    // send the image with caption
    try {
      await james.sendMessage(from, { image: { url: ppUrl }, caption }, { quoted: m });
    } catch (e) {
      // fallback: send as text plus url
      await james.sendMessage(from, { text: `${caption}\n\nProfile Picture: ${ppUrl}` }, { quoted: m });
    }

  } catch (err) {
    console.error('[getpp] error', err);
    try { reply('❌ Failed to get profile picture or info.'); } catch(e){}
  }
}
break;
            // ----------------- listonline -----------------
            case 'fastflux':
case 'fflux': {
  try {
    // require prompt (text comes from your existing parsing: q / text / args)
    const prompt = (text || q || '').trim();
    if (!prompt) return reply('❗ Please provide a prompt. Example:\n.fastflux white-haired girl in a park');

    // compose the image prompt (you can change wording here)
    const fullPrompt = `anime style, high quality, detailed illustration of ${prompt}, ultra-detailed, soft lighting, trending on pixiv, masterpiece, beautiful composition, 4k render`;

    // API that returns an image by URL based on the prompt
    const apiUrl = `https://fast-flux-demo.replicate.workers.dev/api/generate-image?text=${encodeURIComponent(fullPrompt)}`;

    // Inform user (optional)
    await reply('⏳ Generating image, please wait...');

    // Send the image by URL (Baileys will fetch/stream it)
    await james.sendMessage(m.chat, {
      image: { url: apiUrl },
      caption: `⚡ Fast-Flux AI Image\n🎨 Prompt: ${prompt}`
    }, { quoted: m });

  } catch (err) {
    console.error('[fastflux] error:', err);
    try { reply('❌ Failed to generate image. Try again later or simplify your prompt.'); } catch(e) {}
  }
}
break;
case 'listonline': {
  try {
    // show online members in current chat (group only)
    if (!isGroup) return reply('❗ Use this in a group chat.');
    const meta = await james.groupMetadata(from).catch(()=>null);
    const parts = meta?.participants || [];
    let lines = [];
    for (const p of parts) {
      const jid = p.id;
      const cache = global.jamesOnlineCache[jid] || {};
      if (cache.online) lines.push(`• @${jid.split('@')[0]} — online`);
    }
    if (!lines.length) return reply('No members are currently online (according to presence cache).');
    await james.sendMessage(from, { text: `Online members:\n\n${lines.join('\n')}`, mentions: parts.filter(p=> (global.jamesOnlineCache[p.id]||{}).online ).map(p=>p.id) }, { quoted: m });
  } catch (e) {
    console.error('[listonline] error', e);
    reply('❌ Failed to list online members.');
  }
}
break;

// ----------------- listdead -----------------
// list group members who haven't been seen for N days (default 7)
case 'facebook':
case 'fb':
case 'fbdown': {
  try {
    const axios = require('axios');
    const cheerio = require('cheerio');
    const fs = require('fs');
    const path = require('path');

    if (!text) return reply('❗ Usage: .fb <Facebook video URL>\nExample: .fb https://www.facebook.com/watch?v=xxxx');

    const url = text.trim();

    // Basic URL check
    if (!/facebook\.\w+\/(reel|watch|share|video|v)|facebook\.com\/.+\/videos\//i.test(url)) {
      return reply('❌ Invalid Facebook video URL. Provide a valid watch / reel / share link.');
    }

    await reply('⏳ Fetching Facebook video info...');

    // Ensure temp folder
    const tmpDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    // Scraper function (adapted from your friend's code)
    async function facebookScrape(videoUrl) {
      // get landing to extract tokens
      const landing = await axios.get('https://fdownloader.net/id', {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        timeout: 20000
      });
      const html = landing.data || '';
      const exMatch = html.match(/k_exp\s*=\s*"(\d+)"/i);
      const toMatch = html.match(/k_token\s*=\s*"([a-f0-9]+)"/i);
      const ex = exMatch ? exMatch[1] : null;
      const to = toMatch ? toMatch[1] : null;

      if (!ex || !to) throw new Error('Failed to extract token/exp from fdownloader landing page.');

      // post AJAX search
      const params = new URLSearchParams();
      params.append('k_exp', ex);
      params.append('k_token', to);
      params.append('q', videoUrl);
      params.append('lang', 'id');
      params.append('web', 'fdownloader.net');
      params.append('v', 'v2');
      params.append('w', '');

      const searchRes = await axios.post('https://v3.fdownloader.net/api/ajaxSearch?lang=id', params.toString(), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Origin': 'https://fdownloader.net',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        timeout: 20000
      });

      const data = searchRes.data;
      if (!data || data.status !== 'ok') {
        throw new Error('Fdownloader AJAX returned an error or no data.');
      }

      const $ = cheerio.load(data.data || '');

      const title = $('.thumbnail > .content > .clearfix > h3').text().trim() || $('h3').first().text().trim() || 'Facebook Video';
      const duration = $('.thumbnail > .content > .clearfix > p').text().trim() || '';
      const thumbnail = $('.thumbnail > .image-fb > img').attr('src') || $('.thumbnail img').first().attr('src') || '';
      const media = $('#popup_play > .popup-body > .popup-content > #vid').attr('src') || '';
      const music = $('#fbdownloader').find('#audioUrl').attr('value') || '';

      const videoList = [];
      $('#fbdownloader')
        .find('.tab__content')
        .eq(0)
        .find('tr')
        .each((_, el) => {
          const quality = $(el).find('.video-quality').text().trim() || $(el).find('td').first().text().trim() || 'unknown';
          const link =
            $(el).find('a').attr('href') ||
            $(el).find('button').attr('data-videourl') ||
            null;
          if (link && link !== '#note_convert') videoList.push({ quality, url: link });
        });

      // dedupe
      const deduped = [];
      for (const v of videoList) if (!deduped.find(x => x.url === v.url)) deduped.push(v);

      return {
        metadata: { title, duration, thumbnail },
        download: { media, music, videos: deduped }
      };
    }

    let result;
    try {
      result = await facebookScrape(url);
    } catch (err) {
      console.error('[fbdown] scraping error', err && (err.message || err));
      return reply('❌ Failed to fetch from fdownloader.net. It may be blocked or changed. Try again later or provide a different link.');
    }

    const meta = result.metadata || {};
    const dl = result.download || {};
    const videos = Array.isArray(dl.videos) ? dl.videos : [];

    // Send metadata + thumbnail
    const captionLines = [
      `🎬 ${meta.title || 'Facebook Video'}`,
      meta.duration ? `⏱️ ${meta.duration}` : '',
      '',
      `🔗 Source: ${url}`,
      '',
      `Found ${videos.length} video variant(s).`
    ].filter(Boolean).join('\n');

    if (meta.thumbnail) {
      await james.sendMessage(from, { image: { url: meta.thumbnail }, caption: captionLines }, { quoted: m });
    } else {
      await james.sendMessage(from, { text: captionLines }, { quoted: m });
    }

    // If no videos found: show direct media/audio if present
    if (!videos.length) {
      const extras = [];
      if (dl.media) extras.push(`Direct media: ${dl.media}`);
      if (dl.music) extras.push(`Audio: ${dl.music}`);
      if (extras.length) {
        await james.sendMessage(from, { text: extras.join('\n') }, { quoted: m });
      } else {
        await james.sendMessage(from, { text: '⚠️ No downloadable video links were found by the scraper.' }, { quoted: m });
      }
      break;
    }

    // Choose best video: try to find highest quality label (1080/720/480...); fallback to first
    let best = videos[0];
    try {
      const order = ['1080', '720', '480', '360', '240'];
      const found = order.map(q => videos.find(v => v.quality && v.quality.includes(q))).find(Boolean);
      if (found) best = found;
    } catch (e) {}

    // Attempt to download and send top-quality video file
    const safeMaxMB = 60; // change threshold if you want
    const tmpFile = path.join(tmpDir, `fb_${Date.now()}.mp4`);

    await reply('⏬ Downloading top-quality video (if small enough) — please wait...');

    try {
      const resp = await axios({
        method: 'get',
        url: best.url,
        responseType: 'stream',
        timeout: 600000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });

      // stream to file
      await new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(tmpFile);
        resp.data.pipe(writer);
        writer.on('error', err => { writer.close(); reject(err); });
        writer.on('finish', () => resolve());
      });

      // check size
      const stat = fs.statSync(tmpFile);
      const fileSizeMB = stat.size / (1024 * 1024);

      if (fileSizeMB > safeMaxMB) {
        // too big to upload; send direct link(s) instead
        try { fs.unlinkSync(tmpFile); } catch (e) {}
        let listText = `⚠️ Video is too large to upload (${fileSizeMB.toFixed(1)} MB). Use the direct link(s) below:\n\n`;
        videos.forEach(v => { listText += `• ${v.quality}\n${v.url}\n\n`; });
        if (dl.music) listText += `🔊 Audio: ${dl.music}\n\n`;
        await james.sendMessage(from, { text: listText }, { quoted: m });
        break;
      }

      // send video file
      await james.sendMessage(from, {
        video: { url: tmpFile },
        caption: `🎬 ${meta.title || 'Facebook video'}\n• Quality: ${best.quality || 'unknown'}`,
        mimetype: 'video/mp4'
      }, { quoted: m });

      try { fs.unlinkSync(tmpFile); } catch (e) {}

    } catch (errDownload) {
      console.error('[fbdown] download/send error', errDownload && (errDownload.message || errDownload));
      try { if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile); } catch (e) {}

      // fallback: send list of links (short)
      let fallbackText = '📥 Download links:\n\n';
      videos.slice(0, 6).forEach(v => { fallbackText += `• ${v.quality}\n${v.url}\n\n`; });
      if (dl.music) fallbackText += `🔊 Audio: ${dl.music}\n\n`;
      fallbackText += 'If you need the bot to upload a large file, run this command on a host with enough disk & upload capacity.';
      await james.sendMessage(from, { text: fallbackText }, { quoted: m });
    }

  } catch (err) {
    console.error('[fbdown case] fatal error', err && (err.stack || err.message || err));
    try { reply('❌ An unexpected error occurred while processing the Facebook video.'); } catch (e) {}
  }
}
break;
case 'listdead': {
  try {
    if (!isGroup) return reply('❗ Use this in a group.');
    const days = parseInt(args[0]) || 7;
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    const meta = await james.groupMetadata(from).catch(()=>null);
    const parts = meta?.participants || [];
    const dead = parts.filter(p => {
      const s = global.jamesOnlineCache[p.id];
      return !s || (!s.online && (s.lastSeen || 0) < cutoff);
    }).map(p => p.id);
    if (!dead.length) return reply(`No dead members older than ${days} day(s).`);
    const txt = `𝗙𝗨𝗖𝗞𝗜𝗡𝗚 𝗗𝗘𝗔𝗗 𝗣𝗘𝗢𝗣𝗟𝗘 𝗕𝗘𝗟𝗢𝗪${readmore}:\n` + dead.map(j=>`•${readmore}@${j.split('@')[0]}`).join('\n');
    await james.sendMessage(from, { text: txt, mentions: dead }, { quoted: m });
  } catch (e) {
    console.error('[listdead] error', e);
    reply('❌ Failed to fetch dead list.');
  }
}
break;

// ----------------- list ghostviewers -----------------
// list users who viewed specified user's statuses (statusOwner optional, defaults to group owner or caller)
case 'listghostviewers':
case 'listghosts':
{
  try {
    // Optional param: number or jid of status owner to query
    let owner = args[0] ? (args[0].includes('@') ? args[0] : args[0].replace(/[^0-9]/g,'') + '@s.whatsapp.net') : (m.quoted ? m.quoted.sender : null);
    if (!owner) {
      // default to group owner if available
      const meta = isGroup ? await james.groupMetadata(from).catch(()=>null) : null;
      owner = (meta && meta.owner) ? meta.owner : (james.user && james.user.id ? james.user.id.split(':')[0] + '@s.whatsapp.net' : null);
    }
    if (!owner) return reply('❗ Provide owner jid or use in a group to default to group owner.');

    const viewersSet = global.jamesStatusViewers[owner] || new Set();
    const arr = Array.from(viewersSet || []);
    if (!arr.length) return reply('No recorded viewers for that user (status viewer tracking may not be enabled).');
    const txt = `Status viewers for @${owner.split('@')[0]}:\n` + arr.map(j=>`• @${j.split('@')[0]}`).join('\n');
    await james.sendMessage(from, { text: txt, mentions: arr }, { quoted: m });
  } catch (e) {
    console.error('[listghostviewers] error', e);
    reply('❌ Failed to list ghost viewers.');
  }
}
break;

// ----------------- kickdead -----------------
// remove dead members (only admins/owner can run); optionally provide days param
case 'kickdead': {
  try {
    if (!isGroup) return reply('❗ Use this in a group.');
    if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
    if (!isBotAdmins) return reply('❗ I must be group admin to remove members.');

    const days = parseInt(args[0]) || 7;
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    const meta = await james.groupMetadata(from).catch(()=>null);
    const parts = meta?.participants || [];
    const targets = parts.filter(p => {
      const s = global.jamesOnlineCache[p.id];
      // skip owners and admins
      if (p.admin === 'admin' || p.admin === 'superadmin') return false;
      return !s || (!s.online && (s.lastSeen || 0) < cutoff);
    }).map(p => p.id);

    if (!targets.length) return reply(`No dead members older than ${days} day(s) to kick.`);

    // chunking if many members (Baileys may limit)
    const chunkSize = 5;
    for (let i=0;i<targets.length;i+=chunkSize) {
      const chunk = targets.slice(i,i+chunkSize);
      try {
        await james.groupParticipantsUpdate(from, chunk, 'remove');
        await james.sendMessage(from, { text: `✅ Removed: ${chunk.map(j=>`@${j.split('@')[0]}`).join(', ')}`, mentions: chunk });
      } catch (e) {
        console.error('[kickdead] chunk remove error', e);
        await james.sendMessage(from, { text: `❌ Failed to remove some members. Check bot permissions.` });
      }
    }
  } catch (e) {
    console.error('[kickdead] error', e);
    reply('❌ Failed to kick dead users.');
  }
}
break;

// ----------------- promoteall / demoteall -----------------
case 'promoteall': {
  try {
    if (!isGroup) return reply('❗ Use this in a group.');
    if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
    if (!isBotAdmins) return reply('❗ I must be group admin to promote.');

    const meta = await james.groupMetadata(from).catch(()=>null);
    const parts = meta?.participants || [];
    // promote all non-admins (except bot and owner)
    const toPromote = parts.filter(p => !(p.admin === 'admin' || p.admin === 'superadmin') && p.id !== (james.user && james.user.id ? james.user.id.split(':')[0] + '@s.whatsapp.net' : '')).map(p=>p.id);
    if (!toPromote.length) return reply('No members to promote.');
    // chunk and call
    for (let i=0;i<toPromote.length;i+=10) {
      const chunk = toPromote.slice(i, i+10);
      await james.groupParticipantsUpdate(from, chunk, 'promote').catch(e=>{ console.error('[promoteall] error', e); });
    }
    reply(`✅ Promoted ${toPromote.length} members (best-effort).`);
  } catch (e) {
    console.error('[promoteall] error', e);
    reply('❌ Failed to promote members.');
  }
}
break;

case 'demoteall': {
  try {
    if (!isGroup) return reply('❗ Use this in a group.');
    if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
    if (!isBotAdmins) return reply('❗ I must be group admin to demote.');
    const meta = await james.groupMetadata(from).catch(()=>null);
    const parts = meta?.participants || [];
    // demote all admins except group owner and bot and command caller (owner)
    const toDemote = parts.filter(p => (p.admin === 'admin' || p.admin === 'superadmin') && p.id !== meta.owner && p.id !== (james.user && james.user.id? james.user.id.split(':')[0] + '@s.whatsapp.net' : '') ).map(p=>p.id);
    if (!toDemote.length) return reply('No admins to demote (or only owner/bot admins).');
    for (let i=0;i<toDemote.length;i+=10) {
      const chunk = toDemote.slice(i,i+10);
      await james.groupParticipantsUpdate(from, chunk, 'demote').catch(e=>{ console.error('[demoteall] error', e); });
    }
    reply(`✅ Demoted ${toDemote.length} admins (best-effort).`);
  } catch (e) {
    console.error('[demoteall] error', e);
    reply('❌ Failed to demote admins.');
  }
}
break;

// ----------------- kickall2 ----------------- (kick everyone except admins/owner/bot)
case 'kickall2': {
  try {
    if (!isGroup) return reply('❗ Use this in a group.');
    if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
    if (!isBotAdmins) return reply('❗ I must be group admin to kick members.');
    const meta = await james.groupMetadata(from).catch(()=>null);
    const parts = meta?.participants || [];
    const botJid = (james.user && james.user.id) ? james.user.id.split(':')[0] + '@s.whatsapp.net' : null;
    const toKick = parts.filter(p => p.id !== meta.owner && p.id !== botJid && !(p.admin==='admin'||p.admin==='superadmin')).map(p=>p.id);
    if (!toKick.length) return reply('No removable members found.');
    // Confirm large operations
    const confirm = args[0] && args[0] === 'confirm';
    if (!confirm) return reply(`This will remove ${toKick.length} members. Run: .kickall2 confirm to proceed.`);
    for (let i=0;i<toKick.length;i+=10) {
      const chunk = toKick.slice(i,i+10);
      await james.groupParticipantsUpdate(from, chunk, 'remove').catch(e=>{ console.error('[kickall2] chunk remove error', e); });
    }
    reply(`✅ Removed ${toKick.length} members (best-effort).`);
  } catch (e) {
    console.error('[kickall2] error', e);
    reply('❌ Failed to kick all members.');
  }
}
break;

// ----------------- getgroupdp -----------------
case 'getgroupdp': {
  try {
    if (!isGroup) return reply('❗ Use in group.');
    // attempt to get profile picture
    try {
      const pp = await james.profilePictureUrl(from, 'image').catch(()=>null);
      if (!pp) return reply('No group picture found.');
      await james.sendMessage(from, { image: { url: pp }, caption: "Group display picture" }, { quoted: m });
    } catch (e) {
      // some versions: conn.profilePictureUrl
      try {
        const pp2 = await james.profilePictureUrl(from);
        if (pp2) { await james.sendMessage(from, { image: { url: pp2 }, caption: "Group DP" }, { quoted: m }); }
        else reply('No group picture found.');
      } catch (e2) {
        console.error('[getgroupdp] error', e2);
        reply('❌ Failed to fetch group picture.');
      }
    }
  } catch (e) {
    console.error('[getgroupdp] error', e);
    reply('❌ Failed to get group DP.');
  }
}
break;
            case 'autostatus': {
  try {
    if (!isOwner) return reply('❌ Owner-only command.');

    const sub = (args[0] || '').toLowerCase();
    if (!sub) {
      const s = global.autostatusSettings || {};
      return reply(`╭━━━━━━━━━━━━━━━━━━━━╮\n┃ 📊 AUTO STATUS\n╰━━━━━━━━━━━━━━━━━━━━╯\n• View: ${s.enabled ? '✅ ON' : '❌ OFF'}\n• Like: ${s.likeEnabled ? '💛 ON' : '❌ OFF'}\n• OnlyFrom: ${(s.onlyFrom || []).join(', ') || '(all)'}\n\nUsage:\n.autostatus on|off\n.autostatus like on|off\n.autostatus status\n.autostatus onlyfrom <number>\n.autostatus clearonlyfrom`);
    }

    if (sub === 'on') {
      global.autostatusSettings.enabled = true;
      saveAutostatusSettings();
      return reply('✅ AutoStatus (view) enabled.');
    }

    if (sub === 'off') {
      global.autostatusSettings.enabled = false;
      saveAutostatusSettings();
      return reply('✅ AutoStatus (view) disabled.');
    }

    if (sub === 'like') {
      const val = (args[1] || '').toLowerCase();
      if (!['on','off'].includes(val)) return reply('Usage: .autostatus like on|off');
      global.autostatusSettings.likeEnabled = val === 'on';
      saveAutostatusSettings();
      return reply(`💛 AutoStatus Like: *${val.toUpperCase()}*`);
    }

    if (sub === 'status') {
      const s = global.autostatusSettings || {};
      return reply(`╭━━━━━━━━━━━━━━━━━━━━╮\n┃ 📊 AUTO STATUS STATUS\n╰━━━━━━━━━━━━━━━━━━━━╯\n• View: ${s.enabled ? '✅ ON' : '❌ OFF'}\n• Like: ${s.likeEnabled ? '💛 ON' : '❌ OFF'}\n• OnlyFrom: ${(s.onlyFrom || []).join(', ') || '(all contacts)'}`);
    }

    if (sub === 'onlyfrom') {
      const num = args.slice(1).join(' ').trim();
      if (!num) return reply('❗ Usage: .autostatus onlyfrom <number or jid>');
      const jid = num.includes('@') ? num : num.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
      global.autostatusSettings.onlyFrom = [ jid ];
      saveAutostatusSettings();
      return reply(`✅ Only auto-view statuses from: ${jid}`);
    }

    if (sub === 'clearonlyfrom') {
      global.autostatusSettings.onlyFrom = [];
      saveAutostatusSettings();
      return reply('✅ OnlyFrom cleared (now auto-views all statuses).');
    }

    return reply('❗ Unknown subcommand. Use .autostatus for usage.');
  } catch (e) {
    console.error('[autostatus case] error', e);
    try { reply('❌ Autostatus command failed.'); } catch(e) {}
  }
}
break;
            case 'group': {
  try {
    // usage: .group <subcommand> [args...]
    if (!m.isGroup) return reply('❗ This command only works in groups.');
    // require group admin or global owner
    if (!isOwner && !isAdmins) return reply('⚠️ Admins or owner only.');

    const sub = (args[0] || '').toLowerCase();
    if (!sub) {
      return reply(
`Usage:
.group open|close
.group opentime <minutes>
.group changename <name>
.group setdp   (reply to image)
.group setdesc <text>
.group link
.group revoke
.group info`
      );
    }

    // helper: try method safely with fallback names
    async function tryCall(obj, names = [], ...argsCall) {
      for (const n of names) {
        try {
          if (typeof obj[n] === 'function') {
            return await obj[n](...argsCall);
          }
        } catch (e) {
          // try next
        }
      }
      throw new Error('No supported method found: ' + names.join(', '));
    }

    // ----- OPEN / CLOSE -----
    if (sub === 'open' || sub === 'close') {
      if (!isBotAdmins) return reply('❗ I must be group admin to change settings.');

      const wantOpen = sub === 'open';
      // Baileys uses groupSettingUpdate(jid, 'not_announcement'/'announcement') in many versions
      try {
        if (wantOpen) {
          // open -> allow all to send messages
          if (typeof james.groupSettingUpdate === 'function') {
            await james.groupSettingUpdate(from, 'not_announcement');
          } else if (typeof james.groupSetting === 'function') {
            await james.groupSetting(from, 'not_announcement');
          } else {
            // fallback attempt
            await tryCall(james, ['groupSettingUpdate', 'groupSetting'], from, 'not_announcement');
          }
          return reply('✅ Group is now OPEN (members can send messages).');
        } else {
          // close -> announcement only
          if (typeof james.groupSettingUpdate === 'function') {
            await james.groupSettingUpdate(from, 'announcement');
          } else {
            await tryCall(james, ['groupSettingUpdate', 'groupSetting'], from, 'announcement');
          }
          return reply('✅ Group is now CLOSED (only admins can send messages).');
        }
      } catch (e) {
        console.error('[group open/close] error', e);
        return reply('❌ Failed to change group setting. Check bot admin status and console.');
      }
    }

    // ----- OPENTIME -----
    if (sub === 'opentime') {
      if (!isBotAdmins) return reply('❗ I must be group admin to change settings.');
      const minutes = Math.max(1, parseInt(args[1]) || 1);
      // Save current state (attempt to query group setting if possible)
      let previous = 'announcement'; // assume closed
      try {
        // best-effort: read metadata or group settings (not always available)
        const meta = await (async () => {
          try { return await james.groupMetadata(from); } catch (e) { return null; }
        })();
        // guess state: if group has property restrict? fallback to previous 'announcement' assumption
        // We'll try to set open now, then schedule revert
        await tryCall(james, ['groupSettingUpdate', 'groupSetting'], from, 'not_announcement');
        reply(`✅ Group opened for ${minutes} minute(s). Will revert after time.`);

        // schedule revert after minutes
        setTimeout(async () => {
          try {
            await tryCall(james, ['groupSettingUpdate', 'groupSetting'], from, 'announcement');
            await james.sendMessage(from, { text: `🔁 Group setting reverted to closed (announcement).` });
          } catch (err) {
            console.error('[group opentime revert] error', err);
          }
        }, minutes * 60 * 1000);
      } catch (e) {
        console.error('[group opentime] error', e);
        return reply('❌ Failed to temporarily open group.');
      }
    }

    // ----- CHANGENAME -----
    if (sub === 'changename' || sub === 'subject' || sub === 'setname') {
      if (!isBotAdmins) return reply('❗ I must be group admin to change the group name.');
      const newName = args.slice(1).join(' ').trim();
      if (!newName) return reply('❗ Provide the new group name. Usage: .group changename New Name Here');
      try {
        if (typeof james.groupUpdateSubject === 'function') {
          await james.groupUpdateSubject(from, newName);
        } else {
          await tryCall(james, ['groupUpdateSubject', 'updateSubject', 'updateGroupSubject'], from, newName);
        }
        return reply(`✅ Group name changed to:\n${newName}`);
      } catch (e) {
        console.error('[group changename] error', e);
        return reply('❌ Failed to change group name.');
      }
    }

    // ----- SET DESCRIPTION -----
    if (sub === 'setdesc' || sub === 'desc' || sub === 'setdescription') {
      if (!isBotAdmins) return reply('❗ I must be group admin to change description.');
      const desc = args.slice(1).join(' ').trim();
      if (!desc) return reply('❗ Usage: .group setdesc <text>');
      try {
        if (typeof james.groupUpdateDescription === 'function') {
          await james.groupUpdateDescription(from, desc);
        } else {
          await tryCall(james, ['groupUpdateDescription', 'groupUpdateDesc', 'updateGroupDescription'], from, desc);
        }
        return reply('✅ Group description updated.');
      } catch (e) {
        console.error('[group setdesc] error', e);
        return reply('❌ Failed to set description.');
      }
    }

    // ----- SET DP (group icon) -----
    if (sub === 'setdp' || sub === 'seticon' || sub === 'setpicture') {
      if (!isBotAdmins) return reply('❗ I must be group admin to change group icon.');
      // must reply to an image
      const quoted = m.quoted;
      if (!quoted) return reply('❗ Reply to an image with .group setdp');
      // try download: your base used m.quoted.download() elsewhere
      try {
        const media = await (async () => {
          if (quoted.download) return await quoted.download();
          if (quoted.msg && typeof quoted.msg === 'object') {
            // try using conventional download helper
            if (typeof quoted.download === 'function') return await quoted.download();
            // try falling back to quoted message's buffer (some shapes)
            if (quoted.msg.imageMessage && quoted.msg.imageMessage.jpegThumbnail) return Buffer.from(quoted.msg.imageMessage.jpegThumbnail, 'base64');
          }
          return null;
        })();

        if (!media) return reply('❌ Failed to get image from quoted message.');

        // try multiple method names
        try {
          if (typeof james.updateProfilePicture === 'function') {
            await james.updateProfilePicture(from, media);
          } else if (typeof james.groupUpdateIcon === 'function') {
            await james.groupUpdateIcon(from, media);
          } else {
            // try generic setProfilePicture or groupUpdatePicture
            await tryCall(james, ['updateProfilePicture', 'groupUpdateIcon', 'groupUpdateProfilePicture', 'setProfilePicture'], from, media);
          }
          return reply('✅ Group icon updated.');
        } catch (e) {
          console.error('[group setdp] update error', e);
          return reply('❌ Failed to update group icon. Your Baileys version might use a different method.');
        }
      } catch (e) {
        console.error('[group setdp] download error', e);
        return reply('❌ Failed to download the quoted image.');
      }
    }

    // ----- LINK / REVOKE -----
    if (sub === 'link' || sub === 'invite') {
      try {
        // many Baileys versions: groupInviteCode or groupInviteCode/joinCode
        let code = null;
        try {
          if (typeof james.groupInviteCode === 'function') code = await james.groupInviteCode(from);
          else if (typeof james.groupInviteCode === 'undefined' && typeof james.groupInvite === 'function') code = await james.groupInvite(from);
          else code = await tryCall(james, ['groupInviteCode', 'groupInvite', 'revealGroupInvite'], from);
        } catch (e) {
          // ignore
        }
        if (code && typeof code === 'string') {
          const link = `https://chat.whatsapp.com/${code}`;
          return reply(`🔗 Group invite link:\n${link}`);
        }
        // fallback: try generateInvite or getInvite
        if (typeof james.groupRevokeInvite === 'function') {
          // generate new code then inform
          try {
            const gen = await james.groupInviteCode(from);
            const link = `https://chat.whatsapp.com/${gen}`;
            return reply(`🔗 Group invite link:\n${link}`);
          } catch (e) {}
        }
        // last resort: attempt to query metadata for invite via groupMetadata?.inviteCode etc
        try {
          const meta = await james.groupMetadata(from);
          if (meta && meta.inviteCode) {
            return reply(`🔗 Group invite link:\nhttps://chat.whatsapp.com/${meta.inviteCode}`);
          }
        } catch (e) {}
        return reply('❌ Failed to fetch group invite link (bot may not have permission).');
      } catch (e) {
        console.error('[group link] error', e);
        return reply('❌ Failed to get link.');
      }
    }

    if (sub === 'revoke' || sub === 'revokeLink' || sub === 'relink') {
      if (!isBotAdmins) return reply('❗ I must be group admin to revoke invite link.');
      try {
        if (typeof james.groupRevokeInvite === 'function') {
          const res = await james.groupRevokeInvite(from);
          // res may contain inviteCode or similar
          const newCode = (res && (res.code || res.inviteCode || res.invite)) || null;
          if (newCode) return reply(`✅ Invite link revoked. New link:\nhttps://chat.whatsapp.com/${newCode}`);
          return reply('✅ Invite link revoked.');
        } else {
          await tryCall(james, ['groupRevokeInvite', 'revokeInvite', 'revokeGroupInvite'], from);
          return reply('✅ Invite link revoked (attempt).');
        }
      } catch (e) {
        console.error('[group revoke] error', e);
        return reply('❌ Failed to revoke link.');
      }
    }

    // ----- INFO -----
    if (sub === 'info') {
      try {
        const meta = await james.groupMetadata(from);
        const owner = meta?.owner || meta?.creator || meta?.creator || 'unknown';
        const subject = meta?.subject || meta?.name || '';
        const desc = meta?.desc?.toString() || meta?.description || '';
        const participants = meta?.participants?.map(p => p.id) || [];
        const adminsList = participants.filter(p => (p.admin === 'admin' || p.admin === 'superadmin')).map(p => p.id);
        const textInfo = `📌 Group Info
Name: ${subject}
Id: ${from}
Owner: ${owner}
Members: ${participants.length || 0}
Admins: ${adminsList.length || 0}
Description: ${desc ? desc.slice(0, 300) : '(none)'}`;
        return reply(textInfo);
      } catch (e) {
        console.error('[group info] error', e);
        return reply('❌ Failed to get group metadata.');
      }
    }

    // unknown subcommand
    return reply('❗ Unknown group subcommand. Use .group to see usage.');

  } catch (err) {
    console.error('[group case] unexpected error', err);
    try { reply('❌ Group command failed. Check console.'); } catch(e){}
  }
}
break;
            // ---------- antispam case ----------
case 'antispam': {
  try {
    if (!m.isGroup && !isOwner) {
      // only allow owner to configure DM antispam
      if (!isOwner) return reply('❗ Owner only for DM configuration.');
    }
    // accept: .antispam group on|off|status|set <threshold> <windowSec>
    const sub = (args[0] || '').toLowerCase();
    if (!sub || sub === 'status') {
      const cfg = getSpamConfig(from);
      return reply(`AntiSpam status for this chat:\nGroup mode: ${cfg.modeGroup}\nDM mode: ${cfg.modeDM}\nThreshold: ${cfg.threshold}\nWindow (s): ${Math.round((cfg.windowMs||60000)/1000)}\nRecords: ${Object.keys(cfg.records || {}).length}`);
    }
    if (sub === 'group' || sub === 'dm') {
      const op = (args[1] || '').toLowerCase();
      if (!['on','off','status','set'].includes(op)) return reply('Usage: .antispam group|dm on|off|set <threshold> <windowSec>');
      const cfg = getSpamConfig(from);
      if (op === 'on') {
        if (sub === 'group') cfg.modeGroup = 'on'; else cfg.modeDM = 'on';
        saveJsonSafe(ANTISPAM_FILE, global.antispamSettings);
        return reply('✅ Antispam enabled for ' + sub);
      }
      if (op === 'off') {
        if (sub === 'group') cfg.modeGroup = 'off'; else cfg.modeDM = 'off';
        saveJsonSafe(ANTISPAM_FILE, global.antispamSettings);
        return reply('✅ Antispam disabled for ' + sub);
      }
      if (op === 'set') {
        const threshold = parseInt(args[2]) || cfg.threshold;
        const windowSec = parseInt(args[3]) || Math.round((cfg.windowMs||60000)/1000);
        cfg.threshold = threshold;
        cfg.windowMs = windowSec * 1000;
        saveJsonSafe(ANTISPAM_FILE, global.antispamSettings);
        return reply(`✅ Antispam updated: threshold ${threshold}, window ${windowSec}s`);
      }
    }
  } catch (e) {
    console.error('[antispam case] error', e);
    reply('❌ Antispam command error.');
  }
}
break;

// ---------- antimedia case ----------
case 'antimedia': {
  try {
    // usage: .antimedia group on|off   OR .antimedia dm on|off
    const scope = (args[0] || '').toLowerCase();
    const op = (args[1] || '').toLowerCase();
    if (!scope || !['group','dm','status'].includes(scope)) return reply('Usage: .antimedia group|dm on|off|status');
    if (scope === 'status') {
      const cfg = getAntimediaConfig(from);
      return reply(`Antimedia for this chat:\nGroup: ${cfg.group}\nDM: ${cfg.dm}`);
    }
    if (!['on','off','status'].includes(op)) return reply('Usage: .antimedia group|dm on|off|status');
    const cfg = getAntimediaConfig(from);
    if (scope === 'group') cfg.group = op;
    else cfg.dm = op;
    saveJsonSafe(ANTIMEDIA_FILE, global.antimediaSettings);
    return reply(`✅ Antimedia ${op} for ${scope}`);
  } catch (e) {
    console.error('[antimedia case] error', e);
    reply('❌ Antimedia command error.');
  }
}
break;

// ---------- antidelete (full: on|off|group|dm|inbox|clear|status) ----------
case 'antidelete':
case 'antidel': {
  try {
    if (!isOwner) return reply('❌ Owner only.');
    const sub = (args[0] || '').toLowerCase();

    if (!sub || sub === 'help') {
      return reply(
`🗑️ *ANTIDELETE*
━━━━━━━━━━━━━━━━━━━━
.antidelete on|off       — master switch (groups + DMs)
.antidelete group on|off — group messages only
.antidelete dm on|off    — DM messages only
.antidelete inbox        — show last 15 deleted msgs
.antidelete clear        — clear inbox
.antidelete status       — current settings
━━━━━━━━━━━━━━━━━━━━`
      );
    }

    if (sub === 'on') {
      global.antideleteSettings.enabled = true;
      global.antideleteSettings.groups  = true;
      global.antideleteSettings.dm      = true;
      saveAntideleteSettings();
      return reply('✅ *AntiDelete* enabled for groups + DMs.');
    }

    if (sub === 'off') {
      global.antideleteSettings.enabled = false;
      saveAntideleteSettings();
      return reply('❌ *AntiDelete* disabled.');
    }

    if (sub === 'group') {
      const val = (args[1] || '').toLowerCase();
      if (!['on','off'].includes(val)) return reply('❗ Usage: .antidelete group on|off');
      global.antideleteSettings.groups = val === 'on';
      if (val === 'on') global.antideleteSettings.enabled = true;
      saveAntideleteSettings();
      return reply(`✅ *AntiDelete groups:* ${val.toUpperCase()}`);
    }

    if (sub === 'dm') {
      const val = (args[1] || '').toLowerCase();
      if (!['on','off'].includes(val)) return reply('❗ Usage: .antidelete dm on|off');
      global.antideleteSettings.dm = val === 'on';
      if (val === 'on') global.antideleteSettings.enabled = true;
      saveAntideleteSettings();
      return reply(`✅ *AntiDelete DMs:* ${val.toUpperCase()}`);
    }

    if (sub === 'clear') {
      global.antideleteSettings.inbox = [];
      return reply('🗑️ AntiDelete inbox cleared.');
    }

    if (sub === 'status') {
      const s = global.antideleteSettings;
      return reply(
`🗑️ *ANTIDELETE STATUS*
━━━━━━━━━━━━━━━━━━━━
• Master: ${s.enabled ? '✅ ON' : '❌ OFF'}
• Groups: ${s.groups  ? '✅ ON' : '❌ OFF'}
• DMs:    ${s.dm      ? '✅ ON' : '❌ OFF'}
• Cached: ${(s.inbox || []).length} messages
━━━━━━━━━━━━━━━━━━━━`
      );
    }

    if (sub === 'inbox') {
      const inbox = global.antideleteSettings.inbox || [];
      if (!inbox.length) return reply('📭 AntiDelete inbox is empty.');
      const lines = inbox.slice(-15).reverse().map((e, i) => {
        const t       = new Date(e.time).toLocaleTimeString();
        const num     = e.sender ? e.sender.split('@')[0] : '?';
        const grp     = e.from?.endsWith('@g.us') ? '👥' : '💬';
        const preview = (e.content || e.caption || '[media]').slice(0, 60);
        return `${i + 1}. ${grp} *+${num}* [${t}]\n   _${preview}_`;
      });
      return reply(
        `🗑️ *ANTIDELETE INBOX* (last ${lines.length})\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        lines.join('\n\n') +
        `\n━━━━━━━━━━━━━━━━━━━━`
      );
    }

    return reply('❓ Unknown subcommand. Use *.antidelete help*');
  } catch (e) {
    console.error('[antidelete case] error', e);
    reply('❌ Antidelete command error.');
  }
}
break;
            case 'autoblock': {
  try {
    // only bot owner can configure
    if (!isOwner) return reply('❌ Owner-only command.');

    const sub = (args[0] || '').toLowerCase();
    if (!sub) {
      const s = global.autoblockSettings || {};
      return reply(`🔒 Autoblock\n• enabled: ${!!s.enabled}\n• mode: ${s.mode}\n• whitelist: ${(s.whitelist||[]).join(', ') || '(none)'}\n\nUsage:\n.autoblock on|off\n.autoblock mode silent|notify\n.autoblock whitelist add|remove|list <number>`);
    }

    if (sub === 'on') {
      global.autoblockSettings.enabled = true;
      saveAutoblockSettings();
      return reply('✅ Autoblock enabled.');
    }

    if (sub === 'off') {
      global.autoblockSettings.enabled = false;
      saveAutoblockSettings();
      return reply('✅ Autoblock disabled.');
    }

    if (sub === 'mode') {
      const m2 = (args[1] || '').toLowerCase();
      if (!['silent','notify'].includes(m2)) return reply('❗ Usage: .autoblock mode silent|notify');
      global.autoblockSettings.mode = m2;
      saveAutoblockSettings();
      return reply(`✅ Mode set to ${m2}`);
    }

    if (sub === 'whitelist') {
      const op = (args[1] || '').toLowerCase();
      if (!op) return reply('❗ Usage: .autoblock whitelist add|remove|list <number>');
      if (op === 'list') {
        return reply(`🔖 Whitelist:\n${(global.autoblockSettings.whitelist || []).join('\n') || '(none)'}`);
      }
      if (op === 'add') {
        const num = args[2];
        if (!num) return reply('❗ Usage: .autoblock whitelist add <number>');
        const norm = normalizePhone(num);
        if (!norm) return reply('❗ Invalid number.');
        if (!global.autoblockSettings.whitelist.includes(norm)) global.autoblockSettings.whitelist.push(norm);
        saveAutoblockSettings();
        return reply(`✅ Added ${norm} to whitelist.`);
      }
      if (op === 'remove') {
        const num = args[2];
        if (!num) return reply('❗ Usage: .autoblock whitelist remove <number>');
        const norm = normalizePhone(num);
        global.autoblockSettings.whitelist = (global.autoblockSettings.whitelist || []).filter(x => normalizePhone(x) !== norm);
        saveAutoblockSettings();
        return reply(`✅ Removed ${norm} from whitelist.`);
      }
      return reply('❗ Unknown whitelist op. Use add|remove|list.');
    }

    return reply('❗ Unknown subcommand. Usage:\n.autoblock on|off\n.autoblock mode silent|notify\n.autoblock whitelist add|remove|list <number>');
  } catch (e) {
    console.error('[autoblock case] error', e);
    try { reply('❌ Autoblock command error.'); } catch (e2) {}
  }
}
break;
            case 'antilink': {
  try {
    // only group admins or owner can configure per-group
    if (!m.isGroup) return reply('❗ This command only works in groups.');
    if (!isOwner && !isAdmins) return reply('⚠️ Owner or group admin only.');

    const sub = (args[0] || '').toLowerCase();
    const cfg = getAntiConfig(from);

    if (!sub) {
      return reply(`🔧 AntiLink settings for this chat:\n• mode: ${cfg.mode}\n• threshold: ${cfg.threshold}\n• warns stored: ${Object.keys(cfg.warns||{}).length}\n\nUsage:\n.antilink on|off\n.antilink mode warn|delete|kick|off\n.antilink threshold <N>\n.antilink resetwarns\n.antilink clear`);
    }

    if (sub === 'on') {
      cfg.mode = 'warn';
      saveAntiLinkSettings();
      return reply('✅ AntiLink enabled (default mode: warn). Use .antilink mode <warn|delete|kick> to change.');
    }

    if (sub === 'off') {
      cfg.mode = 'off';
      saveAntiLinkSettings();
      return reply('✅ AntiLink disabled for this group.');
    }

    if (sub === 'mode') {
      const m2 = (args[1] || '').toLowerCase();
      if (!['warn','delete','kick','off'].includes(m2)) return reply('❗ Usage: .antilink mode warn|delete|kick|off');
      cfg.mode = m2;
      if (!cfg.threshold) cfg.threshold = 3;
      saveAntiLinkSettings();
      return reply(`✅ Mode set to ${m2}`);
    }

    if (sub === 'threshold') {
      const n = parseInt(args[1]);
      if (!n || n < 1) return reply('❗ Usage: .antilink threshold <positive number>');
      cfg.threshold = n;
      saveAntiLinkSettings();
      return reply(`✅ Threshold set to ${n}`);
    }

    if (sub === 'resetwarns') {
      cfg.warns = {};
      saveAntiLinkSettings();
      return reply('✅ Warns reset for this group.');
    }

    if (sub === 'clear') {
      delete global.antiLinkSettings[from];
      saveAntiLinkSettings();
      return reply('✅ AntiLink configuration removed for this group.');
    }

    return reply('❗ Unknown subcommand. See .antilink for usage.');

  } catch (err) {
    console.error('[antilink case] error', err);
    try { reply('❌ An error occurred.'); } catch(e){}
  }
}
break;      
            case 'autoreply': {
  try {
    // Only owner may change settings
    if (!isOwner) return reply('❌ Owner-only command.');

    const sub = args[0] ? args[0].toLowerCase() : null;

    if (!sub) {
      return reply('Usage:\n.autoreply on|off\n.autoreply set <sticker_url_or_local_path>\n.autoreply info');
    }

    if (sub === 'on') {
      global.autoreplySettings.enabled = true;
      saveAutoreplySettings();
      return reply('✅ Autoreply enabled (will send sticker when owners are mentioned in groups).');
    }

    if (sub === 'off') {
      global.autoreplySettings.enabled = false;
      saveAutoreplySettings();
      return reply('✅ Autoreply disabled.');
    }

    if (sub === 'set') {
      const url = args.slice(1).join(' ').trim();
      if (!url) return reply('❗ Usage: .autoreply set <sticker_url_or_local_path>\nExample: .autoreply set https://i.ibb.co/abc/your-sticker.webp');
      global.autoreplySettings.sticker = url;
      saveAutoreplySettings();
      return reply(`✅ Autoreply sticker updated:\n${url}`);
    }

    if (sub === 'info') {
      const s = global.autoreplySettings || {};
      return reply(`🔧 Autoreply settings\n• enabled: ${!!s.enabled}\n• sticker: ${s.sticker || '(none)'}\n• owners: ${getOwnerJids().map(j => j.split('@')[0]).join(', ') || '(none)'}`);
    }

    // fallback
    return reply('Unknown subcommand. Usage:\n.autoreply on|off\n.autoreply set <sticker_url_or_local_path>\n.autoreply info');

  } catch (err) {
    console.error('[autoreply case] error', err);
    try { reply('❌ Autoreply command error.'); } catch (e) {}
  }
}
break;     
case 'autobio': {
  if (!isOwner) return reply('Owner only.');
  const sub = (args[0] || '').toLowerCase();

  if (!sub) {
    return reply(
      `Autobio commands:\n` +
      `.autobio on|off — enable/disable\n` +
      `.autobio add <text> — add template (placeholders: {uptime} {platform} {userCount} {owner})\n` +
      `.autobio list — list templates\n` +
      `.autobio rm <index> — remove template (1-based index)\n` +
      `.autobio interval <seconds> — set interval in seconds\n` +
      `.autobio debug on|off — enable debug logs`
    );
  }

  try {
    if (sub === 'on') {
      global.autobio.enabled = true;
      startAutoBio(james, store).catch(()=>{});
      return reply('✅ Autobio enabled.');
    }

    if (sub === 'off') {
      global.autobio.enabled = false;
      stopAutoBio();
      return reply('✅ Autobio disabled.');
    }

    if (sub === 'add') {
      const tpl = text.split(' ').slice(1).join(' ').trim();
      if (!tpl) return reply('Usage: .autobio add Your bio template here');
      global.autobio.templates.push(tpl);
      return reply(`✅ Template added (#${global.autobio.templates.length}):\n${tpl}`);
    }

    if (sub === 'list') {
      if (!global.autobio.templates.length) return reply('No templates set.');
      const list = global.autobio.templates.map((t, i) => `${i+1}. ${t}`).join('\n\n');
      return reply(`Templates:\n\n${list}`);
    }

    if (sub === 'rm') {
      const idx = parseInt(args[1]);
      if (!idx || idx < 1 || idx > global.autobio.templates.length) return reply('Usage: .autobio rm <index>');
      const removed = global.autobio.templates.splice(idx-1, 1);
      return reply(`✅ Removed template #${idx}: ${removed[0]}`);
    }

    if (sub === 'interval') {
      const sec = Number(args[1]);
      if (!sec || sec <= 0) return reply('Usage: .autobio interval <seconds>');
      global.autobio.interval = Math.max(5000, Math.floor(sec * 1000));
      // restart timer if running
      if (global.autobio.enabled) {
        startAutoBio(james, store).catch(()=>{});
      }
      return reply(`✅ Interval set to ${sec} seconds.`);
    }

    if (sub === 'debug') {
      const val = (args[1] || '').toLowerCase();
      if (!['on','off'].includes(val)) return reply('Usage: .autobio debug on|off');
      global.autobio.debug = (val === 'on');
      return reply(`✅ Debug ${global.autobio.debug ? 'enabled' : 'disabled'}`);
    }

    return reply('Unknown subcommand. Use .autobio without args to see usage.');
  } catch (err) {
    console.error('[autobio case] error', err);
    return reply('❌ An error occurred while processing autobio command.');
  }
}
break;

case 'genimg':
  try {
    const axios = require('axios');

    // user prompt (don't shadow this name later)
    const prompt = (q || text || '').trim();
    if (!prompt) return reply('❌ Usage: .text2img <prompt>\nExample: .text2img cute girl with blue hair');

    const quotedForSend = (typeof loli !== 'undefined' && loli) ? loli : m;

    await reply('CYBERPUNK-BULLY is ready. Generating image... this can take a few seconds.');

    const apiUrl = `https://text-to-img.apis-bj-devs.workers.dev/?prompt=${encodeURIComponent(prompt)}`;

    // Try to GET the resource as binary first
    let resp;
    try {
      resp = await axios.get(apiUrl, { responseType: 'arraybuffer', timeout: 120000 });
    } catch (err) {
      // if request fails, attempt a GET as JSON (some proxies return JSON with url)
      try {
        const r2 = await axios.get(apiUrl, { timeout: 20000 });
        if (r2 && r2.data) {
          const maybeUrl = (typeof r2.data === 'string' && /^https?:\/\//.test(r2.data)) ? r2.data : (r2.data.url || r2.data.image || null);
          if (maybeUrl) {
            resp = await axios.get(maybeUrl, { responseType: 'arraybuffer', timeout: 120000 });
          } else {
            throw new Error('API returned no image URL.');
          }
        } else {
          throw new Error('No response from API.');
        }
      } catch (err2) {
        console.error('[text2img] both binary + json attempts failed', err, err2);
        return reply('💥 Failed to generate image. API unreachable or returned unexpected data.');
      }
    }

    // If we have a binary response, validate content-type
    const contentType = (resp.headers && (resp.headers['content-type'] || resp.headers['Content-Type'])) || '';
    const buffer = Buffer.from(resp.data || resp);

    if (/^image\/.*/i.test(contentType) && buffer.length > 0) {
      const MAX_IMG_SEND = 10 * 1024 * 1024; // 10 MB safe limit
      if (buffer.length <= MAX_IMG_SEND) {
        await james.sendMessage(m.chat, {
          image: buffer,
          caption: `🖼️ Generated image for: ${prompt}`.slice(0, 1000)
        }, { quoted: quotedForSend });
      } else {
        await james.sendMessage(m.chat, {
          document: buffer,
          fileName: `image-${Date.now()}.png`,
          mimetype: contentType || 'image/png',
          caption: `🖼️ Generated image (sent as file) for: ${prompt}`.slice(0, 1000)
        }, { quoted: quotedForSend });
      }
      return;
    }

    // If we didn't get an image binary, try to extract a URL from returned buffer/text
    const respText = buffer.toString('utf8'); // renamed to avoid shadowing user's `text`
    const urlMatch = respText.match(/https?:\/\/[^\s"'<>]+/);
    if (urlMatch) {
      const imageUrl = urlMatch[0];
      try {
        await james.sendMessage(m.chat, { image: { url: imageUrl }, caption: `🖼️ Generated image for: ${prompt}` }, { quoted: quotedForSend });
        return;
      } catch (e) {
        console.warn('[text2img] sending by URL failed, will reply link', e);
        return reply(`✅ Generated (link): ${imageUrl}`);
      }
    }

    console.error('[text2img] unknown response shape, headers:', resp.headers);
    return reply('❌ Could not parse image from API response.');

  } catch (err) {
    console.error('[text2img] unexpected error', err);
    try { reply('💥 Error generating image.'); } catch (e) {}
  }
break;

case 'quoteimg':
case 'inspiro': {
  try {
    const axios = require('axios');
    const quotedForSend = (typeof loli !== 'undefined' && loli) ? loli : m;
    const api = 'https://apiskeith.vercel.app/random/inspirobot';

    // optional quick ack
    // await reply('🔎 Getting a random quote image...');

    const res = await axios.get(api, { timeout: 20000 });
    const data = res.data;

    // Defensive extraction of URL (support multiple shapes)
    let imageUrl = null;
    if (!data) imageUrl = null;
    else if (typeof data === 'string' && /^https?:\/\//.test(data)) imageUrl = data;
    else if (typeof data.url === 'string') imageUrl = data.url;
    else if (typeof data.image === 'string') imageUrl = data.image;
    else if (data.result && typeof data.result === 'string') imageUrl = data.result;
    else {
      // if the API returned an object with nested fields, try to find an http string
      const flat = JSON.stringify(data);
      const match = flat.match(/https?:\/\/[^"']+/);
      if (match) imageUrl = match[0];
    }

    if (!imageUrl) {
      console.warn('[quoteimg] no image URL found in API response:', data);
      return reply('❌ Could not get a quote image right now. Try again later.');
    }

    try {
      await james.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: `💬 Random quote image`
      }, { quoted: quotedForSend });
    } catch (sendErr) {
      console.warn('[quoteimg] failed to send image, sending link instead', sendErr);
      try {
        await james.sendMessage(m.chat, { text: `Here you go: ${imageUrl}` }, { quoted: quotedForSend });
      } catch (e) {
        console.error('[quoteimg] fallback send failed', e);
      }
    }
  } catch (err) {
    console.error('[quoteimg] error', err);
    try { reply('💥 Error fetching quote image.'); } catch(e){}
  }
}
break;

case 'autoread': {
  try {
    if (!isOwner) return reply('❌ Owner only.');

    // usage: .autoread gc on  OR  .autoread dm off
    const what = (args[0] || '').toLowerCase(); // 'gc' or 'dm'
    const mode = (args[1] || '').toLowerCase(); // 'on' or 'off'

    if (!['gc','dm'].includes(what)) return reply('Usage: .autoread gc|dm on|off');

    if (!['on','off'].includes(mode)) return reply(`Usage: .autoread ${what} on|off`);

    if (what === 'gc') {
      global.autoread_gc = (mode === 'on');
      saveSettings();
      return reply(`✅ Auto-read for groups is now *${global.autoread_gc ? 'ON' : 'OFF'}*`);
    } else {
      global.autoread_dm = (mode === 'on');
      saveSettings();
      return reply(`✅ Auto-read for DMs is now *${global.autoread_dm ? 'ON' : 'OFF'}*`);
    }
  } catch (e) {
    console.error('autoread case error', e);
    try { reply('❌ Failed to change autoread.'); } catch(e){}
  }
}
break;
// allow custom cases to run (must be placed inside your switch, before default)

// ---------------- Admin file / case helpers ----------------

case 'getfile': {
  try {
    if (!isOwner) return reply('Owner only.');
    if (!args.length) return reply(`Usage: ${prefix + command} <relative/path/to/file>`);

    const fs = require('fs');
    const path = require('path');

    // safe root = bot folder
    const root = path.resolve(__dirname);
    const rel = args.join(' ').trim();
    if (!rel) return reply('Specify a file path relative to bot root.');

    // normalize and protect against traversal
    const targetPath = path.resolve(root, rel);
    if (!targetPath.startsWith(root)) return reply('Access denied.');

    if (!fs.existsSync(targetPath)) return reply('File not found.');
    const stat = fs.statSync(targetPath);
    if (stat.isDirectory()) return reply('Path is a directory. Use ls to list.');

    const buf = fs.readFileSync(targetPath);
    const fileName = path.basename(targetPath);

    await james.sendMessage(m.chat, {
      document: buf,
      fileName,
      mimetype: 'application/octet-stream'
    });
  } catch (e) {
    console.error('getfile error', e);
    reply('Error sending file: ' + (e.message || e));
  }
}
break;

case "sc":
case "repo": {
  try {
    // direct productMessage — NO config used
    await james.sendMessage(m.chat, {
      productMessage: {
        title: "CYBERPUNK-BULLY",
        description: "ᴏꜰꜰɪᴄɪᴀʟ ᴄᴏʀᴇ.",
        thumbnail: { url: "https://files.catbox.moe/7dp07q.jpg" },
        productId: "PROD001",
        retailerId: "RETAIL001",
        url: "https://t.me/cyberpunkbully",
        body: " ᴀɴ ᴀᴅᴠᴀɴᴄᴇᴅ, ᴍᴜʟᴛɪ-ᴘʟᴀᴛꜰᴏʀᴍ ᴀꜱꜱɪꜱᴛᴀɴᴛ ᴅᴇꜱɪɢɴᴇᴅ ᴛᴏ ᴀᴜᴛᴏᴍᴀᴛᴇ ᴛᴀꜱᴋꜱ ᴀɴᴅ ᴘʀᴏᴠɪᴅᴇ Qᴜɪᴄᴋ ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ",
        footer: "©devnick", // plain text only
        priceAmount1000: 00,
        currencyCode: "$",
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "PAIR NOW",
              url: " https://t.me/cyberpunkbuylly04_bot"
            })
          }
        ]
      }
    }, { quoted: m });
  } catch (err) {
    console.error('productMessage failed:', err?.message || err);

    // fallback: standard URL button message
    try {
      await james.sendMessage(m.chat, {
        text: "S P E C T R E:",
        footer: "Andromeda",
        templateButtons: [
          { index: 1, urlButton: { displayText: "Get Bot", url: "https://whatsapp.com/channel/029VbBhdUj7dmegniqCar37" } }
        ]
      }, { quoted: m });
    } catch (secondErr) {
      console.error('fallback also failed:', secondErr);
      await james.sendMessage(m.chat, { text: "script : https://whatsapp.com/channel/009VbBhdUj7dmegniqCar37" }, { quoted: m });
    }
  }
}
break;
case 'autoreact': {
  try {
    // owner-only
    if (!isOwner) return reply('Owner only.');
    if (!args.length) return reply(`Usage: ${prefix + command} dm on|off  OR  ${prefix + command} group on|off`);

    const mode = args[0].toLowerCase(); // 'dm' or 'group'
    const action = (args[1] || '').toLowerCase(); // 'on' or 'off'
    if (!['dm','group'].includes(mode)) return reply(`Invalid usage 
    Example: autoreact group on/off 
    aautoreact dm on/off`);
    if (!['on','off'].includes(action)) return reply(`Invalid usage. Use: on or off`);

    // ensure globals exist
    if (typeof global.autoReact_dm === 'undefined') global.autoReact_dm = false;
    if (typeof global.autoReact_group === 'undefined') global.autoReact_group = false;

    if (mode === 'dm') {
      global.autoReact_dm = (action === 'on');
      return reply(`✅ AutoReact (DM) is now for ${global.autoReact_dm ? 'ON' : 'OFF'}`);
    } else {
      global.autoReact_group = (action === 'on');
      return reply(`✅ AutoReact (GROUP) is now for ${global.autoReact_group ? 'ON' : 'OFF'}`);
    }
  } catch (e) {
    console.error('autoreact case error', e);
    reply('Error toggling autoreact.');
  }
}
break;

// ---------------- AUTO RECORDING ----------------
case 'autorecording': {
  if (!isOwner) return m.reply("you must be the owner first")
  if (!args.length) return reply(`Example: ${prefix + command} on/off`);
  const arg = args[0].toLowerCase();
  if (arg === 'on') {
    global.autoRecording = true;
    reply(`✅ autoRecording set to ON`);
  } else if (arg === 'off') {
    global.autoRecording = false;
    reply(`✅ autoRecording set to OFF`);
  } else reply(`Usage: ${prefix + command} on|off`);
}
break;

// ---------------- AUTO TYPING ----------------
case 'autotyping': {
  if (!isOwner) return m.reply("you must be the owner first")
  if (!args.length) return reply(`Example: ${prefix + command} on/off`);
  const arg = args[0].toLowerCase();
  if (arg === 'on') {
    global.autoTyping = true;
    reply(`✅ autoTyping set to ON`);
  } else if (arg === 'off') {
    global.autoTyping = false;
    reply(`✅ autoTyping set to OFF`);
  } else reply(`Usage: ${prefix + command} on|off`);
}
break;

// ---------------- AUTO RECORD TYPE (random between typing/recording) ----------------
case 'autorecordtype': {
if (!isOwner) return m.reply("you must be the owner first")
  if (!args.length) return reply(`Example: ${prefix + command} on/off`);
  const arg = args[0].toLowerCase();
  if (arg === 'on') {
    global.autorecordtype = true;
    // optionally disable the simple flags to avoid double sends
    global.autoRecording = false;
    global.autoTyping = false;
    reply(`✅ autorecordtype set to ON`);
  } else if (arg === 'off') {
    global.autorecordtype = false;
    reply(`✅ autorecordtype set to OFF`);
  } else reply(`Usage: ${prefix + command} on|off`);
}
break;

// ---------------- AUTO STATUS VIEW ----------------
case 'autoswview':
case 'autostatusview': {
  if (!isOwner) return m.reply("you must be the owner first")
  if (!args.length) return reply('Example: ' + prefix + command + ' on/off');
  const arg = args[0].toLowerCase();
  if (arg === 'on') {
    global.autoswview = true;
    reply(`✅ ${command} is enabled`);
  } else if (arg === 'off') {
    global.autoswview = false;
    reply(`✅ ${command} is disabled`);
  } else reply(`Usage: ${prefix + command} on|off`);
}
break;
case 'removebg': {
  try {
    const axios = require('axios');
    const FormData = require('form-data');
    const fs = require('fs');
    const path = require('path');
    const { tmpdir } = require('os');

    // 1) get the media message (reply or current)
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage || m.message;
    const media = quoted.imageMessage || quoted.documentMessage || null;
    if (!media) return reply('❗ Reply to a photo (or send a photo with the command) to remove the background.');

    // 2) download into buffer
    const mediaType = 'image'; // use image stream
    const stream = await downloadContentFromMessage(media, mediaType).catch(e => null);
    if (!stream) return reply('❌ Failed to download the image.');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    if (!buffer || buffer.length === 0) return reply('❌ Downloaded image is empty.');

    // 3) prepare upload to removebg endpoint
    await reply('🧹 Uploading image to remove background service...');

    const form = new FormData();
    // field name = image (best-effort). If API expects another name change here.
    form.append('image', buffer, { filename: `removebg_${Date.now()}.jpg`, contentType: media.mimetype || 'image/jpeg' });

    // POST multipart
    const apiUrl = 'https://aliceeapis.my.id/tools/removebg';
    const apiRes = await axios.post(apiUrl, form, {
      headers: { ...form.getHeaders() },
      responseType: 'arraybuffer', // try to accept binary too
      timeout: 120000
    }).catch(err => {
      // if binary failed, try to read JSON error
      if (err && err.response && err.response.data) return err.response;
      throw err;
    });

    // 4) Interpret response: could be image binary or JSON with url/base64
    let resultBuffer = null;
    let resultUrl = null;
    let parsedJson = null;

    const contentType = (apiRes.headers && apiRes.headers['content-type']) ? apiRes.headers['content-type'] : '';

    // If response is image
    if (/image\/(png|jpeg|webp)/i.test(contentType)) {
      resultBuffer = Buffer.from(apiRes.data);
    } else {
      // try to parse JSON from returned buffer
      try {
        const txt = Buffer.from(apiRes.data).toString('utf8');
        parsedJson = JSON.parse(txt);
      } catch (e) {
        // Not JSON — treat as binary anyway
        resultBuffer = Buffer.from(apiRes.data);
      }

      // if JSON, try to find image link or base64
      if (parsedJson) {
        // common shapes: { status: true, result: { url: '...' } } or { data: 'base64...' } or { url: '...' }
        resultUrl = parsedJson?.result?.url || parsedJson?.url || parsedJson?.data?.url || parsedJson?.image || parsedJson?.result || null;

        // base64 field
        const base64Field = parsedJson?.base64 || parsedJson?.image_base64 || parsedJson?.b64;
        if (base64Field && typeof base64Field === 'string') {
          // strip data: prefix if present
          const b = base64Field.replace(/^data:\w+\/\w+;base64,/, '');
          resultBuffer = Buffer.from(b, 'base64');
        }
      }
    }

    // 5) If we only got a URL, download it
    if (!resultBuffer && resultUrl && /^https?:\/\//i.test(resultUrl)) {
      try {
        const dl = await axios.get(resultUrl, { responseType: 'arraybuffer', timeout: 120000 });
        resultBuffer = Buffer.from(dl.data);
      } catch (e) {
        console.error('Failed to download result URL:', e?.message || e);
      }
    }

    // 6) If still nothing, error out
    if (!resultBuffer) {
      console.error('removebg: no result buffer, parsedJson:', parsedJson);
      return reply('❌ Failed to get processed image from API. Check logs.');
    }

    // 7) send resulting image back
    const tmpPath = path.join(tmpdir(), `removebg_${Date.now()}.png`);
    fs.writeFileSync(tmpPath, resultBuffer);

    await james.sendMessage(m.chat, { image: fs.readFileSync(tmpPath), caption: '🧾 Background removed' }, { quoted: m }).catch(()=>{});
    try { fs.unlinkSync(tmpPath); } catch (e){}

    // 8) send channel link button (template message) — adjust channelLink if you want a different one
    const channelLink = 'https://whatsapp.com/channel/002VaXaqHII1Bsd3g';
    try {
      const template = {
        templateMessage: {
          hydratedTemplate: {
            hydratedContentText: 'Result ready — open channel for updates',
            hydratedFooterText: 'Powered by CYBERPUNK-BULLY',
            hydratedButtons: [
              { urlButton: { displayText: 'Open Channel', url: channelLink } },
              { quickReplyButton: { displayText: 'Copy Channel Link', id: `copy_${channelLink}` } }
            ]
          }
        }
      };
      const waMsg = generateWAMessageFromContent(m.chat, template, { quoted: m });
      await james.relayMessage(m.chat, waMsg.message, { messageId: waMsg.key.id });
    } catch (e) {
      // fallback plain text with link if template fails
      await james.sendMessage(m.chat, { text: `Channel: ${channelLink}` }, { quoted: m });
    }

  } catch (err) {
    console.error('removebg error:', err);
    try { reply('❌ removebg failed: ' + (err.message || err)); } catch(e){}
  }
}
break;
case "script":
case "sc": {
  try {
    // direct productMessage — NO config used
    await james.sendMessage(m.chat, {
      productMessage: {
        title: "𝗔𝗡𝗜𝗠𝗘 𝗠𝗔𝗥𝗞𝗘𝗧𝗣𝗟𝗔Ç𝗘",
        description: "This is the official script release.",
        thumbnail: { url: "https://files.catbox.moe/9m8z4i.jpeg" },
        productId: "PROD001",
        retailerId: "RETAIL001",
        url: "https://github.com/james",
        body: "the script of anime md is only available at above price/n to buy tap button below",
        footer: "james modz", // plain text only
        priceAmount1000: 77777,
        currencyCode: "KSH",
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "Buy script",
              url: "https://wa.me/message/254788409105"
            })
          }
        ]
      }
    }, { quoted: m });
  } catch (err) {
    console.error('productMessage failed:', err?.message || err);

    // fallback: standard URL button message
    try {
      await james.sendMessage(m.chat, {
        text: "anime script is here:",
        footer: "Powered by CYBERPUNK-BULLY",
        templateButtons: [
          { index: 1, urlButton: { displayText: "Get Bot", url: "https://whatsapp.com/channel/0029VhdUj7dmegniqCar37" } }
        ]
      }, { quoted: m });
    } catch (secondErr) {
      console.error('fallback also failed:', secondErr);
      await james.sendMessage(m.chat, { text: "script : https://whatsapp.com/channel/00VbBhdUj7dmegniqCar37" }, { quoted: m });
    }
  }
}
break;
case 'ai': {
  const prompt = (q || text || '').trim()
  if (!prompt) return reply(`❌ Usage: ${prefix}ai <question>\nExample: ${prefix}ai What is anime?`)

  try {
    james.sendMessage(m.chat, { react: { text: '🤖', key: m.key } })

    let answer = null

    // Primary: chateverywhere.app GPT-4 (from AlyaAI)
    try {
      const r1 = await axios.post('https://chateverywhere.app/api/chat/', {
        model: {
          id: 'gpt-4',
          name: 'GPT-4',
          maxLength: 32000,
          tokenLimit: 8000,
          completionTokenLimit: 5000,
          deploymentName: 'gpt-4'
        },
        messages: [{ pluginId: null, content: prompt, role: 'user' }],
        prompt: `Your name is CYBERPUNK-BULLY. You are a helpful WhatsApp bot assistant. Answer clearly and concisely.`,
        temperature: 0.5
      }, {
        headers: {
          'Accept': '*/*',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
        },
        timeout: 25000
      })
      if (r1.data && typeof r1.data === 'string' && r1.data.trim()) {
        answer = r1.data.trim()
      } else if (r1.data && r1.data.content) {
        answer = r1.data.content.trim()
      }
    } catch (e) {}

    // Fallback 1: elxyzgpt character-ai (from alya)
    if (!answer) {
      try {
        const encodedPushname = encodeURIComponent(pushname)
        const encodedText = encodeURIComponent(prompt)
        const r2 = await axios.get(
          `https://api.elxyzgpt.xyz/ai/character-ai?apikey=KC-d25a3f0c02be4021&character=You+are+SPECTRE,+a+helpful+WhatsApp+bot+assistant.+Answer+clearly.&text=${encodedText}`,
          { timeout: 20000 }
        )
        const d2 = r2.data
        answer = d2?.result || d2?.response || d2?.answer || d2?.message || (typeof d2 === 'string' ? d2 : null)
        if (answer) answer = String(answer).trim()
      } catch (e) {}
    }

    // Fallback 2: free GET endpoints
    if (!answer) {
      const endpoints = [
        { url: 'https://apis.davidcyriltech.my.id/ai/gemini', key: 'text' },
        { url: 'https://apis.davidcyriltech.my.id/blackbox', key: 'q' },
        { url: 'https://apis.davidcyriltech.my.id/ai/chatbot', key: 'query' }
      ]
      for (const ep of endpoints) {
        try {
          const res = await axios.get(ep.url, { params: { [ep.key]: prompt }, timeout: 18000 })
          const d = res.data
          if (!d) continue
          const candidate = d?.result || d?.response || d?.answer || d?.message || d?.output || d?.text || (typeof d === 'string' ? d : null)
          if (candidate) { answer = String(candidate).trim(); break }
        } catch (e) { continue }
      }
    }

    if (!answer) {
      james.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
      return reply('❌ All AI endpoints failed. Try again later.')
    }

    james.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    reply(answer)

  } catch (err) {
    james.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    console.error('AI command error:', err)
    reply('❌ Error: ' + (err.message || err))
  }
}
break;


case 'play2':
case 'spotify': {
  // Spotify music search and download
  try {
    if (!text) {
      return m.reply('Usage: .spotify <song/artist/keywords or Spotify URL>\nExample: .spotify Faded\nExample: .spotify https://open.spotify.com/track/...');
    }

    // Check if input is a Spotify URL
    const isSpotifyUrl = text.includes('open.spotify.com/track/');
    
    let audioUrl, trackInfo;

    if (isSpotifyUrl) {
      // Use downloader API for direct Spotify links
      const apiUrl = `https://casper-tech-apis.vercel.app/api/downloader/sportify?url=${encodeURIComponent(text)}`;
      const { data } = await axios.get(apiUrl, { 
        timeout: 20000, 
        headers: { 'user-agent': 'Mozilla/5.0' } 
      });

      if (!data?.success || !data?.track) {
        throw new Error('No result from Spotify downloader API');
      }

      const track = data.track;
      audioUrl = track.audio?.url;
      trackInfo = {
        title: track.title || 'Unknown Title',
        artist: track.artist || 'Unknown Artist',
        duration: track.duration || '',
        thumbnail: track.thumbnail || track.album?.cover,
        spotifyUrl: track.spotify_url || text
      };

    } else {
      // Use search API for queries
      const apiUrl = `https://casper-tech-apis.vercel.app/api/play/sportify?q=${encodeURIComponent(text)}`;
      const { data } = await axios.get(apiUrl, { 
        timeout: 20000, 
        headers: { 'user-agent': 'Mozilla/5.0' } 
      });

      if (!data?.success || !data?.results || data.results.length === 0) {
        throw new Error('No results found for this query');
      }

      // Get the first (best match) result
      const result = data.results[0];
      audioUrl = result.download_url;
      trackInfo = {
        title: result.title || result.name || 'Unknown Title',
        artist: result.artists?.join(', ') || result.artist || 'Unknown Artist',
        duration: result.duration?.formatted || '',
        thumbnail: result.thumbnail || result.album?.cover,
        spotifyUrl: result.spotify_url,
        album: result.album?.name,
        popularity: result.popularity
      };
    }

    if (!audioUrl) {
      return m.reply('No downloadable audio found for this query.');
    }

    // Build caption
    let caption = `🎵 *${trackInfo.title}*\n👤 ${trackInfo.artist}`;
    if (trackInfo.album) caption += `\n💿 ${trackInfo.album}`;
    if (trackInfo.duration) caption += `\n⏱ ${trackInfo.duration}`;
    if (trackInfo.popularity) caption += `\n📊 Popularity: ${trackInfo.popularity}%`;
    caption += `\n🔗 ${trackInfo.spotifyUrl}`;

    // Send thumbnail with caption
    if (trackInfo.thumbnail) {
      await james.sendMessage(m.chat, { 
        image: { url: trackInfo.thumbnail }, 
        caption 
      }, { quoted: loli });
    } else {
      await m.reply(caption);
    }

    // Send audio file
    const filename = trackInfo.title.replace(/[\\/:*?"<>|]/g, '');
    await james.sendMessage(m.chat, {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg',
      fileName: `${filename}.mp3`
    }, { quoted: loli });

  } catch (error) {
    console.error('[SPOTIFY] error:', error?.message || error);
    const errorMsg = error?.response?.data?.message || error?.message || 'Unknown error';
    await m.reply(`❌ Failed to fetch Spotify audio.\nError: ${errorMsg}\n\nTry another query or check the URL.`);
  }
}
break;
// ---------- tourl: upload replied media and return a public link ----------
case 'tourl': {
  try {
    const axios = require('axios');
    const FormData = require('form-data');

    // Must reply to a media message
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage || m.message;
    const mediaMsg = quoted.imageMessage || quoted.videoMessage || quoted.audioMessage || quoted.documentMessage || quoted.stickerMessage || null;
    if (!mediaMsg) return reply('❗ Reply to an image/video/audio/document/sticker to upload and get a Catbox URL.');

    await reply('📤 Downloading media...');

    // download media into buffer (use your baileys helper)
    const mediaType = (mediaMsg.mimetype || '').split('/')[0] || 'file';
    const stream = await downloadContentFromMessage(mediaMsg, mediaType).catch(e => { throw new Error('Failed to download media.'); });
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    if (!buffer || buffer.length === 0) throw new Error('Downloaded media is empty.');

    // prepare filename and content type
    const origName = (mediaMsg.fileName || mediaMsg.caption || '').toString().replace(/\r?\n/g,' ').trim();
    const extGuess = (() => {
      if (mediaMsg.mimetype) return '.' + mediaMsg.mimetype.split('/').pop().split(';')[0];
      if (mediaMsg.fileName && mediaMsg.fileName.includes('.')) return '.' + mediaMsg.fileName.split('.').pop();
      return '.bin';
    })();
    const filename = (origName ? origName.split(' ').slice(0,6).join('_') : `upload_${Date.now()}`) + extGuess;

    await reply('📤 Uploading to Catbox...');

    // Build form-data and post to Catbox (file upload)
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    // If you have a Catbox userhash (optional) to attach uploads to account:
    // form.append('userhash', 'YOUR_CATBOX_USERHASH');
    form.append('fileToUpload', buffer, { filename, contentType: mediaMsg.mimetype || 'application/octet-stream' });

    const res = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      timeout: 120000
    });

    const catboxUrl = (res && res.data) ? String(res.data).trim() : null;
    if (!catboxUrl || !/^https?:\/\//i.test(catboxUrl)) {
      console.error('catbox upload response', res && res.data);
      throw new Error('Catbox failed to return a valid link.');
    }

    const caption = `🔗 Uploaded to Catbox:\n${catboxUrl}\n\nFilename: ${filename}`;

    // Try interactive-like message with copy button (nativeFlowMessage)
    try {
      const content = {
        viewOnceMessage: {
          message: {
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage: {
              body: { text: caption },
              footer: { text: "Uploaded by James" },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: "cta_copy",
                    buttonParamsJson: `{"display_text":"Copy URL","copy_code":"${catboxUrl}"}`
                  },
                  {
                    name: "cta_open",
                    buttonParamsJson: `{"display_text":"Open","open_url":"${catboxUrl}"}`
                  }
                ]
              }
            }
          }
        }
      };
      const waMsg = generateWAMessageFromContent(from, content, { quoted: m });
      await james.relayMessage(from, waMsg.message, { messageId: waMsg.key.id });
    } catch (e) {
      // interactive failed -> fallback to plain text
      await james.sendMessage(from, { text: caption }, { quoted: m });
    }

  } catch (err) {
    console.error('tourl (catbox) error:', err);
    reply('❌ tourl failed: ' + (err.message || err));
  }
}
break;
// ---------- shorturl: shorten provided URL and include copy button ----------
case 'shorturl':
case 'tiny': {
  try {
    const input = (q || args[0] || '').trim();
    if (!input) return reply('Usage: shorturl <long-url>');
    // basic URL validation
    if (!/^https?:\/\//i.test(input)) return reply('Please provide a valid URL starting with http:// or https://');

    await reply('🔗 Shortening URL...');

    // Using TinyURL API (simple GET)
    const api = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(input)}`;
    const res = await axios.get(api, { timeout: 15000 }).catch(e => ({ data: null, error: e.message }));
    const short = res.data;
    if (!short || typeof short !== 'string' || !/^https?:\/\//.test(short)) {
      return reply('❌ Failed to shorten URL.');
    }

    const caption = `🔗 Short URL:\n${short}\n\nOriginal:\n${input}`;

    try {
      const content = {
        viewOnceMessage: {
          message: {
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage: {
              body: { text: caption },
              footer: { text: "CYBERPUNK-BULLY" },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: "cta_copy",
                    buttonParamsJson: `{"display_text":"Copy Short URL","copy_code":"${short}"}`
                  },
                  {
                    name: "cta_open",
                    buttonParamsJson: `{"display_text":"Open","open_url":"${short}"}`
                  }
                ]
              }
            }
          }
        }
      };
      const waMsg = generateWAMessageFromContent(from, content, { quoted: m });
      await james.relayMessage(from, waMsg.message, { messageId: waMsg.key.id });
    } catch (e) {
      // fallback: plain text
      await james.sendMessage(from, { text: caption }, { quoted: m });
    }
  } catch (err) {
    console.error('shorturl error', err);
    reply('❌ shorturl failed: ' + (err.message || err));
  }
}
break;
//idch
case 'idch':
case 'cekidch': {
  try {
    const link = (q || '').trim();
    if (!link) return reply("❗ Provide a channel link. Example: cekidch https://whatsapp.com/channel/XXXXXXXX");
    if (!link.includes("https://whatsapp.com/channel/")) return reply("❗ Link must be a valid WhatsApp channel link (https://whatsapp.com/channel/...)");

    // Extract channel id (defensive)
    const parts = link.split("https://whatsapp.com/channel/");
    const channelId = (parts[1] || "").split(/[/?\s]/)[0];
    if (!channelId) return reply("❗ Couldn't extract channel id from link.");

    // fetch metadata
    let res;
    try {
      res = await james.newsletterMetadata("invite", channelId);
    } catch (e) {
      console.error('newsletterMetadata error', e);
      return reply("❌ Failed to fetch channel metadata. The channel id might be invalid or your Baileys version doesn't support newsletterMetadata.");
    }

    // Build text (defensive for undefined fields)
    const idText = res?.id || 'Unknown';
    const nameText = res?.name || 'Unknown';
    const subsText = typeof res?.subscribers !== 'undefined' ? res.subscribers : 'Unknown';
    const stateText = res?.state || 'Unknown';
    const verText = (res?.verification === "VERIFIED") ? "Terverifikasi" : "Tidak";

    const teks = `*ID:* ${idText}
*Name:* ${nameText}
*Total Followers:* ${subsText}
*Status:* ${stateText}
*Verified:* ${verText}`;

    // Create an interactive-like viewOnce message similar to your original structure
    const msgContent = {
      viewOnceMessage: {
        message: {
          messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
          interactiveMessage: {
            body: { text: teks },
            footer: { text: "by spectre ii" },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "cta_copy",
                  buttonParamsJson: `{"display_text":"copy ID","copy_code":"${idText}"}`
                }
              ]
            }
          }
        }
      }
    };

    const waMessage = generateWAMessageFromContent(m.chat, msgContent, { quoted: loli });
    await james.relayMessage(m.chat, waMessage.message, { messageId: waMessage.key.id });

  } catch (err) {
    console.error('cekidch error', err);
    reply("❌ An error occurred while checking the channel. See logs for details.");
  }
}
break;
//to image 
case 'toimage':
case 'toimg': {
  try {
    const sharp = require('sharp');
    const { tmpdir } = require('os');

    // find sticker message (reply or the message itself)
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const stickerMsg = (quoted && quoted.stickerMessage) || m.message?.stickerMessage;

    if (!stickerMsg) return reply("⚠️ Reply to a sticker or send a sticker with the command to convert it to an image.");

    // ensure it's webp
    const mt = stickerMsg.mimetype || stickerMsg.mediaType || '';
    if (!/webp/i.test(mt)) {
      // sometimes stickerMessage has fileEncSha256 or fileName; still try if no mimetype
      return reply("⚠️ That doesn't look like a WebP sticker. Reply to a sticker to convert it.");
    }

    await reply("🖼️ Converting sticker to image...");

    // download sticker into buffer
    const stream = await downloadContentFromMessage(stickerMsg, 'sticker');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

    if (!buffer || buffer.length === 0) return reply("❌ Failed to download sticker data.");

    // write to temp webp file then convert (sharp can work directly from buffer too)
    const inputPath = path.join(tmpdir(), `sticker_${Date.now()}.webp`);
    const outputPath = path.join(tmpdir(), `sticker_${Date.now()}.png`);
    fs.writeFileSync(inputPath, buffer);

    // convert webp -> png using sharp
    await sharp(inputPath).png().toFile(outputPath);

    // read and send the converted image
    const imageBuffer = fs.readFileSync(outputPath);
    await james.sendMessage(from, { image: imageBuffer }, { quoted: m });

    // cleanup
    try { fs.unlinkSync(inputPath); } catch (e) {}
    try { fs.unlinkSync(outputPath); } catch (e) {}

  } catch (err) {
    console.error('toimage error:', err);
    reply("💥 Failed to convert sticker to image. Make sure sharp is installed (`npm i sharp`) and try again.");
  }
}
break;
//play
case 'play': {
  if (!text) return reply(`🎵 Contoh: ${prefix}play Naruto OST`)
  try {
    james.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

    const yts = require('yt-search')
    const search = await yts(text)
    const video = search && search.videos && search.videos[0]
    if (!video) {
      james.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
      return reply('❌ Song not found. Try a different query.')
    }

    const { url, title, thumbnail, duration, author } = video
    let downloadUrl = null

    // Primary: y2ts token-based API (from alyaytdl)
    try {
      const tokenRes = await axios.get('https://y2ts.us.kg/token', { timeout: 10000 })
      const token = tokenRes.data && tokenRes.data.token
      if (token) {
        const dlRes = await axios.get(`https://y2ts.us.kg/youtube?url=${encodeURIComponent(url)}`, {
          headers: {
            'Authorization-Token': token,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            'Content-Type': 'application/json'
          },
          timeout: 25000
        })
        if (dlRes.data && dlRes.data.status && dlRes.data.result && dlRes.data.result.mp3) {
          downloadUrl = dlRes.data.result.mp3
        }
      }
    } catch (e) {}

    // Fallback 1: ryzendesu API
    if (!downloadUrl) {
      try {
        const r2 = await axios.get(`https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(url)}`, { timeout: 25000 })
        if (r2.data && r2.data.success && r2.data.data && r2.data.data.downloadUrl) {
          downloadUrl = r2.data.data.downloadUrl
        }
      } catch (e) {}
    }

    // Fallback 2: zenkey API
    if (!downloadUrl) {
      try {
        const r3 = await axios.get(`https://api.zenkey.my.id/api/download/ytmp3?apikey=freemium&url=${encodeURIComponent(url)}`, { timeout: 25000 })
        if (r3.data && r3.data.success && r3.data.result && r3.data.result.audio && r3.data.result.audio.url) {
          downloadUrl = r3.data.result.audio.url
        }
      } catch (e) {}
    }

    if (!downloadUrl) {
      james.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
      return reply('❌ Failed to fetch audio. Try again later.')
    }

    await james.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: 'audio/mpeg',
      fileName: title + '.mp3',
      contextInfo: {
        externalAdReply: {
          title: title,
          body: `${author.name} • ${duration.timestamp}`,
          thumbnailUrl: thumbnail,
          renderLargerThumbnail: true,
          mediaType: 1,
          showAdAttribution: false
        }
      }
    }, { quoted: m })

    james.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

  } catch (err) {
    james.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    console.error('play error:', err)
    reply('❌ Error: ' + (err.message || err))
  }
}
break;
// BLOCK
case 'block': {
  // owner-only
  if (!isOwner) return reply('Owner only.');
  // target: mention, quoted user, or number as arg
  let target = (m.mentionedJid && m.mentionedJid[0]) || (m.quoted && m.quoted.sender) || args[0];
  if (!target) return reply('Usage: block @user or block <number>');
  // normalize if number given
  if (typeof target === 'string' && !target.includes('@')) target = target.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

  try {
    // try common Baileys methods (some versions expect array, some single)
    if (typeof james.updateBlockStatus === 'function') {
      // prefer array
      try { await james.updateBlockStatus([target], 'block'); }
      catch { await james.updateBlockStatus(target, 'block'); }
    } else if (typeof james.updateBlockStatus === 'undefined' && typeof james.updateBlock === 'function') {
      await james.updateBlock(target, 'block');
    } else if (typeof james.block === 'function') {
      await james.block(target);
    } else {
      // fallback: send a request that probably won't work but avoids crashing
      return reply('Block API not available on this Baileys version.');
    }
    reply(`✅ Blocked ${target.replace('@s.whatsapp.net','')}`);
  } catch (e) {
    console.error(e);
    reply('Failed to block: ' + (e.message || e));
  }
}
break

// UNBLOCK
case 'unblock': {
  if (!isOwner) return reply('Owner only.');
  let target = (m.mentionedJid && m.mentionedJid[0]) || (m.quoted && m.quoted.sender) || args[0];
  if (!target) return reply('Usage: unblock @user or unblock <number>');
  if (typeof target === 'string' && !target.includes('@')) target = target.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

  try {
    if (typeof james.updateBlockStatus === 'function') {
      try { await james.updateBlockStatus([target], 'unblock'); }
      catch { await james.updateBlockStatus(target, 'unblock'); }
    } else if (typeof james.updateBlock === 'function') {
      await james.updateBlock(target, 'unblock');
    } else if (typeof james.unblock === 'function') {
      await james.unblock(target);
    } else {
      return reply('Unblock API not available on this Baileys version.');
    }
    reply(`✅ Unblocked ${target.replace('@s.whatsapp.net','')}`);
  } catch (e) {
    console.error(e);
    reply('Failed to unblock: ' + (e.message || e));
  }
}
break

// HIDETAG - send message mentioning everyone (used to "hide" sender by notifying all)
case 'hidetag': {
  if (!isGroup) return reply('This command is for groups only.');
  if (!isAdmins && !isOwner) return reply('You must be a group admin to use hidetag.');
  // message text
  const text = q || ' ';
  // collect jids from participants (exclude bot)
  const members = participants.map(p => p.jid).filter(j => j && j !== botNumber);
  if (!members.length) return reply('No members found to mention.');

  try {
    // If too many mentions, avoid spam (WhatsApp limits may apply). Adjust limit if needed.
    if (members.length > 256) return reply(`Too many members (${members.length}). Hidetag aborted.`);

    // use modern 'mentions' field
    await james.sendMessage(from, {
      text: text,
      mentions: members
    }, { quoted: m });

    // reply small confirmation (without mentioning)
    await james.sendMessage(from, { text: `✅ Hidetag sent to ${members.length} members.` }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply('Failed to hidetag: ' + (e.message || e));
  }
}
break

// TAGALL - show a message with a list and mention everyone (admin-only)
case 'tagall': {
  if (!isGroup) return reply('This command is for groups only.');
  if (!isAdmins && !isOwner) return reply('Only group admins can use tagall.');

  // message to send with tags
  let text = q ? q : `Attention everyone —`;
  // collect members
  const members = participants.map(p => p.jid).filter(j => j && j !== botNumber);
  if (!members.length) return reply('No members to tag.');

  // safety: limit number of mentions
  if (members.length > 256) return reply(`Too many members (${members.length}). Aborting tagall.`);

  // build mention list (human-friendly)
  const mentionList = members.map((jid, i) => `${i+1}. @${jid.split('@')[0]}`).join('\n');

  const fullMsg = `${text}\n\n${mentionList}`;

  try {
    await james.sendMessage(from, {
      text: fullMsg,
      mentions: members
    }, { quoted: m });

    reply(`✅ Tagged ${members.length} members.`);
  } catch (e) {
    console.error(e);
    reply('Failed to tagall: ' + (e.message || e));
  }
}
break

// ------------------ PASTE END ------------------
// ------------------ PASTE START ------------------
case 'enc':
case 'encrypt': {
  const JsConfuser = require('js-confuser');

  // Ensure user replied to a message with a document
  if (!m.message.extendedTextMessage || !m.message.extendedTextMessage.contextInfo?.quotedMessage) {
    return reply('❌ Please reply to a .js file to encrypt.');
  }

  const quotedMessage = m.message.extendedTextMessage.contextInfo.quotedMessage;
  const quotedDocument = quotedMessage.documentMessage;
  if (!quotedDocument || !quotedDocument.fileName || !quotedDocument.fileName.endsWith('.js')) {
    return reply('❌ Please reply to a JavaScript file (.js) to encrypt.');
  }

  try {
    const fileName = quotedDocument.fileName;

    // Download the quoted document into a Buffer using baileys helper downloadContentFromMessage
    const stream = await downloadContentFromMessage(quotedMessage, 'document');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    if (!buffer || buffer.length === 0) return reply('❌ Failed to download the file.');

    // react to show processing (uses your james client)
    await james.sendMessage(m.chat, { react: { text: '🕛', key: m.key } });

    // Run obfuscation
    const obfuscatedCode = await JsConfuser.obfuscate(buffer.toString('utf8'), {
      target: "node",
      preset: "high",
      compact: true,
      minify: true,
      flatten: true,
      identifierGenerator: function () {
        const originalString = "素JAMESTECH晴HARD晴" + "素JAMESTECH晴HARD晴";
        const removeUnwantedChars = (input) => input.replace(/[^a-zA-Z素JAMESTECH晴HARD晴]/g, "");
        const randomString = (length) => {
          let result = "";
          const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          return result;
        };
        return removeUnwantedChars(originalString) + randomString(2);
      },
      renameVariables: true,
      renameGlobals: true,
      stringEncoding: true,
      stringSplitting: 0.0,
      stringConcealing: true,
      stringCompression: true,
      duplicateLiteralsRemoval: 1.0,
      shuffle: { hash: 0.0, true: 0.0 },
      stack: true,
      controlFlowFlattening: 1.0,
      opaquePredicates: 0.9,
      deadCode: 0.0,
      dispatcher: true,
      rgf: false,
      calculator: true,
      hexadecimalNumbers: true,
      movedDeclarations: true,
      objectExtraction: true,
      globalConcealing: true,
    });

    // Send back obfuscated file as document
    await james.sendMessage(m.chat, {
      document: Buffer.from(obfuscatedCode, 'utf8'),
      mimetype: 'application/javascript',
      fileName: fileName,
      caption: `• Successful Encrypt\n• Type: Hard Code\n• anime md`
    }, { quoted: m });

  } catch (err) {
    console.error('Error during encryption:', err);
    return reply(`❌ An error occurred: ${err.message || err}`);
  }
}
break;

// 1) inspect - analyze a webpage and list important components detected
case 'inspect': {
  // usage: inspect <url>
  const url = args[0];
  if (!url) return reply('Usage: inspect <url>');
  try {
    const res = await fetch(url, { redirect: 'follow', timeout: 15000 });
    const headers = {};
    res.headers.forEach((v, k) => headers[k] = v);
    const ctype = headers['content-type'] || '';
    // only parse HTML
    if (!/text\/html/.test(ctype)) {
      return reply(`Content-Type: ${ctype}\nHeaders:\n${Object.entries(headers).map(([k,v])=>`${k}: ${v}`).join('\n')}`);
    }
    const text = await res.text();
    // Basic extractions
    const get = (re, fallback='') => (text.match(re) || [fallback])[1] || fallback;
    const title = get(/<title[^>]*>([^<]*)<\/title>/i, '').trim();
    const metas = Array.from(text.matchAll(/<meta\s+([^>]+)>/gi)).map(m => m[1]);
    const metaGenerator = (text.match(/<meta\s+name=["']?generator["']?\s+content=["']?([^"'>]+)["']?/i) || [])[1] || '';
    const links = Array.from(text.matchAll(/<link[^>]+rel=["']?stylesheet["']?[^>]*href=["']([^"']+)["']/gi)).map(m=>m[1]);
    const scripts = Array.from(text.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)).map(m=>m[1]);
    const inlineScriptsCount = (text.match(/<script(?![^>]*src)/gi) || []).length;
    const images = Array.from(text.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)).map(m=>m[1]);

    // heuristics for frameworks / platforms
    const hints = [];
    if (/<div[^>]+id=["']?root["']?/i.test(text) || /data-reactroot/i.test(text) || scripts.some(s=>/react|react-dom/i.test(s))) hints.push('React (possible)');
    if (/__NEXT_DATA__/.test(text) || scripts.some(s=>/next\.js|nextcdn/i.test(s))) hints.push('Next.js (possible)');
    if (/<div[^>]+id=["']?app["']?/i.test(text) || /ng-app/i.test(text) || scripts.some(s=>/angular/i.test(s))) hints.push('Angular (possible)');
    if (/id=["']?__nuxt["']?/.test(text) || scripts.some(s=>/nuxt/i.test(s))) hints.push('Nuxt/Vue (possible)');
    if (scripts.some(s=>/vue(\.min)?\.js|cdn\.vuejs/i.test(s)) || /vue-meta/i.test(text)) hints.push('Vue.js (possible)');
    if (scripts.some(s=>/jquery(\.min)?\.js|jquery-|jquerycdn/i.test(s))) hints.push('jQuery');
    if (/wp-content/i.test(text) || /wp-includes/i.test(text)) hints.push('WordPress');
    if (scripts.some(s=>/bootstrap(\.min)?\.js/i) || links.some(l=>/bootstrap(\.min)?\.css/i)) hints.push('Bootstrap');
    if (text.includes('tailwindcss') || /class=["'][^"']*tw-/i.test(text) || /cdn\.tailwindcss/i.test(text)) hints.push('Tailwind CSS (possible)');
    if (metaGenerator) hints.push(`Generator: ${metaGenerator}`);

    // Build response (limit lengths)
    let out = `🔎 Inspect result for: ${url}\n\n`;
    if (title) out += `📌 Title: ${title}\n`;
    out += `📄 Content-Type: ${ctype}\n`;
    out += `🔗 Links (stylesheets): ${links.length}\n`;
    if (links.length) out += `  • ${links.slice(0,6).join('\n  • ')}${links.length>6?`\n  • ...(+${links.length-6})`:''}\n`;
    out += `\n🧩 Scripts: ${scripts.length} (external) • Inline scripts: ${inlineScriptsCount}\n`;
    if (scripts.length) out += `  • ${scripts.slice(0,8).join('\n  • ')}${scripts.length>8?`\n  • ...(+${scripts.length-8})`:''}\n`;
    out += `\n🖼 Images: ${images.length}${images.length?`\n  • ${images.slice(0,6).join('\n  • ')}${images.length>6?`\n  • ...(+${images.length-6})`:''}` : ''}\n`;
    out += `\n💡 Detections: ${hints.length ? hints.join(', ') : 'None detected'}\n`;

    // include short HTML snippet preview
    const snippet = text.replace(/\s+/g,' ').slice(0,1000);
    out += `\n⎯⎯ HTML preview (first 1000 chars) ⎯⎯\n${snippet}${text.length > 1000 ? '\n... (truncated)' : ''}`;

    // Send as message (if too long send as file)
    if (out.length > 1500) {
      // write file and send
      const tmp = `./data/inspect_${Date.now()}.txt`;
      if (!fs.existsSync('./data')) fs.mkdirSync('./data');
      fs.writeFileSync(tmp, out);
      await james.sendMessage(m.chat, { document: fs.readFileSync(tmp), fileName: `inspect-${Date.now()}.txt`, mimetype: 'text/plain' }, { quoted: m });
      try { fs.unlinkSync(tmp) } catch(e){}
    } else {
      await reply(out);
    }
  } catch (err) {
    reply('Inspect failed: ' + (err.message || err));
  }
}
break


// 2) eval - execute JavaScript (owner only)
case 'eval': {
  if (!isOwner) return reply('Owner only.');
  const code = body.replace(/^eval\s*/i, '').trim() || q;
  if (!code) return reply('Usage: eval <js code>');
  try {
    // run in async wrapper so await works
    let result = await (async () => { return await eval(`(async ()=>{ ${code} })()`); })();
    const util = require('util');
    let out = typeof result === 'string' ? result : util.inspect(result, { depth: 2 });
    if (out.length > 3000) {
      const tmp = `./data/eval_${Date.now()}.txt`;
      if (!fs.existsSync('./data')) fs.mkdirSync('./data');
      fs.writeFileSync(tmp, out);
      await james.sendMessage(m.chat, { document: fs.readFileSync(tmp), fileName: `eval-output-${Date.now()}.txt`, mimetype: 'text/plain' }, { quoted: m });
      try { fs.unlinkSync(tmp) } catch(e){}
    } else {
      await reply(`✅ Result:\n\n${out}`);
    }
  } catch (err) {
    // show error
    const em = (err && err.stack) ? err.stack : String(err);
    if (em.length > 1500) {
      const tmp = `./data/eval_err_${Date.now()}.txt`;
      if (!fs.existsSync('./data')) fs.mkdirSync('./data');
      fs.writeFileSync(tmp, em);
      await james.sendMessage(m.chat, { document: fs.readFileSync(tmp), fileName: `eval-error-${Date.now()}.txt`, mimetype: 'text/plain' }, { quoted: m });
      try { fs.unlinkSync(tmp) } catch(e){}
    } else {
      await reply(`❌ Error:\n${em}`);
    }
  }
}
break


// 3) fetch - fetch URL and return headers + smart preview of content
case 'fetch': {
  // usage: fetch <url>
  const url = args[0];
  if (!url) return reply('Usage: fetch <url>');
  try {
    const res = await fetch(url, { redirect: 'follow', timeout: 15000 });
    const headers = {};
    res.headers.forEach((v, k) => headers[k] = v);
    const ctype = headers['content-type'] || '';
    let out = `🔗 Fetched: ${url}\nStatus: ${res.status} ${res.statusText}\nContent-Type: ${ctype}\n\nHeaders:\n`;
    out += Object.entries(headers).map(([k,v])=>`${k}: ${v}`).join('\n');

    // Decide how to present body
    if (/application\/json/.test(ctype) || url.match(/\.json$/i)) {
      const json = await res.text();
      let parsed;
      try { parsed = JSON.stringify(JSON.parse(json), null, 2); } catch (e) { parsed = json; }
      if (parsed.length > 3500) {
        const tmp = `./data/fetch_${Date.now()}.json`;
        if (!fs.existsSync('./data')) fs.mkdirSync('./data');
        fs.writeFileSync(tmp, parsed);
        await james.sendMessage(m.chat, { document: fs.readFileSync(tmp), fileName: `fetch-${Date.now()}.json`, mimetype: 'application/json' }, { quoted: m });
        try { fs.unlinkSync(tmp) } catch(e){}
        return;
      } else {
        out += `\n\nBody (JSON preview):\n${parsed}`;
        return reply(out);
      }
    } else if (/text\/html/.test(ctype) || url.match(/\.(html?|php|asp)$/i)) {
      const txt = await res.text();
      const snippet = txt.replace(/\s+/g,' ').slice(0,1500);
      out += `\n\nHTML preview (first 1500 chars):\n${snippet}${txt.length>1500?'\n... (truncated)':''}`;
      if (out.length > 3000) {
        const tmp = `./data/fetch_${Date.now()}.txt`;
        if (!fs.existsSync('./data')) fs.mkdirSync('./data');
        fs.writeFileSync(tmp, out);
        await james.sendMessage(m.chat, { document: fs.readFileSync(tmp), fileName: `fetch-${Date.now()}.txt`, mimetype: 'text/plain' }, { quoted: m });
        try { fs.unlinkSync(tmp) } catch(e){}
      } else {
        return reply(out);
      }
    } else {
      // other binary / large files: return basic info
      out += `\n\nBody: not displayed (binary or unsupported). Use the URL in a browser or provide a file extension to request typed handling.`;
      return reply(out);
    }
  } catch (err) {
    reply('Fetch failed: ' + (err.message || err));
  }
}
break

// ------------------ PASTE END ------------------
// ------------------ PASTE START ------------------
// ping
case 'ping': {
  const start = Date.now();
  await james.sendMessage(m.chat, { react: { text: "🕶️", key: m.key } });
  const latency = Date.now() - start;
  const used = process.memoryUsage();
  const upSec = Math.floor(process.uptime());
  const upH = Math.floor(upSec / 3600);
  const upM = Math.floor((upSec % 3600) / 60);
  const upS = upSec % 60;
  const ram = (used.rss / 1024 / 1024).toFixed(1);
  let text = `${readmore}
╭────────────────────╮
│   ᴏɴʟɪɴᴇ
╰────────────────────╯
│  ⚡ ᴘɪɴɢ  : ${latency}ms
│  🕒 ᴜᴘᴛɪᴍᴇ : ${upH}h ${upM}m ${upS}s
│  🧠 ʀᴀᴍ   : ${ram} MB
╰────────────────────
_lurking from the shadows..._`;
  await james.sendMessage(m.chat, { text }, { quoted: m });
}
break

// owner
case 'owner': {
  // uses global.owner array from your codebase
  const owners = (global.owner || []).map(o => o.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
  await james.sendMessage(m.chat, {
    contacts: owners.map(v => ({ displayName: "Bot Owner", vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Owner\nTEL;waid:${v.split('@')[0]}:${v.split('@')[0]}\nEND:VCARD` }))
  }, { quoted: m });
}
break

// toimg - convert webp sticker to png (reply to sticker)
case 'toimg': {
  if (!m.quoted) return reply('Reply to a sticker.');
  if (!/webp/.test(mime || '')) return reply('That is not a sticker.');
  try {
    const media = m.quoted;
    const input = await downloadAndSaveMediaMessage(media, `./tmp/stk_${Date.now()}.webp`);
    const output = `./tmp/stk_${Date.now()}.png`;
    // requires ffmpeg installed on host
    exec(`ffmpeg -i "${input}" "${output}"`, async (err) => {
      try {
        if (err) return reply('Conversion failed (is ffmpeg installed?)');
        const img = fs.readFileSync(output);
        await james.sendMessage(m.chat, { image: img }, { quoted: m });
      } catch (e) {
        reply('Error: ' + e.message);
      } finally {
        try { fs.unlinkSync(input) } catch {}
        try { fs.unlinkSync(output) } catch {}
      }
    });
  } catch (e) {
    reply('Failed: ' + e.message);
  }
}
break

// Group: kick (remove), promote, demote
case 'kick': {
  if (!isGroup) return reply('This command is for groups only.');
  if (!isAdmins) return reply('You must be admin to use this.');
  if (!isBotAdmins) return reply('I must be admin to perform this.');
  // target: mention or reply
  const target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
  if (!target) return reply('Mention or reply to the user to kick.');
  try {
    await james.groupParticipantsUpdate(from, [target], 'remove');
    reply('User removed.');
  } catch (e) {
    reply('Failed to remove: ' + e.message);
  }
}
break

case 'promote': {
  if (!isGroup) return reply('Groups only.');
  if (!isAdmins) return reply('You must be admin.');
  if (!isBotAdmins) return reply('Bot must be admin.');
  const target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
  if (!target) return reply('Mention or reply to the user to promote.');
  try {
    await james.groupParticipantsUpdate(from, [target], 'promote');
    reply('User promoted to admin.');
  } catch (e) {
    reply('Failed to promote: ' + e.message);
  }
}
break

case 'demote': {
  if (!isGroup) return reply('Groups only.');
  if (!isAdmins) return reply('You must be admin.');
  if (!isBotAdmins) return reply('Bot must be admin.');
  const target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
  if (!target) return reply('Mention or reply to the user to demote.');
  try {
    await james.groupParticipantsUpdate(from, [target], 'demote');
    reply('User demoted.');
  } catch (e) {
    reply('Failed to demote: ' + e.message);
  }
}
break

// ════════════════════════════════════════════════
// ── MUTE COMMANDS (WhatsApp Group)
// ════════════════════════════════════════════════

case 'wmute':
case 'mute': {
  if (!isGroup) return reply('This command is for groups only.');
  if (!isAdmins && !isOwner) return reply('You need to be a group admin to mute users.');
  if (!isBotAdmins) return reply('I need to be a group admin to enforce mutes (delete messages).');
  const muteTarget = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : (m.quoted ? m.quoted.sender : null);
  if (!muteTarget) return reply('Mention or reply to the user you want to mute.');
  if (muteTarget === botNumber) return reply("I can't mute myself.");
  const tPhone = muteTarget.split('@')[0];
  const isTargetOwner = (global.owner || []).map(v => v.replace(/[^0-9]/g, '')).includes(tPhone);
  if (isTargetOwner) return reply("I can't mute the bot owner.");
  muteUser(from, muteTarget);
  await james.sendMessage(from, {
    text: `🔇 *MUTED*\n@${tPhone} has been muted in this group.\nAll their messages will be deleted automatically.`,
    mentions: [muteTarget]
  }, { quoted: m });
  break;
}

case 'wunmute':
case 'unmute': {
  if (!isGroup) return reply('This command is for groups only.');
  if (!isAdmins && !isOwner) return reply('You need to be a group admin to unmute users.');
  const unmuteTarget = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : (m.quoted ? m.quoted.sender : null);
  if (!unmuteTarget) return reply('Mention or reply to the user you want to unmute.');
  if (!isMuted(from, unmuteTarget)) return reply(`@${unmuteTarget.split('@')[0]} is not muted.`);
  unmuteUser(from, unmuteTarget);
  await james.sendMessage(from, {
    text: `🔊 *UNMUTED*\n@${unmuteTarget.split('@')[0]} has been unmuted and can speak again.`,
    mentions: [unmuteTarget]
  }, { quoted: m });
  break;
}

case 'mutelist': {
  if (!isGroup) return reply('This command is for groups only.');
  const groupMuted = (global.mutedUsers[from] || []);
  if (groupMuted.length === 0) return reply('📋 No users are currently muted in this group.');
  let muteListText = `🔇 *Muted Users in this Group:*\n\n`;
  groupMuted.forEach((jid, i) => {
    muteListText += `${i + 1}. @${jid.split('@')[0]}\n`;
  });
  await james.sendMessage(from, {
    text: muteListText,
    mentions: groupMuted
  }, { quoted: m });
  break;
}

// ── end mute commands ──
// ------------------ PASTE END ------------------
// ---- friends / credits / updates cases ----



case 'credits': {
  // show bot credits / contributors
  const owners = (global.owner || []).map(o => o.replace(/[^0-9]/g, ""));
  const ownerList = owners.length ? owners.map(o => `@${o}`).join(', ') : 'Unknown';
  const pkg = (() => {
    try { return require(path.join(__dirname, '..', 'package.json')); } catch (e) { return {}; }
  })();

  const creditsText = `
รקєςtгє II 𝗕𝗢𝗧
• ᴄʀᴀꜰᴛᴇᴅ ʙʏ: ꜱᴜᴅᴏ
• ʙᴏᴛ ꜰᴀᴍɪʟʏ: Andromeda
• Version: ${pkg.version || 'I'}
━━━━━━━━━━━━━━━━━━━
 𝒵𝑒𝒹
𝐿𝑜𝓇𝒹 𝐵𝓇𝑜𝓀𝑒𝓃
𝒜𝒹𝒹𝑒𝒹
𝒮𝓉𝓎𝓍
𝒫𝓇𝒾𝓂𝑒
  `.trim();
  let credit = 'https://files.catbox.moe/7dp07q.jpg'
  await james.sendMessage(m.chat, {
    image: { url: credit },
    caption: creditsText,
    contextInfo: { mentionedJid: owners.map(o => o + '@s.whatsapp.net') }
  }, { quoted: loli });
}
break



        case "self": {
                                if (!isOwner) return m.reply("you must be the owner first")
                                reply("succes change status to self")
                                james.public = false
                await james.sendMessage(m.chat, { 
           audio: { url: 'https://files.catbox.moe/kyp1ze.mp3' },
           mimetype: 'audio/mp4', 
           ptt: true 
       },{ quoted: m }
     );
                        }
                        break                              
  case "public": {
                                if (!isOwner) return m.reply ("you must be the owner first")
                                reply("succes change status to public")
                                james.public = true
        await james.sendMessage(m.chat, { 
           audio: { url: 'https://files.catbox.moe/kyp1ze.mp3' },
           mimetype: 'audio/mp4', 
           ptt: true 
       },{ quoted: m }
     );        
                        }
                        break

// ════════════════════════════════════════════════════════════════════
// ── NEW FEATURES (ported from OURIN + brand new AURA system) ──────
// ════════════════════════════════════════════════════════════════════

// ─── TIKTOK DOWNLOAD ────────────────────────────────────────────────
case 'tiktok':
case 'tt': {
  if (!isCmd) break;
  const ttUrl = args[0] || (m.quoted?.text || '').match(/https?:\/\/(vm\.|vt\.|www\.)?tiktok\.com\/\S+/)?.[0];
  if (!ttUrl) return reply('📎 Kirim link TikTok.\n\nContoh: .tiktok https://vm.tiktok.com/xxx');
  james.sendMessage(from, { react: { text: '⏳', key: m.key } });
  try {
    const axios = require('axios');
    const cheerio = require('cheerio');

    async function _ttToken() {
      const r = await axios.get('https://savett.cc/en1/download', { timeout: 15000 });
      return {
        csrf: (r.data.match(/name="csrf_token" value="([^"]+)"/) || [])[1],
        cookie: (r.headers['set-cookie'] || []).map(c => c.split(';')[0]).join('; ')
      };
    }

    const { csrf, cookie } = await _ttToken();
    if (!csrf) return reply('❌ Gagal mengambil token. Coba lagi.');

    const _ttHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml',
      'Origin': 'https://savett.cc',
      'Referer': 'https://savett.cc/en1/download',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
      Cookie: cookie
    };

    const resHtml = await axios.post(
      'https://savett.cc/en1/download',
      `csrf_token=${encodeURIComponent(csrf)}&url=${encodeURIComponent(ttUrl)}`,
      { headers: _ttHeaders, timeout: 20000 }
    );

    const $ = cheerio.load(resHtml.data);
    const username = $('#video-info h3').first().text().trim() || 'Unknown';
    const duration = $('#video-info p.text-muted').first().text().replace(/Duration:/i, '').trim();

    // Try slides (photo) first
    const slides = $('.carousel-item[data-data]');
    if (slides.length) {
      const urls = [];
      slides.each((_, el) => {
        try {
          const json = JSON.parse($(el).attr('data-data').replace(/&quot;/g, '"'));
          if (Array.isArray(json.URL)) urls.push(...json.URL);
        } catch {}
      });
      if (!urls.length) return reply('❌ Tidak ada media ditemukan.');
      james.sendMessage(from, { react: { text: '📸', key: m.key } });
      await reply(`📸 *TikTok Slideshow*\n👤 ${username}\n🖼️ ${urls.length} foto`);
      for (let i = 0; i < Math.min(urls.length, 10); i++) {
        await james.sendMessage(from, { image: { url: urls[i] }, caption: `${i + 1}/${urls.length}` }, { quoted: m });
      }
      break;
    }

    // Video
    let videoUrl = null;
    $('#formatselect option').each((_, el) => {
      if (videoUrl) return;
      const label = $(el).text().toLowerCase();
      const raw = $(el).attr('value');
      if (!raw || label.includes('watermark')) return;
      try {
        const json = JSON.parse(raw.replace(/&quot;/g, '"'));
        if (json.URL && Array.isArray(json.URL) && json.URL[0]) videoUrl = json.URL[0];
      } catch {}
    });

    if (!videoUrl) return reply('❌ Gagal mendapatkan link download. Link mungkin private atau sudah dihapus.');
    james.sendMessage(from, { react: { text: '✅', key: m.key } });
    await james.sendMessage(from, {
      video: { url: videoUrl },
      caption: `🎵 *TikTok Download*\n👤 ${username}${duration ? `\n⏱️ ${duration}` : ''}`,
      contextInfo: {
        externalAdReply: {
          title: '🎵 TikTok Downloader',
          body: `@${username}`,
          thumbnailUrl: 'https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg',
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m });
  } catch (e) {
    console.error('[tiktok]', e.message);
    reply('❌ Gagal download TikTok: ' + (e.message || 'Unknown error'));
  }
}
break

// ─── INSTAGRAM DOWNLOAD ────────────────────────────────────────────
case 'ig':
case 'instagram': {
  if (!isCmd) break;
  const igUrl = args[0] || '';
  if (!igUrl || !igUrl.includes('instagram.com')) return reply('📎 Kirim link Instagram.\n\nContoh: .ig https://www.instagram.com/p/xxx');
  james.sendMessage(from, { react: { text: '⏳', key: m.key } });
  try {
    const axios = require('axios');
    const igRes = await axios.get(
      `https://api.tiklydown.eu.org/api/download/v2?url=${encodeURIComponent(igUrl)}`,
      { timeout: 20000, headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    const data = igRes.data;
    if (!data || data.error) return reply('❌ Gagal mengambil media Instagram.');

    const medias = data.medias || [];
    if (!medias.length) return reply('❌ Tidak ada media ditemukan di link tersebut.');

    james.sendMessage(from, { react: { text: '✅', key: m.key } });
    let caption = `📸 *Instagram Download*`;
    if (data.author?.name) caption += `\n👤 ${data.author.name}`;
    if (data.description) caption += `\n📝 ${data.description.slice(0, 200)}`;

    for (let i = 0; i < Math.min(medias.length, 5); i++) {
      const med = medias[i];
      const isVideo = med.type === 'video' || (med.url || '').includes('.mp4');
      const ctxInfo = {
        externalAdReply: {
          title: '📸 Instagram Downloader',
          body: data.author?.name || 'Instagram',
          thumbnailUrl: 'https://files.catbox.moe/tk1xpz.jpeg',
          mediaType: 1,
          renderLargerThumbnail: false
        }
      };
      if (isVideo) {
        await james.sendMessage(from, { video: { url: med.url }, caption: i === 0 ? caption : ``, contextInfo: ctxInfo }, { quoted: m });
      } else {
        await james.sendMessage(from, { image: { url: med.url || med.thumbnail }, caption: i === 0 ? caption : ``, contextInfo: ctxInfo }, { quoted: m });
      }
    }
  } catch (e) {
    console.error('[instagram]', e.message);
    reply('❌ Gagal download Instagram: ' + (e.message || 'Unknown error'));
  }
}
break

// ─── WARN SYSTEM ────────────────────────────────────────────────────
case 'warn': {
  if (!isGroup) return reply('🚫 Grup only.');
  if (!isAdmins && !isOwner) return reply('🔒 Only bot owner can warn member.');
  const warnTarget = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!warnTarget) return reply('❓ Mention or reply a user to warn.');
  if (warnTarget === sender) return reply('❌ Warn initiated  and being processed.');
  if (warnTarget === botNumber) return reply('❌ Cannot warn bot.');

  if (!global.jamesWarnData) global.jamesWarnData = {};
  const wReason = args.join(' ').replace(/@\d+/g, '').trim() || 'Warn executed';
  const wKey = `${from}::${warnTarget}`;
  if (!global.jamesWarnData[wKey]) global.jamesWarnData[wKey] = [];
  global.jamesWarnData[wKey].push({ reason: wReason, by: sender, time: Date.now() });
  const wCount = global.jamesWarnData[wKey].length;
  const MAX_WARN = 3;
  const wNum = warnTarget.split('@')[0];

  if (wCount >= MAX_WARN) {
    try { await james.groupParticipantsUpdate(from, [warnTarget], 'remove'); } catch(e) {}
    global.jamesWarnData[wKey] = [];
    await james.sendMessage(from, {
      text: `⚠️ *WARN ${wCount}/${MAX_WARN}*\n@${wNum} telah di-*kick* karena mencapai batas warn!\n\n📋 Alasan: ${wReason}`,
      mentions: [warnTarget],
      contextInfo: {
        externalAdReply: {
          title: '⚠️ Member Kicked (Max Warn)',
          body: `Warn ${wCount}/${MAX_WARN} - ${wReason}`,
          thumbnailUrl: 'https://files.catbox.moe/tk1xpz.jpeg',
          mediaType: 1, renderLargerThumbnail: false
        }
      }
    }, { quoted: m });
  } else {
    await james.sendMessage(from, {
      text: `⚠️ *WARN ${wCount}/${MAX_WARN}*\n@${wNum} mendapat peringatan.\n\n📋 Alasan: ${wReason}\n⚡ Warn ke-${wCount} dari ${MAX_WARN}. Kick otomatis saat warn ke-${MAX_WARN}.`,
      mentions: [warnTarget],
      contextInfo: {
        externalAdReply: {
          title: `⚠️ Warning ${wCount}/${MAX_WARN}`,
          body: wReason,
          thumbnailUrl: 'https://files.catbox.moe/tk1xpz.jpeg', 
          mediaType: 1, renderLargerThumbnail: false
        }
      }
    }, { quoted: m });
  }
}
break

case 'warnlist': {
  if (!isGroup) return reply('🚫 Grup only.');
  if (!isAdmins && !isOwner) return reply('🔒 Harus admin.');
  if (!global.jamesWarnData) global.jamesWarnData = {};
  const wEntries = Object.entries(global.jamesWarnData).filter(([k, v]) => k.startsWith(from + '::') && v?.length > 0);
  if (!wEntries.length) return reply('✅ Tidak ada member yang di-warn di grup ini.');
  let wTxt = `⚠️ *WARN LIST*\n\n`;
  const mentions = [];
  wEntries.forEach(([k, warns]) => {
    const jid = k.split('::')[1];
    mentions.push(jid);
    wTxt += `👤 @${jid.split('@')[0]} — *${warns.length}/3* warn\n`;
    warns.forEach((w, i) => { wTxt += `  ${i+1}. ${w.reason}\n`; });
    wTxt += '\n';
  });
  await james.sendMessage(from, {
    text: wTxt, mentions,
    contextInfo: {
      externalAdReply: {
        title: '⚠️ Warn List',
        body: `${wEntries.length} member dengan warn`,
        thumbnailUrl: 'https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg',
        mediaType: 1, renderLargerThumbnail: false
      }
    }
  }, { quoted: m });
}
break

case 'resetwarn':
case 'warnreset': {
  if (!isGroup) return reply('🚫 Grup only.');
  if (!isAdmins && !isOwner) return reply('🔒 Harus admin.');
  if (!global.jamesWarnData) global.jamesWarnData = {};
  const rwTarget = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!rwTarget) return reply('❓  reset being executed');
  const rwKey = `${from}::${rwTarget}`;
  global.jamesWarnData[rwKey] = [];
  await james.sendMessage(from, {
    text: `✅ Warn @${rwTarget.split('@')[0]} telah di-reset.`,
    mentions: [rwTarget],
    contextInfo: {
      externalAdReply: {
        title: '✅ Warn Reset',
        body: `Warn ${rwTarget.split('@')[0]} dihapus`,
        thumbnailUrl: 'https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg',
        mediaType: 1, renderLargerThumbnail: false
      }
    }
  }, { quoted: m });
}
break

// ─── POLL ───────────────────────────────────────────────────────────
case 'poll': {
  if (!isGroup) return reply('🚫 Grup only.');
  const pollInput = text.trim();
  if (!pollInput) return reply(
    '📊 *Format Poll:*\n\n.poll Pertanyaan | Opsi1, Opsi2, Opsi3\n\n_Contoh:_\n.poll Makan apa? | Nasi Goreng, Mie Ayam, Bakso'
  );
  const pollParts = pollInput.split('|').map(p => p.trim());
  if (pollParts.length < 2) return reply('❌ Format salah. Gunakan:\n.poll Pertanyaan | Opsi1, Opsi2');
  const pollQuestion = pollParts[0];
  const pollOptions = pollParts[1].split(',').map(o => o.trim()).filter(Boolean);
  if (pollOptions.length < 2) return reply('❌ Minimal 2 pilihan dipisahkan koma.');
  if (pollOptions.length > 12) return reply('❌ Maksimal 12 pilihan.');
  try {
    await james.sendMessage(from, {
      poll: {
        name: pollQuestion,
        values: pollOptions,
        selectableCount: 1
      }
    }, { quoted: m });
  } catch(e) {
    reply('❌ Gagal membuat poll: ' + e.message);
  }
}
break

// ═══════════════════════════════════════════════════════════════════
// ── AURA SYSTEM (brand new — group leaderboard & levels) ──────────
// ═══════════════════════════════════════════════════════════════════

case 'aura': {
  if (!isGroup) return reply('🚫 Perintah ini hanya untuk grup.');

  const subAura = (args[0] || '').toLowerCase();
  const groupAura = global.jamesAuraData[from] || {};

  if (!subAura || subAura === 'help') {
    return await james.sendMessage(from, {
      text:
        `╭━━━━━━━━━━━━━━━━━╮\n` +
        `┃ 🌟 *ᴀᴜʀᴀ sʏsᴛᴇᴍ*\n` +
        `╰━━━━━━━━━━━━━━━━━╯\n\n` +
        `Ranking & level system based on group chat activity.\n\n` +
        `*Perintah:*\n` +
        `▸ *.aura on* — Enable for this group\n` +
        `▸ *.aura off* — Disable for this group\n` +
        `▸ *.aura status* — Show Stats\n` +
        `▸ *.auraboard* — Show leaderboard\n` +
        `▸ *.aurastat* — Check out your aura\n\n` +
        `*Level Aura:*\n` +
        `🌱 Newbie (0–99) → 💫 Rising (100) → ⚡ Active (500)\n` +
        `🔥 Hot (1k) → 💎 Elite (2.5k) → 👑 Legend (5k) → 🌟 Mythic (10k)\n\n` +
        `> _Present status: ${groupAura.enabled ? '✅ ON' : '❌ OFF'}_`,
      contextInfo: {
        externalAdReply: {
          title: '🌟 Aura System',
          body: `Status: ${groupAura.enabled ? 'Active ' : 'Inactive'}`,
          thumbnailUrl: 'https://files.catbox.moe/9m8z4i.jpeg',
          mediaType: 1, renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
  }

  if (!isAdmins && !isOwner) return reply('🔒 Only admins can change aura settings.');

  if (subAura === 'on') {
    if (!global.jamesAuraData[from]) global.jamesAuraData[from] = {};
    global.jamesAuraData[from].enabled = true;
    if (!global.jamesAuraData[from].members) global.jamesAuraData[from].members = {};
    _saveAura();
    await james.sendMessage(from, {
      text:
        `╭━━━━━━━━━━━━━━━━━╮\n` +
        `┃ 🌟 *ᴀᴜʀᴀ ᴀᴋᴛɪꜰ!*\n` +
        `╰━━━━━━━━━━━━━━━━━╯\n\n` +
        `✅ Aura System has been *activated* in this group.\n\n` +
        `Every message sent will be counted.\n` +
        `Use *.auraboard* to see the rankings!\n\n` +
        `> _Good luck farming aura! 🌟_`,
      contextInfo: {
        externalAdReply: {
          title: '🌟 Aura System Active!',
          body: 'Start sending messages & climb the ranks!',
          thumbnailUrl: 'https://files.catbox.moe/rklhyy.jpeg',
          mediaType: 1, renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } else if (subAura === 'off') {
    if (!global.jamesAuraData[from]) global.jamesAuraData[from] = {};
    global.jamesAuraData[from].enabled = false;
    _saveAura();
    await james.sendMessage(from, {
      text:
        `╭━━━━━━━━━━━━━━━━━╮\n` +
        `┃ 🔕 *ᴀᴜʀᴀ ᴍᴀᴛɪ*\n` +
        `╰━━━━━━━━━━━━━━━━━╯\n\n` +
        `❌ Aura System has been *deactivated*.\n` +
        `Data is not deleted, can be reactivated anytime.`,
      contextInfo: {
        externalAdReply: {
          title: '🔕 Aura System Inactive',
          body: 'Message tracking stopped',
          thumbnailUrl: 'https://files.catbox.moe/tk1xpz.jpeg',
          mediaType: 1, renderLargerThumbnail: false
        }
      }
    }, { quoted: m });

  } else if (subAura === 'status') {
    const totalMembers = Object.keys(groupAura.members || {}).length;
    const totalMsgs = Object.values(groupAura.members || {}).reduce((a, v) => a + (v.messages || 0), 0);
    await james.sendMessage(from, {
      text:
        `╭━━━━━━━━━━━━━━━━━╮\n` +
        `┃ 📊 *ᴀᴜʀᴀ sᴛᴀᴛᴜs*\n` +
        `╰━━━━━━━━━━━━━━━━━╯\n\n` +
        `▸ Status: ${groupAura.enabled ? '✅ Active' : '❌ Inactive'}\n` +
        `▸ Total Members Tracked: *${totalMembers}*\n` +
        `▸ Total Messages Recorded: *${totalMsgs.toLocaleString()}*\n\n` +
        `> Use *.auraboard* to see rankings.`,
      contextInfo: {
        externalAdReply: {
          title: '📊 Aura Status',
          body: `${totalMembers} members, ${totalMsgs} messages`,
          thumbnailUrl: 'https://files.catbox.moe/tk1xpz.jpeg',
          mediaType: 1, renderLargerThumbnail: false
        }
      }
    }, { quoted: m });

  } else if (subAura === 'reset') {
    if (!isOwner) return reply('🔒 Only bot owner can reset aura data.');
    global.jamesAuraData[from] = { enabled: groupAura.enabled || false, members: {} };
    _saveAura();
    reply('🗑️ Aura data for this group has been reset.');

  } else {
    reply('❓ Unknown sub-command. Type *.aura* for help.');
  }
}
break

// ─── AURA LEADERBOARD ──────────────────────────────────────────────
case 'auraboard':
case 'auralb':
case 'aurarank':
case 'auraleaderboard': {
  if (!isGroup) return reply('🚫 Grup only.');
  const lbData = global.jamesAuraData[from];
  if (!lbData || !lbData.enabled) return reply('❌ Aura has not been activated in this group.\nUse *.aura on* first.');
  const members = lbData.members || {};
  const entries = Object.entries(members)
    .filter(([, v]) => v.messages > 0)
    .sort(([, a], [, b]) => b.messages - a.messages)
    .slice(0, 10);
  if (!entries.length) return reply('📭 No data yet. Send messages to start tracking!');

  const medals = ['🥇', '🥈', '🥉'];
  const mentions = entries.map(([jid]) => jid);

  let lb = `╭━━━━━━━━━━━━━━━━━━╮\n`;
  lb    += `┃ 🌟 *ᴀᴜʀᴀ ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ*\n`;
  lb    += `╰━━━━━━━━━━━━━━━━━━╯\n\n`;

  entries.forEach(([jid, v], i) => {
    const rank   = medals[i] || `${i + 1}.`;
    const name   = v.name || jid.split('@')[0];
    const msgs   = v.messages || 0;
    const lvl    = _getAuraLevel(msgs);
    const bar    = _auraBar(msgs);
    lb += `${rank} *${name}*\n`;
    lb += `   ${lvl.emoji} ${lvl.title} (Lv.${lvl.level})\n`;
    lb += `   💬 ${msgs.toLocaleString()} messages\n`;
    lb += `   ${bar}\n\n`;
  });

  lb += `> _Top ${entries.length} of ${Object.keys(members).length} active members_`;

  await james.sendMessage(from, {
    text: lb,
    mentions,
    contextInfo: {
      forwardingScore: 9999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '12036342184253535@newsletter',
        newsletterName: 'รקєςtгє II',
        serverMessageId: 127
      },
      externalAdReply: {
        title: '🌟 Aura Leaderboard',
        body: `Top ${entries.length} paling aktif di grup ini`,
        thumbnailUrl: 'https://files.catbox.moe/tk1xpz.jpeg',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
}
break

// ─── AURA PERSONAL STATS ───────────────────────────────────────────
case 'aurastat':
case 'myaura':
case 'aurastats': {
  if (!isGroup) return reply('🚫 Grup only.');
  const asData = global.jamesAuraData[from];
  if (!asData || !asData.enabled) return reply('❌ Aura has not been activated in this group.');
  const members = asData.members || {};

  let targetJid = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : sender);
  const targetStat = members[targetJid];
  if (!targetStat || !targetStat.messages) {
    return reply(`❓ No aura data yet for @${targetJid.split('@')[0]}. Send messages first!`);
  }

  const msgs   = targetStat.messages;
  const lvl    = _getAuraLevel(msgs);
  const bar    = _auraBar(msgs);
  const tName  = targetStat.name || targetJid.split('@')[0];

  // Calculate rank
  const sorted = Object.entries(members)
    .filter(([, v]) => v.messages > 0)
    .sort(([, a], [, b]) => b.messages - a.messages);
  const myRank = sorted.findIndex(([jid]) => jid === targetJid) + 1;
  const totalTracked = sorted.length;

  // Next level threshold
  const thresholds = [100, 500, 1000, 2500, 5000, 10000];
  const nextThresh  = thresholds[lvl.level - 1];
  const toNext = nextThresh ? nextThresh - msgs : 0;

  let stTxt = `╭━━━━━━━━━━━━━━━━━╮\n`;
  stTxt    += `┃ ✨ *ᴀᴜʀᴀ sᴛᴀᴛs*\n`;
  stTxt    += `╰━━━━━━━━━━━━━━━━━╯\n\n`;
  stTxt    += `👤 *${tName}*\n`;
  stTxt    += `\n`;
  stTxt    += `${lvl.emoji} *${lvl.title}* (Level ${lvl.level})\n`;
  stTxt    += `${bar}\n\n`;
  stTxt    += `╭┈┈ 📊 Stats ┈┈╮\n`;
  stTxt    += `┃ 💬 Messages : *${msgs.toLocaleString()}*\n`;
  stTxt    += `┃ 🏆 Rank    : *#${myRank}* of ${totalTracked}\n`;
  if (toNext > 0) stTxt += `┃ 🎯 Next    : *${toNext.toLocaleString()}* more messages\n`;
  else stTxt += `┃ 🎯 Next  : *MAX LEVEL!* 🌟\n`;
  stTxt    += `╰┈┈┈┈┈┈┈┈┈┈┈┈╯\n\n`;
  stTxt    += `> _Keep going, stay active! 💪_`;

  await james.sendMessage(from, {
    text: stTxt,
    mentions: [targetJid],
    contextInfo: {
      externalAdReply: {
        title: `${lvl.emoji} ${tName} — ${lvl.title}`,
        body: `${msgs.toLocaleString()} messages · Rank #${myRank}`,
        thumbnailUrl: 'https://files.catbox.moe/tk1xpz.jpeg',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
}
break

// ════════════════════════════════════════════════
// ── END NEW FEATURES ─────────────────────────
// ════════════════════════════════════════════════

// ════════════════════════════════════════════════
// ── EXTRA COMMANDS BLOCK ─────────────────────
// ════════════════════════════════════════════════

// ─── 8BALL ───────────────────────────────────────────────────────────────────
case '8ball':
case 'ask': {
  if (!q) return reply('❓ Ask me a yes/no question!\nUsage: .8ball <question>');
  const balls = [
    '✅ It is certain.', '✅ Without a doubt.', '✅ Yes, definitely.',
    '✅ You may rely on it.', '✅ As I see it, yes.', '✅ Most likely.',
    '🤔 Reply hazy, try again.', '🤔 Ask again later.', '🤔 Cannot predict now.',
    '❌ Don\'t count on it.', '❌ My reply is no.', '❌ Very doubtful.',
    '❌ Outlook not so good.', '❌ My sources say no.'
  ];
  const ans = balls[Math.floor(Math.random() * balls.length)];
  reply(`🎱 *8-Ball*\n\n❓ ${q}\n\n${ans}`);
}
break

// ─── COINFLIP ────────────────────────────────────────────────────────────────
case 'flip':
case 'coin':
case 'coinflip': {
  const result = Math.random() < 0.5 ? '🪙 *HEADS*' : '🪙 *TAILS*';
  reply(`Flipping a coin...\n\n${result}`);
}
break

// ─── DICE ────────────────────────────────────────────────────────────────────
case 'dice':
case 'roll': {
  const sides = parseInt(args[0]) || 6;
  if (sides < 2 || sides > 1000) return reply('❗ Sides must be between 2 and 1000.');
  const rolled = Math.floor(Math.random() * sides) + 1;
  reply(`🎲 Rolling a ${sides}-sided die...\n\nResult: *${rolled}*`);
}
break

// ─── CHOOSE ──────────────────────────────────────────────────────────────────
case 'choose':
case 'pick': {
  if (!q) return reply('Usage: .choose <option1> | <option2> | ...');
  const choices = q.split('|').map(s => s.trim()).filter(Boolean);
  if (choices.length < 2) return reply('❗ Provide at least 2 options separated by |');
  const chosen = choices[Math.floor(Math.random() * choices.length)];
  reply(`🎯 *I choose:*\n\n*${chosen}*`);
}
break

// ─── TRUTH OR DARE ───────────────────────────────────────────────────────────
case 'truth': {
  const truths = [
    'What is your biggest fear?', 'Have you ever lied to someone you love?',
    'What\'s the most embarrassing thing you\'ve done?', 'Have you ever cheated in a game?',
    'What\'s your most shameful secret?', 'Who was your first crush?',
    'Have you ever blamed someone else for something you did?',
    'What\'s the biggest mistake you\'ve ever made?',
    'Have you ever read someone else\'s messages without permission?',
    'What\'s one thing you wish people didn\'t know about you?'
  ];
  reply(`🤍 *Truth:*\n\n${truths[Math.floor(Math.random() * truths.length)]}`);
}
break

case 'dare': {
  const dares = [
    'Send a voice note singing your favourite song.', 'Change your profile picture for 1 hour.',
    'Tag 3 random people in this group.', 'Send a funny selfie.',
    'Write a poem about the last person who messaged you.',
    'Type only in CAPS for the next 10 messages.', 'Let the group choose your name for the next hour.',
    'Send a voice note saying "I am the king/queen of this group".',
    'Say something nice about every admin in this group.',
    'Send your favourite song as a voice note (humming is fine).'
  ];
  reply(`🔴 *Dare:*\n\n${dares[Math.floor(Math.random() * dares.length)]}`);
}
break

// ─── RATE ────────────────────────────────────────────────────────────────────
case 'rate': {
  if (!q) return reply('Usage: .rate <anything>');
  const score = Math.floor(Math.random() * 101);
  const bar = '█'.repeat(Math.floor(score / 10)) + '░'.repeat(10 - Math.floor(score / 10));
  reply(`📊 *Rating for:* ${q}\n\n[${bar}] ${score}/100`);
}
break

// ─── SHIP ─────────────────────────────────────────────────────────────────────
case 'ship': {
  const parts = q.split(' ');
  if (parts.length < 2) return reply('Usage: .ship <name1> <name2>');
  const [n1, n2] = parts;
  const pct = Math.floor(Math.random() * 101);
  const bar = '❤️'.repeat(Math.floor(pct / 20)) + '🖤'.repeat(5 - Math.floor(pct / 20));
  reply(`💕 *Compatibility Check*\n\n${n1} x ${n2}\n\n[${bar}] ${pct}%\n\n${pct >= 80 ? '🔥 Soulmates!' : pct >= 50 ? '💛 Good match!' : '💀 Not looking great...'}`);
}
break

// ─── ROAST ────────────────────────────────────────────────────────────────────
case 'roast': {
  const target = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  const name = target ? `@${target.split('@')[0]}` : (q || 'you');
  const roasts = [
    `${name} is the human version of a participation award.`,
    `${name} has the personality of a wet cardboard box.`,
    `If brains were gasoline, ${name} couldn't power a scooter.`,
    `${name} brings so little to the table, they practically set it.`,
    `${name} is the reason the gene pool needs a lifeguard.`,
    `${name} is living proof evolution can go backwards.`,
    `Calling ${name} dumb would be an insult to dumb people.`,
    `${name} has the charisma of a traffic cone — at least those are useful.`,
  ];
  const r = roasts[Math.floor(Math.random() * roasts.length)];
  if (target) {
    await james.sendMessage(from, { text: `🔥 *ROASTED*\n\n${r}`, mentions: [target] }, { quoted: m });
  } else {
    reply(`🔥 *ROASTED*\n\n${r}`);
  }
}
break

// ─── COMPLIMENT ───────────────────────────────────────────────────────────────
case 'compliment':
case 'flatter': {
  const target = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  const name = target ? `@${target.split('@')[0]}` : (q || 'you');
  const compliments = [
    `${name} is literally the highlight of this group 🌟`,
    `${name} has an amazing energy that lights up every chat 💡`,
    `${name} is one of those rare people who make the world better just by being in it 💫`,
    `Everything ${name} says is gold. Pure gold. 🏅`,
    `${name} is the kind of person you wish you knew in real life 🥰`,
    `${name} is effortlessly cool without even trying 😎`,
    `If kindness was currency, ${name} would be the richest person alive 💰`,
  ];
  const c = compliments[Math.floor(Math.random() * compliments.length)];
  if (target) {
    await james.sendMessage(from, { text: `💝 *COMPLIMENT*\n\n${c}`, mentions: [target] }, { quoted: m });
  } else {
    reply(`💝 *COMPLIMENT*\n\n${c}`);
  }
}
break

// ─── JOKE ─────────────────────────────────────────────────────────────────────
case 'joke':
case 'jokeme': {
  const jokes = [
    ['Why don\'t scientists trust atoms?', 'Because they make up everything! 😂'],
    ['Why did the scarecrow win an award?', 'Because he was outstanding in his field! 🌾'],
    ['I told my wife she was drawing her eyebrows too high.', 'She looked surprised. 😐'],
    ['Why do cows wear bells?', 'Because their horns don\'t work! 🐄'],
    ['What do you call a fish without eyes?', 'A fsh. 🐟'],
    ['Why did the bicycle fall over?', 'Because it was two-tired! 🚲'],
    ['What\'s a skeleton\'s least favourite room?', 'The living room! 💀'],
    ['Why don\'t eggs tell jokes?', 'They\'d crack each other up! 🥚'],
  ];
  const [setup, punchline] = jokes[Math.floor(Math.random() * jokes.length)];
  reply(`😂 *Joke*\n\n${setup}\n\n> ${punchline}`);
}
break

// ─── RIDDLE ──────────────────────────────────────────────────────────────────
case 'riddle': {
  const riddles = [
    ['I speak without a mouth and hear without ears. I have nobody but come alive with wind. What am I?', 'An echo 🌬️'],
    ['The more you take, the more you leave behind. What am I?', 'Footsteps 👣'],
    ['I have cities but no houses. Mountains but no trees. Water but no fish. What am I?', 'A map 🗺️'],
    ['What has hands but can\'t clap?', 'A clock ⏰'],
    ['I\'m light as a feather, but even the strongest person can\'t hold me for more than a few minutes. What am I?', 'Breath 💨'],
    ['What gets wetter the more it dries?', 'A towel 🧺'],
  ];
  const idx = Math.floor(Math.random() * riddles.length);
  if (!global.jamesRiddleCache) global.jamesRiddleCache = {};
  global.jamesRiddleCache[from] = riddles[idx][1];
  reply(`🧩 *RIDDLE*\n\n${riddles[idx][0]}\n\n_Reply with .answer to reveal the answer_`);
}
break

case 'answer': {
  if (!global.jamesRiddleCache || !global.jamesRiddleCache[from]) return reply('❓ No riddle active. Use .riddle first.');
  reply(`💡 *Answer:*\n\n${global.jamesRiddleCache[from]}`);
  delete global.jamesRiddleCache[from];
}
break

// ─── QUOTE / INSPIRE ──────────────────────────────────────────────────────────
case 'quote':
case 'inspire':
case 'motivate': {
  const quotes = [
    ['The only way to do great work is to love what you do.', 'Steve Jobs'],
    ['In the middle of every difficulty lies opportunity.', 'Albert Einstein'],
    ['It does not matter how slowly you go as long as you do not stop.', 'Confucius'],
    ['Success is not final, failure is not fatal: it is the courage to continue that counts.', 'Winston Churchill'],
    ['Believe you can and you\'re halfway there.', 'Theodore Roosevelt'],
    ['The future belongs to those who believe in the beauty of their dreams.', 'Eleanor Roosevelt'],
    ['You miss 100% of the shots you don\'t take.', 'Wayne Gretzky'],
    ['Life is what happens when you\'re busy making other plans.', 'John Lennon'],
    ['Not all those who wander are lost.', 'J.R.R. Tolkien'],
    ['We accept the love we think we deserve.', 'Stephen Chbosky'],
    ['You only live once, but if you do it right, once is enough.', 'Mae West'],
    ['To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.', 'Ralph Waldo Emerson'],
  ];
  const [qt, author] = quotes[Math.floor(Math.random() * quotes.length)];
  reply(`💬 *Quote of the Moment*\n\n_"${qt}"_\n\n— *${author}*`);
}
break

// ─── CALCULATOR ───────────────────────────────────────────────────────────────
case 'calc':
case 'calculate':
case 'math': {
  if (!q) return reply('Usage: .calc <expression>\nExample: .calc 25 * 4 + 10');
  try {
    // Safe eval: only allow math characters
    const expr = q.replace(/[^0-9+\-*/.()% ]/g, '');
    if (!expr.trim()) return reply('❗ Invalid expression. Use numbers and operators only.');
    const result = Function('"use strict"; return (' + expr + ')')();
    if (!isFinite(result)) return reply('❗ Result is not a finite number.');
    reply(`🔢 *Calculator*\n\n${q} = *${result}*`);
  } catch (e) {
    reply('❗ Invalid math expression.');
  }
}
break

// ─── FAKE NEWS / GENERATOR ────────────────────────────────────────────────────
case 'fakenews':
case 'headline': {
  const subjects = ['Local Man','Scientists','Researchers','A New Study','Experts','The Government','NASA','A Dog','Anonymous Sources','Your Neighbours'];
  const verbs = ['Confirm','Reveal','Discover','Claim','Prove','Deny','Announce','Warn About','Celebrate','Are Investigating'];
  const objects = [
    'That Mondays May Soon Be Illegal','A New Form Of Energy Made From Boredom',
    'That Cats Have Been Plotting World Domination Since 2009',
    'That WhatsApp Bots Are Now Sentient','That Sleeping Too Much Makes You Smarter',
    'A Portal To Another Dimension In Someone\'s Microwave','That Silence Is Actually Loud In Another Universe',
    'That Scrolling TikTok Burns More Calories Than Running','That Pizza Was Once Used As Currency',
    'That Your Phone Is Judging You Silently'
  ];
  const s = subjects[Math.floor(Math.random() * subjects.length)];
  const v = verbs[Math.floor(Math.random() * verbs.length)];
  const o = objects[Math.floor(Math.random() * objects.length)];
  reply(`📰 *BREAKING NEWS*\n\n_${s} ${v} ${o}_\n\n> _This is satire. Obviously._`);
}
break

// ─── HOROSCOPE ────────────────────────────────────────────────────────────────
case 'horoscope':
case 'zodiac': {
  if (!q) return reply('Usage: .horoscope <zodiac sign>\nSigns: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces');
  const sign = q.trim().toLowerCase();
  const horoscopes = {
    aries: '🐏 *Aries* — Today energy is on your side. Push forward boldly.',
    taurus: '🐂 *Taurus* — Slow and steady wins the race. Trust the process.',
    gemini: '👯 *Gemini* — Your mind is sharp today. A conversation changes things.',
    cancer: '🦀 *Cancer* — Emotions run high. Protect your peace.',
    leo: '🦁 *Leo* — You\'re glowing today. Let people see your greatness.',
    virgo: '♍ *Virgo* — Details matter. Your precision pays off.',
    libra: '⚖️ *Libra* — Balance is key today. Don\'t overthink decisions.',
    scorpio: '🦂 *Scorpio* — Your intuition is powerful. Trust your gut.',
    sagittarius: '🏹 *Sagittarius* — Adventure calls. Be open to the unexpected.',
    capricorn: '🐐 *Capricorn* — Hard work is recognised today. Keep climbing.',
    aquarius: '🌊 *Aquarius* — Your ideas are ahead of their time. Speak up.',
    pisces: '🐟 *Pisces* — Creativity flows today. Express yourself freely.',
  };
  const result = horoscopes[sign];
  if (!result) return reply('❗ Unknown sign. Try: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces');
  reply(`🔮 *Daily Horoscope*\n\n${result}\n\n_Lucky number: ${Math.floor(Math.random() * 99) + 1}_`);
}
break

// ─── MORSE CODE ──────────────────────────────────────────────────────────────
case 'morse':
case 'tomorse': {
  if (!q) return reply('Usage: .morse <text>');
  const map = {
    a:'.-',b:'-...',c:'-.-.',d:'-..',e:'.',f:'..-.',g:'--.',h:'....',i:'..',j:'.---',
    k:'-.-',l:'.-..',m:'--',n:'-.',o:'---',p:'.--.',q:'--.-',r:'.-.',s:'...',t:'-',
    u:'..-',v:'...-',w:'.--',x:'-..-',y:'-.--',z:'--..',
    '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....',
    '6':'-....','7':'--...','8':'---..','9':'----.',' ':'/'
  };
  const encoded = q.toLowerCase().split('').map(c => map[c] || '?').join(' ');
  reply(`📡 *Morse Code*\n\n${q}\n\n\`${encoded}\``);
}
break

// ─── BASE64 ENCODE / DECODE ───────────────────────────────────────────────────
case 'encode':
case 'b64encode': {
  if (!q) return reply('Usage: .encode <text>');
  const encoded = Buffer.from(q).toString('base64');
  reply(`🔐 *Base64 Encoded*\n\n\`${encoded}\``);
}
break

case 'decode':
case 'b64decode': {
  if (!q) return reply('Usage: .decode <base64 text>');
  try {
    const decoded = Buffer.from(q, 'base64').toString('utf8');
    reply(`🔓 *Base64 Decoded*\n\n${decoded}`);
  } catch (e) {
    reply('❗ Invalid base64 string.');
  }
}
break

// ─── REVERSE TEXT ────────────────────────────────────────────────────────────
case 'reverse': {
  if (!q) return reply('Usage: .reverse <text>');
  reply(`🔄 ${q.split('').reverse().join('')}`);
}
break

// ─── TEXT TO UPPER / LOWER ───────────────────────────────────────────────────
case 'upper':
case 'uppercase': {
  if (!q) return reply('Usage: .upper <text>');
  reply(q.toUpperCase());
}
break

case 'lower':
case 'lowercase': {
  if (!q) return reply('Usage: .lower <text>');
  reply(q.toLowerCase());
}
break

// ─── REPEAT ──────────────────────────────────────────────────────────────────
case 'repeat':
case 'echo': {
  const times = parseInt(args[0]) || 1;
  const txt = args.slice(1).join(' ');
  if (!txt) return reply('Usage: .repeat <times> <text>');
  if (times > 10) return reply('❗ Max repeat is 10.');
  reply(Array(times).fill(txt).join('\n'));
}
break

// ─── WORD COUNT ──────────────────────────────────────────────────────────────
case 'wordcount':
case 'wc': {
  const input = q || (m.quoted ? m.quoted.text || m.quoted.body || '' : '');
  if (!input) return reply('Usage: .wc <text> or reply to a message.');
  const words = input.trim().split(/\s+/).filter(Boolean).length;
  const chars = input.length;
  const chars_no_space = input.replace(/\s/g,'').length;
  reply(`📝 *Word Count*\n\n• Words: *${words}*\n• Characters: *${chars}*\n• Characters (no spaces): *${chars_no_space}*`);
}
break

// ─── COUNTDOWN / TIMER MESSAGE ────────────────────────────────────────────────
case 'countdown': {
  const seconds = parseInt(args[0]) || 0;
  if (!seconds || seconds < 1 || seconds > 60) return reply('Usage: .countdown <seconds 1–60>');
  reply(`⏳ Countdown started: *${seconds}s*`);
  let remaining = seconds;
  const interval = setInterval(async () => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(interval);
      try { await james.sendMessage(from, { text: '🔔 *Time\'s up!*' }, { quoted: m }); } catch(e){}
    }
  }, 1000);
}
break

// ─── PERCENTAGE CALCULATOR ────────────────────────────────────────────────────
case 'percent':
case 'percentage': {
  // Usage: .percent 25 of 200   OR   .percent 50 off 300
  const n1 = parseFloat(args[0]);
  const op = (args[1] || '').toLowerCase();
  const n2 = parseFloat(args[2]);
  if (isNaN(n1) || isNaN(n2)) return reply('Usage:\n.percent 25 of 200 → 25% of 200\n.percent 50 off 300 → 50% off 300');
  if (op === 'of') {
    reply(`🔢 ${n1}% of ${n2} = *${((n1 / 100) * n2).toFixed(2)}*`);
  } else if (op === 'off') {
    const discount = (n1 / 100) * n2;
    reply(`🏷️ ${n1}% off ${n2} = *${(n2 - discount).toFixed(2)}* (saved: ${discount.toFixed(2)})`);
  } else {
    return reply('Usage:\n.percent 25 of 200\n.percent 50 off 300');
  }
}
break

// ─── TEMPERATURE CONVERTER ───────────────────────────────────────────────────
case 'temp':
case 'temperature': {
  // Usage: .temp 100c  OR  .temp 212f  OR  .temp 373k
  if (!q) return reply('Usage: .temp <value><unit>\nExample: .temp 100c | .temp 212f | .temp 373k');
  const match = q.match(/^([\d.]+)\s*([cfkCFK])$/);
  if (!match) return reply('❗ Format: .temp <number><c|f|k>  e.g. .temp 100c');
  const val = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  let c, f, k;
  if (unit === 'c') { c = val; f = c * 9/5 + 32; k = c + 273.15; }
  else if (unit === 'f') { f = val; c = (f - 32) * 5/9; k = c + 273.15; }
  else { k = val; c = k - 273.15; f = c * 9/5 + 32; }
  reply(`🌡️ *Temperature Converter*\n\n• Celsius:    *${c.toFixed(2)} °C*\n• Fahrenheit: *${f.toFixed(2)} °F*\n• Kelvin:     *${k.toFixed(2)} K*`);
}
break

// ─── CURRENCY (STATIC APPROX) ────────────────────────────────────────────────
case 'currency':
case 'convert': {
  if (args.length < 3) return reply('Usage: .convert <amount> <FROM> <TO>\nExample: .convert 100 USD KES');
  const amount = parseFloat(args[0]);
  const from2 = args[1].toUpperCase();
  const to = args[2].toUpperCase();
  // Approximate KES rates (static)
  const ratesUSD = { USD:1, KES:130, EUR:0.93, GBP:0.79, NGN:1550, TZS:2700, UGX:3800, ZAR:19, INR:83, JPY:157, CNY:7.3, CAD:1.37 };
  if (!ratesUSD[from2] || !ratesUSD[to]) return reply(`❗ Unsupported currency. Supported: ${Object.keys(ratesUSD).join(', ')}`);
  const converted = (amount / ratesUSD[from2]) * ratesUSD[to];
  reply(`💱 *Currency Converter* _(approx rates)_\n\n${amount} ${from2} = *${converted.toFixed(2)} ${to}*`);
}
break

// ─── GENERATE PASSWORD ───────────────────────────────────────────────────────
case 'genpass':
case 'password':
case 'generatepassword': {
  const len = Math.min(Math.max(parseInt(args[0]) || 16, 6), 64);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
  let pass = '';
  for (let i = 0; i < len; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  reply(`🔑 *Generated Password (${len} chars)*\n\n\`${pass}\`\n\n_Do not share this with anyone!_`);
}
break

// ─── LOREM IPSUM ─────────────────────────────────────────────────────────────
case 'lorem':
case 'loremipsum': {
  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  const words = parseInt(args[0]) || 50;
  const limited = lorem.split(' ').slice(0, Math.min(words, 100)).join(' ') + '...';
  reply(`📜 *Lorem Ipsum (${words} words)*\n\n${limited}`);
}
break

// ─── ANONYMOUS MESSAGE ───────────────────────────────────────────────────────
case 'anon':
case 'anonymous': {
  if (!isGroup) return reply('❗ Anon messages only work in groups.');
  if (!q) return reply('Usage: .anon <message>');
  try {
    await james.sendMessage(from, {
      text: `👤 *Anonymous Message*\n\n${q}`,
      contextInfo: {
        externalAdReply: {
          title: 'Anonymous',
          body: 'Someone sent an anonymous message',
          thumbnailUrl: 'https://files.catbox.moe/tk1xpz.jpeg',
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    });
    // delete trigger message if bot is admin
    if (isBotAdmins) {
      await james.sendMessage(from, { delete: m.key }).catch(() => {});
    }
  } catch(e) {
    reply('❌ Failed to send anonymous message.');
  }
}
break

// ─── AFK SYSTEM ──────────────────────────────────────────────────────────────
if (typeof global.jamesAFK === 'undefined') global.jamesAFK = {};

case 'afk': {
  const reason = q || 'No reason given';
  global.jamesAFK[sender] = { reason, time: Date.now() };
  reply(`😴 *${pushname}* is now AFK\n_Reason: ${reason}_`);
}
break

// ─── NOTES SYSTEM ─────────────────────────────────────────────────────────────
if (typeof global.jamesNotes === 'undefined') global.jamesNotes = {};

case 'save':
case 'note': {
  if (!isGroup) return reply('❗ Notes only work in groups.');
  const noteName = args[0];
  const noteContent = args.slice(1).join(' ') || (m.quoted ? m.quoted.text || m.quoted.body || '' : '');
  if (!noteName) return reply('Usage: .note <name> <content>');
  if (!noteContent) return reply('❗ Provide note content or reply to a message.');
  if (!global.jamesNotes[from]) global.jamesNotes[from] = {};
  global.jamesNotes[from][noteName.toLowerCase()] = { content: noteContent, by: sender, time: Date.now() };
  reply(`📌 Note saved as *${noteName}*`);
}
break

case 'getnote':
case 'notes':
case '#': {
  if (!isGroup) return reply('❗ Notes only work in groups.');
  const noteName = args[0] || command.slice(1);
  if (!noteName) {
    const all = global.jamesNotes[from] ? Object.keys(global.jamesNotes[from]) : [];
    if (!all.length) return reply('📭 No saved notes in this group.');
    return reply(`📋 *Saved Notes*\n\n${all.map((n,i) => `${i+1}. ${n}`).join('\n')}\n\nUse .getnote <name> to retrieve.`);
  }
  const note = global.jamesNotes[from]?.[noteName.toLowerCase()];
  if (!note) return reply(`❓ No note named *${noteName}*`);
  reply(`📌 *Note: ${noteName}*\n\n${note.content}`);
}
break

case 'delnote':
case 'deletenote': {
  if (!isGroup) return reply('❗ Notes only work in groups.');
  if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
  const noteName = args[0];
  if (!noteName) return reply('Usage: .delnote <name>');
  if (!global.jamesNotes[from]?.[noteName.toLowerCase()]) return reply(`❓ No note named *${noteName}*`);
  delete global.jamesNotes[from][noteName.toLowerCase()];
  reply(`🗑️ Note *${noteName}* deleted.`);
}
break

// ─── VOTE KICK ────────────────────────────────────────────────────────────────
if (typeof global.jamesVotekick === 'undefined') global.jamesVotekick = {};

case 'votekick': {
  if (!isGroup) return reply('❗ Groups only.');
  if (!isBotAdmins) return reply('❗ I need to be admin to kick.');
  const target = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!target) return reply('❗ Tag or reply to the person to votekick.');
  if (target === sender) return reply('❗ You cannot votekick yourself.');
  const voteKey = `${from}:${target}`;
  if (!global.jamesVotekick[voteKey]) {
    global.jamesVotekick[voteKey] = { votes: new Set(), started: Date.now(), by: sender };
  }
  const vk = global.jamesVotekick[voteKey];
  vk.votes.add(sender);
  const needed = 3;
  if (vk.votes.size >= needed) {
    try {
      await james.groupParticipantsUpdate(from, [target], 'remove');
      delete global.jamesVotekick[voteKey];
      await james.sendMessage(from, { text: `✅ *@${target.split('@')[0]}* was removed by vote kick! (${needed}/${needed} votes)`, mentions: [target] }, { quoted: m });
    } catch(e) {
      reply('❌ Failed to kick. Check my permissions.');
    }
  } else {
    await james.sendMessage(from, {
      text: `🗳️ *Vote Kick*\n\nTarget: @${target.split('@')[0]}\nVotes: ${vk.votes.size}/${needed}\n\nUse .votekick @user to add your vote.`,
      mentions: [target]
    }, { quoted: m });
  }
}
break

// ─── WARN SYSTEM ─────────────────────────────────────────────────────────────
if (typeof global.jamesWarns === 'undefined') global.jamesWarns = {};

case 'warn': {
  if (!isGroup) return reply('❗ Groups only.');
  if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
  const target = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!target) return reply('❗ Tag or reply to the person to warn.');
  if (!global.jamesWarns[from]) global.jamesWarns[from] = {};
  if (!global.jamesWarns[from][target]) global.jamesWarns[from][target] = 0;
  global.jamesWarns[from][target]++;
  const count = global.jamesWarns[from][target];
  const reason = args.slice(1).join(' ') || 'No reason given';
  if (count >= 3 && isBotAdmins) {
    try {
      await james.groupParticipantsUpdate(from, [target], 'remove');
      delete global.jamesWarns[from][target];
      await james.sendMessage(from, { text: `⛔ @${target.split('@')[0]} reached 3 warnings and was removed!\nLast reason: ${reason}`, mentions: [target] }, { quoted: m });
    } catch(e) {
      reply(`⚠️ @${target.split('@')[0]} has ${count} warnings but failed to kick. Check permissions.`);
    }
  } else {
    await james.sendMessage(from, {
      text: `⚠️ *WARNING ${count}/3*\n\n@${target.split('@')[0]}\nReason: ${reason}\n\n${count >= 2 ? '🔴 One more warning = removed!' : '🟡 Be careful.'}`,
      mentions: [target]
    }, { quoted: m });
  }
}
break

case 'warnlist': {
  if (!isGroup) return reply('❗ Groups only.');
  if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
  const warnData = global.jamesWarns[from] || {};
  const entries = Object.entries(warnData).filter(([,v]) => v > 0);
  if (!entries.length) return reply('✅ No active warnings in this group.');
  const mentions = entries.map(([jid]) => jid);
  const text = `📋 *Warning List*\n\n` + entries.map(([jid, cnt]) => `• @${jid.split('@')[0]} — ${cnt}/3 warns`).join('\n');
  await james.sendMessage(from, { text, mentions }, { quoted: m });
}
break

case 'resetwarn':
case 'clearwarn': {
  if (!isGroup) return reply('❗ Groups only.');
  if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
  const target = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!target) {
    if (args[0] === 'all') {
      global.jamesWarns[from] = {};
      return reply('✅ All warnings cleared for this group.');
    }
    return reply('Usage: .resetwarn @user  OR  .resetwarn all');
  }
  if (global.jamesWarns[from]) delete global.jamesWarns[from][target];
  await james.sendMessage(from, { text: `✅ Warnings cleared for @${target.split('@')[0]}`, mentions: [target] }, { quoted: m });
}
break

// ─── STICKER INFO ────────────────────────────────────────────────────────────
case 'stickerinfo':
case 'sinfo': {
  if (!m.quoted || !m.quoted.msg) return reply('❗ Reply to a sticker.');
  const msg = m.quoted.msg;
  const isSticker = !!msg.stickerMessage || m.quoted.mtype === 'stickerMessage';
  if (!isSticker) return reply('❗ Please reply to a sticker.');
  const sMsg = msg.stickerMessage || msg;
  reply(
    `🏷️ *Sticker Info*\n\n` +
    `• Pack: ${sMsg.stickerMetadata?.stickerPackId || sMsg.packname || 'Unknown'}\n` +
    `• Author: ${sMsg.stickerMetadata?.author || sMsg.author || 'Unknown'}\n` +
    `• Animated: ${sMsg.isAnimated ? 'Yes' : 'No'}\n` +
    `• MIME: ${sMsg.mimetype || 'image/webp'}`
  );
}
break

// ─── PROFILE PICTURE TOOLS ───────────────────────────────────────────────────
case 'getpp':
case 'pfp': {
  const targetUser = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : sender);
  try {
    const pp = await james.profilePictureUrl(targetUser, 'image').catch(() => null);
    if (!pp) return reply(`❌ No profile picture found for @${targetUser.split('@')[0]}.`);
    await james.sendMessage(from, {
      image: { url: pp },
      caption: `📸 Profile picture of @${targetUser.split('@')[0]}`,
      mentions: [targetUser]
    }, { quoted: m });
  } catch(e) {
    reply('❌ Failed to get profile picture.');
  }
}
break

// ─── KICK WITH REASON ─────────────────────────────────────────────────────────
case 'kick':
case 'remove': {
  if (!isGroup) return reply('❗ Groups only.');
  if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
  if (!isBotAdmins) return reply('❗ I need to be admin to kick.');
  const target = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!target) return reply('❗ Tag or reply to the person to kick.');
  if (target === botNumber) return reply('❗ I cannot kick myself.');
  const reason = args.slice(1).join(' ') || 'No reason given';
  try {
    await james.groupParticipantsUpdate(from, [target], 'remove');
    await james.sendMessage(from, {
      text: `👢 *Kicked*\n\n@${target.split('@')[0]} was removed.\nReason: _${reason}_`,
      mentions: [target]
    }, { quoted: m });
  } catch(e) {
    reply('❌ Failed to kick. Check permissions.');
  }
}
break

// ─── PROMOTE / DEMOTE ─────────────────────────────────────────────────────────
case 'promote': {
  if (!isGroup) return reply('❗ Groups only.');
  if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
  if (!isBotAdmins) return reply('❗ I need to be admin.');
  const target = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!target) return reply('❗ Tag or reply to the person to promote.');
  try {
    await james.groupParticipantsUpdate(from, [target], 'promote');
    await james.sendMessage(from, { text: `⬆️ @${target.split('@')[0]} promoted to admin!`, mentions: [target] }, { quoted: m });
  } catch(e) { reply('❌ Failed to promote.'); }
}
break

case 'demote': {
  if (!isGroup) return reply('❗ Groups only.');
  if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
  if (!isBotAdmins) return reply('❗ I need to be admin.');
  const target = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!target) return reply('❗ Tag or reply to the person to demote.');
  try {
    await james.groupParticipantsUpdate(from, [target], 'demote');
    await james.sendMessage(from, { text: `⬇️ @${target.split('@')[0]} demoted from admin.`, mentions: [target] }, { quoted: m });
  } catch(e) { reply('❌ Failed to demote.'); }
}
break

// ─── GROUP INFO ───────────────────────────────────────────────────────────────
case 'groupinfo':
case 'ginfo': {
  if (!isGroup) return reply('❗ Groups only.');
  try {
    const meta = await james.groupMetadata(from).catch(()=>null);
    if (!meta) return reply('❌ Could not get group info.');
    const totalMembers = meta.participants?.length || 0;
    const adminCount = meta.participants?.filter(p => p.admin).length || 0;
    const created = meta.creation ? new Date(meta.creation * 1000).toLocaleDateString('en-GB') : 'Unknown';
    reply(
      `╭━━━━━━━━━━━━━━━━━━╮\n` +
      `┃ 📋 *GROUP INFO*\n` +
      `╰━━━━━━━━━━━━━━━━━━╯\n\n` +
      `📛 Name: *${meta.subject || 'Unknown'}*\n` +
      `🆔 ID: \`${from}\`\n` +
      `👑 Owner: @${(meta.owner || '').split('@')[0]}\n` +
      `📅 Created: ${created}\n` +
      `👥 Members: *${totalMembers}*\n` +
      `🛡️ Admins: *${adminCount}*\n` +
      `📝 Desc: ${meta.desc ? meta.desc.slice(0, 100) : 'None'}`
    );
  } catch(e) { reply('❌ Failed to get group info.'); }
}
break

// ─── HIDETAG / TAG ALL ────────────────────────────────────────────────────────
case 'hidetag': {
  if (!isGroup) return reply('❗ Groups only.');
  if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
  const text2 = q || '📢 Hidden tag';
  const mentions2 = participants.map(p => p.id || p.jid).filter(Boolean);
  await james.sendMessage(from, { text: text2, mentions: mentions2 }, { quoted: m });
}
break

case 'tagall': {
  if (!isGroup) return reply('❗ Groups only.');
  if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
  const msg3 = q || '📢 Attention everyone!';
  const all = participants.map(p => p.id || p.jid).filter(Boolean);
  const txt3 = `${msg3}\n\n` + all.map(j => `@${j.split('@')[0]}`).join(' ');
  await james.sendMessage(from, { text: txt3, mentions: all }, { quoted: m });
}
break

// ─── BROADCAST (owner only) ───────────────────────────────────────────────────
case 'broadcast':
case 'bc': {
  if (!isOwner) return reply('❌ Owner only.');
  if (!q) return reply('Usage: .broadcast <message>');
  const chats = store?.chats?.all?.() || store?.chats || [];
  const ids = Array.isArray(chats) ? chats.map(c => c.id) : Object.keys(chats);
  const groups = ids.filter(id => id.endsWith('@g.us'));
  if (!groups.length) return reply('❌ No groups found in store.');
  let sent = 0, failed = 0;
  for (const gid of groups) {
    try {
      await james.sendMessage(gid, { text: q });
      sent++;
    } catch(e) { failed++; }
    await new Promise(r => setTimeout(r, 800));
  }
  reply(`📡 *Broadcast Complete*\n✅ Sent: ${sent}\n❌ Failed: ${failed}`);
}
break

// ─── REPORT / BUG ─────────────────────────────────────────────────────────────
case 'report':
case 'bug': {
  if (!q) return reply('Usage: .report <message>\nReport a bug or issue to the owner.');
  const ownerJid = (global.owner?.[0] || '').replace(/[^0-9]/g,'') + '@s.whatsapp.net';
  if (!ownerJid.includes('@')) return reply('❗ Owner not configured.');
  try {
    await james.sendMessage(ownerJid, {
      text: `🐛 *Bug/Report from @${sender.split('@')[0]}*\n\nGroup: ${isGroup ? groupName : 'DM'}\nMessage: ${q}`
    });
    reply('✅ Your report has been sent to the owner. Thanks!');
  } catch(e) {
    reply('❌ Failed to send report. Try contacting the owner directly.');
  }
}
break

// ─── BOT STATUS / PING ────────────────────────────────────────────────────────
case 'ping':
case 'status': {
  const t0 = Date.now();
  await james.sendMessage(from, { text: '⏳' }, { quoted: m });
  const ping = Date.now() - t0;
  const mem = process.memoryUsage();
  const uptime = (() => {
    const s = Math.floor(process.uptime());
    const h = Math.floor(s / 3600);
    const mm = Math.floor((s % 3600) / 60);
    const ss = s % 60;
    return `${h}h ${mm}m ${ss}s`;
  })();
  reply(
    `╭━━━━━━━━━━━━━━━━━━╮\n` +
    `┃ 🤖 *BOT STATUS*\n` +
    `╰━━━━━━━━━━━━━━━━━━╯\n\n` +
    `⚡ Ping: *${ping}ms*\n` +
    `⏱️ Uptime: *${uptime}*\n` +
    `🧠 RAM: *${(mem.heapUsed / 1024 / 1024).toFixed(1)} MB*\n` +
    `💾 RSS: *${(mem.rss / 1024 / 1024).toFixed(1)} MB*\n` +
    `🌐 Platform: *${process.platform}*\n` +
    `📦 Node: *${process.version}*`
  );
}
break

// ─── OWNER INFO ───────────────────────────────────────────────────────────────
case 'owner': {
  const ownerNum = (global.owner?.[0] || '').replace(/[^0-9]/g,'');
  reply(
    `👑 *BOT OWNER*\n\n` +
    `• Name: *${global.botName || 'CYBERPUNK-BULLY'}*\n` +
    `• Number: wa.me/${ownerNum || '???'}\n` +
    `• Telegram: t.me/cyberpunkbully\n\n` +
    `_Contact the owner for support._`
  );
}
break

// ─── ANTISIMP TOGGLE ─────────────────────────────────────────────────────────
case 'antisimp': {
  if (!isOwner && !isAdmins) return reply('⚠️ Admin/Owner only.');
  const scope = (args[0] || '').toLowerCase();
  const op = (args[1] || '').toLowerCase();
  if (!scope || !['group','dm'].includes(scope)) return reply(`Usage: .antisimp group|dm on|off\nStatus: group=${global.antisimp?.group}, dm=${global.antisimp?.dm}`);
  if (!['on','off'].includes(op)) return reply(`Usage: .antisimp group|dm on|off`);
  if (typeof global.antisimp === 'undefined') global.antisimp = { group: false, dm: false };
  global.antisimp[scope] = op === 'on';
  reply(`✅ AntiSimp ${op} for ${scope}.`);
}
break

// ─── CLEARSTATUS ─────────────────────────────────────────────────────────────
case 'clearstatus':
case 'clearbio': {
  if (!isOwner) return reply('❌ Owner only.');
  try {
    await setBio(james, '');
    reply('✅ Profile status cleared.');
  } catch(e) {
    reply('❌ Failed to clear status: ' + (e.message || e));
  }
}
break

// ─── SETNAME (bot profile name) ───────────────────────────────────────────────
case 'setname': {
  if (!isOwner) return reply('❌ Owner only.');
  if (!q) return reply('Usage: .setname <new name>');
  try {
    await james.updateProfileName(q);
    reply(`✅ Profile name updated to: *${q}*`);
  } catch(e) {
    reply('❌ Failed to update name. Method may not be supported on this Baileys build.');
  }
}
break

// ─── SETSTATUS / SETBIO ───────────────────────────────────────────────────────
case 'setstatus':
case 'setbio': {
  if (!isOwner) return reply('❌ Owner only.');
  if (!q) return reply('Usage: .setstatus <text>');
  try {
    await setBio(james, q);
    reply(`✅ Status set to: _${q}_`);
  } catch(e) {
    reply('❌ Failed to set status: ' + (e.message || e));
  }
}
break

// ─── BLOCK / UNBLOCK ─────────────────────────────────────────────────────────
case 'block': {
  if (!isOwner) return reply('❌ Owner only.');
  const target = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!target) return reply('❗ Tag or reply to the person to block.');
  try {
    await james.updateBlockStatus(target, 'block');
    reply(`🚫 Blocked @${target.split('@')[0]}`);
  } catch(e) { reply('❌ Failed to block.'); }
}
break

case 'unblock': {
  if (!isOwner) return reply('❌ Owner only.');
  const target = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!target) return reply('❗ Tag or reply to the person to unblock.');
  try {
    await james.updateBlockStatus(target, 'unblock');
    reply(`✅ Unblocked @${target.split('@')[0]}`);
  } catch(e) { reply('❌ Failed to unblock.'); }
}
break

// ─── RANDOM NUMBER ───────────────────────────────────────────────────────────
case 'random':
case 'randnum':
case 'rng': {
  const min = parseInt(args[0]) || 1;
  const max = parseInt(args[1]) || 100;
  if (min >= max) return reply('❗ Min must be less than max. Usage: .random <min> <max>');
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  reply(`🎲 Random number between *${min}* and *${max}*:\n\n*${num}*`);
}
break

// ─── CLAP TEXT ────────────────────────────────────────────────────────────────
case 'clap': {
  if (!q) return reply('Usage: .clap <text>');
  reply(q.split(' ').join(' 👏 '));
}
break

// ─── AESTHETIC TEXT ───────────────────────────────────────────────────────────
case 'aesthetic':
case 'vaporwave': {
  if (!q) return reply('Usage: .aesthetic <text>');
  const aes = q.split('').map(c => {
    const code = c.charCodeAt(0);
    if (code >= 33 && code <= 126) return String.fromCharCode(code + 65248);
    return c === ' ' ? '　' : c;
  }).join('');
  reply(aes);
}
break

// ─── BUBBLE TEXT ─────────────────────────────────────────────────────────────
case 'bubble': {
  if (!q) return reply('Usage: .bubble <text>');
  const bubbleMap = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ';
  const result2 = q.toLowerCase().split('').map(c => {
    const i = c.charCodeAt(0) - 97;
    return (i >= 0 && i < 26) ? bubbleMap[i] : c;
  }).join('');
  reply(result2);
}
break

// ─── SMALL CAPS ───────────────────────────────────────────────────────────────
case 'smallcaps':
case 'sc': {
  if (!q) return reply('Usage: .smallcaps <text>');
  const scMap = {a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'Q',r:'ʀ',s:'ꜱ',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'};
  const scResult = q.toLowerCase().split('').map(c => scMap[c] || c).join('');
  reply(scResult);
}
break

// ─── FAKE FACT ────────────────────────────────────────────────────────────────
case 'fakefact':
case 'funfact': {
  const facts = [
    'Bananas are technically berries, but strawberries are not. 🍌',
    'A group of flamingos is called a flamboyance. 🦩',
    'Honey never expires — edible honey has been found in Egyptian tombs. 🍯',
    'The word "nerd" was first coined by Dr. Seuss in 1950. 📚',
    'Octopuses have three hearts and blue blood. 🐙',
    'A day on Venus is longer than a year on Venus. 🌍',
    'Humans share 50% of their DNA with bananas. 🧬',
    'The shortest war in history lasted 38–45 minutes. ⚔️',
    'There are more possible chess games than atoms in the observable universe. ♟️',
    'Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid. 🏛️',
  ];
  reply(`🤔 *Fun Fact*\n\n${facts[Math.floor(Math.random() * facts.length)]}`);
}
break

// ─── WOULD YOU RATHER ─────────────────────────────────────────────────────────
case 'wyr':
case 'wouldyourather': {
  const wyrs = [
    ['Be able to fly', 'Be invisible'],
    ['Never use social media again', 'Never watch TV/Netflix again'],
    ['Always be 10 minutes late', 'Always be 20 minutes early'],
    ['Speak every language', 'Play every instrument'],
    ['Have unlimited money but no free time', 'Have unlimited free time but no money'],
    ['Know when you\'ll die', 'Know how you\'ll die'],
    ['Live in a world with no music', 'Live in a world with no internet'],
    ['Have legs as long as your fingers', 'Have fingers as long as your legs'],
  ];
  const [a, b] = wyrs[Math.floor(Math.random() * wyrs.length)];
  reply(`🤷 *Would You Rather?*\n\n🔵 ${a}\n\n*— OR —*\n\n🔴 ${b}\n\n_Reply with 🔵 or 🔴!_`);
}
break

// ─── BANNER TEXT ─────────────────────────────────────────────────────────────
case 'banner': {
  if (!q) return reply('Usage: .banner <text>');
  const top = '╔' + '═'.repeat(q.length + 2) + '╗';
  const mid = `║ ${q} ║`;
  const bot = '╚' + '═'.repeat(q.length + 2) + '╝';
  reply(`\`\`\`${top}\n${mid}\n${bot}\`\`\``);
}
break

// ─── FUN MENU ────────────────────────────────────────────────────────────────
case 'funmenu': {
  const funMenu = `${readmore}
╭────────────────────╮
│   🎲 FUN COMMANDS
╰────────────────────╯
│  ✦ 8ball / ask <question>
│  ✦ flip / coin
│  ✦ dice [sides]
│  ✦ choose a|b|c
│  ✦ truth / dare
│  ✦ rate <thing>
│  ✦ ship <name1> <name2>
│  ✦ roast @user
│  ✦ compliment @user
│  ✦ joke / darkjoke
│  ✦ riddle / answer
│  ✦ wyr
│  ✦ quote / rquote
│  ✦ funfact / fakenews
│  ✦ horoscope <sign>
│  ✦ fakeid / fakeuser
│  ✦ emojimix <e1> <e2>
│  ✦ crush @user
│  ✦ lovemeter @user1 @user2
│  ✦ compatibility @user
│  ✦ rizz
│  ✦ wingman
│  ✦ pickup
│  ✦ roastme
│  ✦ personality
│  ✦ vibe
│  ✦ npc
│  ✦ brainrot
│  ✦ typeracer
╰────────────────────
_Type .menu to return_
`;
  await james.sendMessage(m.chat, {
    text: funMenu, contextInfo: { mentionedJid: [m.sender], externalAdReply: { title: 'Fun Commands', body: 'Games & Entertainment', mediaType: 1, thumbnailUrl: 'https://files.catbox.moe/rklhyy.jpeg', sourceUrl: 'https://t.me/cyberpunkbully', renderLargerThumbnail: true } }
  }, { quoted: m });
}
break

// ─── NETWORK MENU ────────────────────────────────────────────────────────────
case 'netmenu': {
  const netMenu = `${readmore}
╭────────────────────╮
│  🌐 NETWORK TOOLS
╰────────────────────╯
│  ✦ ip <address>
│  ✦ myip / serverip
│  ✦ ipmap <address>
│  ✦ ipscan <ip1> <ip2>...
│  ✦ whois <domain>
│  ✦ dns <domain>
│  ✦ portcheck <host> <port>
│  ✦ pinghost <host>
│  ✦ trace <host> [owner]
│  ✦ expand <url>
│  ✦ ss / screenshot <url>
│  ✦ checkuser <username>
│  ✦ sitecheck <url>
╰────────────────────
_Type .menu to return_
`;
  await james.sendMessage(m.chat, {
    text: netMenu, contextInfo: { mentionedJid: [m.sender], externalAdReply: { title: 'Network Tools', body: 'IP, DNS & More', mediaType: 1, thumbnailUrl: 'https://files.catbox.moe/tk1xpz.jpeg', sourceUrl: 'https://t.me/cyberpunkbully', renderLargerThumbnail: true } }
  }, { quoted: m });
}
break

// ─── TOOLS MENU ──────────────────────────────────────────────────────────────
case 'toolsmenu': {
  const toolsMenu = `${readmore}
╭────────────────────╮
│   🔧 TOOLS
╰────────────────────╯
│  ✦ calc <expr>
│  ✦ percent 25 of 200
│  ✦ temp 100c
│  ✦ convert 100 USD KES
│  ✦ rate <FROM> <TO>
│  ✦ weather <city>
│  ✦ time / worldtime
│  ✦ timestamp [unix]
│  ✦ genpass [length]
│  ✦ qr <text/url>
│  ✦ hash / md5 / sha256
│  ✦ b64encode / b64decode
│  ✦ urlencode / urldecode
│  ✦ binary / frombin
│  ✦ tohex / fromhex
│  ✦ caesar <shift> <text>
│  ✦ color <hex>
│  ✦ define <word>
│  ✦ ascii <text>
│  ✦ wordcount / reverse
│  ✦ upper / lower / clap
│  ✦ aesthetic / bubble
│  ✦ smallcaps / banner
│  ✦ morse / encode / decode
│  ✦ lorem [words]
│  ✦ rng [min] [max]
│  ✦ ocr (reply to image)
│  ✦ tts <text>
│  ✦ translate <lang> <text>
│  ✦ summarize <text>
│  ✦ spell <word>
╰────────────────────
_Type .menu to return_
`;
  await james.sendMessage(m.chat, {
    text: toolsMenu, contextInfo: { mentionedJid: [m.sender], externalAdReply: { title: 'Tool Commands', body: 'Utilities & Converters', mediaType: 1, thumbnailUrl: 'https://files.catbox.moe/9m8z4i.jpeg', sourceUrl: 'https://t.me/cyberpunkbully', renderLargerThumbnail: true } }
  }, { quoted: m });
}
break

// ─── INBOX MENU ──────────────────────────────────────────────────────────────
case 'inboxmenu': {
  const inboxMenu = `${readmore}
╭────────────────────╮
│   📥 INBOX TOOLS
╰────────────────────╯
│ 🗑️ ANTIDELETE INBOX
│  ✦ antidelete on|off
│  ✦ antidelete group on|off
│  ✦ antidelete dm on|off
│  ✦ antidelete inbox
│  ✦ antidelete clear
│  ✦ antidelete status
├────────────────────
│ 👁️ VIEW-ONCE INBOX
│  ✦ vvi / vvinbox (reply to view-once)
│  ✦ rvo / readviewonce (reply to view-once)
├────────────────────
│ 📊 AUTO STATUS
│  ✦ autostatus on|off
│  ✦ autolike on|off
│  ✦ autostatus status
│  ✦ autostatus onlyfrom <num>
│  ✦ autostatus clearonlyfrom
╰────────────────────
_Type .menu to return_
`;
  await james.sendMessage(m.chat, {
    text: inboxMenu, contextInfo: { mentionedJid: [m.sender], externalAdReply: { title: 'Inbox Tools', body: 'AntiDelete · ViewOnce · Status', mediaType: 1, thumbnailUrl: 'https://files.catbox.moe/rklhyy.jpeg', sourceUrl: 'https://t.me/cyberpunkbully', renderLargerThumbnail: true } }
  }, { quoted: m });
}
break

// ─── EXTRAMENU (overview / index) ────────────────────────────────────────────
case 'extramenu':
case 'moremenu': {
  const extraMenu = `${readmore}
╭────────────────────╮
│   🎮 EXTRA COMMANDS
╰────────────────────╯
│ Use these sub-menus:
│
│  🎲 .funmenu
│     Fun, games, wingman, rizz
│
│  🌐 .netmenu
│     IP, DNS, network tools
│
│  🔧 .toolsmenu
│     Calc, encode, translate
│
│  📥 .inboxmenu
│     AntiDelete, ViewOnce,
│     AutoStatus view & like
│
│  👥 GROUP EXTRAS
│  ✦ warn / warnlist / resetwarn
│  ✦ votekick / kick
│  ✦ promote / demote
│  ✦ hidetag / tagall
│  ✦ groupinfo / getpp
│  ✦ note / getnote / delnote
│  ✦ anon / bc / report
│
│  ⚙️ BOT
│  ✦ ping / status / sysinfo
│  ✦ setstatus / clearstatus
│  ✦ setname / block / unblock
│  ✦ antisimp group|dm on|off
╰────────────────────
_Type .menu to return_
`;
  await james.sendMessage(m.chat, {
    text: extraMenu,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: 'CYBERPUNK-BULLY',
        body: 'Extra Commands Index',
        mediaType: 1,
        thumbnailUrl: 'https://files.catbox.moe/tk1xpz.jpeg',
        sourceUrl: 'https://t.me/cyberpunkbully',
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
}
break

// ════════════════════════════════════════════════════════════════
// ── ANTIDELETE COMMANDS ─────────────────────────────────────────
// ════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════
// ── VVI / VVINBOX — Reveal view-once & send to sender's DM ─────
// ════════════════════════════════════════════════════════════════
case 'vvi':
case 'vvinbox':
case 'vobox':
case 'antiviewonce':
case 'readvo':
case 'rvo':
case 'readviewonce': {
  try {
    // Get context info from various message types
    const vviCtx =
      m.message?.extendedTextMessage?.contextInfo ||
      m.message?.imageMessage?.contextInfo ||
      m.message?.videoMessage?.contextInfo ||
      m.message?.buttonsResponseMessage?.contextInfo ||
      m.message?.listResponseMessage?.contextInfo;

    if (!vviCtx?.quotedMessage || !vviCtx?.stanzaId) {
      return await reply('↩️ Reply to a *view-once* message to send it to your inbox.');
    }

    const vviQuoted = vviCtx.quotedMessage;

    // Detect view-once flag across all known Baileys formats
    const vviHasVO =
      !!vviQuoted.viewOnceMessageV2 ||
      !!vviQuoted.viewOnceMessageV2Extension ||
      !!vviQuoted.viewOnceMessage ||
      !!vviQuoted.viewOnce ||
      !!vviQuoted?.imageMessage?.viewOnce ||
      !!vviQuoted?.videoMessage?.viewOnce ||
      !!vviQuoted?.audioMessage?.viewOnce;

    if (!vviHasVO) {
      return await reply('❌ That is not a view-once message!');
    }

    // Resolve the actual media message object
    let vviActual = null;
    let vviMtype = null;

    if (vviQuoted.viewOnceMessageV2Extension?.message) {
      vviActual = vviQuoted.viewOnceMessageV2Extension.message;
      vviMtype = Object.keys(vviActual)[0];
    } else if (vviQuoted.viewOnceMessageV2?.message) {
      vviActual = vviQuoted.viewOnceMessageV2.message;
      vviMtype = Object.keys(vviActual)[0];
    } else if (vviQuoted.viewOnceMessage?.message) {
      vviActual = vviQuoted.viewOnceMessage.message;
      vviMtype = Object.keys(vviActual)[0];
    } else if (vviQuoted.imageMessage?.viewOnce) {
      vviActual = { imageMessage: vviQuoted.imageMessage };
      vviMtype = 'imageMessage';
    } else if (vviQuoted.videoMessage?.viewOnce) {
      vviActual = { videoMessage: vviQuoted.videoMessage };
      vviMtype = 'videoMessage';
    } else if (vviQuoted.audioMessage?.viewOnce) {
      vviActual = { audioMessage: vviQuoted.audioMessage };
      vviMtype = 'audioMessage';
    }

    if (!vviActual || !vviMtype) {
      return await reply('❌ Unsupported view-once message type.');
    }

    const vviDlType =
      vviMtype === 'imageMessage' ? 'image' :
      vviMtype === 'videoMessage' ? 'video' : 'audio';

    // Download the media
    const vviStream = await downloadContentFromMessage(vviActual[vviMtype], vviDlType);
    let vviBuf = Buffer.from([]);
    for await (const chunk of vviStream) vviBuf = Buffer.concat([vviBuf, chunk]);

    if (!vviBuf || !vviBuf.length) return await reply('❌ Failed to download view-once media.');

    const vviCaption = vviActual[vviMtype]?.caption || '';
    const vviHeader = `╔══『 *🌐 CYBER-XMD* 』══╗\n📩 *View-Once Revealed*\n💡 Sent privately to your inbox\n╚═══════════════════╝${vviCaption ? '\n\n' + vviCaption : ''}`.trim();

    // Notify in the current chat
    await james.sendMessage(from, { text: '📬 *CYBER-XMD* | View-once sent to your inbox!' }, { quoted: m });

    // Send to the command sender's private DM (whoever ran .vvi)
    const vviDest = sender; // sender = the person who sent .vvi command
    if (vviMtype === 'imageMessage') {
      await james.sendMessage(vviDest, {
        image: vviBuf,
        caption: vviHeader,
        mimetype: 'image/jpeg'
      });
    } else if (vviMtype === 'videoMessage') {
      await james.sendMessage(vviDest, {
        video: vviBuf,
        caption: vviHeader,
        mimetype: 'video/mp4'
      });
    } else if (vviMtype === 'audioMessage') {
      await james.sendMessage(vviDest, {
        audio: vviBuf,
        ptt: true,
        mimetype: 'audio/ogg; codecs=opus'
      });
      await james.sendMessage(vviDest, { text: vviHeader });
    }

  } catch (err) {
    console.error('[vvi] error:', err);
    try { reply('❌ Failed to reveal view-once: ' + (err.message || err)); } catch(e) {}
  }
}
break

// ════════════════════════════════════════════════════════════════
// ── AUTO STATUS LIKE ────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════
case 'autolike':
case 'statuslike': {
  if (!isOwner) return reply('❌ Owner only.');
  const val = (args[0] || '').toLowerCase();
  if (!['on','off'].includes(val)) {
    return reply(`💛 *AUTO STATUS LIKE*\nStatus: *${global.autostatusSettings.likeEnabled ? 'ON' : 'OFF'}*\nUsage: .autolike on|off`);
  }
  global.autostatusSettings.likeEnabled = val === 'on';
  saveAutostatusSettings();
  reply(`💛 Auto Status Like: *${val.toUpperCase()}*`);
}
break

// ════════════════════════════════════════════════════════════════
// ── WINGMAN / RIZZ / PICKUP COMMANDS ────────────────────────────
// ════════════════════════════════════════════════════════════════
case 'wingman': {
  const lines = global.wingmanLines;
  const line = lines[Math.floor(Math.random() * lines.length)];
  const target = m.mentionedJid?.[0] || null;
  const targetName = target ? `@${target.split('@')[0]}` : 'someone special';
  await james.sendMessage(from, {
    text: `🕊️ *WINGMAN MODE*\n\n💬 Use this on ${targetName}:\n\n_"${line}"_\n\n> 😎 You're welcome.`,
    mentions: target ? [target] : []
  }, { quoted: m });
}
break

case 'pickup':
case 'pickupline': {
  const lines = global.wingmanLines;
  const line = lines[Math.floor(Math.random() * lines.length)];
  reply(`💘 *Pickup Line*\n\n_"${line}"_`);
}
break

case 'rizz': {
  const rizzLines = [
    'Your rizz level: 🔥🔥🔥🔥🔥 LEGENDARY. The streets are not ready.',
    'Rizz detected. You could charm a cactus into giving you a hug.',
    'Your rizz is so strong, WiFi connects to you automatically.',
    'Rizz level: SIGMA. You walk in and the temperature rises.',
    'Certified rizz lord. Courts would rule in your favour.',
    'Rizz check: PASSED. You could sell ice to a penguin.',
    'Your rizz is unmatched. The drip is immaculate.',
    'Rizz meter: BROKEN. Scale cannot handle this level.',
    'Alert: Maximum rizz achieved. Cupid has retired.',
    'Your rizz is so wild, people text back immediately.',
  ];
  const target = m.mentionedJid?.[0] || sender;
  const num = target.split('@')[0];
  const result = rizzLines[Math.floor(Math.random() * rizzLines.length)];
  await james.sendMessage(from, {
    text: `😏 *RIZZ REPORT — @${num}*\n\n${result}`,
    mentions: [target]
  }, { quoted: m });
}
break

case 'crush': {
  const target = m.mentionedJid?.[0] || null;
  if (!target) return reply('❗ Tag someone. Usage: .crush @user');
  const pct = Math.floor(Math.random() * 101);
  const bar = '❤️'.repeat(Math.floor(pct / 10)) + '🖤'.repeat(10 - Math.floor(pct / 10));
  const vibe = pct >= 85 ? 'SOULMATE ENERGY 💘' : pct >= 60 ? 'Strong feels 🥰' : pct >= 40 ? 'Curious attraction 😊' : pct >= 20 ? 'Just friends 😅' : 'Run. Now. 🏃';
  await james.sendMessage(from, {
    text: `💓 *CRUSH METER*\n\n@${sender.split('@')[0]} → @${target.split('@')[0]}\n\n${bar}\n\n❤️ *${pct}%* — ${vibe}`,
    mentions: [sender, target]
  }, { quoted: m });
}
break

case 'lovemeter':
case 'lovecalc': {
  const names = q.trim().split(/\s+/);
  const n1 = names[0] || pushname;
  const n2 = names[1] || 'Bae';
  const seed = (n1 + n2).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const pct = seed % 101;
  const heart = pct >= 80 ? '💘' : pct >= 60 ? '❤️' : pct >= 40 ? '🧡' : pct >= 20 ? '💙' : '🖤';
  reply(`${heart} *LOVE METER*\n\n💑 *${n1}* + *${n2}*\n\n${'❤️'.repeat(Math.floor(pct/10))}${'🖤'.repeat(10-Math.floor(pct/10))}\n\n*${pct}% compatible* ${pct >= 80 ? '— Perfect match!' : pct >= 50 ? '— Worth a shot!' : '— It\'s complicated 😬'}`);
}
break

case 'compatibility': {
  const target = m.mentionedJid?.[0] || null;
  if (!target) return reply('❗ Tag someone. Usage: .compatibility @user');
  const traits = ['Loyalty','Communication','Humor','Ambition','Vibes','Trust','Energy'];
  const scores = traits.map(t => ({ trait: t, score: Math.floor(Math.random() * 41) + 60 }));
  const avg = Math.floor(scores.reduce((a, s) => a + s.score, 0) / scores.length);
  const lines2 = scores.map(s => `• ${s.trait}: ${s.score}%`).join('\n');
  await james.sendMessage(from, {
    text: `🌟 *COMPATIBILITY CHECK*\n\n@${sender.split('@')[0]} x @${target.split('@')[0]}\n\n${lines2}\n\n━━━━━━━━━━━━━━\n💯 *Overall: ${avg}%* ${avg >= 80 ? '— Power couple!' : avg >= 60 ? '— Good match!' : '— Needs work 😅'}`,
    mentions: [sender, target]
  }, { quoted: m });
}
break

case 'personality': {
  const types = [
    { type: 'The Sigma 😎', desc: 'You operate alone, unbothered, on your own frequency.' },
    { type: 'The Empath 🌸', desc: 'You feel everything deeply and carry others\' energy.' },
    { type: 'The Strategist 🧠', desc: 'Every move is calculated. Chess player in a checkers world.' },
    { type: 'The Wildcard 🃏', desc: 'Unpredictable, chaotic, but somehow always landing right.' },
    { type: 'The Protector 🛡️', desc: 'Loyal to a fault. Ride or die doesn\'t begin to cover it.' },
    { type: 'The Dreamer ✨', desc: 'Head in the clouds but heart in the right place.' },
    { type: 'The Grinder 💪', desc: 'Outwork everyone. Sleep is for the weak.' },
    { type: 'The Chameleon 🦎', desc: 'Adapts to any room, any crowd, any vibe seamlessly.' },
  ];
  const p = types[Math.floor(Math.random() * types.length)];
  reply(`🔮 *PERSONALITY READING*\n\n*${pushname}* — You are...\n\n*${p.type}*\n\n_${p.desc}_`);
}
break

case 'vibe': {
  const vibes = [
    'Main character energy today 🌟',
    'Chaotic neutral. Nothing makes sense but it works.',
    'Operating on villain arc mode 🖤',
    'NPC today, main character tomorrow.',
    'Unbothered, moisturised, thriving ✨',
    'Soft life era activated 🛋️',
    'Sigma grindset. No breaks. No mercy.',
    'Wholesome but secretly feral 🌸🐺',
    'Too tired for drama but somehow always in it.',
    'Rizz level: factory reset 💀',
  ];
  reply(`🌀 *VIBE CHECK — ${pushname}*\n\n${vibes[Math.floor(Math.random() * vibes.length)]}`);
}
break

case 'npc': {
  const npcs = [
    'You walk in circles saying "Lovely weather today!"',
    'You repeat the same greeting until someone interacts with you.',
    'You stand at a corner for no reason, blocking the path.',
    'Your dialogue tree has 3 options and they all say the same thing.',
    'You offer a side quest nobody asked for.',
    'You disappear after the main quest is completed.',
    'You sell items that nobody needs at max price.',
    'You give directions that are 100% wrong.',
  ];
  reply(`🤖 *NPC ASSIGNMENT*\n\n*${pushname}*, today you are:\n\n_${npcs[Math.floor(Math.random() * npcs.length)]}_`);
}
break

case 'brainrot': {
  const brainrots = [
    'Skibidi toilet rizz fr fr no cap on god bussin fanum tax gyatt ohio sigma grindset.',
    'W rizz unlocked. Caught the fanum tax. Ohio moment. Gyatt fr fr. No cap bestie.',
    'Ate and left no crumbs. Goated with the sauce. Slay. Bussin. Periodt.',
    'Edge lord arc activated. Sigma rule 38 applied. Rizz farm established.',
    'On god bro this lowkey hits different ngl. Absolute cinema. Based. Cringe. Both.',
    'Main character in the most unhinged way possible. The lore goes deep.',
    'Certified blud moment. Innit. Bare jokes. Wagwan for the vibe check.',
    'Unc said touch grass but I said no cap I\'m built different fam.',
  ];
  reply(`🧠 *BRAINROT TRANSLATION*\n\n_${brainrots[Math.floor(Math.random() * brainrots.length)]}_`);
}
break

case 'typeracer': {
  const sentences = [
    'The quick brown fox jumps over the lazy dog',
    'To be or not to be that is the question',
    'All that glitters is not gold but it sure looks nice',
    'The best time to plant a tree was twenty years ago',
    'In the middle of every difficulty lies opportunity',
    'Life is what happens when you are busy making other plans',
  ];
  const s = sentences[Math.floor(Math.random() * sentences.length)];
  reply(`⌨️ *TYPE RACER*\n\nType this as fast as you can:\n\n\`\`\`${s}\`\`\`\n\n_Reply with the exact text to challenge others!_`);
}
break

case 'roastme': {
  const roasts = [
    `${pushname}, your wifi is stronger than your personality.`,
    `${pushname}, you're the human equivalent of a "Loading..." screen.`,
    `${pushname}, even Google couldn't find something interesting about you.`,
    `${pushname}, you have the energy of a dying phone battery.`,
    `${pushname}, your aura is giving "404 vibe not found".`,
    `${pushname}, you're the reason warning labels exist.`,
    `${pushname}, your comebacks need a 3-5 business day processing time.`,
    `${pushname}, you're so average, averages feel insulted.`,
  ];
  reply(`🔥 *ROAST MODE*\n\n${roasts[Math.floor(Math.random() * roasts.length)]}`);
}
break

// ════════════════════════════════════════════════
// ── END EXTRA COMMANDS BLOCK ─────────────────
// ════════════════════════════════════════════════


// ─── IP LOOKUP ───────────────────────────────────────────────────────────────
case 'iplookup':
case 'ipinfo':
case 'ip': {
  const ipTarget = q.trim();
  if (!ipTarget) return reply('❗ Usage: .ip <ip address>\nExample: .ip 8.8.8.8');
  try {
    reply(`🔍 Looking up *${ipTarget}*...`);
    const res = await axios.get(`https://ipapi.co/${ipTarget}/json/`);
    const d = res.data;
    if (d.error) return reply(`❌ Error: ${d.reason || 'Invalid IP address'}`);
    const info = `
🌐 *IP LOOKUP RESULTS*
━━━━━━━━━━━━━━━━━━━━
🔢 *IP:* ${d.ip || 'N/A'}
🏢 *ASN:* ${d.asn || 'N/A'}
🏗️ *Org:* ${d.org || 'N/A'}
🏙️ *City:* ${d.city || 'N/A'}
🗺️ *Region:* ${d.region || 'N/A'}
🌍 *Country:* ${d.country_name || 'N/A'} (${d.country || 'N/A'})
📮 *Postal:* ${d.postal || 'N/A'}
🕐 *Timezone:* ${d.timezone || 'N/A'}
📡 *ISP:* ${d.org || 'N/A'}
📞 *Calling Code:* +${d.country_calling_code || 'N/A'}
💱 *Currency:* ${d.currency_name || 'N/A'} (${d.currency || 'N/A'})
🗣️ *Languages:* ${d.languages || 'N/A'}
📍 *Coordinates:* ${d.latitude || 'N/A'}, ${d.longitude || 'N/A'}
━━━━━━━━━━━━━━━━━━━━
_Powered by ipapi.co_
`.trim();
    reply(info);
  } catch(e) {
    reply(`❌ IP lookup failed: ${e.message}`);
  }
}
break

// ─── MY IP ───────────────────────────────────────────────────────────────────
case 'myip':
case 'serverip': {
  try {
    const res = await axios.get('https://api.ipify.org?format=json');
    const ip = res.data.ip;
    const geoRes = await axios.get(`https://ipapi.co/${ip}/json/`);
    const d = geoRes.data;
    reply(`
🖥️ *SERVER IP INFO*
━━━━━━━━━━━━━━━━━━━━
🔢 *IP:* ${ip}
🏙️ *City:* ${d.city || 'N/A'}
🌍 *Country:* ${d.country_name || 'N/A'}
🏢 *ISP:* ${d.org || 'N/A'}
🕐 *Timezone:* ${d.timezone || 'N/A'}
━━━━━━━━━━━━━━━━━━━━
`.trim());
  } catch(e) {
    reply(`❌ Failed to fetch server IP: ${e.message}`);
  }
}
break

// ─── IP GEOLOCATION MAP LINK ─────────────────────────────────────────────────
case 'ipmap':
case 'iplocation': {
  const ipTarget = q.trim();
  if (!ipTarget) return reply('❗ Usage: .ipmap <ip>\nExample: .ipmap 1.1.1.1');
  try {
    const res = await axios.get(`https://ipapi.co/${ipTarget}/json/`);
    const d = res.data;
    if (d.error) return reply(`❌ ${d.reason || 'Invalid IP'}`);
    const mapUrl = `https://www.google.com/maps?q=${d.latitude},${d.longitude}`;
    reply(`
📍 *IP GEOLOCATION*
━━━━━━━━━━━━━━━━━━━━
🔢 IP: *${d.ip}*
🌍 Location: *${d.city}, ${d.region}, ${d.country_name}*
📍 Coords: *${d.latitude}, ${d.longitude}*
🗺️ Map: ${mapUrl}
━━━━━━━━━━━━━━━━━━━━
`.trim());
  } catch(e) {
    reply(`❌ Failed: ${e.message}`);
  }
}
break

// ─── WHOIS LOOKUP ────────────────────────────────────────────────────────────
case 'whois': {
  if (!q) return reply('❗ Usage: .whois <domain>\nExample: .whois google.com');
  const domain = q.trim().replace(/https?:\/\//,'').split('/')[0];
  try {
    const res = await axios.get(`https://api.whoisjsonapi.com/v1/${domain}`, {
      headers: { 'Accept': 'application/json' }
    }).catch(() => null);
    // fallback: use ipapi for basic domain info
    const dnsRes = await axios.get(`https://dns.google/resolve?name=${domain}&type=A`).catch(() => null);
    let ipList = '';
    if (dnsRes?.data?.Answer) {
      ipList = dnsRes.data.Answer.filter(r => r.type === 1).map(r => r.data).join(', ');
    }
    reply(`
🔎 *WHOIS / DNS LOOKUP*
━━━━━━━━━━━━━━━━━━━━
🌐 *Domain:* ${domain}
📡 *Resolved IPs:* ${ipList || 'N/A'}
🔗 *Full WHOIS:* https://www.whois.com/whois/${domain}
🔍 *DNS Check:* https://dnschecker.org/#A/${domain}
━━━━━━━━━━━━━━━━━━━━
_Tip: Use .ip <resolved ip> for full details_
`.trim());
  } catch(e) {
    reply(`❌ WHOIS lookup failed: ${e.message}`);
  }
}
break

// ─── DNS LOOKUP ──────────────────────────────────────────────────────────────
case 'dns':
case 'dnslookup': {
  if (!q) return reply('❗ Usage: .dns <domain>\nExample: .dns github.com');
  const domain = q.trim().replace(/https?:\/\//,'').split('/')[0];
  try {
    const types = ['A', 'AAAA', 'MX', 'NS', 'TXT'];
    let output = `🔍 *DNS LOOKUP: ${domain}*\n━━━━━━━━━━━━━━━━━━━━\n`;
    for (const type of types) {
      const res = await axios.get(`https://dns.google/resolve?name=${domain}&type=${type}`).catch(() => null);
      if (res?.data?.Answer && res.data.Answer.length > 0) {
        const records = res.data.Answer.map(r => r.data).join('\n    ');
        output += `📌 *${type}:*\n    ${records}\n`;
      }
    }
    output += '━━━━━━━━━━━━━━━━━━━━';
    reply(output);
  } catch(e) {
    reply(`❌ DNS lookup failed: ${e.message}`);
  }
}
break

// ─── PORT CHECK ──────────────────────────────────────────────────────────────
case 'portcheck':
case 'checkport': {
  const parts = q.trim().split(/\s+/);
  if (parts.length < 2) return reply('❗ Usage: .portcheck <host> <port>\nExample: .portcheck google.com 443');
  const [host, portStr] = parts;
  const port = parseInt(portStr);
  if (isNaN(port) || port < 1 || port > 65535) return reply('❌ Invalid port. Use 1-65535.');
  reply(`🔌 Checking *${host}:${port}*...`);
  const net = require('net');
  const socket = new net.Socket();
  const timeout = 5000;
  let status = '❓ Unknown';
  socket.setTimeout(timeout);
  socket.connect(port, host, () => {
    status = '🟢 OPEN';
    socket.destroy();
    reply(`🔌 *Port Check Result*\n━━━━━━━━━━━━━━━━━━━━\n🌐 Host: *${host}*\n🔢 Port: *${port}*\n📡 Status: *${status}*\n━━━━━━━━━━━━━━━━━━━━`);
  });
  socket.on('timeout', () => {
    status = '🔴 CLOSED / FILTERED';
    socket.destroy();
    reply(`🔌 *Port Check Result*\n━━━━━━━━━━━━━━━━━━━━\n🌐 Host: *${host}*\n🔢 Port: *${port}*\n📡 Status: *${status}*\n━━━━━━━━━━━━━━━━━━━━`);
  });
  socket.on('error', () => {
    status = '🔴 CLOSED / REFUSED';
    socket.destroy();
    reply(`🔌 *Port Check Result*\n━━━━━━━━━━━━━━━━━━━━\n🌐 Host: *${host}*\n🔢 Port: *${port}*\n📡 Status: *${status}*\n━━━━━━━━━━━━━━━━━━━━`);
  });
}
break

// ─── PING HOST ───────────────────────────────────────────────────────────────
case 'pinghost':
case 'checkhost': {
  if (!q) return reply('❗ Usage: .pinghost <domain or ip>\nExample: .pinghost google.com');
  const host = q.trim().replace(/https?:\/\//,'').split('/')[0];
  reply(`📡 Checking *${host}*...`);
  exec(`ping -c 3 -W 3 ${host} 2>&1`, (err, stdout) => {
    if (err && !stdout) return reply(`❌ Unable to reach *${host}*`);
    const lines = stdout.split('\n').filter(Boolean);
    const stats = lines[lines.length - 2] || '';
    const latency = lines[lines.length - 1] || '';
    reply(`📡 *PING: ${host}*\n━━━━━━━━━━━━━━━━━━━━\n${lines.slice(0,4).join('\n')}\n━━━━━━━━━━━━━━━━━━━━\n${stats}\n${latency}`);
  });
}
break

// ─── TRACEROUTE ──────────────────────────────────────────────────────────────
case 'traceroute':
case 'trace': {
  if (!isOwner) return reply('❌ Owner only.');
  if (!q) return reply('❗ Usage: .trace <host>\nExample: .trace google.com');
  const host = q.trim().replace(/https?:\/\//,'').split('/')[0];
  reply(`🛣️ Tracing route to *${host}*... (this may take a few seconds)`);
  exec(`traceroute -m 15 -w 2 ${host} 2>&1`, (err, stdout) => {
    if (!stdout) return reply(`❌ Traceroute failed for *${host}*`);
    const limited = stdout.split('\n').slice(0, 20).join('\n');
    reply(`🛣️ *TRACEROUTE: ${host}*\n━━━━━━━━━━━━━━━━━━━━\n\`\`\`${limited}\`\`\`\n━━━━━━━━━━━━━━━━━━━━`);
  });
}
break

// ─── URL EXPANDER ────────────────────────────────────────────────────────────
case 'expand':
case 'expandurl': {
  if (!q) return reply('❗ Usage: .expand <shortened url>\nExample: .expand https://bit.ly/xyz');
  let url = q.trim();
  if (!url.startsWith('http')) url = 'https://' + url;
  try {
    const res = await axios.get(url, { maxRedirects: 10, timeout: 8000 });
    reply(`🔗 *URL EXPANDER*\n━━━━━━━━━━━━━━━━━━━━\n📥 *Short URL:* ${url}\n📤 *Final URL:* ${res.request.res.responseUrl || res.config.url}\n✅ Status: ${res.status}\n━━━━━━━━━━━━━━━━━━━━`);
  } catch(e) {
    if (e.response) {
      reply(`🔗 *URL EXPANDER*\n━━━━━━━━━━━━━━━━━━━━\n📥 *Short URL:* ${url}\n📤 *Final URL:* ${e.config?.url || 'Could not resolve'}\n⚠️ Status: ${e.response.status}\n━━━━━━━━━━━━━━━━━━━━`);
    } else {
      reply(`❌ Could not expand URL: ${e.message}`);
    }
  }
}
break

// ─── SCREENSHOT / SITE PREVIEW ───────────────────────────────────────────────
case 'screenshot':
case 'sitepreview':
case 'ss': {
  if (!q) return reply('❗ Usage: .ss <url>\nExample: .ss https://google.com');
  let url = q.trim();
  if (!url.startsWith('http')) url = 'https://' + url;
  const encodedUrl = encodeURIComponent(url);
  const ssUrl = `https://image.thum.io/get/width/1280/crop/720/allowJPG/wait/3/noanimate/${url}`;
  try {
    await james.sendMessage(m.chat, {
      image: { url: ssUrl },
      caption: `🖥️ *Site Preview*\n🔗 ${url}`,
    }, { quoted: m });
  } catch(e) {
    reply(`❌ Could not get screenshot: ${e.message}`);
  }
}
break

// ─── WEATHER ─────────────────────────────────────────────────────────────────
case 'weather':
case 'clima': {
  if (!q) return reply('❗ Usage: .weather <city>\nExample: .weather Nairobi');
  try {
    const res = await axios.get(`https://wttr.in/${encodeURIComponent(q)}?format=j1`);
    const d = res.data;
    const cur = d.current_condition[0];
    const area = d.nearest_area[0];
    const city = area.areaName[0].value;
    const country = area.country[0].value;
    reply(`
🌤️ *WEATHER: ${city}, ${country}*
━━━━━━━━━━━━━━━━━━━━
🌡️ *Temp:* ${cur.temp_C}°C / ${cur.temp_F}°F
🤔 *Feels Like:* ${cur.FeelsLikeC}°C
💧 *Humidity:* ${cur.humidity}%
💨 *Wind:* ${cur.windspeedKmph} km/h ${cur.winddir16Point}
☁️ *Condition:* ${cur.weatherDesc[0].value}
👁️ *Visibility:* ${cur.visibility} km
🔵 *Pressure:* ${cur.pressure} hPa
━━━━━━━━━━━━━━━━━━━━
`.trim());
  } catch(e) {
    reply(`❌ Weather fetch failed: ${e.message}`);
  }
}
break

// ─── CURRENCY RATE ───────────────────────────────────────────────────────────
case 'rate':
case 'exchange':
case 'forex': {
  const rateArgs = q.trim().toUpperCase().split(/\s+/);
  if (rateArgs.length < 2) return reply('❗ Usage: .rate <FROM> <TO>\nExample: .rate USD KES');
  const [from2, to2] = rateArgs;
  try {
    const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from2}`);
    const rateVal = res.data.rates[to2];
    if (!rateVal) return reply(`❌ Currency *${to2}* not found.`);
    reply(`
💱 *EXCHANGE RATE*
━━━━━━━━━━━━━━━━━━━━
💵 1 *${from2}* = *${rateVal.toFixed(4)} ${to2}*
📅 Updated: ${res.data.date}
━━━━━━━━━━━━━━━━━━━━
`.trim());
  } catch(e) {
    reply(`❌ Exchange rate fetch failed: ${e.message}`);
  }
}
break

// ─── QR CODE GENERATOR ───────────────────────────────────────────────────────
case 'qr':
case 'qrcode':
case 'makeqr': {
  if (!q) return reply('❗ Usage: .qr <text or url>\nExample: .qr https://example.com');
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(q)}`;
  try {
    await james.sendMessage(m.chat, {
      image: { url: qrUrl },
      caption: `📲 *QR Code Generated*\n📝 Content: ${q.length > 80 ? q.slice(0,80)+'...' : q}`,
    }, { quoted: m });
  } catch(e) {
    reply(`❌ QR generation failed: ${e.message}`);
  }
}
break

// ─── HASH GENERATOR ──────────────────────────────────────────────────────────
case 'hash':
case 'md5':
case 'sha256': {
  if (!q) return reply('❗ Usage: .hash <text>\nExample: .hash hello world');
  const crypto = require('crypto');
  const md5hash = crypto.createHash('md5').update(q).digest('hex');
  const sha1hash = crypto.createHash('sha1').update(q).digest('hex');
  const sha256hash = crypto.createHash('sha256').update(q).digest('hex');
  const sha512hash = crypto.createHash('sha512').update(q).digest('hex');
  reply(`
🔐 *HASH GENERATOR*
━━━━━━━━━━━━━━━━━━━━
📝 *Input:* ${q.length > 60 ? q.slice(0,60)+'...' : q}
━━━━━━━━━━━━━━━━━━━━
🔵 *MD5:*
${md5hash}

🟡 *SHA-1:*
${sha1hash}

🟢 *SHA-256:*
${sha256hash}

🔴 *SHA-512:*
${sha512hash}
━━━━━━━━━━━━━━━━━━━━
`.trim());
}
break

// ─── BASE64 ENCODE ───────────────────────────────────────────────────────────
case 'b64encode':
case 'base64encode': {
  if (!q) return reply('❗ Usage: .b64encode <text>');
  const encoded = Buffer.from(q, 'utf8').toString('base64');
  reply(`🔒 *Base64 Encoded:*\n\`\`\`${encoded}\`\`\``);
}
break

// ─── BASE64 DECODE ───────────────────────────────────────────────────────────
case 'b64decode':
case 'base64decode': {
  if (!q) return reply('❗ Usage: .b64decode <base64 text>');
  try {
    const decoded = Buffer.from(q, 'base64').toString('utf8');
    reply(`🔓 *Base64 Decoded:*\n\`\`\`${decoded}\`\`\``);
  } catch(e) {
    reply('❌ Invalid base64 string.');
  }
}
break

// ─── URL ENCODE / DECODE ─────────────────────────────────────────────────────
case 'urlencode': {
  if (!q) return reply('❗ Usage: .urlencode <text>');
  reply(`🔗 *URL Encoded:*\n\`\`\`${encodeURIComponent(q)}\`\`\``);
}
break

case 'urldecode': {
  if (!q) return reply('❗ Usage: .urldecode <encoded text>');
  try {
    reply(`🔗 *URL Decoded:*\n\`\`\`${decodeURIComponent(q)}\`\`\``);
  } catch(e) {
    reply('❌ Invalid URL-encoded string.');
  }
}
break

// ─── SYSTEM INFO ─────────────────────────────────────────────────────────────
case 'sysinfo':
case 'systeminfo': {
  if (!isOwner) return reply('❌ Owner only.');
  const cpus = os.cpus();
  const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
  const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
  const usedMem = (totalMem - freeMem).toFixed(2);
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const mins = Math.floor((uptime % 3600) / 60);
  const secs = Math.floor(uptime % 60);
  reply(`
⚙️ *SYSTEM INFO*
━━━━━━━━━━━━━━━━━━━━
🖥️ *OS:* ${os.type()} ${os.release()} (${os.arch()})
💻 *CPU:* ${cpus[0].model} × ${cpus.length}
🧠 *RAM:* ${usedMem} GB used / ${totalMem} GB total
💾 *Free RAM:* ${freeMem} GB
⏱️ *Bot Uptime:* ${hours}h ${mins}m ${secs}s
🖧 *Hostname:* ${os.hostname()}
📁 *Platform:* ${os.platform()}
━━━━━━━━━━━━━━━━━━━━
`.trim());
}
break

// ─── NETWORK INTERFACES ──────────────────────────────────────────────────────
case 'netinfo':
case 'interfaces': {
  if (!isOwner) return reply('❌ Owner only.');
  const ifaces = os.networkInterfaces();
  let output = `🌐 *NETWORK INTERFACES*\n━━━━━━━━━━━━━━━━━━━━\n`;
  for (const [name, addrs] of Object.entries(ifaces)) {
    for (const addr of addrs) {
      output += `📡 *${name}* (${addr.family})\n   IP: ${addr.address}\n   Mask: ${addr.netmask}\n`;
    }
  }
  output += '━━━━━━━━━━━━━━━━━━━━';
  reply(output);
}
break

// ─── UPTIME ──────────────────────────────────────────────────────────────────
case 'uptime':
case 'runtime': {
  const uptime = process.uptime();
  const d = Math.floor(uptime / 86400);
  const h = Math.floor((uptime % 86400) / 3600);
  const mn = Math.floor((uptime % 3600) / 60);
  const s = Math.floor(uptime % 60);
  reply(`⏱️ *BOT UPTIME*\n━━━━━━━━━━━━━━━━━━━━\n🟢 *${d}d ${h}h ${mn}m ${s}s*\n━━━━━━━━━━━━━━━━━━━━`);
}
break

// ─── SPEEDTEST (server-side) ─────────────────────────────────────────────────
case 'speedtest':
case 'netspeed': {
  if (!isOwner) return reply('❌ Owner only.');
  reply('📶 Running speed test... Please wait ~15 seconds.');
  const startDl = Date.now();
  try {
    await axios.get('https://speed.cloudflare.com/__down?bytes=10000000', { responseType: 'arraybuffer', timeout: 20000 });
    const dlTime = (Date.now() - startDl) / 1000;
    const dlSpeed = ((10 * 8) / dlTime).toFixed(2); // Mbps
    const startUl = Date.now();
    const payload = Buffer.alloc(2 * 1024 * 1024);
    await axios.post('https://speed.cloudflare.com/__up', payload, { timeout: 20000 });
    const ulTime = (Date.now() - startUl) / 1000;
    const ulSpeed = ((2 * 8) / ulTime).toFixed(2);
    reply(`
📶 *SPEED TEST RESULT*
━━━━━━━━━━━━━━━━━━━━
⬇️ *Download:* ${dlSpeed} Mbps
⬆️ *Upload:* ${ulSpeed} Mbps
🌐 Server: Cloudflare
━━━━━━━━━━━━━━━━━━━━
`.trim());
  } catch(e) {
    reply(`❌ Speed test failed: ${e.message}`);
  }
}
break

// ─── COUNTRY INFO ────────────────────────────────────────────────────────────
case 'country':
case 'countryinfo': {
  if (!q) return reply('❗ Usage: .country <name>\nExample: .country Kenya');
  try {
    const res = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(q)}`);
    const c = res.data[0];
    const capital = c.capital?.[0] || 'N/A';
    const pop = c.population.toLocaleString();
    const region = c.region;
    const subregion = c.subregion;
    const langs = Object.values(c.languages || {}).join(', ') || 'N/A';
    const currencies = Object.values(c.currencies || {}).map(cu => `${cu.name} (${cu.symbol})`).join(', ') || 'N/A';
    const tld = (c.tld || ['N/A']).join(', ');
    const timezones = (c.timezones || ['N/A']).join(', ');
    reply(`
🌍 *COUNTRY INFO: ${c.name.common}*
━━━━━━━━━━━━━━━━━━━━
🏛️ *Official Name:* ${c.name.official}
🏙️ *Capital:* ${capital}
🌐 *Region:* ${region} / ${subregion}
👥 *Population:* ${pop}
🗣️ *Languages:* ${langs}
💱 *Currency:* ${currencies}
🌐 *TLD:* ${tld}
🕐 *Timezones:* ${timezones}
🚩 *Flag:* ${c.flag || '🏳️'}
━━━━━━━━━━━━━━━━━━━━
`.trim());
  } catch(e) {
    reply(`❌ Country not found: ${e.message}`);
  }
}
break

// ─── RANDOM JOKE ─────────────────────────────────────────────────────────────
case 'darkjoke':
case 'djoke': {
  try {
    const res = await axios.get('https://v2.jokeapi.dev/joke/Dark?type=twopart');
    const j = res.data;
    reply(`😈 *Dark Joke*\n\n*Q:* ${j.setup}\n\n*A:* ||${j.delivery}||`);
  } catch(e) {
    reply('❌ Could not fetch a joke right now.');
  }
}
break

// ─── RANDOM QUOTE ─────────────────────────────────────────────────────────────
case 'randomquote':
case 'rquote': {
  try {
    const res = await axios.get('https://zenquotes.io/api/random');
    const q2 = res.data[0];
    reply(`💬 *"${q2.q}"*\n\n— _${q2.a}_`);
  } catch(e) {
    reply('❌ Could not fetch a quote.');
  }
}
break

// ─── DICTIONARY ──────────────────────────────────────────────────────────────
case 'define':
case 'dict':
case 'meaning': {
  if (!q) return reply('❗ Usage: .define <word>\nExample: .define serendipity');
  const word = q.trim().split(' ')[0];
  try {
    const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const entry = res.data[0];
    const phonetic = entry.phonetic || '';
    let output = `📖 *DEFINITION: ${entry.word}* ${phonetic}\n━━━━━━━━━━━━━━━━━━━━\n`;
    let count = 0;
    for (const meaning of entry.meanings.slice(0, 3)) {
      output += `\n🔹 *${meaning.partOfSpeech}*\n`;
      for (const def of meaning.definitions.slice(0, 2)) {
        output += `  • ${def.definition}\n`;
        if (def.example) output += `    _"${def.example}"_\n`;
        count++;
        if (count >= 4) break;
      }
      if (count >= 4) break;
    }
    output += '━━━━━━━━━━━━━━━━━━━━';
    reply(output);
  } catch(e) {
    reply(`❌ Word *"${word}"* not found in dictionary.`);
  }
}
break

// ─── USERNAME AVAILABILITY ───────────────────────────────────────────────────
case 'checkuser':
case 'username': {
  if (!q) return reply('❗ Usage: .username <name>\nExample: .username johndoe');
  const uname = q.trim().toLowerCase().replace(/\s+/g,'');
  const platforms = [
    { name: 'GitHub', url: `https://github.com/${uname}` },
    { name: 'Twitter/X', url: `https://twitter.com/${uname}` },
    { name: 'Instagram', url: `https://instagram.com/${uname}` },
    { name: 'TikTok', url: `https://tiktok.com/@${uname}` },
    { name: 'Reddit', url: `https://reddit.com/user/${uname}` },
    { name: 'YouTube', url: `https://youtube.com/@${uname}` },
  ];
  let output = `👤 *USERNAME CHECK: @${uname}*\n━━━━━━━━━━━━━━━━━━━━\n`;
  for (const p of platforms) {
    output += `🔗 ${p.name}: ${p.url}\n`;
  }
  output += '━━━━━━━━━━━━━━━━━━━━\n_Tap the links to check availability_';
  reply(output);
}
break

// ─── TEXT TO BINARY ──────────────────────────────────────────────────────────
case 'textbin':
case 'tobin':
case 'binary': {
  if (!q) return reply('❗ Usage: .binary <text>\nExample: .binary hello');
  const bin = q.split('').map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ');
  reply(`💻 *Text → Binary*\n━━━━━━━━━━━━━━━━━━━━\n📝 Input: ${q}\n📟 Binary:\n\`\`\`${bin}\`\`\`\n━━━━━━━━━━━━━━━━━━━━`);
}
break

// ─── BINARY TO TEXT ──────────────────────────────────────────────────────────
case 'frombin':
case 'bintext': {
  if (!q) return reply('❗ Usage: .frombin <binary>\nExample: .frombin 01101000 01101001');
  try {
    const text2 = q.trim().split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
    reply(`💻 *Binary → Text*\n━━━━━━━━━━━━━━━━━━━━\n📟 Binary: ${q.length > 60 ? q.slice(0,60)+'...' : q}\n📝 Text: *${text2}*\n━━━━━━━━━━━━━━━━━━━━`);
  } catch(e) {
    reply('❌ Invalid binary input. Use space-separated 8-bit groups.');
  }
}
break

// ─── TEXT TO HEX ─────────────────────────────────────────────────────────────
case 'texthex':
case 'tohex': {
  if (!q) return reply('❗ Usage: .tohex <text>');
  const hex = Buffer.from(q, 'utf8').toString('hex').match(/.{1,2}/g).join(' ');
  reply(`🟠 *Text → Hex*\n\`\`\`${hex}\`\`\``);
}
break

// ─── HEX TO TEXT ─────────────────────────────────────────────────────────────
case 'fromhex':
case 'hextext': {
  if (!q) return reply('❗ Usage: .fromhex <hex>');
  try {
    const clean = q.trim().replace(/\s+/g,'');
    const text3 = Buffer.from(clean, 'hex').toString('utf8');
    reply(`🟠 *Hex → Text*\n*${text3}*`);
  } catch(e) {
    reply('❌ Invalid hex string.');
  }
}
break

// ─── CAESAR CIPHER ───────────────────────────────────────────────────────────
case 'caesar':
case 'rot': {
  const cArgs = q.trim().split(/\s+/);
  const shift = parseInt(cArgs[0]);
  if (isNaN(shift)) return reply('❗ Usage: .caesar <shift> <text>\nExample: .caesar 13 hello world');
  const plaintext = cArgs.slice(1).join(' ');
  if (!plaintext) return reply('❗ Provide text after the shift number.');
  const shifted = plaintext.replace(/[a-zA-Z]/g, ch => {
    const base = ch <= 'Z' ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
  });
  reply(`🔑 *Caesar Cipher (shift ${shift})*\n📝 Input: ${plaintext}\n🔐 Output: *${shifted}*`);
}
break

// ─── PASTEBIN ────────────────────────────────────────────────────────────────
case 'paste':
case 'pastebin': {
  if (!q) return reply('❗ Usage: .paste <text>\nExample: .paste my code here');
  try {
    const res = await axios.post('https://hastebin.com/documents', q, {
      headers: { 'Content-Type': 'text/plain' }
    });
    const key = res.data.key;
    reply(`📋 *Paste Created!*\n🔗 https://hastebin.com/${key}`);
  } catch(e) {
    // fallback: dpaste
    try {
      const res2 = await axios.post('https://dpaste.com/api/v2/', `content=${encodeURIComponent(q)}&syntax=text&expiry_days=7`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      reply(`📋 *Paste Created!*\n🔗 ${res2.headers.location || 'https://dpaste.com'}`);
    } catch(e2) {
      reply(`❌ Paste failed: ${e2.message}`);
    }
  }
}
break

// ─── FAKE IDENTITY GENERATOR ─────────────────────────────────────────────────
case 'fakeid':
case 'genid':
case 'fakeuser': {
  const firstNames = ['Aiden','Kai','Zara','Nova','Leo','Mia','Jake','Luna','Ethan','Sofia','Omar','Layla','Ryan','Nora','Caleb'];
  const lastNames = ['Mercer','Voss','Drake','Stone','Hayes','Cruz','Black','West','Cole','Ford','Reed','Nash','Fox','King','Quinn'];
  const cities = ['Nairobi','Lagos','Accra','Dar es Salaam','Johannesburg','Cairo','Tunis','Dakar','Kampala','Addis Ababa'];
  const fn = firstNames[Math.floor(Math.random()*firstNames.length)];
  const ln = lastNames[Math.floor(Math.random()*lastNames.length)];
  const age = Math.floor(Math.random()*42)+18;
  const city = cities[Math.floor(Math.random()*cities.length)];
  const phone = `+254 7${Math.floor(Math.random()*90000000+10000000)}`;
  const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${Math.floor(Math.random()*999)}@gmail.com`;
  const pass = Math.random().toString(36).slice(2,10) + Math.random().toString(36).slice(2,5).toUpperCase() + '!';
  reply(`
🕵️ *FAKE IDENTITY*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${fn} ${ln}
🎂 *Age:* ${age}
🏙️ *City:* ${city}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
🔑 *Password:* ${pass}
━━━━━━━━━━━━━━━━━━━━
_For testing purposes only_
`.trim());
}
break

// ─── REGEX TESTER ────────────────────────────────────────────────────────────
case 'regex':
case 'regextest': {
  const rParts = q.split('|');
  if (rParts.length < 2) return reply('❗ Usage: .regex <pattern>|<test string>\nExample: .regex \\d+|abc123def');
  const [pattern, testStr] = rParts;
  try {
    const rx = new RegExp(pattern, 'g');
    const matches = testStr.match(rx);
    reply(`
🔍 *REGEX TESTER*
━━━━━━━━━━━━━━━━━━━━
📐 *Pattern:* \`${pattern}\`
📝 *Input:* ${testStr}
${matches ? `✅ *Matches (${matches.length}):*\n${matches.map(m => `  • \`${m}\``).join('\n')}` : '❌ *No matches found*'}
━━━━━━━━━━━━━━━━━━━━
`.trim());
  } catch(e) {
    reply(`❌ Invalid regex: ${e.message}`);
  }
}
break

// ─── COLOR INFO ──────────────────────────────────────────────────────────────
case 'color':
case 'colorinfo':
case 'hex2rgb': {
  if (!q) return reply('❗ Usage: .color <hex>\nExample: .color #ff5733');
  let hex2 = q.trim().replace('#','');
  if (!/^[0-9a-fA-F]{6}$/.test(hex2)) return reply('❌ Invalid hex color. Use 6-digit hex like #ff5733');
  const r = parseInt(hex2.substring(0,2),16);
  const g = parseInt(hex2.substring(2,4),16);
  const b = parseInt(hex2.substring(4,6),16);
  const luminance = (0.299*r + 0.587*g + 0.114*b)/255;
  const hsl = (() => {
    const r1=r/255,g1=g/255,b1=b/255;
    const max=Math.max(r1,g1,b1),min=Math.min(r1,g1,b1);
    let h,s,l=(max+min)/2;
    if(max===min){h=s=0;}else{
      const d=max-min; s=l>0.5?d/(2-max-min):d/(max+min);
      switch(max){case r1:h=(g1-b1)/d+(g1<b1?6:0);break;case g1:h=(b1-r1)/d+2;break;default:h=(r1-g1)/d+4;}
      h/=6;
    }
    return `${Math.round(h*360)}°, ${Math.round(s*100)}%, ${Math.round(l*100)}%`;
  })();
  reply(`
🎨 *COLOR INFO*
━━━━━━━━━━━━━━━━━━━━
🔢 *HEX:* #${hex2.toUpperCase()}
🔴🟢🔵 *RGB:* rgb(${r}, ${g}, ${b})
🌈 *HSL:* hsl(${hsl})
💡 *Brightness:* ${luminance > 0.5 ? '☀️ Light' : '🌑 Dark'} (${(luminance*100).toFixed(1)}%)
🖼️ *Preview:* https://singlecolorimage.com/get/${hex2}/200x100
━━━━━━━━━━━━━━━━━━━━
`.trim());
}
break

// ─── TIME ZONES ──────────────────────────────────────────────────────────────
case 'time':
case 'worldtime':
case 'timezone': {
  const zones = [
    { city: 'Nairobi', tz: 'Africa/Nairobi' },
    { city: 'London', tz: 'Europe/London' },
    { city: 'New York', tz: 'America/New_York' },
    { city: 'Los Angeles', tz: 'America/Los_Angeles' },
    { city: 'Dubai', tz: 'Asia/Dubai' },
    { city: 'Tokyo', tz: 'Asia/Tokyo' },
    { city: 'Sydney', tz: 'Australia/Sydney' },
    { city: 'Paris', tz: 'Europe/Paris' },
  ];
  let output = `🕐 *WORLD TIME*\n━━━━━━━━━━━━━━━━━━━━\n`;
  for (const z of zones) {
    const t = moment().tz(z.tz).format('HH:mm (ddd)');
    output += `🌍 *${z.city}:* ${t}\n`;
  }
  output += '━━━━━━━━━━━━━━━━━━━━';
  reply(output);
}
break

// ─── UNIX TIMESTAMP ──────────────────────────────────────────────────────────
case 'timestamp':
case 'unixtime': {
  if (q) {
    const ts = parseInt(q.trim());
    if (isNaN(ts)) return reply('❌ Invalid timestamp. Provide a Unix timestamp number.');
    const date2 = new Date(ts * 1000);
    reply(`⏱️ *Unix → Date*\n━━━━━━━━━━━━━━━━━━━━\n🔢 Unix: *${ts}*\n📅 Date: *${date2.toUTCString()}*\n🕐 Local: *${date2.toLocaleString()}*\n━━━━━━━━━━━━━━━━━━━━`);
  } else {
    const now = Math.floor(Date.now() / 1000);
    reply(`⏱️ *Current Unix Timestamp*\n━━━━━━━━━━━━━━━━━━━━\n🔢 *${now}*\n📅 ${new Date().toUTCString()}\n━━━━━━━━━━━━━━━━━━━━`);
  }
}
break

// ─── ASCII ART ───────────────────────────────────────────────────────────────
case 'ascii':
case 'asciiart': {
  if (!q) return reply('❗ Usage: .ascii <text>\nExample: .ascii HELLO');
  const letters = {
    A:'  #  \n # # \n#####\n#   #\n#   #',B:'#### \n#   #\n#### \n#   #\n#### ',
    C:' ####\n#    \n#    \n#    \n ####',D:'#### \n#   #\n#   #\n#   #\n#### ',
    E:'#####\n#    \n### \n#    \n#####',F:'#####\n#    \n### \n#    \n#    ',
    G:' ####\n#    \n# ###\n#   #\n ####',H:'#   #\n#   #\n#####\n#   #\n#   #',
    I:'#####\n  #  \n  #  \n  #  \n#####',L:'#    \n#    \n#    \n#    \n#####',
    O:' ### \n#   #\n#   #\n#   #\n ### ',S:' ####\n#    \n ####\n    #\n#### ',
  };
  const chars = q.toUpperCase().slice(0,8).split('');
  const rows = [0,1,2,3,4].map(r =>
    chars.map(c => (letters[c] || '?????').split('\n')[r] || '     ').join('  ')
  ).join('\n');
  reply(`\`\`\`\n${rows}\n\`\`\``);
}
break

// ─── IP BULK SCAN ─────────────────────────────────────────────────────────────
case 'ipscan':
case 'bulkip': {
  if (!isOwner) return reply('❌ Owner only.');
  if (!q) return reply('❗ Usage: .ipscan <ip1> <ip2> ...\nExample: .ipscan 8.8.8.8 1.1.1.1 208.67.222.222');
  const ips = q.trim().split(/\s+/).slice(0,5);
  reply(`🔍 Scanning ${ips.length} IP(s)...`);
  let results = `📊 *BULK IP SCAN*\n━━━━━━━━━━━━━━━━━━━━\n`;
  for (const ipAddr of ips) {
    try {
      const res = await axios.get(`https://ipapi.co/${ipAddr}/json/`);
      const d = res.data;
      if (d.error) {
        results += `❌ *${ipAddr}:* ${d.reason}\n\n`;
      } else {
        results += `🔢 *${d.ip}*\n  🌍 ${d.city || '?'}, ${d.country_name || '?'}\n  🏢 ${d.org || 'N/A'}\n  🕐 ${d.timezone || 'N/A'}\n\n`;
      }
    } catch(e) {
      results += `❌ *${ipAddr}:* Failed\n\n`;
    }
  }
  results += '━━━━━━━━━━━━━━━━━━━━';
  reply(results);
}
break


// ════════════════════════════════════════════════
// ── END EXTRA COMMANDS BLOCK ─────────────────
// ════════════════════════════════════════════════

default:
            if (!isOwner) break; // Only owner can use eval/exec

                try {
                    const code = body.trim();

                    // Async eval with <>
                    if (code.startsWith('<')) {
                        const js = code.slice(1);
                        const output = await eval(`(async () => { ${js} })()`);
                        await reply(typeof output === 'string' ? output : JSON.stringify(output, null, 4));
                    } 
                    // Sync eval with >
                    else if (code.startsWith('>')) {
                        const js = code.slice(1);
                        let evaled = await eval(js);
                        if (typeof evaled !== 'string') evaled = util.inspect(evaled, { depth: 0 });
                        await reply(evaled);
                    } 
                    // Shell exec with $
                    else if (code.startsWith('$')) {
                        const cmd = code.slice(1);
                        exec(cmd, (err, stdout, stderr) => {
                            if (err) return reply(`❌ Error:\n${err.message}`);
                            if (stderr) return reply(`⚠️ Stderr:\n${stderr}`);
                            if (stdout) return reply(`✅ Output:\n${stdout}`);
                        });
                    }
                } catch (err) {
                    console.error("Owner eval/exec error:", err);
                    await reply(`❌ Eval/Exec failed:\n${err.message}`);
                }

                break;
        }
    } catch (err) {
        console.log(require("util").format(err));
    }
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
