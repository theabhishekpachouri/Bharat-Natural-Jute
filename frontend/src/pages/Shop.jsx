import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageTransition from "../components/common/PageTransition";
import ProductCard from "../components/common/ProductCard";
import { productsApi } from "../services/api";
import { SlidersHorizontal } from "lucide-react";

const SHOP_BANNER = "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1600";

const Shop = () => {
  const [params] = useSearchParams();
  const search = params.get("search") || "";
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(16);
  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    productsApi.categories().then((d) => setCategories(d.categories));
  }, []);

  useEffect(() => {
    productsApi.list({ limit: show, search, sort_by: sort, category }).then((d) => {
      setItems(d.items); setTotal(d.total);
    });
  }, [show, sort, category, search]);

  return (
    <Layout>
      <PageTransition>
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img src={SHOP_BANNER} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="bg-[#F5EFE6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 font-medium text-gray-700" data-testid="shop-filter-btn">
                <SlidersHorizontal className="w-4 h-4" /> Filter
              </button>
              <span className="text-gray-500">|</span>
              <span className="text-gray-600" data-testid="shop-results-count">Showing 1-{Math.min(show, total)} of {total} results</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-gray-700">Show
                <select value={show} onChange={(e)=>setShow(+e.target.value)} className="ml-2 bg-white border border-gray-200 rounded px-2 py-1" data-testid="shop-show-select">
                  <option value={8}>8</option><option value={16}>16</option><option value={32}>32</option>
                </select>
              </label>
              <label className="text-gray-700">Sort by
                <select value={sort} onChange={(e)=>setSort(e.target.value)} className="ml-2 bg-white border border-gray-200 rounded px-2 py-1" data-testid="shop-sort-select">
                  <option value="default">Default</option>
                  <option value="price_asc">Price ↑</option>
                  <option value="price_desc">Price ↓</option>
                  <option value="rating">Rating</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          <aside className="hidden lg:block">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={()=>setCategory("all")} className={`text-left w-full ${category==='all' ? 'text-[#007D7B] font-semibold' : 'text-gray-700'}`} data-testid="cat-all">All</button></li>
              {categories.map((c) => (
                <li key={c}>
                  <button onClick={()=>setCategory(c)} className={`text-left w-full ${category===c ? 'text-[#007D7B] font-semibold' : 'text-gray-700 hover:text-[#007D7B]'}`} data-testid={`cat-${c.toLowerCase().replace(/[^a-z]/g,'-')}`}>
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="product-grid">
              {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
            {items.length === 0 && <div className="py-20 text-center text-gray-500">No products found.</div>}
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Shop;