import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');
const logoPath = join(publicDir, 'static/img/logo-toulouse-devops.png');

async function generateFavicons() {
  console.log('Generating favicons...');

  // favicon.ico (32x32)
  await sharp(logoPath)
    .resize(32, 32)
    .toFile(join(publicDir, 'favicon.ico'));

  // favicon-16x16.png
  await sharp(logoPath)
    .resize(16, 16)
    .toFile(join(publicDir, 'favicon-16x16.png'));

  // favicon-32x32.png
  await sharp(logoPath)
    .resize(32, 32)
    .toFile(join(publicDir, 'favicon-32x32.png'));

  // apple-touch-icon.png (180x180)
  await sharp(logoPath)
    .resize(180, 180)
    .toFile(join(publicDir, 'apple-touch-icon.png'));

  console.log('Favicons generated!');
}

async function generateOGImage() {
  console.log('Generating Open Graph image...');

  const width = 1200;
  const height = 630;
  const primaryColor = '#0e2d5a';
  const accentColor = '#c83737';

  // Create OG image with gradient background
  const svgImage = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${primaryColor}"/>
          <stop offset="100%" style="stop-color:#1a4a8a"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <text x="600" y="280" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">
        Toulouse DevOps
      </text>
      <text x="600" y="380" font-family="Arial, sans-serif" font-size="28" fill="#e8eef5" text-anchor="middle">
        La communauté DevOps de Toulouse
      </text>
      <text x="600" y="430" font-family="Arial, sans-serif" font-size="28" fill="#e8eef5" text-anchor="middle">
        Meetups, talks et partage de bonnes pratiques
      </text>
      <rect x="500" y="500" width="200" height="50" rx="8" fill="${accentColor}"/>
      <text x="600" y="535" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">
        Rejoignez-nous !
      </text>
    </svg>
  `;

  await mkdir(join(publicDir, 'static/img'), { recursive: true });

  await sharp(Buffer.from(svgImage))
    .png()
    .toFile(join(publicDir, 'static/img/og-image.png'));

  console.log('Open Graph image generated!');
}

async function main() {
  try {
    await generateFavicons();
    await generateOGImage();
    console.log('All assets generated successfully!');
  } catch (error) {
    console.error('Error generating assets:', error);
    process.exit(1);
  }
}

main();
