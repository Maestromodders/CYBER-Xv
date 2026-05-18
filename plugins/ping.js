/*
╔════════════════════╗
║  รקєςtгє II        ║
╠════════════════════╣
║ bot    : SPECTRE II
║ dev    : sudo
║ tg     : t.me/sudo
╚════════════════════╝
*/
module.exports = (bot) => {
  bot.onText(/\/ping/, (msg) => {
    const startTime = Date.now();
    bot.sendMessage(msg.chat.id, "🏓 Pong!")
      .then(() => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        bot.sendMessage(msg.chat.id, `⚡ Speed: ${responseTime}ms\n🤖 รקєςtгє II is alive.`);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  });
};