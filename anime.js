

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
                        ucapanWaktu = "🌙";
                } else if (time >= "15:00:00" && time < "19:00:00") {
                        ucapanWaktu = "☕";
                } else if (time >= "11:00:00" && time < "15:00:00") {
                        ucapanWaktu = "🏞️";
                } else if (time >= "06:00:00" && time < "11:00:00") {
                        ucapanWaktu = "🌅";
                } else {
                        ucapanWaktu = "🌆";
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
┌──────────────────────────┐
│ ⭓ CYBERPUNK-BULLY ⭔
├──────────────────────────┤
│ 📟 ${chalk.hex('#fdcb6e').bold(time)}
│ 💬 ${chalk.hex('#fdcb6e').bold(command)}
│ 🗣️ ${chalk.hex('#fdcb6e').bold(pushname)}
│ 👤 ${chalk.hex('#fdcb6e').bold(m.sender)}
└──────────────────────────┘
`));
}

const cina = ["https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg","https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg","https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg","https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg"]
 
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
      title: "CYBERPUNK-BULLY"
    }
  }
})     

// ========== CYBERPUNK-BULLY AUTO-BIO SETTINGS ==========
if (typeof global.runtimeWatchers === 'undefined') global.runtimeWatchers = {};
if (typeof global.autobio === 'undefined') {
  global.autobio = {
    enabled: false,
    interval: 10 * 60 * 1000,
    templates: [
      "CYBERPUNK-BULLY • {uptime}",
      "CYBERPUNK-BULLY — owner: sudo",
      "Running on {platform} • users:{userCount}",
      "cyberpunk-bully • channel @cyberpunkbully"
    ],
    index: 0,
    timerRef: null,
    debug: false
  };
}

// ========== CYBERPUNK-BULLY WELCOME SYSTEM ==========
if (!global.welcomeSettings) {
  try {
    if (fs.existsSync(WELCOME_FILE)) {
      global.welcomeSettings = JSON.parse(fs.readFileSync(WELCOME_FILE, 'utf8') || '{}');
    } else {
      global.welcomeSettings = {};
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

async function welcomeParticipantUpdate(james, update, store) {
  try {
    if (!update || !update.id || !Array.isArray(update.participants)) return;
    const chatId = update.id;
    const action = update.action;
    if (action !== 'add') return;

    const cfg = (global.welcomeSettings && global.welcomeSettings[chatId]) || { enabled: false };
    if (!cfg.enabled) return;

    let subject = chatId;
    try {
      const meta = await james.groupMetadata(chatId).catch(()=>null);
      if (meta && meta.subject) subject = meta.subject;
    } catch (e) {}

    for (const participant of update.participants) {
      const user = participant.split('@')[0];
      const mentions = [participant];

      const template = (cfg.template && cfg.template.trim().length > 0) ?
          cfg.template :
          "👋 Welcome @{{user}}!\nYou joined *{{group}}*.\nSay hi!";

      let text = template
        .replace(/\{\{user\}\}/g, user)
        .replace(/\{\{user_mention\}\}/g, '@' + user)
        .replace(/\{\{group\}\}/g, subject);

      try {
        const meta = await james.groupMetadata(chatId).catch(()=>null);
        const memberCount = meta && meta.participants ? meta.participants.length : undefined;
        if (memberCount) text = text.replace(/\{\{member_count\}\}/g, String(memberCount));
      } catch (e) {}

      let pic = null;
      if (cfg.sendImage) {
        try {
          pic = await james.profilePictureUrl(participant, 'image').catch(()=>null);
          if (!pic) pic = await james.profilePictureUrl(chatId, 'image').catch(()=>null);
        } catch (e) { pic = null; }
      }

      try {
        if (pic) {
          await james.sendMessage(chatId, { image: { url: pic }, caption: text, mentions }, { });
        } else {
          await james.sendMessage(chatId, { text, mentions }, { });
        }
      } catch (e) {
        try { await james.sendMessage(chatId, { text, mentions }, {}); } catch(e2){ console.error('[welcome] send failed', e2); }
      }
    }

  } catch (err) {
    console.error('[welcomeParticipantUpdate] error', err);
  }
}

async function setBio(client, text) {
  try {
    if (typeof client.updateProfileStatus === 'function') {
      if (global.autobio.debug) console.log('[autobio] using updateProfileStatus');
      return await client.updateProfileStatus(text);
    }
    if (typeof client.setStatus === 'function') {
      if (global.autobio.debug) console.log('[autobio] using setStatus');
      return await client.setStatus(text);
    }
    if (typeof client.updateProfile === 'function') {
      if (global.autobio.debug) console.log('[autobio] using updateProfile');
      return await client.updateProfile({ status: text });
    }
    if (typeof client.setProfileStatus === 'function') {
      if (global.autobio.debug) console.log('[autobio] using setProfileStatus');
      return await client.setProfileStatus(text);
    }
    console.warn('[autobio] No supported status update method found');
    throw new Error('No supported method to update profile status');
  } catch (e) {
    console.error('[autobio] setBio error:', e && (e.stack || e.message || e));
    throw e;
  }
}

function startAutoBio(client, store) {
  try {
    if (global.autobio.timerRef) {
      clearInterval(global.autobio.timerRef);
      global.autobio.timerRef = null;
    }
    if (!global.autobio.enabled) {
      if (global.autobio.debug) console.log('[autobio] disabled, not starting loop');
      return;
    }
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

// ========== CYBERPUNK-BULLY AURA SYSTEM ==========
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

// ========== CYBERPUNK-BULLY GROUP TOOLS ==========
if (typeof global.jamesOnlineCache === 'undefined') global.jamesOnlineCache = {};
if (typeof global.jamesStatusViewers === 'undefined') global.jamesStatusViewers = {};

function notePresence(jid, info = {}) {
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
    global.jamesOnlineCache[jid].lastSeen = Date.now();
  }
}

function registerStatusViewer(statusOwnerJid, viewerJid) {
  if (!statusOwnerJid || !viewerJid) return;
  if (!global.jamesStatusViewers[statusOwnerJid]) global.jamesStatusViewers[statusOwnerJid] = new Set();
  global.jamesStatusViewers[statusOwnerJid].add(viewerJid);
}

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

// ========== CYBERPUNK-BULLY AUTOSTATUS SETTINGS ==========
if (typeof global.autostatusSettings === 'undefined') {
  global.autostatusSettings = {
    enabled: false,
    onlyFrom: []
  };
}

function loadAutostatusSettings(){
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

// ========== CYBERPUNK-BULLY AUTOBLOCK SETTINGS ==========
if (typeof global.autoblockSettings === 'undefined') {
  global.autoblockSettings = {
    enabled: false,
    mode: 'silent',
    whitelist: [],
    blockedCache: {}
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

function normalizePhone(x) {
  if (!x) return '';
  return String(x).replace(/[^0-9]/g, '');
}

function isOwnerJid(jid) {
  try {
    const owners = (global.owner || []).map(v => normalizePhone(v));
    const phone = normalizePhone(String(jid || '').split('@')[0]);
    return owners.includes(phone);
  } catch (e) { return false; }
}

function isProtectedJid(jid) {
  if (!jid) return true;
  const phone = normalizePhone(jid.split('@')[0] || '');
  const botJid = (james && james.user && String(james.user.id || '')).split(':')[0] + '@s.whatsapp.net';
  if (jid === botJid) return true;
  if (isOwnerJid(jid)) return true;
  if ((global.autoblockSettings.whitelist || []).map(normalizePhone).includes(phone)) return true;
  return false;
}

loadAutoblockSettings();

// ========== CYBERPUNK-BULLY AUTO PP SETTINGS ==========
if (!fs.existsSync(AUTOPP_TMP)) fs.mkdirSync(AUTOPP_TMP, { recursive: true });

if (typeof global.autopp === 'undefined') {
  global.autopp = {
    enabled: false,
    intervalSec: 3600,
    images: [],
    timerId: null,
    debug: false
  };
}

async function autopProfileFetchBuffer(james, imagePathOrUrl, quotedMsg) {
  if (quotedMsg) {
    try {
      if (typeof quotedMsg.download === 'function') {
        const buf = await quotedMsg.download();
        if (buf && buf.length) return Buffer.from(buf);
      }
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

  if (imagePathOrUrl && fs.existsSync(imagePathOrUrl)) {
    try {
      return fs.readFileSync(imagePathOrUrl);
    } catch (e) {
      if (global.autopp.debug) console.error('[autopp] read local failed', e);
    }
  }

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

async function autopProfileSet(james, buffer) {
  if (!buffer || !Buffer.isBuffer(buffer)) throw new Error('No buffer provided');

  const botJid = (await james.decodeJid(james.user.id)).split(':')[0] + '@s.whatsapp.net';

  try {
    if (typeof james.updateProfilePicture === 'function') {
      await james.updateProfilePicture(botJid, buffer);
      if (global.autopp.debug) console.log('[autopp] updated profile via updateProfilePicture');
      return true;
    }
  } catch (e) {
    if (global.autopp.debug) console.error('[autopp] updateProfilePicture failed', e);
  }

  try {
    await james.query({
      tag: 'iq', attrs: { to: 's.whatsapp.net', type: 'set', xmlns: 'w:profile:picture' },
      content: [{ tag: 'picture', attrs: {}, content: [{ tag: 'image', attrs: {} , content: buffer }] }]
    });
    if (global.autopp.debug) console.log('[autopp] updated via query fallback');
    return true;
  } catch (e) {
    if (global.autopp.debug) console.error('[autopp] query fallback failed', e);
  }

  try {
    if (typeof james.waUploadToServer === 'function') {
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

async function autopProfileRunOnce(james) {
  if (!global.autopp.images || global.autopp.images.length === 0) {
    if (global.autopp.debug) console.log('[autopp] no images configured');
    return false;
  }

  const pick = global.autopp.images[Math.floor(Math.random() * global.autopp.images.length)];
  if (!pick) return false;

  const buffer = await autopProfileFetchBuffer(james, pick.data, null);
  if (!buffer) {
    if (global.autopp.debug) console.log('[autopp] failed to fetch chosen image buffer');
    return false;
  }

  await autopProfileSet(james, buffer);
  return true;
}

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

// ========== CYBERPUNK-BULLY ANTISPAM/ANTIMEDIA SETTINGS ==========
if (typeof global.antispamSettings === 'undefined') global.antispamSettings = {};
if (typeof global.antimediaSettings === 'undefined') global.antimediaSettings = {};

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

global.antispamSettings = loadJsonSafe(ANTISPAM_FILE, global.antispamSettings);
global.antimediaSettings = loadJsonSafe(ANTIMEDIA_FILE, global.antimediaSettings);

function getSpamConfig(chatId) {
  if (!global.antispamSettings[chatId]) {
    global.antispamSettings[chatId] = {
      modeGroup: 'off',
      modeDM: 'off',
      threshold: 5,
      windowMs: 60000,
      records: {}
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

async function tryDeleteMessage(conn, chatId, key) {
  try {
    if (typeof conn.sendMessage === 'function') {
      await conn.sendMessage(chatId, { delete: key });
      return true;
    }
  } catch (e) {
    console.warn('[tryDeleteMessage] delete via sendMessage failed', e?.message || e);
  }
  try {
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
    if (typeof conn.deleteMessage === 'function') {
      await conn.deleteMessage(chatId, key);
      return true;
    }
  } catch (e3) {
    console.warn('[tryDeleteMessage] final delete fallback failed', e3?.message || e3);
  }
  return false;
}

async function isProtected(senderJid) {
  try {
    if (!senderJid) return true;
    const owners = (global.owner || []).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net');
    if (owners.includes(senderJid)) return true;
    const botJid = (james && james.user && String(james.user.id || '')).split(':')[0] + '@s.whatsapp.net';
    if (botJid === senderJid) return true;
    return false;
  } catch (e) { return true; }
}

async function markStatusAsRead(conn, key) {
  if (!conn || !key) return false;
  try {
    const remote = key.remoteJid || key.from || 'status@broadcast';
    const id = key.id || key.stanzaId || key.messageId || (key.key && key.key.id) || undefined;
    const participant = key.participant || key.key?.participant || key.author || undefined;

    const attempts = [];

    attempts.push(async () => {
      if (typeof conn.sendReadReceipt === 'function') {
        return await conn.sendReadReceipt(remote, participant || conn.user?.id, id);
      }
      throw new Error('sendReadReceipt not available');
    });

    attempts.push(async () => {
      if (typeof conn.readMessages === 'function') {
        if (Array.isArray(conn.readMessages)) throw new Error('readMessages exists but is not callable as expected');
        return await conn.readMessages([{ key }]);
      }
      throw new Error('readMessages not available');
    });

    attempts.push(async () => {
      if (typeof conn.sendPresenceUpdate === 'function') {
        await conn.sendPresenceUpdate('available', remote);
        if (typeof conn.sendReadReceipt === 'function') {
          return await conn.sendReadReceipt(remote, participant || conn.user?.id, id);
        }
        return true;
      }
      throw new Error('sendPresenceUpdate not available');
    });

    const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');
    attempts.push(async () => {
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

    for (const fn of attempts) {
      try {
        await Promise.race([fn(), new Promise((_,reject) => setTimeout(()=>reject(new Error('attempt timeout')), 8000))]);
        return true;
      } catch (e) {
        continue;
      }
    }
    return false;
  } catch (err) {
    console.error('[autostatus] markStatusAsRead error:', err);
    return false;
  }
}

// ========== CYBERPUNK-BULLY ANTISIMP SETTINGS ==========
if (typeof global.antisimp === 'undefined') {
  global.antisimp = { group: false, dm: false };
  global.antisimpWords = [
    'love','lover','sexy','sex','nasty','hot','flirt','baby','babe','darling','kiss','loveu','imat','horny',
    'smut','fuck','naughty','romantic','relations','sext','i love you','i miss you'
  ];
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  global._antisimpRegex = new RegExp('\\b(' + global.antisimpWords.map(esc).join('|') + ')\\b', 'i');
  global.antisimpDebug = false;
}

async function antiSimpHandler(james, m, opts = {}) {
  try {
    const { from, isGroup, isBotAdmins, isOwner, reply } = opts;

    const textCandidates = [];
    if (typeof m.text === 'string') textCandidates.push(m.text);
    if (m.message) {
      const conv = m.message.conversation; if (conv) textCandidates.push(conv);
      const ext = m.message.extendedTextMessage?.text; if (ext) textCandidates.push(ext);
      const cap = m.message.imageMessage?.caption || m.message.videoMessage?.caption || m.message.documentMessage?.caption; if (cap) textCandidates.push(cap);
    }
    if (typeof body === 'string' && body) textCandidates.push(body);

    const bodyText = textCandidates.find(t => typeof t === 'string' && t.trim()) || '';

    if (!bodyText) {
      if (global.antisimpDebug) console.log('[antisimp] no text to check');
      return;
    }

    const sender = m.sender || (m.key && m.key.participant) || '';
    if (!sender) return;
    if (isOwner) { if (global.antisimpDebug) console.log('[antisimp] skip owner'); return; }

    if (!global._antisimpRegex.test(bodyText)) {
      if (global.antisimpDebug) console.log('[antisimp] no match:', bodyText);
      return;
    }
    if (global.antisimpDebug) console.log('[antisimp] match:', bodyText);

    const mention = [sender];

    if (isGroup) {
      if (!global.antisimp.group) return;
      if (isBotAdmins) {
        try {
          try {
            await james.relayMessage(from, {
              protocolMessage: {
                key: m.key,
                type: 0
              }
            }, { messageId: generateMessageID() });
          } catch (e1) {
            try {
              await james.sendMessage(from, { delete: m.key });
            } catch (e2) {
              if (typeof james.deleteMessage === 'function') {
                await james.deleteMessage(from, { id: m.key.id, remoteJid: from, fromMe: false }).catch(()=>null);
              } else throw e2;
            }
          }

          const txt = `*ANTI-SIMP* — Removed message from *@${sender.split('@')[0]}* containing prohibited words.`;
          await james.sendMessage(from, { text: txt, mentions: mention });

        } catch (delErr) {
          console.error('[antisimp] delete failed', delErr);
          await james.sendMessage(from, { text: `*ANTI-SIMP DETECTED* — @${sender.split('@')[0]}\nDetected prohibited words but I failed to delete it (check bot admin rights).`, mentions: mention });
        }
      } else {
        await james.sendMessage(from, { text: `*SIMP DETECTED*\n@${sender.split('@')[0]} sent a message containing prohibited words. I am not admin so I couldn't delete it.`, mentions: mention });
      }
      return;
    }

    if (!isGroup) {
      if (!global.antisimp.dm) return;
      await james.sendMessage(from, { text: `*SIMP DETECTED (DM)*\n@${sender.split('@')[0]} sent a message with prohibited words. Please keep it respectful.`, mentions: mention });
      return;
    }

  } catch (e) {
    console.error('[antiSimpHandler] error', e);
  }
}

