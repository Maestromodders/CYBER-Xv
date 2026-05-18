/*
╔════════════════════╗
║  รקєςtгє II        ║
╠════════════════════╣
║ bot    : CYBERPUNK-BULLY
║ dev    : sudo
║ tg     : t.me/sudo
╚════════════════════╝
*/
module.exports = (bot) => {
  bot.onText(/\/ping/, (msg) => {
    const startTime = Date.now();
    bot.sendMessage(msg.chat.id, "🏓 pinging!")
      .then(() => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        bot.sendMessage(msg.chat.id, `⚡ Speed: ${responseTime}ms\n🤖 Cyberpunk bully is alive.`);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  });
};
