require('dotenv').config()
const { Bot } = require("grammy");
const { decodeQR } = require("./qr");
const { extractRollNumber } = require("./parser");
const {
  isRegistered,
  markPresent,
  getStats,
} = require("./attendance");
const bot = new Bot(process.env.BOT_TOKEN);
const fs = require('fs');
const https = require('https');

bot.command("start", async (ctx) => {
  await ctx.reply(
    "Send an ID card photo containing a QR code."
  );
});

bot.on("message:photo", async (ctx) => {
  try {
    const photos = ctx.message.photo;

    const largestPhoto = photos[photos.length - 1];

    const file = await ctx.api.getFile(
      largestPhoto.file_id
    );

    const fileUrl =
      `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;

    const imagePath =
      `./downloads/${largestPhoto.file_id}.jpg`;

    const buffer = await new Promise((resolve, reject) => {
      https.get(fileUrl, (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      }).on('error', reject);
    });

    fs.mkdirSync("./downloads", {
      recursive: true,
    });

    fs.writeFileSync(imagePath, buffer);

    const qrText =
      await decodeQR(imagePath);

    if (!qrText) {
      return ctx.reply(
        "No QR code found."
      );
    }

    const rollNo =
      extractRollNumber(qrText);

    if (!rollNo) {
      return ctx.reply(
        "No roll number found."
      );
    }

    if (!isRegistered(rollNo)) {
      return ctx.reply(
        `Roll number ${rollNo} is out of range.`
      );
    }

    const result =
      markPresent(rollNo);

    if (!result.success) {
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

bot.command("report", async (ctx) => {
  const stats = getStats();

  let report =
    `Attendance Report\n\n` +
    `Total Present: ${stats.total}\n\n`;

  if (stats.rollNumbers.length) {
    report += stats.rollNumbers.join("\n");
  } else {
    report += "No attendance yet.";
  }

  await ctx.reply(report);
});

bot.start();