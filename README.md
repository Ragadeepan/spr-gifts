# SPR GIFTS.IN Website

Premium static React + Vite website for SPR GIFTS.IN. This version has no login, no backend, no database and no payment gateway. Customers browse products, add items to a local cart, and send order requests through WhatsApp.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

Production files are created in `dist`.

## Add a Product

1. Put product photos in `public/images/products/`.
2. Open `src/data/products.js`.
3. Copy one existing product object.
4. Change `id`, `slug`, `name`, `category`, `price`, descriptions, images and tags.
5. Save the file.

The new product automatically appears in the shop, search, filters, product page, cart and WhatsApp order flow.

## Remove a Product

Open `src/data/products.js` and delete that product object from the `products` array.

## Change Product Price

Open `src/data/products.js` and change:

```js
price: 699
```

Use numbers only, without the rupee symbol.

## Replace Product Images

Put real product photos in:

```text
public/images/products/
```

Then update the product object:

```js
images: [
  "/images/products/my-product-01.jpg",
  "/images/products/my-product-02.jpg"
]
```

## Add Product Video

Put videos in:

```text
public/videos/
```

Then update the product:

```js
video: "/videos/my-product-video.mp4"
```

If `video` is `null`, the product video section stays hidden.

## Change WhatsApp Number

Open:

```text
src/data/siteConfig.js
```

Change:

```js
whatsappNumber: "919600849307",
whatsappDisplayNumber: "9600849307",
```

`whatsappNumber` is used for WhatsApp links. Keep country code and no `+`.

## Change Instagram

Open:

```text
src/data/siteConfig.js
```

Change:

```js
instagramUrl: "https://www.instagram.com/spr_gifts.in/",
instagramHandle: "@spr_gifts.in",
```

## Change Brand Name

Open `src/data/siteConfig.js` and change:

```js
brandName: "SPR GIFTS.IN",
tagline: "Special Gifts. Personalized Moments.",
```

## Change Logo

Replace this file:

```text
public/logo/spr-gifts-logo.png
```

Keep the same filename and path.

## Add a Category

Open `src/data/categories.js`, copy a category object, and give it a new `id`, `slug`, `name`, image and description. Use the same category `id` inside products.

## Folder Structure

```text
src/
  components/
    Header.jsx
    CategoryCard.jsx
    ProductCard.jsx
    ProductGrid.jsx
    CartDrawer.jsx
    CartItem.jsx
    WhatsAppButton.jsx
    InstagramButton.jsx
    Footer.jsx
    SectionTitle.jsx
  pages/
    Home.jsx
    Shop.jsx
    ProductDetails.jsx
    About.jsx
    Contact.jsx
    NotFound.jsx
  data/
    products.js
    categories.js
    siteConfig.js
  utils/
    whatsapp.js
    formatPrice.js
    seo.js
  assets/
public/
  images/
    products/
    categories/
    banners/
  videos/
  logo/
  favicon/
```

## Deploy

Netlify:
1. Push this project to GitHub.
2. In Netlify, choose "Add new site" then "Import from Git".
3. Build command: `npm run build`
4. Publish directory: `dist`

Vercel:
1. Import the GitHub repository.
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

Cloudflare Pages:
1. Connect the GitHub repository.
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

## Push Updates to GitHub

```bash
git init
git add .
git commit -m "Build SPR GIFTS.IN website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

After hosting is connected to GitHub, future product updates follow this flow:

```text
Edit src/data/products.js
Add images to public/images/products/
git add .
git commit -m "Add new product"
git push
Hosting auto deploys
New product is live
```
