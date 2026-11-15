import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductGrid } from "../components/ProductGrid";
import { SectionTitle } from "../components/SectionTitle";
import { categories, getCategoryBySlug } from "../data/categories";
import { products } from "../data/products";
import { setSeo } from "../utils/seo";

export function Shop() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "all");
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setSeo({
      title: "Shop Jhumki Gift Sets & Handmade Bouquets | SPR GIFTS.IN",
      description: "Shop Jhumki gift sets, handmade rose bouquets and chocolate bouquets from SPR GIFTS.IN. Enquire on WhatsApp.",
      path: "/shop",
    });
  }, []);

  useEffect(() => {
    const next = params.get("category") || "all";
    setCategory(next);
  }, [params]);

  useEffect(() => {
    if (!mobileFilters) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMobileFilters(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileFilters]);

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    const selectedCategory = getCategoryBySlug(category);

    const filtered = products
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
      });

    return filtered.sort((a, b) => {
      if (sortBy === "price-low" || sortBy === "price-high") {
        if (a.price == null || b.price == null) {
          if (a.price == null && b.price != null) return 1;
          if (b.price == null && a.price != null) return -1;
        }
        const aPrice = a.price ?? 0;
        const bPrice = b.price ?? 0;
        return (sortBy === "price-low" ? aPrice - bPrice : bPrice - aPrice) || a.sortOrder - b.sortOrder;
      }
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.sortOrder - b.sortOrder;
    });
  }, [search, category, availability, sortBy]);

  const updateCategory = (value) => {
    setCategory(value);
    setParams(value === "all" ? {} : { category: value });
  };
  const clearFilters = () => {
    setSearch("");
    setAvailability("all");
    updateCategory("all");
    setSortBy("featured");
  };

  return (
    <section className="page section">
      <SectionTitle
        eyebrow="Shop"
        title="Premium Gift Collection"
        text="Explore Jhumki gift sets, handmade rose bouquets and custom chocolate gifts. Enquire on WhatsApp and confirm the final price before ordering."
      />
      <div className="shop-toolbar">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Jhumki, roses, chocolate gifts..."
          aria-label="Search products"
        />
        <label className="shop-sort-label">
          <span>Sort by</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products">
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
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
          onClear={clearFilters}
        />
        <div className="shop-results">
          <p className="shop-result-count" aria-live="polite">{visibleProducts.length} {visibleProducts.length === 1 ? "gift" : "gifts"} to explore</p>
          <ProductGrid products={visibleProducts} emptyText="No gifts match your search or filters." />
        </div>
      </div>

      <div className={`filter-drawer ${mobileFilters ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Shop filters" aria-hidden={!mobileFilters}>
        <button className="filter-backdrop" type="button" aria-label="Close filters" onClick={() => setMobileFilters(false)} tabIndex={mobileFilters ? 0 : -1} />
        <div className="filter-panel">
          <div className="filter-panel-heading">
            <h2>Refine gifts</h2>
            <button type="button" onClick={() => setMobileFilters(false)} aria-label="Close filters">
              <X />
            </button>
          </div>
          <Filters
            category={category}
            updateCategory={updateCategory}
            availability={availability}
            setAvailability={setAvailability}
            onClear={clearFilters}
          />
        </div>
      </div>
    </section>
  );
}

function Filters({ category, updateCategory, availability, setAvailability, onClear }) {
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
      <button type="button" className="text-button clear-filters" onClick={onClear}>Clear all filters</button>
    </aside>
  );
}
