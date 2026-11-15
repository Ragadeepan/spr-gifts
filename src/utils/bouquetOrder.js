const bouquetOrderNames = {
  "chocolate-bouquet": "Chocolate Bouquet",
  "handmade-rose-bouquet": "Customized Rose Bouquet",
};

export const isBouquetOrderProduct = (product) => Boolean(product && bouquetOrderNames[product.id]);

export const getBouquetOrderName = (product) => bouquetOrderNames[product?.id] || product?.name || "";
