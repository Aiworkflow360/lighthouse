import QRCode from 'qrcode';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, '..', 'public', 'lighthouse-qr.png');

await QRCode.toFile(outputPath, 'https://lighthouse-rust-two.vercel.app', {
  width: 400,
  margin: 2,
  color: {
    dark: '#1C1917',
    light: '#FFFBF5',
  },
  errorCorrectionLevel: 'H',
});

console.log(`QR code saved to ${outputPath}`);
