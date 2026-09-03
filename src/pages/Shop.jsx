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
  const [price, setPrice] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [featured, setFeatured] = useState(false);
  const [sort, setSort] = useState("featured");
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setSeo({
      title: "Shop Gifts | SPR GIFTS.IN",
      description: "Browse premium customized gifts, bouquets, chocolate bouquets and gift boxes from SPR GIFTS.IN.",
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
        const matchesPrice =
          price === "all" ||
          (price === "under-700" && product.price <= 700) ||
          (price === "700-1000" && product.price > 700 && product.price <= 1000) ||
          (price === "above-1000" && product.price > 1000);
        const matchesAvailability =
          availability === "all" ||
          (availability === "available" && product.available) ||
          (availability === "unavailable" && !product.available);
        const matchesFeatured = !featured || product.featured;

        return matchesSearch && matchesCategory && matchesPrice && matchesAvailability && matchesFeatured;
      })
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
        return Number(b.featured) - Number(a.featured);
      });
  }, [search, category, price, availability, featured, sort]);

  const updateCategory = (value) => {
    setCategory(value);
    setParams(value === "all" ? {} : { category: value });
  };

  return (
    <section className="page section">
      <SectionTitle
        eyebrow="Shop"
        title="Premium Gift Collection"
        text="Search, filter and add gifts to cart. Final order details are confirmed on WhatsApp."
      />
      <div className="shop-toolbar">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products, categories or tags"
          aria-label="Search products"
        />
        <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
          <option value="featured">Featured</option>
          <option value="price-low">Price low to high</option>
          <option value="price-high">Price high to low</option>
          <option value="newest">Newest</option>
        </select>
        <button className="filter-toggle" type="button" onClick={() => setMobileFilters(true)}>
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      <div className="shop-layout">
        <Filters
          category={category}
          updateCategory={updateCategory}
          price={price}
          setPrice={setPrice}
          availability={availability}
          setAvailability={setAvailability}
          featured={featured}
          setFeatured={setFeatured}
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
            price={price}
            setPrice={setPrice}
            availability={availability}
            setAvailability={setAvailability}
            featured={featured}
            setFeatured={setFeatured}
          />
        </div>
      </div>
    </section>
  );
}

function Filters({ category, updateCategory, price, setPrice, availability, setAvailability, featured, setFeatured }) {
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
        Price
        <select value={price} onChange={(event) => setPrice(event.target.value)}>
          <option value="all">All prices</option>
          <option value="under-700">₹700 and under</option>
          <option value="700-1000">₹701 to ₹1,000</option>
          <option value="above-1000">Above ₹1,000</option>
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
      <label className="check-row">
        <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} />
        Featured only
      </label>
    </aside>
  );
}
