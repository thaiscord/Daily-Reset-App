const sharp = require('sharp');

async function removeBg(input, output) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = data;
  const { width, height, channels } = info;

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    // Remove white and near-white/cream pixels
    if (r > 215 && g > 205 && b > 190) {
      pixels[i + 3] = 0;
    }
  }

  await sharp(pixels, {
    raw: { width, height, channels }
  })
  .png()
  .toFile(output);

  console.log('Background removed:', output);
}

removeBg(
  'c:/Projetos APP/Daily Reser App 2/Identidade Visual/LOGO 5.png',
  'c:/Projetos APP/Daily Reser App 2/DailyResetNovo/assets/images/logo-transparent.png'
);