// ========== CYBERPUNK-BULLY ANTILINK SETTINGS ==========
if (typeof global.antiLinkSettings === 'undefined') {
  global.antiLinkSettings = {};
}

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

function getAntiConfig(chatId) {
  if (!global.antiLinkSettings[chatId]) {
    global.antiLinkSettings[chatId] = { mode: 'off', threshold: 3, warns: {} };
  }
  return global.antiLinkSettings[chatId];
}

function resetWarns(chatId) {
  const cfg = getAntiConfig(chatId);
  cfg.warns = {};
  saveAntiLinkSettings();
}

loadAntiLinkSettings();

// ========== CYBERPUNK-BULLY MUTE SYSTEM ==========
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

// ========== CYBERPUNK-BULLY AUTOREPLY SETTINGS ==========
const AUTOREPLY_FILE = path.join(__dirname, 'autoreply.json');

if (typeof global.autoreplySettings === 'undefined') {
  global.autoreplySettings = {
    enabled: false,
    sticker: 'https://i.ibb.co/your-default-sticker.webp'
  };
}

function loadAutoreplySettings() {
  try {
    if (fs.existsSync(AUTOREPLY_FILE)) {
      const raw = fs.readFileSync(AUTOREPLY_FILE, 'utf8') || '{}';
      const parsed = JSON.parse(raw);
      global.autoreplySettings = Object.assign(global.autoreplySettings, parsed);
    } else {
      fs.writeFileSync(AUTOREPLY_FILE, JSON.stringify(global.autoreplySettings, null, 2), 'utf8');
    }
  } catch (e) {
    console.error('[autoreply] failed to load settings', e);
  }
}

function saveAutoreplySettings() {
  try {
    fs.writeFileSync(AUTOREPLY_FILE, JSON.stringify(global.autoreplySettings, null, 2), 'utf8');
  } catch (e) {
    console.error('[autoreply] failed to save settings', e);
  }
}

function getOwnerJids() {
  try {
    if (!global.owner) return [];
    return (global.owner || []).map(v => v.toString().replace(/[^0-9]/g, '') + '@s.whatsapp.net');
  } catch (e) { return []; }
}

loadAutoreplySettings();

// ========== CYBERPUNK-BULLY SETTINGS LOADER ==========
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

function cleanJsonLike(src) {
  let s = src.replace(/\/\*[\s\S]*?\*\//g, '');
  s = s.replace(/(^|[^\\:])\/\/.*$/gm, (m, p1) => p1);
  s = s.replace(/;(?=\s*[\}\]])/g, '');
  s = s.replace(/=\s*/g, '');
  s = s.replace(/'([^']*)'/g, (m, g1) => {
    if (/^".*"$/.test(m)) return m;
    return JSON.stringify(g1);
  });
  s = s.replace(/,(\s*[\}\]])/g, '$1');
  return s;
}

function loadSettings() {
  let settings = {};

  try {
    if (fs.existsSync(SETTINGS_JS)) {
      try {
        try { delete require.cache[require.resolve(SETTINGS_JS)]; } catch (e) {}
        const loaded = require(SETTINGS_JS);
        if (loaded && typeof loaded === 'object' && !Array.isArray(loaded)) {
          settings = Object.assign({}, loaded);
          Object.keys(settings).forEach(k => {
            if (typeof global[k] === 'undefined') global[k] = settings[k];
          });
          console.log('[BOOT] Loaded settings from settings.js (export object).');
          global.settingsSource = 'settings.js (export)';
          global.settings = settings;
          return settings;
        } else {
          console.log('[BOOT] settings.js executed (no exported object). Checking globals.');
          settings = {};
          for (const name of Object.keys(global)) {
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
      }
    }
  } catch (e) {
    console.error('[BOOT] settings.js existence check failed', e);
  }

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
        console.warn('[BOOT] settings.json parse error, attempting auto-clean. Error:', errJson.message || errJson);
        const bak = backupFile(SETTINGS_JSON);
        try {
          const cleaned = cleanJsonLike(raw);
          settings = JSON.parse(cleaned);
          fs.writeFileSync(SETTINGS_JSON, JSON.stringify(settings, null, 2), 'utf8');
          console.log('[BOOT] Cleaned and wrote back settings.json (original backed up):', bak);
          global.settingsSource = 'settings.json (cleaned)';
          global.settings = settings;
          return settings;
        } catch (errClean) {
          console.error('[BOOT] Failed to auto-clean settings.json. Restoring backup if any. Error:', errClean);
          if (bak) {
            try { fs.copyFileSync(bak, SETTINGS_JSON); console.log('[BOOT] Restored original settings.json from backup.'); } catch (e) {}
          }
        }
      }
    }
  } catch (e) {
    console.error('[BOOT] Failed reading settings.json fallback', e);
  }

  console.warn('[BOOT] No usable settings.js or valid settings.json found. Using default empty settings object.');
  settings = {};
  global.settingsSource = 'defaults';
  global.settings = settings;
  return settings;
}

try {
  const s = loadSettings();
  global.settings = global.settings || s || {};
  if (global.settings && typeof global.settings === 'object') {
    Object.keys(global.settings).forEach(k => {
      if (typeof global[k] === 'undefined') global[k] = global.settings[k];
    });
  }
} catch (e) {
  console.error('[BOOT] Unexpected error loading settings', e);
  global.settings = {};
}

const connectedUsersFilePath = path.join(__dirname, 'connected_users.json');
global.connectedUsersFilePath = connectedUsersFilePath;
if (typeof global.connectedUsers === 'undefined') global.connectedUsers = {};

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
    mentionedJid: ["120363369514105242@s.whatsapp.net"],
    forwardingScore: 999,
    isForwarded: true,
  }
}

// ========== CYBERPUNK-BULLY AUTO-READ SETTINGS ==========
if (typeof global.autoread_gc === 'undefined' || typeof global.autoread_dm === 'undefined') {
  global.autoread_gc = false;
  global.autoread_dm = false;
}

try {
  if (fs.existsSync(SETTINGS_FILE)) {
    const raw = fs.readFileSync(SETTINGS_FILE, 'utf8');
    const parsed = JSON.parse(raw || '{}');
    if (typeof parsed.autoread_gc === 'boolean') global.autoread_gc = parsed.autoread_gc;
    if (typeof parsed.autoread_dm === 'boolean') global.autoread_dm = parsed.autoread_dm;
  } else {
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

// ========== CYBERPUNK-BULLY AUTO-REACT SETTINGS ==========
if (typeof global.autoReact_dm === 'undefined') global.autoReact_dm = false;
if (typeof global.autoReact_group === 'undefined') global.autoReact_group = false;

const reactEmojis = ['😁','🔥','😈','❤️','🤡','😎','🤖','💀','🤨','😄','⚡','👑','🗿','😱','👍','👌'];

// ========== CYBERPUNK-BULLY PRESENCE SETTINGS ==========
if (typeof global.autoRecording === 'undefined') global.autoRecording = false;
if (typeof global.autoTyping === 'undefined') global.autoTyping = false;
if (typeof global.autorecordtype === 'undefined') global.autorecordtype = false;
if (typeof global.autoswview === 'undefined') global.autoswview = false;

const replbbby = {
key: {
remoteJid: 'status@broadcast',
fromMe: false,
participant: '0@s.whatsapp.net'
},
message: {
newsletterAdminInviteMessage: {
newsletterJid: `120363421884253535@newsletter`,
newsletterName: `CYBERPUNK-BULLY`,
jpegThumbnail: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg",
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
newsletterJid: '120363421884253535@newsletter',
serverMessageId: 20,
newsletterName: 'CYBERPUNK-BULLY'
},
externalAdReply: {
title: "CYBERPUNK-BULLY", 
body: "",
thumbnailUrl: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg", 
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
                        thumbnailUrl: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg",
                        sourceUrl: "https://t.me/sudo",
                        renderLargerThumbnail: false,
                    }
                }
            }, { quoted:m})
        }

// ========== CYBERPUNK-BULLY RUNTIME WATCHERS ==========
try {
  if (global.autostatusSettings && global.autostatusSettings.enabled) {
    const isStatusMessage = m?.key?.remoteJid === 'status@broadcast' || (m?.chat === 'status@broadcast');
    if (isStatusMessage) {
      const onlyFrom = Array.isArray(global.autostatusSettings.onlyFrom) ? global.autostatusSettings.onlyFrom : [];
      const fromJid = m.key?.participant || m.key?.fromMe ? (m.key?.participant || m.sender) : m.key?.participant;
      if (onlyFrom.length > 0) {
        const norm = jid => String(jid || '').split('@')[0];
        const ok = onlyFrom.some(s => norm(s) === norm(fromJid));
        if (!ok) {
        } else {
          (async () => {
            try { await markStatusAsRead(james, m.key); } catch(e){ console.error('[autostatus] mark read failed', e); }
          })();
        }
      } else {
        (async () => {
          try { await markStatusAsRead(james, m.key); } catch(e){ console.error('[autostatus] mark read failed', e); }
        })();
      }
    }
  }
} catch (e) {
  console.error('[autostatus watcher] unexpected', e);
}

