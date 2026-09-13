import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductGrid } from "../components/ProductGrid";
import { SectionTitle } from "../components/SectionTitle";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { setSeo } from "../utils/seo";

export function Shop() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "all");
  const [availability, setAvailability] = useState("all");
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setSeo({
      title: "Shop Jhumki Gift Sets & Flower Bouquets | SPR GIFTS.IN",
      description: "Browse premium 12-pair & 16-pair Jhumki gift sets and flower bouquets from SPR GIFTS.IN. Order via WhatsApp with Pan India delivery.",
      path: "/shop",
    });
  }, []);

  useEffect(() => {
    const next = params.get("category") || "all";
    setCategory(next);
  }, [params]);

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    const selectedCategory = categories.find((item) => item.slug === category);

    return products
      .filter((product) => {
        const haystack = [
          product.name,
          product.category,
          ...(product.tags || []),
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch = !term || haystack.includes(term);
        const matchesCategory = category === "all" || product.category === selectedCategory?.id;
        const matchesAvailability =
          availability === "all" ||
          (availability === "available" && product.available) ||
          (availability === "unavailable" && !product.available);

        return matchesSearch && matchesCategory && matchesAvailability;
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [search, category, availability]);

  const updateCategory = (value) => {
    setCategory(value);
    setParams(value === "all" ? {} : { category: value });
  };

  return (
    <section className="page section">
      <SectionTitle
        eyebrow="Shop"
        title="Premium Gift Collection"
        text="Browse Jhumki Gift Sets and Flower Bouquets. Order via WhatsApp."
      />
      <div className="shop-toolbar">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Jhumki sets, flower bouquets…"
          aria-label="Search products"
        />
        <button className="filter-toggle" type="button" onClick={() => setMobileFilters(true)}>
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      <div className="shop-layout">
        <Filters
          category={category}
          updateCategory={updateCategory}
          availability={availability}
          setAvailability={setAvailability}
        />
        <ProductGrid products={visibleProducts} emptyText="No gifts match your search or filters." />
      </div>

      <div className={`filter-drawer ${mobileFilters ? "open" : ""}`}>
        <div className="filter-panel">
          <button type="button" onClick={() => setMobileFilters(false)} aria-label="Close filters">
            <X />
          </button>
          <Filters
            category={category}
            updateCategory={updateCategory}
            availability={availability}
            setAvailability={setAvailability}
          />
        </div>
      </div>
    </section>
  );
}

function Filters({ category, updateCategory, availability, setAvailability }) {
  return (
    <aside className="filters" aria-label="Product filters">
      <h2>Filters</h2>
      <label>
        Category
        <select value={category} onChange={(event) => updateCategory(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Availability
        <select value={availability} onChange={(event) => setAvailability(event.target.value)}>
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Out of stock</option>
        </select>
      </label>
    </aside>
  );
}