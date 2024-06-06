process.argv = [process.argv[0], ...process.argv.slice(3)];

		import __esrun_url from 'url';

		import { createRequire as __esrun_createRequire } from "module";

		const __esrun_fileUrl = __esrun_url.pathToFileURL("esrun-1717658123896.tmp.mjs");

		const require = __esrun_createRequire(__esrun_fileUrl);
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// bot.js
var { Telegraf } = __require("../node_modules/telegraf/lib/index.js");
var TOKEN = "7058304058:AAEwOINk3OT8BV5FzqtFSjbIUc0hFggtg-A";
var bot = new Telegraf(TOKEN);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYm90LmpzIl0sCiAgInNvdXJjZVJvb3QiOiAiQzpcXFVzZXJzXFxvemFuLnVndXJcXERlc2t0b3BcXGd1cnVnb3RjaGlcXGJvdCIsCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCB7IFRlbGVncmFmIH0gPSByZXF1aXJlKFwidGVsZWdyYWZcIik7XHJcbmNvbnN0IFRPS0VOID0gXCI3MDU4MzA0MDU4OkFBRXdPSU5rM09UOEJWNUZ6cXRGU2piSVVjMGhGZ2d0Zy1BXCI7XHJcbmNvbnN0IGJvdCA9IG5ldyBUZWxlZ3JhZihUT0tFTik7XHJcblxyXG5ib3Quc3RhcnQoKGN0eCkgPT4ge1xyXG4gIGNvbnN0IHRlbGVncmFtSGFuZGxlID0gY3R4LmZyb20udXNlcm5hbWU7XHJcbiAgY29uc3Qgd2ViX2xpbmsgPSBgaHR0cHM6Ly9sZWJsZWJpc2VwZXRpLnZlcmNlbC5hcHA/dXNlcl9pZD0ke3RlbGVncmFtSGFuZGxlfWA7XHJcbiAgY3R4LnJlcGx5KFwiV2VsY29tZSA6KSkpKSlcIiwge1xyXG4gICAgcmVwbHlfbWFya3VwOiB7XHJcbiAgICAgIGlubGluZV9rZXlib2FyZDogW1xyXG4gICAgICAgIFt7IHRleHQ6IFwiUGxheSBHdXJ1Z290Y2hpXCIsIHdlYl9hcHA6IHsgdXJsOiB3ZWJfbGluayB9IH1dXHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9KTtcclxufSk7XHJcblxyXG5ib3QubGF1bmNoKCk7Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7O0FBQUEsSUFBTSxFQUFFLFNBQVMsSUFBSSxVQUFRLHVDQUFVO0FBQ3ZDLElBQU0sUUFBUTtBQUNkLElBQU0sTUFBTSxJQUFJLFNBQVMsS0FBSztBQUU5QixJQUFJLE1BQU0sQ0FBQyxRQUFRO0FBQ2pCLFFBQU0saUJBQWlCLElBQUksS0FBSztBQUNoQyxRQUFNLFdBQVcsNENBQTRDO0FBQzdELE1BQUksTUFBTSxrQkFBa0I7QUFBQSxJQUMxQixjQUFjO0FBQUEsTUFDWixpQkFBaUI7QUFBQSxRQUNmLENBQUMsRUFBRSxNQUFNLG1CQUFtQixTQUFTLEVBQUUsS0FBSyxTQUFTLEVBQUUsQ0FBQztBQUFBLE1BQzFEO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNILENBQUM7QUFFRCxJQUFJLE9BQU87IiwKICAibmFtZXMiOiBbXQp9Cg==

	