import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, emptyText = "No products found." }) {
  if (!products.length) {
    return <div className="empty-state">{emptyText}</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
