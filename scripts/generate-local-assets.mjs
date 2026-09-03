import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const productAssets = [
  ["personalized-memory-gift-box", "Personalized Memory Gift Box", "customGiftBox"],
  ["name-initial-custom-gift", "Name Initial Custom Gift", "initialGift"],
  ["rose-gold-earrings-gift-box", "Rose Gold Earrings Gift Box", "earringsBox"],
  ["mini-earrings-surprise-box", "Mini Earrings Surprise Box", "miniEarrings"],
  ["premium-16-piece-gift-box", "Premium 16-Piece Gift Box", "sixteenBox"],
  ["celebration-16-piece-gift-box", "Celebration 16-Piece Gift Box", "celebrationBox"],
  ["pink-rose-bouquet", "Pink Rose Bouquet", "roseBouquet"],
  ["classic-flower-bouquet", "Classic Flower Bouquet", "flowerBouquet"],
  ["custom-theme-bouquet", "Custom Theme Bouquet", "customBouquet"],
  ["photo-message-bouquet", "Photo Message Bouquet", "photoBouquet"],
  ["premium-chocolate-bouquet", "Premium Chocolate Bouquet", "chocolateBouquet"],
  ["mini-chocolate-bouquet", "Mini Chocolate Bouquet", "miniChocolateBouquet"],
  ["product-fallback", "SPR Gifts Product", "fallbackProduct"],
];

const categoryAssets = [
  ["customized-gifts", "Customized Gifts", "customGiftBox", "category"],
  ["earrings-gift-box", "Earrings Gift Box", "earringsBox", "category"],
  ["16-piece-gift-box", "16-Piece Gift Box", "sixteenBox", "category"],
  ["flower-bouquets", "Flower Bouquets", "flowerBouquet", "category"],
  ["customized-bouquets", "Customized Bouquets", "customBouquet", "category"],
  ["chocolate-bouquets", "Chocolate Bouquets", "chocolateBouquet", "category"],
  ["new-arrivals", "New Arrivals", "celebrationBox", "category"],
  ["best-sellers", "Best Sellers", "roseBouquet", "category"],
  ["coming-soon", "Coming Soon", "wrappedGift", "category"],
  ["category-fallback", "SPR Gifts Category", "wrappedGift", "category"],
];

const heroAsset = ["luxury-gift-hero", "Premium SPR Gifts", "heroShowcase", "hero"];

