const { Telegraf } = require("telegraf");
const TOKEN = "7058304058:AAEwOINk3OT8BV5FzqtFSjbIUc0hFggtg-A";
const bot = new Telegraf(TOKEN);

bot.start((ctx) => {
  const telegramHandle = ctx.from.username;
  const web_link = `https://leblebisepeti.vercel.app?user_id=${telegramHandle}`;
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Play Gurugotchi", web_app: { url: web_link } }]
      ]
    }
  });
});

bot.launch();

//curl -F "url=https://leblebiserver.vercel.app/api/webhook" -F "max_connections=40" https://api.telegram.org/bot7058304058:AAEwOINk3OT8BV5FzqtFSjbIUc0hFggtg-A/setWebhook
