const { Jimp } = require("jimp");
const jsQR = require("jsqr");

async function decodeQR(input) {
  const image = await Jimp.read(input);

  const { data, width, height } = image.bitmap;

  const code = jsQR(
    new Uint8ClampedArray(data),
    width,
    height
  );

  return code ? code.data : null;
}

module.exports = { decodeQR };

if (require.main === module) {
  const fs = require("fs");

  const imagePath = process.argv[2];

  if (!imagePath) {
    console.log("Usage: node qr.js <image-path>");
    process.exit(1);
  }

  fs.readFile(imagePath, async (err, buffer) => {
    if (err) {
      console.error("Could not read file:", err.message);
      process.exit(1);
    }

    try {
      const qrData = await decodeQR(buffer);
      console.log(qrData);
    } catch (error) {
      console.error("Error:", error);
    }
  });
}