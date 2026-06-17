require("dotenv").config();

const { Bot, InputFile, InlineKeyboard } = require("grammy");
const { decodeQR } = require("./qr");
const { extractRollNumber } = require("./parser");
const {
  isRegistered,
  markPresent,
  getStats,
} = require("./attendance");

const fs = require("fs");
const https = require("https");

const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    .text("Scan QR", "scan_qr")
    .row()
    .text("Report", "report")
    .text("Export", "export");

  await ctx.reply(
    "QR Attendance System\n\nChoose an option:",
    {
      reply_markup: keyboard,
    }
  );
});

bot.callbackQuery("scan_qr", async (ctx) => {
  await ctx.answerCallbackQuery();

  await ctx.reply(
    "Send an IITK ID card photo containing a QR code."
  );
});

bot.callbackQuery("report", async (ctx) => {
  await ctx.answerCallbackQuery();

  const stats = getStats();

  let report =
    `Attendance Report\n\n` +
    `Total Present: ${stats.total}\n\n`;

  if (stats.rollNumbers.length > 0) {
    report += stats.rollNumbers.join("\n");
  } else {
    report += "No attendance yet.";
  }

  await ctx.reply(report);
});

bot.callbackQuery("export", async (ctx) => {
  await ctx.answerCallbackQuery();

  try {
    const store = JSON.parse(
      fs.readFileSync("attendance.json", "utf8")
    );

    const rows = [
      ["RollNumber", "Timestamp"],
      ...Object.entries(store),
    ];

    const csv = rows
      .map((r) => r.join(","))
      .join("\n");

    const tempFile = "./attendance_export.csv";

    fs.writeFileSync(tempFile, csv);

    await ctx.replyWithDocument(
      new InputFile(tempFile)
    );

    fs.unlinkSync(tempFile);
  } catch (err) {
    console.error(err);
    await ctx.reply("Export failed.");
  }
});

bot.command("report", async (ctx) => {
  const stats = getStats();

  let report =
    `Attendance Report\n\n` +
    `Total Present: ${stats.total}\n\n`;

  if (stats.rollNumbers.length > 0) {
    report += stats.rollNumbers.join("\n");
  } else {
    report += "No attendance yet.";
  }

  await ctx.reply(report);
});

bot.command("export", async (ctx) => {
  try {
    const store = JSON.parse(
      fs.readFileSync("attendance.json", "utf8")
    );

    const rows = [
      ["RollNumber", "Timestamp"],
      ...Object.entries(store),
    ];

    const csv = rows
      .map((r) => r.join(","))
      .join("\n");

    const tempFile = "./attendance_export.csv";

    fs.writeFileSync(tempFile, csv);

    await ctx.replyWithDocument(
      new InputFile(tempFile)
    );

    fs.unlinkSync(tempFile);
  } catch (err) {
    console.error(err);
    await ctx.reply("Export failed.");
  }
});

bot.on("message:photo", async (ctx) => {
  try {
    const photos = ctx.message.photo;
    const largestPhoto =
      photos[photos.length - 1];

    const file = await ctx.api.getFile(
      largestPhoto.file_id
    );

    const fileUrl =
      `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;

    const imagePath =
      `./downloads/${largestPhoto.file_id}.jpg`;

    const buffer = await new Promise(
      (resolve, reject) => {
        https.get(fileUrl, (res) => {
          const chunks = [];

          res.on("data", (chunk) =>
            chunks.push(chunk)
          );

          res.on("end", () =>
            resolve(Buffer.concat(chunks))
          );

          res.on("error", reject);
        }).on("error", reject);
      }
    );

    fs.mkdirSync("./downloads", {
      recursive: true,
    });

    fs.writeFileSync(
      imagePath,
      buffer
    );

    const qrText =
      await decodeQR(imagePath);

    if (!qrText) {
      fs.unlinkSync(imagePath);
      return ctx.reply(
        "No QR code found."
      );
    }

    const rollNo =
      extractRollNumber(qrText);

    if (!rollNo) {
      fs.unlinkSync(imagePath);
      return ctx.reply(
        "No roll number found."
      );
    }

    if (!isRegistered(rollNo)) {
      fs.unlinkSync(imagePath);
      return ctx.reply(
        `Roll number ${rollNo} is out of range.`
      );
    }

    const result =
      markPresent(rollNo);

    if (!result.success) {
      fs.unlinkSync(imagePath);
      return ctx.reply(
        `Already marked at ${result.timestamp}`
      );
    }

    await ctx.reply(
      `Attendance marked for ${rollNo}`
    );

    fs.unlinkSync(imagePath);
  } catch (err) {
    console.error(err);

    await ctx.reply(
      "Error processing image."
    );
  }
});

bot.catch((err) => {
  console.error(
    "Bot Error:",
    err.error
  );
});

bot.start();

console.log("Bot started...");