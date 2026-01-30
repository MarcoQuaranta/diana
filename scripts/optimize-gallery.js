const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const galleryPath = path.join(process.cwd(), 'public', 'images', 'galleria');
const imageExtensions = ['.jpg', '.jpeg', '.png'];

// Impostazioni: max 1080px, qualità 80%
const MAX_WIDTH = 1080;
const MAX_HEIGHT = 1080;
const QUALITY = 80;

async function optimizeImages() {
  const files = fs.readdirSync(galleryPath);
  const imageFiles = files.filter(file =>
    imageExtensions.includes(path.extname(file).toLowerCase())
  );

  console.log(`Trovate ${imageFiles.length} immagini da ottimizzare...`);

  let optimized = 0;
  let skipped = 0;

  for (const file of imageFiles) {
    const filePath = path.join(galleryPath, file);
    const stats = fs.statSync(filePath);
    const sizeBefore = stats.size;

    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      // Salta se già piccola (< 150KB e dimensioni ok)
      if (sizeBefore < 150 * 1024 && metadata.width <= MAX_WIDTH && metadata.height <= MAX_HEIGHT) {
        console.log(`⏭️  ${file} - già ottimizzata (${(sizeBefore / 1024).toFixed(0)}KB)`);
        skipped++;
        continue;
      }

      // Ridimensiona e comprimi
      const tempPath = filePath + '.tmp';
      await image
        .resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: QUALITY })
        .toFile(tempPath);

      // Sostituisci il file originale
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);

      const sizeAfter = fs.statSync(filePath).size;
      const saved = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
      console.log(`✅ ${file} - ${(sizeBefore / 1024).toFixed(0)}KB → ${(sizeAfter / 1024).toFixed(0)}KB (-${saved}%)`);
      optimized++;

    } catch (error) {
      console.error(`❌ Errore con ${file}:`, error.message);
    }
  }

  console.log(`\nCompletato: ${optimized} ottimizzate, ${skipped} saltate`);
}

optimizeImages();