const drawingScript = ({ title, kind, layout }) => {
  const safeTitle = JSON.stringify(title);
  const safeKind = JSON.stringify(kind);
  const safeLayout = JSON.stringify(layout);

  return `
    (() => {
      const title = ${safeTitle};
      const kind = ${safeKind};
      const layout = ${safeLayout};
      const canvas = document.createElement('canvas');
      const w = layout === 'hero' ? 1600 : layout === 'category' ? 1120 : 1200;
      const h = layout === 'hero' ? 1000 : layout === 'category' ? 840 : 1500;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      const DPR = 1;
      const cx = w / 2;
      const cy = h / 2;

      function grad(x0, y0, x1, y1, stops) {
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        stops.forEach(([p, c]) => g.addColorStop(p, c));
        return g;
      }
      function radial(x, y, r, stops) {
        const g = ctx.createRadialGradient(x, y, 1, x, y, r);
        stops.forEach(([p, c]) => g.addColorStop(p, c));
        return g;
      }
      function ellipse(x, y, rx, ry, fill, alpha = 1) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.restore();
      }
      function roundedRect(x, y, rw, rh, r, fill, stroke = null, shadow = true) {
        ctx.save();
        if (shadow) {
          ctx.shadowColor = 'rgba(0,0,0,.35)';
          ctx.shadowBlur = 35;
          ctx.shadowOffsetY = 22;
        }
        ctx.beginPath();
        ctx.roundRect(x, y, rw, rh, r);
        ctx.fillStyle = fill;
        ctx.fill();
        if (stroke) {
          ctx.shadowColor = 'transparent';
          ctx.lineWidth = Math.max(2, w * .002);
          ctx.strokeStyle = stroke;
          ctx.stroke();
        }
        ctx.restore();
      }
      function ribbon(x, y, rw, rh) {
        const rg = grad(x, y, x + rw, y, [[0, '#8d641e'], [.32, '#d4af63'], [.56, '#fff1ad'], [1, '#a26d32']]);
        roundedRect(x + rw * .43, y, rw * .14, rh, 8, rg, null, false);
        roundedRect(x, y + rh * .42, rw, rh * .14, 8, rg, null, false);
        ctx.save();
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.moveTo(x + rw * .5, y + rh * .36);
        ctx.bezierCurveTo(x + rw * .26, y + rh * .15, x + rw * .08, y + rh * .24, x + rw * .22, y + rh * .43);
        ctx.bezierCurveTo(x + rw * .34, y + rh * .56, x + rw * .5, y + rh * .5, x + rw * .5, y + rh * .5);
        ctx.bezierCurveTo(x + rw * .5, y + rh * .5, x + rw * .66, y + rh * .56, x + rw * .78, y + rh * .43);
        ctx.bezierCurveTo(x + rw * .92, y + rh * .24, x + rw * .74, y + rh * .15, x + rw * .5, y + rh * .36);
        ctx.fill();
        ellipse(x + rw * .5, y + rh * .48, rw * .055, rh * .055, '#1a1208', .88);
        ctx.restore();
      }
      function rose(x, y, r, colors = ['#f6aabd', '#da6f8b', '#842d42']) {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,.28)';
        ctx.shadowBlur = r * .25;
        const rg = radial(x - r * .18, y - r * .22, r * 1.1, [[0, colors[0]], [.45, colors[1]], [1, colors[2]]]);
        for (let i = 0; i < 18; i++) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate((Math.PI * 2 * i) / 18);
          ctx.beginPath();
          ctx.ellipse(r * .28, 0, r * .42, r * .18, 0, 0, Math.PI * 2);
          ctx.fillStyle = rg;
          ctx.fill();
          ctx.restore();
        }
        for (let i = 0; i < 8; i++) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate((Math.PI * 2 * i) / 8 + .2);
          ctx.beginPath();
          ctx.ellipse(r * .12, 0, r * .25, r * .11, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#ffd0da';
          ctx.globalAlpha = .55;
          ctx.fill();
          ctx.restore();
        }
        ellipse(x, y, r * .16, r * .14, colors[2], .85);
        ctx.restore();
      }
      function leaf(x, y, size, rot = 0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(size * .8, -size * .5, size * 1.25, 0);
        ctx.quadraticCurveTo(size * .75, size * .45, 0, 0);
        ctx.fillStyle = grad(-size, 0, size, 0, [[0, '#52673a'], [1, '#1d361e']]);
        ctx.fill();
        ctx.restore();
      }
      function chocolate(x, y, rw, rh) {
        roundedRect(x, y, rw, rh, 12, grad(x, y, x, y + rh, [[0, '#8a562e'], [.5, '#4d2c14'], [1, '#2a170b']]), 'rgba(241,209,135,.35)');
        roundedRect(x + rw * .12, y + rh * .15, rw * .76, rh * .7, 8, 'rgba(255,230,170,.08)', null, false);
      }
      function earring(x, y, s, metal = '#d4af63') {
        ctx.save();
        ctx.lineWidth = s * .05;
        ctx.strokeStyle = metal;
        ctx.shadowColor = 'rgba(241,209,135,.45)';
        ctx.shadowBlur = s * .12;
        ctx.beginPath();
        ctx.arc(x, y, s * .34, 0, Math.PI * 2);
        ctx.stroke();
        ellipse(x, y + s * .08, s * .12, s * .18, '#fff7d0', .9);
        ellipse(x - s * .08, y - s * .08, s * .035, s * .035, '#fff', .85);
        ctx.restore();
      }
      function photoCard(x, y, rw, rh, tint = '#f5ecd9') {
        roundedRect(x, y, rw, rh, 12, tint, 'rgba(212,175,99,.45)');
        roundedRect(x + rw * .09, y + rh * .1, rw * .82, rh * .52, 6, '#2c1f15', null, false);
        ellipse(x + rw * .28, y + rh * .33, rw * .08, rw * .08, '#d8a094', .95);
        ctx.fillStyle = '#52673a';
        ctx.beginPath();
        ctx.moveTo(x + rw * .15, y + rh * .57);
        ctx.lineTo(x + rw * .45, y + rh * .36);
        ctx.lineTo(x + rw * .7, y + rh * .57);
        ctx.fill();
        ctx.fillStyle = '#8d641e';
        ctx.fillRect(x + rw * .14, y + rh * .72, rw * .72, 3);
        ctx.fillRect(x + rw * .2, y + rh * .8, rw * .58, 3);
      }
      function bouquet(baseY, scale = 1, mode = 'rose') {
        const bw = 440 * scale, bh = 440 * scale;
        const bx = cx - bw / 2, by = baseY - bh * .62;
        ellipse(cx, baseY + 190 * scale, 360 * scale, 42 * scale, '#000', .42);
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,.45)';
        ctx.shadowBlur = 34 * scale;
        ctx.fillStyle = mode === 'chocolate' ? '#342213' : '#3a1d22';
        ctx.beginPath();
        ctx.moveTo(cx - 280 * scale, baseY - 20 * scale);
        ctx.quadraticCurveTo(cx, baseY + 200 * scale, cx + 280 * scale, baseY - 20 * scale);
        ctx.quadraticCurveTo(cx + 180 * scale, baseY + 90 * scale, cx - 180 * scale, baseY + 90 * scale);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        const pts = [
          [-170, -20, 70], [-95, -75, 78], [0, -95, 88], [98, -72, 78], [172, -18, 68],
          [-50, 0, 70], [55, 5, 70], [-5, -15, 76]
        ];
        pts.forEach(([px, py, pr], i) => {
          if (mode === 'chocolate') chocolate(cx + px * scale - pr * .55 * scale, by + py * scale + 210 * scale, pr * 1.15 * scale, pr * .9 * scale);
          else {
            const palette = mode === 'classic' && i % 3 === 0 ? ['#fff4c7', '#f0c267', '#b06a28'] : mode === 'custom' && i % 2 === 0 ? ['#dfc8ff', '#9d79d6', '#4e337f'] : ['#ffc0cc', '#e27a95', '#842d42'];
            rose(cx + px * scale, by + py * scale + 220 * scale, pr * scale, palette);
            leaf(cx + (px + pr * .35) * scale, by + (py + 240) * scale, 38 * scale, .5);
          }
        });
        if (mode === 'photo') {
          photoCard(cx - 76 * scale, by + 120 * scale, 152 * scale, 190 * scale);
        }
        ribbon(cx - 130 * scale, baseY - 56 * scale, 260 * scale, 170 * scale);
      }
      function giftBox(y, scale = 1, pieces = false, celebration = false, initial = false) {
        const bw = 560 * scale, bh = 360 * scale;
        const bx = cx - bw / 2;
        ellipse(cx, y + bh * .62, bw * .58, 45 * scale, '#000', .38);
        roundedRect(bx, y, bw, bh, 28 * scale, grad(bx, y, bx + bw, y + bh, [[0, '#2c1f15'], [.48, '#15100c'], [1, '#3a2816']]), 'rgba(241,209,135,.45)');
        roundedRect(bx - 22 * scale, y - 72 * scale, bw + 44 * scale, 90 * scale, 24 * scale, grad(bx, y, bx + bw, y, [[0, '#4a321d'], [.5, '#1a1208'], [1, '#4a321d']]), 'rgba(241,209,135,.5)');
        ribbon(bx + bw * .33, y - 98 * scale, bw * .34, bh * .5);
        if (pieces) {
          for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
              const px = bx + 72 * scale + col * 110 * scale;
              const py = y + 46 * scale + row * 66 * scale;
              roundedRect(px, py, 74 * scale, 42 * scale, 8 * scale, celebration && (row + col) % 2 ? '#7e3043' : '#8d641e', 'rgba(255,240,190,.3)', false);
            }
          }
        }
        if (initial) {
          ctx.save();
          ctx.fillStyle = '#f1d187';
          ctx.font = '800 ' + Math.floor(120 * scale) + 'px Playfair Display, Georgia, serif';
          ctx.textAlign = 'center';
          ctx.fillText('A', cx, y + bh * .6);
          ctx.restore();
        }
        if (!pieces && !initial) {
          photoCard(bx + bw * .12, y + bh * .16, bw * .26, bh * .48, '#fffaf2');
          roundedRect(bx + bw * .58, y + bh * .18, bw * .26, bh * .28, 12 * scale, '#d8a094', 'rgba(255,240,190,.35)', false);
          chocolate(bx + bw * .58, y + bh * .55, bw * .23, bh * .16, false);
        }
      }
      function jewelleryBox(y, scale = 1, mini = false) {
        const bw = mini ? 470 * scale : 610 * scale;
        const bh = mini ? 330 * scale : 390 * scale;
        const bx = cx - bw / 2;
        ellipse(cx, y + bh * .68, bw * .56, 42 * scale, '#000', .38);
        roundedRect(bx, y, bw, bh, 26 * scale, grad(bx, y, bx, y + bh, [[0, '#50323a'], [.48, '#23151a'], [1, '#120b0e']]), 'rgba(241,209,135,.42)');
        roundedRect(bx + 34 * scale, y + 34 * scale, bw - 68 * scale, bh - 68 * scale, 20 * scale, '#f5ecd9', 'rgba(212,175,99,.42)', false);
        const count = mini ? 2 : 6;
        for (let i = 0; i < count; i++) {
          const col = mini ? i : i % 3;
          const row = mini ? 0 : Math.floor(i / 3);
          earring(bx + bw * (.3 + col * .2), y + bh * (.46 + row * .2), 86 * scale, i % 2 ? '#d4af63' : '#e3b1a3');
        }
      }
      function wrappedGift(y, scale = 1) {
        giftBox(y, scale, false, false, true);
      }
      function fallbackProduct(y, scale = 1) {
        giftBox(y, scale, false, true, false);
      }
      function heroShowcase() {
        giftBox(h * .5, .72, true, true, false);
        ctx.save();
        ctx.translate(w * .3, h * .54);
        bouquet(0, .58, 'rose');
        ctx.restore();
        ctx.save();
        ctx.translate(w * .72 - cx, h * .55 - cy);
        jewelleryBox(cy - 80, .55, false);
        ctx.restore();
      }

      ctx.fillStyle = grad(0, 0, w, h, [[0, '#0a0604'], [.45, '#1a1208'], [1, '#2a1b10']]);
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = radial(w * .52, h * .36, w * .58, [[0, 'rgba(212,175,99,.32)'], [.42, 'rgba(212,175,99,.12)'], [1, 'rgba(212,175,99,0)']]);
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = radial(w * .22, h * .18, w * .33, [[0, 'rgba(216,160,148,.16)'], [1, 'rgba(216,160,148,0)']]);
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 65; i++) {
        ellipse((i * 149) % w, (i * 233) % h, 1.4 + (i % 3), 1.4 + (i % 3), '#f1d187', .06 + (i % 5) * .012);
      }
      roundedRect(w * .08, h * .075, w * .84, h * .84, 34, 'rgba(255,250,242,.035)', 'rgba(212,175,99,.18)', false);

      const objectY = layout === 'hero' ? h * .42 : layout === 'category' ? h * .46 : h * .42;
      const productScale = layout === 'category' ? .78 : 1.08;
      const bouquetScale = layout === 'category' ? .82 : 1.18;
      if (kind === 'customGiftBox') giftBox(objectY, productScale, false, false, false);
      if (kind === 'initialGift') giftBox(objectY, productScale, false, false, true);
      if (kind === 'earringsBox') jewelleryBox(objectY, productScale, false);
      if (kind === 'miniEarrings') jewelleryBox(objectY, layout === 'category' ? .72 : .96, true);
      if (kind === 'sixteenBox') giftBox(objectY, productScale, true, false, false);
      if (kind === 'celebrationBox') giftBox(objectY, productScale, true, true, false);
      if (kind === 'roseBouquet') bouquet(objectY + (layout === 'category' ? 118 : 245), bouquetScale, 'rose');
      if (kind === 'flowerBouquet') bouquet(objectY + (layout === 'category' ? 118 : 245), bouquetScale, 'classic');
      if (kind === 'customBouquet') bouquet(objectY + (layout === 'category' ? 118 : 245), bouquetScale, 'custom');
      if (kind === 'photoBouquet') bouquet(objectY + 245, bouquetScale, 'photo');
      if (kind === 'chocolateBouquet') bouquet(objectY + (layout === 'category' ? 118 : 245), bouquetScale, 'chocolate');
      if (kind === 'miniChocolateBouquet') bouquet(objectY + 215, .94, 'chocolate');
      if (kind === 'wrappedGift') wrappedGift(objectY, productScale);
      if (kind === 'fallbackProduct') fallbackProduct(objectY, productScale);
      if (kind === 'heroShowcase') heroShowcase();

      return canvas.toDataURL('image/webp', .9);
    })();
  `;
};

async function saveWebp(page, relPath, title, kind, layout = "product") {
  const dataUrl = await page.evaluate(drawingScript({ title, kind, layout }));
  const buffer = Buffer.from(dataUrl.replace(/^data:image\/webp;base64,/, ""), "base64");
  const fullPath = join(root, relPath);
  await mkdir(dirname(fullPath), { recursive: true });
  await writeFile(fullPath, buffer);
  console.log(`${relPath} ${Math.round(buffer.length / 1024)}KB`);
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent("<!doctype html><html><body></body></html>");

for (const [slug, title, kind] of productAssets) {
  await saveWebp(page, `public/images/products/${slug}.webp`, title, kind, "product");
}

for (const [slug, title, kind, layout] of categoryAssets) {
  await saveWebp(page, `public/images/categories/${slug}.webp`, title, kind, layout);
}

await saveWebp(page, `public/images/hero/${heroAsset[0]}.webp`, heroAsset[1], heroAsset[2], heroAsset[3]);

await browser.close();
