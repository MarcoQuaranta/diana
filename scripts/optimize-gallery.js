const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const galleryPath = path.join(process.cwd(), 'public', 'images', 'galleria');
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

// Impostazioni: max 1080px, qualità 70%, formato WebP
const MAX_WIDTH = 1080;
const MAX_HEIGHT = 1080;
const QUALITY = 70;

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

      // Salta se già WebP e piccola
      const ext = path.extname(file).toLowerCase();
      if (ext === '.webp' && sizeBefore < 100 * 1024) {
        console.log(`⏭️  ${file} - già WebP ottimizzata (${(sizeBefore / 1024).toFixed(0)}KB)`);
        skipped++;
        continue;
      }

      // Ridimensiona e converti in WebP
      const baseName = path.basename(file, path.extname(file));
      const newFileName = baseName + '.webp';
      const newFilePath = path.join(galleryPath, newFileName);

      await image
        .resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: QUALITY })
        .toFile(newFilePath);

      // Rimuovi il file originale se diverso
      if (filePath !== newFilePath) {
        fs.unlinkSync(filePath);
      }

      const sizeAfter = fs.statSync(newFilePath).size;
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
