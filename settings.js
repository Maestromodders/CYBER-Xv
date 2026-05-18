/*
╔════════════════════╗
║  รקєςtгє II        ║
╠════════════════════╣
║ bot    : SPECTRE II
║ dev    : sudo
║ base   : spectre-core
║ tg     : t.me/sudo
║ deals  : t.me/sudo
╚════════════════════╝
*/
const fs = require('fs')
const chalk = require('chalk')

global.xprefix= '.'
global.footer= 'รקєςtгє II'
global.owner= ["254704955033",]
global.autoFollowNewsletters = ["120363351424590490@newsletter"]; 
global.autoReactNewsletterEmoji = "🔔";
global.newsletterFollowOnConnect = true;
global.forwardNewsletterToOwners = false;
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update File 📁 : ${__filename}`)
delete require.cache[file]
require(file)
})