// ========== CYBERPUNK-BULLY ANTILINK RUNTIME ==========
try {
  if (m?.isGroup) {
    const cfg = getAntiConfig(from);
    if (cfg.mode && cfg.mode !== 'off') {
      const sender = m.sender || (m.key && m.key.participant) || '';
      const isFromOwner = isOwner;
      const isGroupAdmin = isAdmins;
      const isBotAdmin = isBotAdmins;

      if (isFromOwner || isGroupAdmin || sender === (await james.decodeJid(james.user.id)).split(':')[0] + '@s.whatsapp.net') {
      } else {
        const textToCheck = (m.text || m.message?.conversation || m.message?.extendedTextMessage?.text || '') + '';
        const hasLink = /(?:https?:\/\/|www\.|chat\.whatsapp\.com\/|t\.me\/|telegram\.me\/|\.com\/\S+)/i.test(textToCheck);
        const protoMsg = m.message || {};
        try {
          const jsonStr = JSON.stringify(protoMsg);
          if (!hasLink && /chat\.whatsapp\.com\//i.test(jsonStr)) hasLink = true;
        } catch(e){}

        if (hasLink) {
          try {
            if (cfg.mode === 'delete') {
              if (!isBotAdmin) {
                await james.sendMessage(from, { text: `⚠️ I need admin to delete links.` }, { quoted: m });
              } else {
                try {
                  await james.sendMessage(from, { delete: m.key });
                } catch (e) {
                  try {
                    await james.sendMessage(from, { protocolMessage: { key: m.key, type: 0 }});
                  } catch(e2){}
                }
              }
            }

            if (cfg.mode === 'warn' || cfg.mode === 'kick') {
              const uid = sender;
              cfg.warns = cfg.warns || {};
              cfg.warns[uid] = (cfg.warns[uid] || 0) + 1;
              saveAntiLinkSettings();

              const warnMsg = `⚠️ AntiLink: <@${uid.split('@')[0]}> posted a link.\nWarning ${cfg.warns[uid]} / ${cfg.threshold}`;
              try {
                await james.sendMessage(from, { text: warnMsg, mentions: [uid] });
              } catch(e){}

              if (cfg.warns[uid] >= (cfg.threshold || 3)) {
                cfg.warns[uid] = 0;
                saveAntiLinkSettings();

                if (cfg.mode === 'kick') {
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
                  if (isBotAdmin) {
                    try { await james.sendMessage(from, { delete: m.key }); } catch (e) {}
                  }
                }
              }
            }
          } catch (eInner) {
            console.error('[antilink] handler error', eInner);
          }
        }
      }
    }
  }
} catch (eAll) {
  console.error('[antilink runtime] unexpected', eAll);
}

// ========== CYBERPUNK-BULLY AUTOREPLY RUNTIME ==========
try {
  if (m?.isGroup && global.autoreplySettings && global.autoreplySettings.enabled) {
    const mentions = (m.mentionedJid && Array.isArray(m.mentionedJid)) ? m.mentionedJid : [];

    try {
      const ctxMent = m.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      if (Array.isArray(ctxMent)) ctxMent.forEach(x => mentions.push(x));
    } catch (e) {}

    const ownerJids = getOwnerJids();

    const didMentionOwner = mentions.some(j => ownerJids.includes(j));
    if (didMentionOwner) {
      try {
        const stickerSource = global.autoreplySettings.sticker || '';
        if (/^https?:\/\//i.test(stickerSource)) {
          await james.sendMessage(m.chat, { sticker: { url: stickerSource } }, { quoted: m });
        } else {
          const p = path.isAbsolute(stickerSource) ? stickerSource : path.join(__dirname, stickerSource);
          if (fs.existsSync(p)) {
            await james.sendMessage(m.chat, { sticker: fs.readFileSync(p) }, { quoted: m });
          } else {
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

// ========== CYBERPUNK-BULLY ANTISPAM/ANTIMEDIA RUNTIME ==========
try {
  const chatId = from;
  const sender = m.sender || (m.key && m.key.participant) || '';
  const cfgSpam = getSpamConfig(chatId);
  const cfgMedia = getAntimediaConfig(chatId);

  const isGroupMsg = !!isGroup;
  const spamModeActive = (isGroupMsg && cfgSpam.modeGroup === 'on') || (!isGroupMsg && cfgSpam.modeDM === 'on');
  const mediaModeActive = (isGroupMsg && cfgMedia.group === 'on') || (!isGroupMsg && cfgMedia.dm === 'on');

  const senderIsProtected = await isProtected(sender) || isOwner || isAdmins || isBotAdmins;
  if (senderIsProtected) {
  } else {
    if (spamModeActive) {
      try {
        const now = Date.now();
        cfgSpam.records = cfgSpam.records || {};
        cfgSpam.records[sender] = cfgSpam.records[sender] || [];
        cfgSpam.records[sender] = cfgSpam.records[sender].filter(ts => now - ts <= (cfgSpam.windowMs || 60000));
        cfgSpam.records[sender].push(now);
        saveJsonSafe(ANTISPAM_FILE, global.antispamSettings);

        const count = cfgSpam.records[sender].length || 0;
        if (count > (cfgSpam.threshold || 5)) {
          try {
            const deleted = await tryDeleteMessage(james, chatId, m.key);
            if (deleted) {
              try { await james.sendMessage(chatId, { text: `⚠️ AntiSpam: <@${sender.split('@')[0]}> messages deleted (spam).`, mentions: [sender] }); }
              catch (e) { console.warn('[antispam] warn send failed', e); }
            } else {
              try { await james.sendMessage(chatId, { text: `⚠️ AntiSpam detected for <@${sender.split('@')[0]}> but failed to delete message.`, mentions: [sender] }); }
              catch (e) {}
            }
            cfgSpam.records[sender] = [];
            saveJsonSafe(ANTISPAM_FILE, global.antispamSettings);
          } catch (e) {
            console.error('[antispam] action error', e);
          }
        }
      } catch (e) { console.error('[antispam] runtime error', e); }
    }

    if (mediaModeActive) {
      try {
        const mime = (m.msg && (m.msg.mimetype || m.msg.mediaType)) || (m.mtype || '') || '';
        const hasImage = !!m.message?.imageMessage || /image\/.*/i.test(mime);
        const hasVideo = !!m.message?.videoMessage || /video\/.*/i.test(mime);
        const hasSticker = !!m.message?.stickerMessage;
        const hasAudio = !!m.message?.audioMessage || /audio\/.*/i.test(mime);
        const hasDocument = !!m.message?.documentMessage;
        const hasAnyMedia = hasImage || hasVideo || hasSticker || hasAudio || hasDocument;

        if (hasAnyMedia) {
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

// ========== CYBERPUNK-BULLY AUTO-READ RUNTIME ==========
try {
  if (m && m.key && !m.key.fromMe) {
    if (global.autoread_gc && m.isGroup) {
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
          console.error('autoread_gc error', e);
        }
      })();
    }

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

// ========== CYBERPUNK-BULLY AUTO-REACT RUNTIME ==========
try {
  if (m && m.key && !m.key.fromMe) {
    const isProtocol = m.mtype === 'protocolMessage' || m.message && m.message.protocolMessage;
    if (!isProtocol) {
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

// ========== CYBERPUNK-BULLY PRESENCE RUNTIME ==========
try {
  if (global.autorecordtype) {
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

  try {
    if (!m?.isGroup && global.autoblockSettings && global.autoblockSettings.enabled) {
      const senderJid = m.sender || (m.key && m.key.participant) || '';
      if (!isProtectedJid(senderJid)) {
        const last = global.autoblockSettings.blockedCache[senderJid] || 0;
        const now = Date.now();
        if (now - last >= 60 * 1000) {
          global.autoblockSettings.blockedCache[senderJid] = now;
          (async () => {
            try {
              const mode = (global.autoblockSettings.mode || 'silent').toLowerCase();
              if (mode === 'notify') {
                try {
                  await james.sendMessage(senderJid, { text: `You have been blocked by this bot (auto-block).` });
                } catch (e) {}
              }
              try {
                if (typeof james.updateBlockStatus === 'function') {
                  await james.updateBlockStatus(senderJid, 'block');
                } else if (typeof james.updateBlockStatus === 'undefined' && typeof james.contactBlock === 'function') {
                  await james.contactBlock(senderJid);
                } else {
                  console.warn('[autoblock] no known block function on james');
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

  if (m.isGroup) {
    const mentionNumber = '254704955033';
    if (body && body.includes(`@${mentionNumber}`)) {
      if (typeof reaction === 'function') {
        try { reaction(m.chat, "❓"); } catch (e) { console.error('reaction error', e); }
      } else {
        try { await james.sendMessage(m.chat, { text: "❓ my owner CYBERPUNK-BULLY was tagged and I dislike it, please behave" }, { quoted: m }); } catch (e) {}
      }
    }
  }
} catch (ePresence) {
  console.error('presence handler error:', ePresence);
}

// ========== CYBERPUNK-BULLY MUTE RUNTIME ==========
try {
  if (m?.isGroup && !m.key.fromMe) {
    const muteTarget = m.sender || m.key?.participant || '';
    if (muteTarget && isMuted(from, muteTarget) && !isOwner && !isAdmins) {
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
      return;
    }
  }
} catch (muteErr) {
  console.error('[mute runtime] unexpected:', muteErr?.message || muteErr);
}

// ========== CYBERPUNK-BULLY AURA TRACKING ==========
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

// ========== CYBERPUNK-BULLY COMMANDS SWITCH ==========
switch (command) {

// ============================================
// CYBERPUNK-BULLY - MULTIPLE MENU SYSTEM
// ============================================

case "menu": {
    let mainMenu = `${readmore}
╭──────────────────╮
│      CYBERPUNK-BULLY
├──────────────────┤
│ 👤 NAME : ${pushname}
│ 🔧 OWNER : Andromedaxs 
│ 📢 CHANNEL : @cyberpunkbully
│ 📁 VERSION : II
╰──────────────────╯

╭──────────────────
│ .infomenu 
│ .ownermenu 
│ .devmenu 
│ .utilmenu 
│ .downloadmenu 
│ .groupmenu 
│ .newmenu
╰──────────────────
`

    await james.sendMessage(m.chat, {
        text: mainMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "CYBERPUNK-BULLY",
                body: "by sudo",
                mediaType: 1,
                thumbnailUrl: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg",
                sourceUrl: "https://t.me/sudo",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

case "allmenu": {
    let mainMenu = `${readmore}
╭──────────────────╮
│      CYBERPUNK-BULLY
├──────────────────┤
│ 👤 NAME : ${pushname}
│ 🔧 OWNER : Andromedaxs 
│ 📢 CHANNEL : @cyberpunkbully
│ 📁 VERSION : II
╰──────────────────╯

╭──────────────────
│  📌 INFO
├──────────────────
│  ✦ repo
│  ✦ sc
│  ✦ credits
╰──────────────────

╭──────────────────
│  👑 OWNER CONTROLS
├──────────────────
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
╰──────────────────

╭──────────────────
│  💻 DEV TOOLS
├──────────────────
│  ✦ fetch
│  ✦ eval
│  ✦ inspect
│  ✦ encrypt
│  ✦ getfile
╰──────────────────

╭──────────────────
│  🛠️ UTIL TOOLS
├──────────────────
│  ✦ ping
│  ✦ owner
│  ✦ script
│  ✦ runtime
╰──────────────────

╭──────────────────
│  📥 DOWNLOADS & FUN
├──────────────────
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
╰──────────────────

╭──────────────────
│  👥 GROUP COMMANDS
├──────────────────
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
╰──────────────────

╭──────────────────
│  🌟 AURA SYSTEM
├──────────────────
│  ✦ aura on/off
│  ✦ aura status
│  ✦ auraboard
│  ✦ aurastat [@user]
╰──────────────────

╭──────────────────
│  ⭐ NEW FEATURES
├──────────────────
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
╰──────────────────
`

    await james.sendMessage(m.chat, {
        text: mainMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "CYBERPUNK-BULLY",
                body: "by sudo",
                mediaType: 1,
                thumbnailUrl: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg",
                sourceUrl: "https://t.me/sudo",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

case "infomenu": {
    let importantMenu = `${readmore}
╭──────────────────╮
│      📌 INFO
╰──────────────────╯
│  ✦ repo
│  ✦ sc
│  ✦ credits
╰──────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: importantMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "CYBERPUNK-BULLY — Important",
                body: "Essential commands",
                mediaType: 1,
                thumbnailUrl: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg",
                sourceUrl: "https://t.me/sudo",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

case "ownermenu": {
    let ownerMenu = `${readmore}
╭──────────────────╮
│   👑 OWNER CONTROLS
╰──────────────────╯
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
╰──────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: ownerMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "CYBERPUNK-BULLY — Owner",
                body: "Admin & Owner only",
                mediaType: 1,
                thumbnailUrl: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg",
                sourceUrl: "https://t.me/sudo",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

case "devmenu": {
    let devMenu = `${readmore}
╭──────────────────╮
│     💻 DEV TOOLS
╰──────────────────╯
│  ✦ fetch
│  ✦ eval
│  ✦ inspect
│  ✦ encrypt
│  ✦ getfile
╰──────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: devMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "CYBERPUNK-BULLY — Dev",
                body: "Developer tools — sudo",
                mediaType: 1,
                thumbnailUrl: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg",
                sourceUrl: "https://t.me/sudo",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

case "utilmenu": {
    let utilityMenu = `${readmore}
╭──────────────────╮
│    🛠️ UTIL TOOLS
╰──────────────────╯
│  ✦ ping
│  ✦ owner
│  ✦ script
│  ✦ runtime
╰──────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: utilityMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "CYBERPUNK-BULLY — Utility",
                body: "Helpful utility tools",
                mediaType: 1,
                thumbnailUrl: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg",
                sourceUrl: "https://t.me/sudo",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

case "downloadmenu": {
    let downloadMenu = `${readmore}
╭──────────────────╮
│  📥 DOWNLOADS & FUN
╰──────────────────╯
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
╰──────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: downloadMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "CYBERPUNK-BULLY — Downloads",
                body: "Media & entertainment",
                mediaType: 1,
                thumbnailUrl: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg",
                sourceUrl: "https://t.me/sudo",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

case "groupmenu": {
    let groupMenu = `${readmore}
╭──────────────────╮
│   👥 GROUP COMMANDS
╰──────────────────╯
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
╰──────────────────
╭──────────────────╮
│   🌟 AURA SYSTEM
╰──────────────────╯
│  ✦ aura on/off
│  ✦ aura status
│  ✦ auraboard
│  ✦ aurastat [@user]
╰──────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: groupMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "CYBERPUNK-BULLY — Groups",
                body: "Group management",
                mediaType: 1,
                thumbnailUrl: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg",
                sourceUrl: "https://t.me/sudo",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

case "newmenu": {
    let newMenu = `${readmore}
╭──────────────────╮
│    ⭐ NEW FEATURES
╰──────────────────╯
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
╰──────────────────
_Type .menu to return_
`

    await james.sendMessage(m.chat, {
        text: newMenu,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "CYBERPUNK-BULLY — New",
                body: "Latest features",
                mediaType: 1,
                thumbnailUrl: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg",
                sourceUrl: "https://t.me/sudo",
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;

// ========== RUNTIME COMMAND ==========
case 'runtime':
case 'uptime': {
  try {
    const os = require('os');
    const util = require('util');
    const { performance } = require('perf_hooks');
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

    const buildStats = async () => {
      const ru = process.uptime();
      const mem = process.memoryUsage();
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const cpus = os.cpus();
      const cpuModel = cpus && cpus[0] ? cpus[0].model : 'unknown';
      const cpuCount = cpus ? cpus.length : 1;
      const rss = fmtBytes(mem.rss);
      const heapUsed = fmtBytes(mem.heapUsed);
      const heapTotal = fmtBytes(mem.heapTotal);
      const external = fmtBytes(mem.external || 0);
      const nodeVer = process.version;
      const platform = `${os.type()} ${os.release()} (${os.platform()})`;
      const arch = os.arch();
      let latency = 'n/a';
      try {
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

    const initialText = await buildStats();
    let sent = await james.sendMessage(from, { text: initialText }, { quoted: m });

    let updates = 3;
    const interval = setInterval(async () => {
      try {
        if (!sent || !sent.key) {
          const newText = await buildStats();
          sent = await james.sendMessage(from, { text: newText }, { quoted: m });
          updates--;
          if (updates <= 0) clearInterval(interval);
          return;
        }

        try {
          await james.relayMessage(from, {
            protocolMessage: { key: sent.key, type: 0 }
          }, { messageId: generateMessageID() });
        } catch (e1) {
          try {
            await james.sendMessage(from, { delete: sent.key });
          } catch (e2) {
            try {
              if (typeof james.deleteMessage === 'function') {
                await james.deleteMessage(from, { id: sent.key.id, remoteJid: from, fromMe: true });
              } else {
                console.warn('[runtime] delete fallback failed', e1, e2);
              }
            } catch (e3) {
              console.warn('[runtime] delete final fallback failed', e3);
            }
          }
        }

        const updatedText = await buildStats();
        sent = await james.sendMessage(from, { text: updatedText }, { quoted: m });
      } catch (upErr) {
        console.error('[runtime] update error', upErr);
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

// ========== WELCOME COMMAND ==========
case 'welcome': {
  if (!isOwner && !isBotAdmins) {
    if (!isOwner) return reply('Only the bot owner can change global welcome toggles.');
  }

  const sub = (args[0] || '').toLowerCase();
  if (!sub || !['on','off','status','setmsg','setimg'].includes(sub)) {
    return reply('Usage:\n.welcome on\n.welcome off\n.welcome status\n.welcome setmsg <message template>\n.welcome setimg on|off\n\nPlaceholders: {{user}}, {{user_mention}}, {{group}}, {{member_count}}');
  }

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

// ========== AUTO PP COMMAND ==========
case 'autopp': {
  if (!isOwner) return reply('Owner only.');

  const sub = (args[0] || '').toLowerCase();

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

  if (sub === 'add') {
    if (!m.quoted) return reply('Reply to an image to add it.');
    try {
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

  if (sub === 'addurl') {
    const url = args[1] || args.slice(1).join(' ');
    if (!url || !/^https?:\/\//i.test(url)) return reply('Usage: .autopp addurl <image-url>');
    global.autopp.images.push({ source: 'url', data: url });
    return reply(`Added URL to autopp list. Index: ${global.autopp.images.length}`);
  }

  if (sub === 'list') {
    if (!global.autopp.images.length) return reply('No images configured.');
    const list = global.autopp.images.map((it, i) => `${i+1}. [${it.source}] ${it.data}`).join('\n');
    return reply(`Autopp images:\n${list}`);
  }

  if (sub === 'rm') {
    const idx = parseInt(args[1] || args[0]);
    if (!idx || idx < 1 || idx > global.autopp.images.length) return reply('Usage: .autopp rm <index>');
    const removed = global.autopp.images.splice(idx - 1, 1)[0];
    if (removed && removed.source === 'local' && fs.existsSync(removed.data)) {
      try { fs.unlinkSync(removed.data); } catch(e){}
    }
    return reply(`Removed index ${idx}.`);
  }

  if (sub === 'clear') {
    for (const it of (global.autopp.images || [])) {
      if (it.source === 'local' && fs.existsSync(it.data)) try { fs.unlinkSync(it.data) } catch(e){}
    }
    global.autopp.images = [];
    return reply('Cleared all autopp images.');
  }

  if (sub === 'interval') {
    const sec = parseInt(args[1] || args[0]);
    if (!sec || sec < 10) return reply('Usage: .autopp interval <seconds> (min 10s)');
    global.autopp.intervalSec = sec;
    if (global.autopp.enabled && global.autopp.timerId) {
      autopProfileStop();
      autopProfileStart(james);
    }
    return reply(`Autopp interval set to ${sec} seconds.`);
  }

  if (sub === 'start') {
    if (global.autopp.images.length === 0) return reply('No images configured. Add images first.');
    if (global.autopp.enabled) return reply('Autopp already running.');
    autopProfileStart(james);
    return reply(`Autopp started. Changing every ${global.autopp.intervalSec} seconds.`);
  }

  if (sub === 'stop') {
    if (!global.autopp.enabled) return reply('Autopp not running.');
    autopProfileStop();
    return reply('Autopp stopped.');
  }

  if (sub === 'once') {
    try {
      const ok = await autopProfileRunOnce(james);
      return reply(ok ? 'Profile picture updated once.' : 'Failed to update profile picture (see console).');
    } catch (e) {
      console.error('[autopp once] error', e);
      return reply('Error updating profile picture once.');
    }
  }

  if (sub === 'status') {
    return reply(`Autopp status:
Enabled: ${global.autopp.enabled}
Interval (s): ${global.autopp.intervalSec}
Images: ${global.autopp.images.length}`);
  }

  return reply('Unknown subcommand. Use .autopp help');
}
break;

// ========== TENOR COMMAND ==========
case 'tenor': {
  try {
    if (!text) return reply(`Example: ${global.xprefix || '.'}${command} cat`);
    const axios = require('axios');

    const res = await axios.get('https://g.tenor.com/v1/search', {
      params: { q: text, key: 'LIVDSRZULELA', limit: 25 }
    });

    const data = res.data;
    if (!data || !Array.isArray(data.results) || data.results.length === 0) {
      return reply('No results found!');
    }

    const pick = typeof pickRandom === 'function' ? pickRandom(data.results) : data.results[Math.floor(Math.random() * data.results.length)];

    let mediaUrl = null;
    try {
      const media = pick.media && pick.media[0];
      if (media) {
        if (media.mp4 && media.mp4.url) mediaUrl = media.mp4.url;
        else if (media.gif && media.gif.url) mediaUrl = media.gif.url;
        else if (media.tinygif && media.tinygif.url) mediaUrl = media.tinygif.url;
        else {
          const mkeys = Object.keys(media);
          for (const k of mkeys) {
            if (media[k] && media[k].url) {
              mediaUrl = media[k].url;
              break;
            }
          }
        }
      }
    } catch (e) { }

    if (!mediaUrl) return reply('No playable media found for that result.');

    const caption =
      `👀 Media: ${pick.url || pick.itemurl || 'N/A'}\n` +
      `📋 Description: ${pick.content_description || pick.title || 'N/A'}\n` +
      `🔗 Url: ${pick.itemurl || pick.url || 'N/A'}`;

    try {
      await james.sendMessage(from, {
        video: { url: mediaUrl },
        caption,
        gifPlayback: true
      }, { quoted: m });
    } catch (sendErr) {
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

// ========== ANTISIMP COMMAND ==========
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

// ========== STICKER COMMAND ==========
case 's':
case 'sticker':
case 'stiker': {
  try {
    const _fs   = require('fs');
    const _path = require('path');
    const { exec: _exec } = require('child_process');
    const _ffmpeg = require('ffmpeg-static');

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

    const _mediaType = /video/gi.test(_stickerMime) ? 'video' : 'image';
    let _stream = await downloadContentFromMessage(_stickerMsg, _mediaType);
    let _buf = Buffer.from([]);
    for await (const chunk of _stream) _buf = Buffer.concat([_buf, chunk]);
    if (!_buf || !_buf.length) return reply('❌ Failed to download media.');
    _fs.writeFileSync(_inputPath, _buf);

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

// ========== STICKER WATERMARK COMMAND ==========
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

    let stream = await downloadContentFromMessage(qmsg, /video|audio/.test(mime) ? 'video' : 'image');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    if (!buffer || !buffer.length) return reply('❌ Failed to download media for sticker.');

    fs.writeFileSync(inputPath, buffer);

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

    async function sendStickerFile(jid, webpPath, quotedMsg) {
      try {
        await james.sendMessage(jid, { sticker: { url: webpPath } }, { quoted: quotedMsg });
      } catch (e1) {
        const buff = fs.readFileSync(webpPath);
        await james.sendMessage(jid, { sticker: buff }, { quoted: quotedMsg });
      }
    }
    await sendStickerFile(from, outWebp, m);

    try { fs.unlinkSync(inputPath); } catch (e) {}
    try { fs.unlinkSync(outWebp); } catch (e) {}

  } catch (err) {
    console.error('[stickerwm] error', err);
    try { reply('❌ Failed to create sticker with watermark. Make sure ffmpeg is installed and fonts are available.'); } catch(e){}
  }
}
break;

// ========== READ VIEW-ONCE COMMAND ==========
case 'rvo':
case 'readviewonce': {
  try {
    if (!m.quoted) return reply('Reply to a view-once message to extract it.');
    const quotedMsg = m.message?.extendedTextMessage?.contextInfo?.quotedMessage || m.quoted?.message || m.quoted;
    const type = Object.keys(quotedMsg || {})[0];

    const isViewOnce = quotedMsg && quotedMsg[type] && quotedMsg[type].viewOnce;
    if (!isViewOnce) return reply('That message is not a view-once message.');

    await reply('⏳ Extracting view-once content...');

    const mediaType = type === 'imageMessage' ? 'image' : type === 'videoMessage' ? 'video' : type === 'audioMessage' ? 'audio' : null;
    if (!mediaType) return reply('Unsupported view-once content type.');

    const mediaStream = await downloadContentFromMessage(quotedMsg[type], mediaType);
    let buffer = Buffer.from([]);
    for await (const chunk of mediaStream) buffer = Buffer.concat([buffer, chunk]);
    if (!buffer || !buffer.length) return reply('❌ Failed to download view-once content.');

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

// ========== GET PROFILE PICTURE COMMAND ==========
case 'getpp': {
  try {
    let target = (q || '').trim();

    if (!target) {
      if (m.quoted && m.quoted.sender) target = m.quoted.sender;
      else if (m.mentionedJid && m.mentionedJid.length) target = m.mentionedJid[0];
      else target = m.sender;
    }

    if (!target.includes('@')) {
      const clean = target.replace(/[^0-9]/g, '');
      if (clean) target = clean + '@s.whatsapp.net';
    }

    const FALLBACK_PP = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    let ppUrl = FALLBACK_PP;

    try {
      if (typeof james.profilePictureUrl === 'function') {
        ppUrl = await james.profilePictureUrl(target, 'image').catch(() => FALLBACK_PP);
      } else if (typeof james.fetchProfilePicture === 'function') {
        ppUrl = await james.fetchProfilePicture(target).catch(() => FALLBACK_PP);
      } else {
        const contact = store && store.contacts ? (store.contacts[target] || store.contacts[target.replace(/:.*$/,'')]) : null;
        ppUrl = (contact && (contact.imgUrl || contact.picture)) || FALLBACK_PP;
      }
    } catch (e) {
      ppUrl = FALLBACK_PP;
    }

    let displayName = '';
    try {
      if (store && store.contacts && store.contacts[target]) {
        displayName = store.contacts[target].name || store.contacts[target].notify || '';
      }
      if ((!displayName || displayName === '') && typeof james.getName === 'function') {
        displayName = await james.getName(target).catch(()=> '');
      }
      if (!displayName) displayName = target.split('@')[0];
    } catch (e) {
      displayName = target.split('@')[0];
    }

    let roleText = 'N/A';
    try {
      if (isGroup) {
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

    const owners = (global.owner || []).map(o => o.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
    const isOwnerTarget = owners.includes(target);
    const botJid = (await james.decodeJid(james.user?.id || '')).split(':')[0] + '@s.whatsapp.net';
    const isBotTarget = botJid === target;

    const caption = [
      `🧿 *Profile Info*`,
      `• *Name:* ${displayName}`,
      `• *JID:* ${target}`,
      `• *Role:* ${roleText}`,
      `• *Owner:* ${isOwnerTarget ? 'Yes' : 'No'}`,
      `• *Bot:* ${isBotTarget ? 'Yes' : 'No'}`,
    ].join('\n');

    try {
      await james.sendMessage(from, { image: { url: ppUrl }, caption }, { quoted: m });
    } catch (e) {
      await james.sendMessage(from, { text: `${caption}\n\nProfile Picture: ${ppUrl}` }, { quoted: m });
    }

  } catch (err) {
    console.error('[getpp] error', err);
    try { reply('❌ Failed to get profile picture or info.'); } catch(e){}
  }
}
break;

// ========== FAST FLUX COMMAND ==========
case 'fastflux':
case 'fflux': {
  try {
    const prompt = (text || q || '').trim();
    if (!prompt) return reply('⚠️ Please provide a prompt. Example:\n.fastflux white-haired girl in a park');

    const fullPrompt = `anime style, high quality, detailed illustration of ${prompt}, ultra-detailed, soft lighting, trending on pixiv, masterpiece, beautiful composition, 4k render`;

    const apiUrl = `https://fast-flux-demo.replicate.workers.dev/api/generate-image?text=${encodeURIComponent(fullPrompt)}`;

    await reply('⏳ Generating image, please wait...');

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

// ========== LIST ONLINE COMMAND ==========
case 'listonline': {
  try {
    if (!isGroup) return reply('⚠️ Use this in a group chat.');
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

// ========== FACEBOOK DOWNLOAD COMMAND ==========
case 'facebook':
case 'fb':
case 'fbdown': {
  try {
    const axios = require('axios');
    const cheerio = require('cheerio');
    const fs = require('fs');
    const path = require('path');

    if (!text) return reply('⚠️ Usage: .fb <Facebook video URL>\nExample: .fb https://www.facebook.com/watch?v=xxxx');

    const url = text.trim();

    if (!/facebook\.\w+\/(reel|watch|share|video|v)|facebook\.com\/.+\/videos\//i.test(url)) {
      return reply('❌ Invalid Facebook video URL. Provide a valid watch / reel / share link.');
    }

    await reply('⏳ Fetching Facebook video info...');

    const tmpDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    async function facebookScrape(videoUrl) {
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

    let best = videos[0];
    try {
      const order = ['1080', '720', '480', '360', '240'];
      const found = order.map(q => videos.find(v => v.quality && v.quality.includes(q))).find(Boolean);
      if (found) best = found;
    } catch (e) {}

    const safeMaxMB = 60;
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

      await new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(tmpFile);
        resp.data.pipe(writer);
        writer.on('error', err => { writer.close(); reject(err); });
        writer.on('finish', () => resolve());
      });

      const stat = fs.statSync(tmpFile);
      const fileSizeMB = stat.size / (1024 * 1024);

      if (fileSizeMB > safeMaxMB) {
        try { fs.unlinkSync(tmpFile); } catch (e) {}
        let listText = `⚠️ Video is too large to upload (${fileSizeMB.toFixed(1)} MB). Use the direct link(s) below:\n\n`;
        videos.forEach(v => { listText += `• ${v.quality}\n${v.url}\n\n`; });
        if (dl.music) listText += `🔊 Audio: ${dl.music}\n\n`;
        await james.sendMessage(from, { text: listText }, { quoted: m });
        break;
      }

      await james.sendMessage(from, {
        video: { url: tmpFile },
        caption: `🎬 ${meta.title || 'Facebook video'}\n• Quality: ${best.quality || 'unknown'}`,
        mimetype: 'video/mp4'
      }, { quoted: m });

      try { fs.unlinkSync(tmpFile); } catch (e) {}

    } catch (errDownload) {
      console.error('[fbdown] download/send error', errDownload && (errDownload.message || errDownload));
      try { if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile); } catch (e) {}

      let fallbackText = '🔥 Download links:\n\n';
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

// ========== LIST DEAD COMMAND ==========
case 'listdead': {
  try {
    if (!isGroup) return reply('⚠️ Use this in a group.');
    const days = parseInt(args[0]) || 7;
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    const meta = await james.groupMetadata(from).catch(()=>null);
    const parts = meta?.participants || [];
    const dead = parts.filter(p => {
      const s = global.jamesOnlineCache[p.id];
      return !s || (!s.online && (s.lastSeen || 0) < cutoff);
    }).map(p => p.id);
    if (!dead.length) return reply(`No dead members older than ${days} day(s).`);
    const txt = `𝐃𝐞𝐚𝐝 𝐦𝐞𝐦𝐛𝐞𝐫 𝐟𝐨𝐮𝐧𝐝 𝐨𝐥𝐝𝐞𝐫 𝐭𝐡𝐚𝐧 ${days} 𝐝𝐚𝐲(𝐬)${readmore}:\n` + dead.map(j=>`•${readmore}@${j.split('@')[0]}`).join('\n');
    await james.sendMessage(from, { text: txt, mentions: dead }, { quoted: m });
  } catch (e) {
    console.error('[listdead] error', e);
    reply('❌ Failed to fetch dead list.');
  }
}
break;

// ========== LIST GHOST VIEWERS COMMAND ==========
case 'listghostviewers':
case 'listghosts':
{
  try {
    let owner = args[0] ? (args[0].includes('@') ? args[0] : args[0].replace(/[^0-9]/g,'') + '@s.whatsapp.net') : (m.quoted ? m.quoted.sender : null);
    if (!owner) {
      const meta = isGroup ? await james.groupMetadata(from).catch(()=>null) : null;
      owner = (meta && meta.owner) ? meta.owner : (james.user && james.user.id ? james.user.id.split(':')[0] + '@s.whatsapp.net' : null);
    }
    if (!owner) return reply('⚠️ Provide owner jid or use in a group to default to group owner.');

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

// ========== KICK DEAD COMMAND ==========
case 'kickdead': {
  try {
    if (!isGroup) return reply('⚠️ Use this in a group.');
    if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
    if (!isBotAdmins) return reply('⚠️ I must be group admin to remove members.');

    const days = parseInt(args[0]) || 7;
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    const meta = await james.groupMetadata(from).catch(()=>null);
    const parts = meta?.participants || [];
    const targets = parts.filter(p => {
      const s = global.jamesOnlineCache[p.id];
      if (p.admin === 'admin' || p.admin === 'superadmin') return false;
      return !s || (!s.online && (s.lastSeen || 0) < cutoff);
    }).map(p => p.id);

    if (!targets.length) return reply(`No dead members older than ${days} day(s) to kick.`);

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

// ========== PROMOTE ALL COMMAND ==========
case 'promoteall': {
  try {
    if (!isGroup) return reply('⚠️ Use this in a group.');
    if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
    if (!isBotAdmins) return reply('⚠️ I must be group admin to promote.');

    const meta = await james.groupMetadata(from).catch(()=>null);
    const parts = meta?.participants || [];
    const toPromote = parts.filter(p => !(p.admin === 'admin' || p.admin === 'superadmin') && p.id !== (james.user && james.user.id ? james.user.id.split(':')[0] + '@s.whatsapp.net' : '')).map(p=>p.id);
    if (!toPromote.length) return reply('No members to promote.');
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

// ========== DEMOTE ALL COMMAND ==========
case 'demoteall': {
  try {
    if (!isGroup) return reply('⚠️ Use this in a group.');
    if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
    if (!isBotAdmins) return reply('⚠️ I must be group admin to demote.');
    const meta = await james.groupMetadata(from).catch(()=>null);
    const parts = meta?.participants || [];
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

// ========== KICK ALL 2 COMMAND ==========
case 'kickall2': {
  try {
    if (!isGroup) return reply('⚠️ Use this in a group.');
    if (!isOwner && !isAdmins) return reply('⚠️ Admin only.');
    if (!isBotAdmins) return reply('⚠️ I must be group admin to kick members.');
    const meta = await james.groupMetadata(from).catch(()=>null);
    const parts = meta?.participants || [];
    const botJid = (james.user && james.user.id) ? james.user.id.split(':')[0] + '@s.whatsapp.net' : null;
    const toKick = parts.filter(p => p.id !== meta.owner && p.id !== botJid && !(p.admin==='admin'||p.admin==='superadmin')).map(p=>p.id);
    if (!toKick.length) return reply('No removable members found.');
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

// ========== GET GROUP DP COMMAND ==========
case 'getgroupdp': {
  try {
    if (!isGroup) return reply('⚠️ Use in group.');
    try {
      const pp = await james.profilePictureUrl(from, 'image').catch(()=>null);
      if (!pp) return reply('No group picture found.');
      await james.sendMessage(from, { image: { url: pp }, caption: "Group display picture" }, { quoted: m });
    } catch (e) {
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

// ========== AUTOSTATUS COMMAND ==========
case 'autostatus': {
  try {
    if (!isOwner) return reply('❌ Owner-only command.');

    const sub = (args[0] || '').toLowerCase();
    if (!sub) {
      const s = global.autostatusSettings || {};
      return reply(`AutoStatus (view) settings:\n• enabled: ${!!s.enabled}\n• onlyFrom: ${(s.onlyFrom || []).join(', ') || '(none)'}\n\nUsage:\n.autostatus on|off|status\n.autostatus onlyfrom <number@s.whatsapp.net|number>\n.autostatus clearonlyfrom`);
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

    if (sub === 'status') {
      const s = global.autostatusSettings || {};
      return reply(`AutoStatus status:\n• enabled: ${!!s.enabled}\n• onlyFrom: ${(s.onlyFrom || []).join(', ') || '(none)'}`);
    }

    if (sub === 'onlyfrom') {
      const num = args.slice(1).join(' ').trim();
      if (!num) return reply('⚠️ Usage: .autostatus onlyfrom <number or jid>');
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

    return reply('⚠️ Unknown subcommand. Use .autostatus for usage.');
  } catch (e) {
    console.error('[autostatus case] error', e);
    try { reply('❌ Autostatus command failed.'); } catch(e) {}
  }
}
break;

// ========== GROUP COMMAND ==========
case 'group': {
  try {
    if (!m.isGroup) return reply('⚠️ This command only works in groups.');
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

    async function tryCall(obj, names = [], ...argsCall) {
      for (const n of names) {
        try {
          if (typeof obj[n] === 'function') {
            return await obj[n](...argsCall);
          }
        } catch (e) {
        }
      }
      throw new Error('No supported method found: ' + names.join(', '));
    }

    if (sub === 'open' || sub === 'close') {
      if (!isBotAdmins) return reply('⚠️ I must be group admin to change settings.');

      const wantOpen = sub === 'open';
      try {
        if (wantOpen) {
          if (typeof james.groupSettingUpdate === 'function') {
            await james.groupSettingUpdate(from, 'not_announcement');
          } else if (typeof james.groupSetting === 'function') {
            await james.groupSetting(from, 'not_announcement');
          } else {
            await tryCall(james, ['groupSettingUpdate', 'groupSetting'], from, 'not_announcement');
          }
          return reply('✅ Group is now OPEN (members can send messages).');
        } else {
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

    if (sub === 'opentime') {
      if (!isBotAdmins) return reply('⚠️ I must be group admin to change settings.');
      const minutes = Math.max(1, parseInt(args[1]) || 1);
      let previous = 'announcement';
      try {
        await tryCall(james, ['groupSettingUpdate', 'groupSetting'], from, 'not_announcement');
        reply(`✅ Group opened for ${minutes} minute(s). Will revert after time.`);

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

    if (sub === 'changename' || sub === 'subject' || sub === 'setname') {
      if (!isBotAdmins) return reply('⚠️ I must be group admin to change the group name.');
      const newName = args.slice(1).join(' ').trim();
      if (!newName) return reply('⚠️ Provide the new group name. Usage: .group changename New Name Here');
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

    if (sub === 'setdesc' || sub === 'desc' || sub === 'setdescription') {
      if (!isBotAdmins) return reply('⚠️ I must be group admin to change description.');
      const desc = args.slice(1).join(' ').trim();
      if (!desc) return reply('⚠️ Usage: .group setdesc <text>');
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

    if (sub === 'setdp' || sub === 'seticon' || sub === 'setpicture') {
      if (!isBotAdmins) return reply('⚠️ I must be group admin to change group icon.');
      const quoted = m.quoted;
      if (!quoted) return reply('⚠️ Reply to an image with .group setdp');
      try {
        const media = await (async () => {
          if (quoted.download) return await quoted.download();
          if (quoted.msg && typeof quoted.msg === 'object') {
            if (typeof quoted.download === 'function') return await quoted.download();
            if (quoted.msg.imageMessage && quoted.msg.imageMessage.jpegThumbnail) return Buffer.from(quoted.msg.imageMessage.jpegThumbnail, 'base64');
          }
          return null;
        })();

        if (!media) return reply('❌ Failed to get image from quoted message.');

        try {
          if (typeof james.updateProfilePicture === 'function') {
            await james.updateProfilePicture(from, media);
          } else if (typeof james.groupUpdateIcon === 'function') {
            await james.groupUpdateIcon(from, media);
          } else {
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

    if (sub === 'link' || sub === 'invite') {
      try {
        let code = null;
        try {
          if (typeof james.groupInviteCode === 'function') code = await james.groupInviteCode(from);
          else if (typeof james.groupInviteCode === 'undefined' && typeof james.groupInvite === 'function') code = await james.groupInvite(from);
          else code = await tryCall(james, ['groupInviteCode', 'groupInvite', 'revealGroupInvite'], from);
        } catch (e) {
        }
        if (code && typeof code === 'string') {
          const link = `https://chat.whatsapp.com/${code}`;
          return reply(`🔗 Group invite link:\n${link}`);
        }
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
      if (!isBotAdmins) return reply('⚠️ I must be group admin to revoke invite link.');
      try {
        if (typeof james.groupRevokeInvite === 'function') {
          const res = await james.groupRevokeInvite(from);
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

    return reply('⚠️ Unknown group subcommand. Use .group to see usage.');

  } catch (err) {
    console.error('[group case] unexpected error', err);
    try { reply('❌ Group command failed. Check console.'); } catch(e){}
  }
}
break;

// ========== ANTISPAM COMMAND ==========
case 'antispam': {
  try {
    if (!m.isGroup && !isOwner) {
      if (!isOwner) return reply('⚠️ Owner only for DM configuration.');
    }
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

// ========== ANTIMEDIA COMMAND ==========
case 'antimedia': {
  try {
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

// ========== ANTIDELETE COMMAND ==========
case 'antidelete': {
  try {
    if (!isOwner && !isAdmins) return reply('⚠️ Owner/Admin only.');
    const op = (args[0] || '').toLowerCase();
    if (!op || !['on','off','status'].includes(op)) return reply('Usage: .antidelete on|off|status');
    if (typeof global.antidelete === 'undefined') global.antidelete = { chat: false, dm: false };
    if (op === 'on') {
      global.antidelete.chat = true;
      global.antidelete.dm = true;
      saveJsonSafe(ANTISPAM_FILE, global.antispamSettings);
      return reply('✅ Antidelete enabled (chat & dm).');
    } else if (op === 'off') {
      global.antidelete.chat = false;
      global.antidelete.dm = false;
      return reply('✅ Antidelete disabled.');
    } else {
      return reply(`Antidelete status:\nchat: ${global.antidelete?.chat}\ndm: ${global.antidelete?.dm}`);
    }
  } catch (e) {
    console.error('[antidelete case] error', e);
    reply('❌ Antidelete command error.');
  }
}
break;

// ========== AUTOBLOCK COMMAND ==========
case 'autoblock': {
  try {
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
      if (!['silent','notify'].includes(m2)) return reply('⚠️ Usage: .autoblock mode silent|notify');
      global.autoblockSettings.mode = m2;
      saveAutoblockSettings();
      return reply(`✅ Mode set to ${m2}`);
    }

    if (sub === 'whitelist') {
      const op = (args[1] || '').toLowerCase();
      if (!op) return reply('⚠️ Usage: .autoblock whitelist add|remove|list <number>');
      if (op === 'list') {
        return reply(`🔖 Whitelist:\n${(global.autoblockSettings.whitelist || []).join('\n') || '(none)'}`);
      }
      if (op === 'add') {
        const num = args[2];
        if (!num) return reply('⚠️ Usage: .autoblock whitelist add <number>');
        const norm = normalizePhone(num);
        if (!norm) return reply('⚠️ Invalid number.');
        if (!global.autoblockSettings.whitelist.includes(norm)) global.autoblockSettings.whitelist.push(norm);
        saveAutoblockSettings();
        return reply(`✅ Added ${norm} to whitelist.`);
      }
      if (op === 'remove') {
        const num = args[2];
        if (!num) return reply('⚠️ Usage: .autoblock whitelist remove <number>');
        const norm = normalizePhone(num);
        global.autoblockSettings.whitelist = (global.autoblockSettings.whitelist || []).filter(x => normalizePhone(x) !== norm);
        saveAutoblockSettings();
        return reply(`✅ Removed ${norm} from whitelist.`);
      }
      return reply('⚠️ Unknown whitelist op. Use add|remove|list.');
    }

    return reply('⚠️ Unknown subcommand. Usage:\n.autoblock on|off\n.autoblock mode silent|notify\n.autoblock whitelist add|remove|list <number>');
  } catch (e) {
    console.error('[autoblock case] error', e);
    try { reply('❌ Autoblock command error.'); } catch (e2) {}
  }
}
break;

// ========== ANTILINK COMMAND ==========
case 'antilink': {
  try {
    if (!m.isGroup) return reply('⚠️ This command only works in groups.');
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
      if (!['warn','delete','kick','off'].includes(m2)) return reply('⚠️ Usage: .antilink mode warn|delete|kick|off');
      cfg.mode = m2;
      if (!cfg.threshold) cfg.threshold = 3;
      saveAntiLinkSettings();
      return reply(`✅ Mode set to ${m2}`);
    }

    if (sub === 'threshold') {
      const n = parseInt(args[1]);
      if (!n || n < 1) return reply('⚠️ Usage: .antilink threshold <positive number>');
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

    return reply('⚠️ Unknown subcommand. See .antilink for usage.');

  } catch (err) {
    console.error('[antilink case] error', err);
    try { reply('❌ An error occurred.'); } catch(e){}
  }
}
break;

// ========== AUTOREPLY COMMAND ==========
case 'autoreply': {
  try {
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
      if (!url) return reply('⚠️ Usage: .autoreply set <sticker_url_or_local_path>\nExample: .autoreply set https://i.ibb.co/abc/your-sticker.webp');
      global.autoreplySettings.sticker = url;
      saveAutoreplySettings();
      return reply(`✅ Autoreply sticker updated:\n${url}`);
    }

    if (sub === 'info') {
      const s = global.autoreplySettings || {};
      return reply(`🔧 Autoreply settings\n• enabled: ${!!s.enabled}\n• sticker: ${s.sticker || '(none)'}\n• owners: ${getOwnerJids().map(j => j.split('@')[0]).join(', ') || '(none)'}`);
    }

    return reply('Unknown subcommand. Usage:\n.autoreply on|off\n.autoreply set <sticker_url_or_local_path>\n.autoreply info');

  } catch (err) {
    console.error('[autoreply case] error', err);
    try { reply('❌ Autoreply command error.'); } catch (e) {}
  }
}
break;

// ========== AUTOBIO COMMAND ==========
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

// ========== GENIMG COMMAND ==========
case 'genimg':
  try {
    const axios = require('axios');

    const prompt = (q || text || '').trim();
    if (!prompt) return reply('❌ Usage: .text2img <prompt>\nExample: .text2img cute girl with blue hair');

    const quotedForSend = (typeof loli !== 'undefined' && loli) ? loli : m;

    await reply('CYBERPUNK-BULLY is ready. Generating image... this can take a few seconds.');

    const apiUrl = `https://text-to-img.apis-bj-devs.workers.dev/?prompt=${encodeURIComponent(prompt)}`;

    let resp;
    try {
      resp = await axios.get(apiUrl, { responseType: 'arraybuffer', timeout: 120000 });
    } catch (err) {
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

    const contentType = (resp.headers && (resp.headers['content-type'] || resp.headers['Content-Type'])) || '';
    const buffer = Buffer.from(resp.data || resp);

    if (/^image\/.*/i.test(contentType) && buffer.length > 0) {
      const MAX_IMG_SEND = 10 * 1024 * 1024;
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

    const respText = buffer.toString('utf8');
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

// ========== QUOTEIMG COMMAND ==========
case 'quoteimg':
case 'inspiro': {
  try {
    const axios = require('axios');
    const quotedForSend = (typeof loli !== 'undefined' && loli) ? loli : m;
    const api = 'https://apiskeith.vercel.app/random/inspirobot';

    const res = await axios.get(api, { timeout: 20000 });
    const data = res.data;

    let imageUrl = null;
    if (!data) imageUrl = null;
    else if (typeof data === 'string' && /^https?:\/\//.test(data)) imageUrl = data;
    else if (typeof data.url === 'string') imageUrl = data.url;
    else if (typeof data.image === 'string') imageUrl = data.image;
    else if (data.result && typeof data.result === 'string') imageUrl = data.result;
    else {
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

// ========== AUTOREAD COMMAND ==========
case 'autoread': {
  try {
    if (!isOwner) return reply('❌ Owner only.');

    const what = (args[0] || '').toLowerCase();
    const mode = (args[1] || '').toLowerCase();

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

// ========== GETFILE COMMAND ==========
case 'getfile': {
  try {
    if (!isOwner) return reply('Owner only.');
    if (!args.length) return reply(`Usage: ${prefix + command} <relative/path/to/file>`);

    const fs = require('fs');
    const path = require('path');

    const root = path.resolve(__dirname);
    const rel = args.join(' ').trim();
    if (!rel) return reply('Specify a file path relative to bot root.');

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

// ========== SCRIPT/REPO COMMAND ==========
case "sc":
case "repo": {
  try {
    await james.sendMessage(m.chat, {
      productMessage: {
        title: "CYBERPUNK-BULLY",
        description: "ᴏᴘᴇɴ sᴏᴜʀᴄᴇ.",
        thumbnail: { url: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg" },
        productId: "PROD001",
        retailerId: "RETAIL001",
        url: "https://t.me/redshiftxbot",
        body: "CYBERPUNK-BULLY ɪs ᴀɴ ᴏᴘᴇɴ-sᴏᴜʀᴄᴇ ᴍᴜʟᴛɪ-ᴘᴜʀᴘᴏsᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ᴡɪᴛʜ ᴀᴜᴛᴏᴍᴀᴛɪᴏɴ ᴛᴏᴏʟs.",
        footer: "©CYBERPUNK-BULLY",
        priceAmount1000: 77777997900,
        currencyCode: "$",
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "PAIR NOW",
              url: "https://t.me/redshiftxbot"
            })
          }
        ]
      }
    }, { quoted: m });
  } catch (err) {
    console.error('productMessage failed:', err?.message || err);

    try {
      await james.sendMessage(m.chat, {
        text: "CYBERPUNK-BULLY:",
        footer: "Andromeda",
        templateButtons: [
          { index: 1, urlButton: { displayText: "Get Bot", url: "https://whatsapp.com/channel/0029VbBhdUj7dmegniqCar37" } }
        ]
      }, { quoted: m });
    } catch (secondErr) {
      console.error('fallback also failed:', secondErr);
      await james.sendMessage(m.chat, { text: "script : https://whatsapp.com/channel/0029VbBhdUj7dmegniqCar37" }, { quoted: m });
    }
  }
}
break;

// ========== AUTOREACT COMMAND ==========
case 'autoreact': {
  try {
    if (!isOwner) return reply('Owner only.');
    if (!args.length) return reply(`Usage: ${prefix + command} dm on|off  OR  ${prefix + command} group on|off`);

    const mode = args[0].toLowerCase();
    const action = (args[1] || '').toLowerCase();
    if (!['dm','group'].includes(mode)) return reply(`Invalid usage 
    Example: autoreact group on/off 
    autoreact dm on/off`);
    if (!['on','off'].includes(action)) return reply(`Invalid usage. Use: on or off`);

    if (typeof global.autoReact_dm === 'undefined') global.autoReact_dm = false;
    if (typeof global.autoReact_group === 'undefined') global.autoReact_group = false;

    if (mode === 'dm') {
      global.autoReact_dm = (action === 'on');
      return reply(`✅ AutoReact (DM) is now ${global.autoReact_dm ? 'ON' : 'OFF'}`);
    } else {
      global.autoReact_group = (action === 'on');
      return reply(`✅ AutoReact (GROUP) is now ${global.autoReact_group ? 'ON' : 'OFF'}`);
    }
  } catch (e) {
    console.error('autoreact case error', e);
    reply('Error toggling autoreact.');
  }
}
break;

// ========== AUTO RECORDING COMMAND ==========
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

// ========== AUTO TYPING COMMAND ==========
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

// ========== AUTO RECORD TYPE COMMAND ==========
case 'autorecordtype': {
if (!isOwner) return m.reply("you must be the owner first")
  if (!args.length) return reply(`Example: ${prefix + command} on/off`);
  const arg = args[0].toLowerCase();
  if (arg === 'on') {
    global.autorecordtype = true;
    global.autoRecording = false;
    global.autoTyping = false;
    reply(`✅ autorecordtype set to ON`);
  } else if (arg === 'off') {
    global.autorecordtype = false;
    reply(`✅ autorecordtype set to OFF`);
  } else reply(`Usage: ${prefix + command} on|off`);
}
break;

// ========== AUTO STATUS VIEW COMMAND ==========
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

// ========== REMOVEBG COMMAND ==========
case 'removebg': {
  try {
    const axios = require('axios');
    const FormData = require('form-data');
    const fs = require('fs');
    const path = require('path');
    const { tmpdir } = require('os');

    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage || m.message;
    const media = quoted.imageMessage || quoted.documentMessage || null;
    if (!media) return reply('⚠️ Reply to a photo (or send a photo with the command) to remove the background.');

    const mediaType = 'image';
    const stream = await downloadContentFromMessage(media, mediaType).catch(e => null);
    if (!stream) return reply('❌ Failed to download the image.');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    if (!buffer || buffer.length === 0) return reply('❌ Downloaded image is empty.');

    await reply('🧹 Uploading image to remove background service...');

    const form = new FormData();
    form.append('image', buffer, { filename: `removebg_${Date.now()}.jpg`, contentType: media.mimetype || 'image/jpeg' });

    const apiUrl = 'https://aliceeapis.my.id/tools/removebg';
    const apiRes = await axios.post(apiUrl, form, {
      headers: { ...form.getHeaders() },
      responseType: 'arraybuffer',
      timeout: 120000
    }).catch(err => {
      if (err && err.response && err.response.data) return err.response;
      throw err;
    });

    let resultBuffer = null;
    let resultUrl = null;
    let parsedJson = null;

    const contentType = (apiRes.headers && apiRes.headers['content-type']) ? apiRes.headers['content-type'] : '';

    if (/image\/(png|jpeg|webp)/i.test(contentType)) {
      resultBuffer = Buffer.from(apiRes.data);
    } else {
      try {
        const txt = Buffer.from(apiRes.data).toString('utf8');
        parsedJson = JSON.parse(txt);
      } catch (e) {
        resultBuffer = Buffer.from(apiRes.data);
      }

      if (parsedJson) {
        resultUrl = parsedJson?.result?.url || parsedJson?.url || parsedJson?.data?.url || parsedJson?.image || parsedJson?.result || null;

        const base64Field = parsedJson?.base64 || parsedJson?.image_base64 || parsedJson?.b64;
        if (base64Field && typeof base64Field === 'string') {
          const b = base64Field.replace(/^data:\w+\/\w+;base64,/, '');
          resultBuffer = Buffer.from(b, 'base64');
        }
      }
    }

    if (!resultBuffer && resultUrl && /^https?:\/\//i.test(resultUrl)) {
      try {
        const dl = await axios.get(resultUrl, { responseType: 'arraybuffer', timeout: 120000 });
        resultBuffer = Buffer.from(dl.data);
      } catch (e) {
        console.error('Failed to download result URL:', e?.message || e);
      }
    }

    if (!resultBuffer) {
      console.error('removebg: no result buffer, parsedJson:', parsedJson);
      return reply('❌ Failed to get processed image from API. Check logs.');
    }

    const tmpPath = path.join(tmpdir(), `removebg_${Date.now()}.png`);
    fs.writeFileSync(tmpPath, resultBuffer);

    await james.sendMessage(m.chat, { image: fs.readFileSync(tmpPath), caption: '🧿 Background removed' }, { quoted: m }).catch(()=>{});
    try { fs.unlinkSync(tmpPath); } catch (e){}

    const channelLink = 'https://whatsapp.com/channel/0029VaXaqHII1Bsd3g';
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
      await james.sendMessage(m.chat, { text: `Channel: ${channelLink}` }, { quoted: m });
    }

  } catch (err) {
    console.error('removebg error:', err);
    try { reply('❌ removebg failed: ' + (err.message || err)); } catch(e){}
  }
}
break;

// ========== SCRIPT COMMAND ==========
case "script":
case "sc2": {
  try {
    await james.sendMessage(m.chat, {
      productMessage: {
        title: "CYBERPUNK-BULLY SCRIPT",
        description: "This is the official script release.",
        thumbnail: { url: "https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg" },
        productId: "PROD001",
        retailerId: "RETAIL001",
        url: "https://github.com/james",
        body: "the script of CYBERPUNK-BULLY is only available at above price/n to buy tap button below",
        footer: "CYBERPUNK-BULLY modz",
        priceAmount1000: 77777,
        currencyCode: "KSH",
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "Buy script",
              url: "https://wa.me/message/NNEIFUPODJTKN1"
            })
          }
        ]
      }
    }, { quoted: m });
  } catch (err) {
    console.error('productMessage failed:', err?.message || err);

    try {
      await james.sendMessage(m.chat, {
        text: "CYBERPUNK-BULLY script is here:",
        footer: "Powered by CYBERPUNK-BULLY",
        templateButtons: [
          { index: 1, urlButton: { displayText: "Get Bot", url: "https://whatsapp.com/channel/0029VbBhdUj7dmegniqCar37" } }
        ]
      }, { quoted: m });
    } catch (secondErr) {
      console.error('fallback also failed:', secondErr);
      await james.sendMessage(m.chat, { text: "script : https://whatsapp.com/channel/0029VbBhdUj7dmegniqCar37" }, { quoted: m });
    }
  }
}
break;

// ========== AI COMMAND ==========
case 'ai': {
  const prompt = (q || text || '').trim()
  if (!prompt) return reply(`❌ Usage: ${prefix}ai <question>\nExample: ${prefix}ai What is anime?`)

  try {
    james.sendMessage(m.chat, { react: { text: '🤖', key: m.key } })

    let answer = null

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

    if (!answer) {
      try {
        const encodedPushname = encodeURIComponent(pushname)
        const encodedText = encodeURIComponent(prompt)
        const r2 = await axios.get(
          `https://api.elxyzgpt.xyz/ai/character-ai?apikey=KC-d25a3f0c02be4021&character=You+are+CYBERPUNK-BULLY,+a+helpful+WhatsApp+bot+assistant.+Answer+clearly.&text=${encodedText}`,
          { timeout: 20000 }
        )
        const d2 = r2.data
        answer = d2?.result || d2?.response || d2?.answer || d2?.message || (typeof d2 === 'string' ? d2 : null)
        if (answer) answer = String(answer).trim()
      } catch (e) {}
    }

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

// ========== PLAY2/SPOTIFY COMMAND ==========
case 'play2':
case 'spotify': {
  try {
    if (!text) {
      return m.reply('Usage: .spotify <song/artist/keywords or Spotify URL>\nExample: .spotify Faded\nExample: .spotify https://open.spotify.com/track/...');
    }

    const isSpotifyUrl = text.includes('open.spotify.com/track/');
    
    let audioUrl, trackInfo;

    if (isSpotifyUrl) {
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
      const apiUrl = `https://casper-tech-apis.vercel.app/api/play/sportify?q=${encodeURIComponent(text)}`;
      const { data } = await axios.get(apiUrl, { 
        timeout: 20000, 
        headers: { 'user-agent': 'Mozilla/5.0' } 
      });

      if (!data?.success || !data?.results || data.results.length === 0) {
        throw new Error('No results found for this query');
      }

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

    let caption = `🎵 *${trackInfo.title}*\n👤 ${trackInfo.artist}`;
    if (trackInfo.album) caption += `\n💿 ${trackInfo.album}`;
    if (trackInfo.duration) caption += `\n⏱ ${trackInfo.duration}`;
    if (trackInfo.popularity) caption += `\n📊 Popularity: ${trackInfo.popularity}%`;
    caption += `\n🔗 ${trackInfo.spotifyUrl}`;

    if (trackInfo.thumbnail) {
      await james.sendMessage(m.chat, { 
        image: { url: trackInfo.thumbnail }, 
        caption 
      }, { quoted: loli });
    } else {
      await m.reply(caption);
    }

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

// ========== TOURL COMMAND ==========
case 'tourl': {
  try {
    const axios = require('axios');
    const FormData = require('form-data');

    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage || m.message;
    const mediaMsg = quoted.imageMessage || quoted.videoMessage || quoted.audioMessage || quoted.documentMessage || quoted.stickerMessage || null;
    if (!mediaMsg) return reply('⚠️ Reply to an image/video/audio/document/sticker to upload and get a Catbox URL.');

    await reply('📤 Downloading media...');

    const mediaType = (mediaMsg.mimetype || '').split('/')[0] || 'file';
    const stream = await downloadContentFromMessage(mediaMsg, mediaType).catch(e => { throw new Error('Failed to download media.'); });
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    if (!buffer || buffer.length === 0) throw new Error('Downloaded media is empty.');

    const origName = (mediaMsg.fileName || mediaMsg.caption || '').toString().replace(/\r?\n/g,' ').trim();
    const extGuess = (() => {
      if (mediaMsg.mimetype) return '.' + mediaMsg.mimetype.split('/').pop().split(';')[0];
      if (mediaMsg.fileName && mediaMsg.fileName.includes('.')) return '.' + mediaMsg.fileName.split('.').pop();
      return '.bin';
    })();
    const filename = (origName ? origName.split(' ').slice(0,6).join('_') : `upload_${Date.now()}`) + extGuess;

    await reply('📤 Uploading to Catbox...');

    const form = new FormData();
    form.append('reqtype', 'fileupload');
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

    try {
      const content = {
        viewOnceMessage: {
          message: {
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage: {
              body: { text: caption },
              footer: { text: "Uploaded by CYBERPUNK-BULLY" },
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
      await james.sendMessage(from, { text: caption }, { quoted: m });
    }

  } catch (err) {
    console.error('tourl (catbox) error:', err);
    reply('❌ tourl failed: ' + (err.message || err));
  }
}
break;

// ========== SHORTURL COMMAND ==========
case 'shorturl':
case 'tiny': {
  try {
    const input = (q || args[0] || '').trim();
    if (!input) return reply('Usage: shorturl <long-url>');
    if (!/^https?:\/\//i.test(input)) return reply('Please provide a valid URL starting with http:// or https://');

    await reply('🔗 Shortening URL...');

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
              footer: { text: "Shortened by CYBERPUNK-BULLY" },
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
      await james.sendMessage(from, { text: caption }, { quoted: m });
    }
  } catch (err) {
    console.error('shorturl error', err);
    reply('❌ shorturl failed: ' + (err.message || err));
  }
}
break;

// ========== IDCH COMMAND ==========
case 'idch':
case 'cekidch': {
  try {
    const link = (q || '').trim();
    if (!link) return reply("⚠️ Provide a channel link. Example: cekidch https://whatsapp.com/channel/XXXXXXXX");
    if (!link.includes("https://whatsapp.com/channel/")) return reply("⚠️ Link must be a valid WhatsApp channel link (https://whatsapp.com/channel/...)");

    const parts = link.split("https://whatsapp.com/channel/");
    const channelId = (parts[1] || "").split(/[/?\s]/)[0];
    if (!channelId) return reply("⚠️ Couldn't extract channel id from link.");

    let res;
    try {
      res = await james.newsletterMetadata("invite", channelId);
    } catch (e) {
      console.error('newsletterMetadata error', e);
      return reply("❌ Failed to fetch channel metadata. The channel id might be invalid or your Baileys version doesn't support newsletterMetadata.");
    }

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

    const msgContent = {
      viewOnceMessage: {
        message: {
          messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
          interactiveMessage: {
            body: { text: teks },
            footer: { text: "by CYBERPUNK-BULLY" },
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

// ========== TOIMAGE COMMAND ==========
case 'toimage':
case 'toimg': {
  try {
    const sharp = require('sharp');
    const { tmpdir } = require('os');

    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const stickerMsg = (quoted && quoted.stickerMessage) || m.message?.stickerMessage;

    if (!stickerMsg) return reply("⚠️ Reply to a sticker or send a sticker with the command to convert it to an image.");

    const mt = stickerMsg.mimetype || stickerMsg.mediaType || '';
    if (!/webp/i.test(mt)) {
      return reply("⚠️ That doesn't look like a WebP sticker. Reply to a sticker to convert it.");
    }

    await reply("🖼️ Converting sticker to image...");

    const stream = await downloadContentFromMessage(stickerMsg, 'sticker');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

    if (!buffer || buffer.length === 0) return reply("❌ Failed to download sticker data.");

    const inputPath = path.join(tmpdir(), `sticker_${Date.now()}.webp`);
    const outputPath = path.join(tmpdir(), `sticker_${Date.now()}.png`);
    fs.writeFileSync(inputPath, buffer);

    await sharp(inputPath).png().toFile(outputPath);

    const imageBuffer = fs.readFileSync(outputPath);
    await james.sendMessage(from, { image: imageBuffer }, { quoted: m });

    try { fs.unlinkSync(inputPath); } catch (e) {}
    try { fs.unlinkSync(outputPath); } catch (e) {}

  } catch (err) {
    console.error('toimage error:', err);
    reply("💥 Failed to convert sticker to image. Make sure sharp is installed (`npm i sharp`) and try again.");
  }
}
break;

// ========== PLAY COMMAND ==========
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

    if (!downloadUrl) {
      try {
        const r2 = await axios.get(`https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(url)}`, { timeout: 25000 })
        if (r2.data && r2.data.success && r2.data.data && r2.data.data.downloadUrl) {
          downloadUrl = r2.data.data.downloadUrl
        }
      } catch (e) {}
    }

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

// ========== BLOCK COMMAND ==========
case 'block': {
  if (!isOwner) return reply('Owner only.');
  let target = (m.mentionedJid && m.mentionedJid[0]) || (m.quoted && m.quoted.sender) || args[0];
  if (!target) return reply('Usage: block @user or block <number>');
  if (typeof target === 'string' && !target.includes('@')) target = target.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

  try {
    if (typeof james.updateBlockStatus === 'function') {
      try { await james.updateBlockStatus([target], 'block'); }
      catch { await james.updateBlockStatus(target, 'block'); }
    } else if (typeof james.updateBlockStatus === 'undefined' && typeof james.updateBlock === 'function') {
      await james.updateBlock(target, 'block');
    } else if (typeof james.block === 'function') {
      await james.block(target);
    } else {
      return reply('Block API not available on this Baileys version.');
    }
    reply(`✅ Blocked ${target.replace('@s.whatsapp.net','')}`);
  } catch (e) {
    console.error(e);
    reply('Failed to block: ' + (e.message || e));
  }
}
break;

// ========== UNBLOCK COMMAND ==========
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
break;

// ========== HIDETAG COMMAND ==========
case 'hidetag': {
  if (!isGroup) return reply('This command is for groups only.');
  if (!isAdmins && !isOwner) return reply('You must be a group admin to use hidetag.');
  const text = q || ' ';
  const members = participants.map(p => p.jid).filter(j => j && j !== botNumber);
  if (!members.length) return reply('No members found to mention.');

  try {
    if (members.length > 256) return reply(`Too many members (${members.length}). Hidetag aborted.`);

    await james.sendMessage(from, {
      text: text,
      mentions: members
    }, { quoted: m });

    await james.sendMessage(from, { text: `✅ Hidetag sent to ${members.length} members.` }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply('Failed to hidetag: ' + (e.message || e));
  }
}
break;

// ========== TAGALL COMMAND ==========
case 'tagall': {
  if (!isGroup) return reply('This command is for groups only.');
  if (!isAdmins && !isOwner) return reply('Only group admins can use tagall.');

  let text = q ? q : `Attention everyone —`;
  const members = participants.map(p => p.jid).filter(j => j && j !== botNumber);
  if (!members.length) return reply('No members to tag.');

  if (members.length > 256) return reply(`Too many members (${members.length}). Aborting tagall.`);

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
break;

// ========== ENCRYPT COMMAND ==========
case 'enc':
case 'encrypt': {
  const JsConfuser = require('js-confuser');

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

    const stream = await downloadContentFromMessage(quotedMessage, 'document');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    if (!buffer || buffer.length === 0) return reply('❌ Failed to download the file.');

    await james.sendMessage(m.chat, { react: { text: '🕛', key: m.key } });

    const obfuscatedCode = await JsConfuser.obfuscate(buffer.toString('utf8'), {
      target: "node",
      preset: "high",
      compact: true,
      minify: true,
      flatten: true,
      identifierGenerator: function () {
        const originalString = "CYBERPUNK-BULLY" + "CYBERPUNK-BULLY";
        const removeUnwantedChars = (input) => input.replace(/[^a-zA-ZCYBERPUNK-BULLY]/g, "");
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

    await james.sendMessage(m.chat, {
      document: Buffer.from(obfuscatedCode, 'utf8'),
      mimetype: 'application/javascript',
      fileName: fileName,
      caption: `• Successful Encrypt\n• Type: Hard Code\n• CYBERPUNK-BULLY`
    }, { quoted: m });

  } catch (err) {
    console.error('Error during encryption:', err);
    return reply(`❌ An error occurred: ${err.message || err}`);
  }
}
break;

// ========== INSPECT COMMAND ==========
case 'inspect': {
  const url = args[0];
  if (!url) return reply('Usage: inspect <url>');
  try {
    const res = await fetch(url, { redirect: 'follow', timeout: 15000 });
    const headers = {};
    res.headers.forEach((v, k) => headers[k] = v);
    const ctype = headers['content-type'] || '';
    if (!/text\/html/.test(ctype)) {
      return reply(`Content-Type: ${ctype}\nHeaders:\n${Object.entries(headers).map(([k,v])=>`${k}: ${v}`).join('\n')}`);
    }
    const text = await res.text();
    const get = (re, fallback='') => (text.match(re) || [fallback])[1] || fallback;
    const title = get(/<title[^>]*>([^<]*)<\/title>/i, '').trim();
    const metas = Array.from(text.matchAll(/<meta\s+([^>]+)>/gi)).map(m => m[1]);
    const metaGenerator = (text.match(/<meta\s+name=["']?generator["']?\s+content=["']?([^"'>]+)["']?/i) || [])[1] || '';
    const links = Array.from(text.matchAll(/<link[^>]+rel=["']?stylesheet["']?[^>]*href=["']([^"']+)["']/gi)).map(m=>m[1]);
    const scripts = Array.from(text.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)).map(m=>m[1]);
    const inlineScriptsCount = (text.match(/<script(?![^>]*src)/gi) || []).length;
    const images = Array.from(text.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)).map(m=>m[1]);

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

    let out = `🔎 Inspect result for: ${url}\n\n`;
    if (title) out += `📌 Title: ${title}\n`;
    out += `📄 Content-Type: ${ctype}\n`;
    out += `🔗 Links (stylesheets): ${links.length}\n`;
    if (links.length) out += `  • ${links.slice(0,6).join('\n  • ')}${links.length>6?`\n  • ...(+${links.length-6})`:''}\n`;
    out += `\n🧩 Scripts: ${scripts.length} (external) • Inline scripts: ${inlineScriptsCount}\n`;
    if (scripts.length) out += `  • ${scripts.slice(0,8).join('\n  • ')}${scripts.length>8?`\n  • ...(+${scripts.length-8})`:''}\n`;
    out += `\n🖼 Images: ${images.length}${images.length?`\n  • ${images.slice(0,6).join('\n  • ')}${images.length>6?`\n  • ...(+${images.length-6})`:''}` : ''}\n`;
    out += `\n💡 Detections: ${hints.length ? hints.join(', ') : 'None detected'}\n`;

    const snippet = text.replace(/\s+/g,' ').slice(0,1000);
    out += `\n⎯⎯ HTML preview (first 1000 chars) ⎯⎯\n${snippet}${text.length > 1000 ? '\n... (truncated)' : ''}`;

    if (out.length > 1500) {
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
break;

// ========== EVAL COMMAND ==========
case 'eval': {
  if (!isOwner) return reply('Owner only.');
  const code = body.replace(/^eval\s*/i, '').trim() || q;
  if (!code) return reply('Usage: eval <js code>');
  try {
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
break;

// ========== FETCH COMMAND ==========
case 'fetch': {
  const url = args[0];
  if (!url) return reply('Usage: fetch <url>');
  try {
    const res = await fetch(url, { redirect: 'follow', timeout: 15000 });
    const headers = {};
    res.headers.forEach((v, k) => headers[k] = v);
    const ctype = headers['content-type'] || '';
    let out = `🔗 Fetched: ${url}\nStatus: ${res.status} ${res.statusText}\nContent-Type: ${ctype}\n\nHeaders:\n`;
    out += Object.entries(headers).map(([k,v])=>`${k}: ${v}`).join('\n');

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
      out += `\n\nBody: not displayed (binary or unsupported). Use the URL in a browser or provide a file extension to request typed handling.`;
      return reply(out);
    }
  } catch (err) {
    reply('Fetch failed: ' + (err.message || err));
  }
}
break;

// ========== PING COMMAND ==========
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
╭──────────────────╮
│  CYBERPUNK-BULLY : ONLINE
╰──────────────────╯
│  ⚡ PING  : ${latency}ms
│  🕒 UPTIME : ${upH}h ${upM}m ${upS}s
│  🧠 RAM   : ${ram} MB
╰──────────────────
_lurking from the shadows..._`;
  await james.sendMessage(m.chat, { text }, { quoted: m });
}
break;

// ========== OWNER COMMAND ==========
case 'owner': {
  const owners = (global.owner || []).map(o => o.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
  await james.sendMessage(m.chat, {
    contacts: owners.map(v => ({ displayName: "Bot Owner", vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Owner\nTEL;waid:${v.split('@')[0]}:${v.split('@')[0]}\nEND:VCARD` }))
  }, { quoted: m });
}
break;

// ========== TOIMG (ALT) COMMAND ==========
case 'toimg2': {
  if (!m.quoted) return reply('Reply to a sticker.');
  if (!/webp/.test(mime || '')) return reply('That is not a sticker.');
  try {
    const media = m.quoted;
    const input = await downloadAndSaveMediaMessage(media, `./tmp/stk_${Date.now()}.webp`);
    const output = `./tmp/stk_${Date.now()}.png`;
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
break;

// ========== KICK COMMAND ==========
case 'kick': {
  if (!isGroup) return reply('This command is for groups only.');
  if (!isAdmins) return reply('You must be admin to use this.');
  if (!isBotAdmins) return reply('I must be admin to perform this.');
  const target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
  if (!target) return reply('Mention or reply to the user to kick.');
  try {
    await james.groupParticipantsUpdate(from, [target], 'remove');
    reply('User removed.');
  } catch (e) {
    reply('Failed to remove: ' + e.message);
  }
}
break;

// ========== PROMOTE COMMAND ==========
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
break;

// ========== DEMOTE COMMAND ==========
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
break;

// ========== MUTE / UNMUTE / MUTELIST COMMANDS ==========
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

// ========== CREDITS COMMAND ==========
case 'credits': {
  const owners = (global.owner || []).map(o => o.replace(/[^0-9]/g, ""));
  const ownerList = owners.length ? owners.map(o => `@${o}`).join(', ') : 'Unknown';
  const pkg = (() => {
    try { return require(path.join(__dirname, '..', 'package.json')); } catch (e) { return {}; }
  })();

  const creditsText = `
CYBERPUNK-BULLY 𝐕𝐢𝐩
• ᴄʀᴇᴀᴛᴇᴅ ʙʏ: sᴜᴅᴏ
• ʙᴏᴛ ɴᴀᴍᴇ: CYBERPUNK-BULLY
• Version: ${pkg.version || 'I'}
─────────────────
 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬
𝐂𝐘𝐁𝐄𝐑𝐏𝐔𝐍𝐊 𝐌𝐨𝐝𝐳
𝐒𝐢𝐦𝐩𝐥𝐞
𝐂𝐨𝐨𝐥
𝐅𝐚𝐬𝐭
𝐒𝐭𝐚𝐛𝐥𝐞
  `.trim();
  let credit = 'https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg'
  await james.sendMessage(m.chat, {
    image: { url: credit },
    caption: creditsText,
    contextInfo: { mentionedJid: owners.map(o => o + '@s.whatsapp.net') }
  }, { quoted: loli });
}
break;

// ========== SELF COMMAND ==========
case "self": {
  if (!isOwner) return m.reply("you must be the owner first")
  reply("succes change status to self")
  james.public = false
  await james.sendMessage(m.chat, { 
    audio: { url: 'https://files.catbox.moe/kyp1ze.mp3' },
    mimetype: 'audio/mp4', 
    ptt: true 
  },{ quoted: m });
}
break;

// ========== PUBLIC COMMAND ==========
case "public": {
  if (!isOwner) return m.reply ("you must be the owner first")
  reply("succes change status to public")
  james.public = true
  await james.sendMessage(m.chat, { 
    audio: { url: 'https://files.catbox.moe/kyp1ze.mp3' },
    mimetype: 'audio/mp4', 
    ptt: true 
  },{ quoted: m });        
}
break;

// ========== TIKTOK DOWNLOAD COMMAND ==========
case 'tiktok':
case 'tt': {
  if (!isCmd) break;
  const ttUrl = args[0] || (m.quoted?.text || '').match(/https?:\/\/(vm\.|vt\.|www\.)?tiktok\.com\/\S+/)?.[0];
  if (!ttUrl) return reply('📺 Kirim link TikTok.\n\nContoh: .tiktok https://vm.tiktok.com/xxx');
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
break;

// ========== INSTAGRAM DOWNLOAD COMMAND ==========
case 'ig':
case 'instagram': {
  if (!isCmd) break;
  const igUrl = args[0] || '';
  if (!igUrl || !igUrl.includes('instagram.com')) return reply('📺 Kirim link Instagram.\n\nContoh: .ig https://www.instagram.com/p/xxx');
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
          thumbnailUrl: 'https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg',
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
break;

// ========== WARN SYSTEM COMMANDS ==========
case 'warn': {
  if (!isGroup) return reply('🚫 Grup only.');
  if (!isAdmins && !isOwner) return reply('🔒 Harus admin untuk warn member.');
  const warnTarget = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!warnTarget) return reply('⚠️ Mention atau reply pesan member yang ingin di-warn.');
  if (warnTarget === sender) return reply('❌ Tidak bisa warn diri sendiri.');
  if (warnTarget === botNumber) return reply('❌ Tidak bisa warn bot.');

  if (!global.jamesWarnData) global.jamesWarnData = {};
  const wReason = args.join(' ').replace(/@\d+/g, '').trim() || 'Tidak ada alasan';
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
          thumbnailUrl: 'https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg',
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
          thumbnailUrl: 'https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg',
          mediaType: 1, renderLargerThumbnail: false
        }
      }
    }, { quoted: m });
  }
}
break;

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
break;

case 'resetwarn':
case 'warnreset': {
  if (!isGroup) return reply('🚫 Grup only.');
  if (!isAdmins && !isOwner) return reply('🔒 Harus admin.');
  if (!global.jamesWarnData) global.jamesWarnData = {};
  const rwTarget = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!rwTarget) return reply('⚠️ Mention atau reply member yang warnnya ingin direset.');
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
break;

// ========== POLL COMMAND ==========
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
break;

// ========== AURA SYSTEM COMMANDS ==========
case 'aura': {
  if (!isGroup) return reply('🚫 Perintah ini hanya untuk grup.');

  const subAura = (args[0] || '').toLowerCase();
  const groupAura = global.jamesAuraData[from] || {};

  if (!subAura || subAura === 'help') {
    return await james.sendMessage(from, {
      text:
        `╭──────────────────╮\n` +
        `┃ 🌟 *AURA SYSTEM*\n` +
        `╰──────────────────╯\n\n` +
        `Ranking & level system based on group chat activity.\n\n` +
        `*Commands:*\n` +
        `► *.aura on* — Enable for this group\n` +
        `► *.aura off* — Disable for this group\n` +
        `► *.aura status* — Show Stats\n` +
        `► *.auraboard* — Show leaderboard\n` +
        `► *.aurastat* — Check out your aura\n\n` +
        `*Aura Levels:*\n` +
        `🌱 Newbie (0–99) → 💫 Rising (100) → ⚡ Active (500)\n` +
        `🔥 Hot (1k) → 💎 Elite (2.5k) → 👑 Legend (5k) → 🌟 Mythic (10k)\n\n` +
        `> _Current status: ${groupAura.enabled ? '✅ ON' : '❌ OFF'}_`,
      contextInfo: {
        externalAdReply: {
          title: '🌟 Aura System',
          body: `Status: ${groupAura.enabled ? 'Active ' : 'Inactive'}`,
          thumbnailUrl: 'https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg',
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
        `╭──────────────────╮\n` +
        `┃ 🌟 *AURA ACTIVE!*\n` +
        `╰──────────────────╯\n\n` +
        `✅ Aura System has been *activated* in this group.\n\n` +
        `Every message sent will be counted.\n` +
        `Use *.auraboard* to see the rankings!\n\n` +
        `> _Good luck farming aura! 🌟_`,
      contextInfo: {
        externalAdReply: {
          title: '🌟 Aura System Active!',
          body: 'Start sending messages & climb the ranks!',
          thumbnailUrl: 'https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg',
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
        `╭──────────────────╮\n` +
        `┃ 🔕 *AURA MATI*\n` +
        `╰──────────────────╯\n\n` +
        `❌ Aura System has been *deactivated*.\n` +
        `Data is not deleted, can be reactivated anytime.`,
      contextInfo: {
        externalAdReply: {
          title: '🔕 Aura System Inactive',
          body: 'Message tracking stopped',
          thumbnailUrl: 'https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg',
          mediaType: 1, renderLargerThumbnail: false
        }
      }
    }, { quoted: m });

  } else if (subAura === 'status') {
    const totalMembers = Object.keys(groupAura.members || {}).length;
    const totalMsgs = Object.values(groupAura.members || {}).reduce((a, v) => a + (v.messages || 0), 0);
    await james.sendMessage(from, {
      text:
        `╭──────────────────╮\n` +
        `┃ 📊 *AURA STATUS*\n` +
        `╰──────────────────╯\n\n` +
        `► Status: ${groupAura.enabled ? '✅ Active' : '❌ Inactive'}\n` +
        `► Total Members Tracked: *${totalMembers}*\n` +
        `► Total Messages Recorded: *${totalMsgs.toLocaleString()}*\n\n` +
        `> Use *.auraboard* to see rankings.`,
      contextInfo: {
        externalAdReply: {
          title: '📊 Aura Status',
          body: `${totalMembers} members, ${totalMsgs} messages`,
          thumbnailUrl: 'https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg',
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
    reply('⚠️ Unknown sub-command. Type *.aura* for help.');
  }
}
break;

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

  let lb = `╭──────────────────╮\n`;
  lb    += `┃ 🌟 *AURA LEADERBOARD*\n`;
  lb    += `╰──────────────────╯\n\n`;

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
        newsletterJid: '120363421884253535@newsletter',
        newsletterName: 'CYBERPUNK-BULLY',
        serverMessageId: 127
      },
      externalAdReply: {
        title: '🌟 Aura Leaderboard',
        body: `Top ${entries.length} paling aktif di grup ini`,
        thumbnailUrl: 'https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
}
break;

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

  const sorted = Object.entries(members)
    .filter(([, v]) => v.messages > 0)
    .sort(([, a], [, b]) => b.messages - a.messages);
  const myRank = sorted.findIndex(([jid]) => jid === targetJid) + 1;
  const totalTracked = sorted.length;

  const thresholds = [100, 500, 1000, 2500, 5000, 10000];
  const nextThresh  = thresholds[lvl.level - 1];
  const toNext = nextThresh ? nextThresh - msgs : 0;

  let stTxt = `╭──────────────────╮\n`;
  stTxt    += `┃ ✨ *AURA STATS*\n`;
  stTxt    += `╰──────────────────╯\n\n`;
  stTxt    += `👤 *${tName}*\n`;
  stTxt    += `\n`;
  stTxt    += `${lvl.emoji} *${lvl.title}* (Level ${lvl.level})\n`;
  stTxt    += `${bar}\n\n`;
  stTxt    += `╭── 📊 Stats ──╮\n`;
  stTxt    += `┃ 💬 Messages : *${msgs.toLocaleString()}*\n`;
  stTxt    += `┃ 🏆 Rank    : *#${myRank}* of ${totalTracked}\n`;
  if (toNext > 0) stTxt += `┃ 🎯 Next    : *${toNext.toLocaleString()}* more messages\n`;
  else stTxt += `┃ 🎯 Next  : *MAX LEVEL!* 🌟\n`;
  stTxt    += `╰──────────────╯\n\n`;
  stTxt    += `> _Keep going, stay active! 💪_`;

  await james.sendMessage(from, {
    text: stTxt,
    mentions: [targetJid],
    contextInfo: {
      externalAdReply: {
        title: `${lvl.emoji} ${tName} — ${lvl.title}`,
        body: `${msgs.toLocaleString()} messages · Rank #${myRank}`,
        thumbnailUrl: 'https://ik.imagekit.io/apexcloud/IMG_20260322_001154.jpg',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
}
break;

default:
            if (!isOwner) break;

                try {
                    const code = body.trim();

                    if (code.startsWith('<')) {
                        const js = code.slice(1);
                        const output = await eval(`(async () => { ${js} })()`);
                        await reply(typeof output === 'string' ? output : JSON.stringify(output, null, 4));
                    } 
                    else if (code.startsWith('>')) {
                        const js = code.slice(1);
                        let evaled = await eval(js);
                        if (typeof evaled !== 'string') evaled = util.inspect(evaled, { depth: 0 });
                        await reply(evaled);
                    } 
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
```
