import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageTransition from "../components/common/PageTransition";
import ProductCard from "../components/common/ProductCard";
import { productsApi } from "../services/api";
import { useCart } from "../context/CartContext";
import { Star, Minus, Plus, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [data, setData] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");

  useEffect(() => {
    setData(null); setActiveImg(0); setQty(1);
    productsApi.get(slug).then(setData).catch(() => navigate("/shop"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, navigate]);

  if (!data) return <Layout><div className="py-32 text-center">Loading…</div></Layout>;
  const p = data.product;

  const onBuyNow = () => { addItem(p, qty); navigate("/checkout"); };
  const onAdd = () => { addItem(p, qty); toast.success("Added to cart"); };

  return (
    <Layout>
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <nav className="text-xs text-gray-500 mb-6" data-testid="breadcrumb">
            <Link to="/" className="hover:text-[#007D7B]">Home</Link> / <Link to="/shop" className="hover:text-[#007D7B]">Shop</Link> / <span className="text-gray-800">{p.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}}>
              <div className="bg-[#F5EFE6] rounded-xl aspect-square flex items-center justify-center overflow-hidden mb-4">
                <img src={p.images[activeImg] || p.image} alt={p.name} className="w-full h-full object-cover" data-testid="product-main-image" />
              </div>
              <div className="flex gap-3">
                {p.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${activeImg===i ? 'border-[#007D7B]' : 'border-transparent'}`} data-testid={`thumb-${i}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:0.5,delay:0.15}}>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="product-title">{p.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= Math.round(p.rating) ? 'fill-[#FFD600] text-[#FFD600]' : 'text-gray-300'}`} />)}
                </div>
                <span className="text-sm text-gray-500">({p.reviews_count} reviews)</span>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-6" data-testid="product-price">${p.price}</div>
              <p className="text-gray-700 leading-relaxed mb-6">{p.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-semibold">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button onClick={()=>setQty(Math.max(1, qty-1))} className="px-3 py-2 hover:bg-gray-50" data-testid="qty-minus"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-semibold" data-testid="qty-value">{qty}</span>
                  <button onClick={()=>setQty(qty+1)} className="px-3 py-2 hover:bg-gray-50" data-testid="qty-plus"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <button onClick={onBuyNow} className="bg-[#FFD600] hover:bg-[#FFC700] text-black font-semibold px-8 py-3 rounded-md btn-press" data-testid="buy-now-btn">Buy Now</button>
                <button onClick={onAdd} className="border-2 border-gray-300 hover:border-[#007D7B] hover:text-[#007D7B] font-semibold px-8 py-3 rounded-md btn-press" data-testid="add-to-cart-btn">Add to Cart</button>
              </div>

              <div className="text-sm space-y-2 text-gray-600 mb-6">
                <div><span className="font-semibold">SKU:</span> {p.sku}</div>
                <div><span className="font-semibold">Category:</span> {p.category}</div>
                <div><span className="font-semibold">Tags:</span> {p.tags.join(", ")}</div>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-gray-200 pt-6">
                <div className="flex items-center gap-2"><Truck className="w-5 h-5 text-[#007D7B]" /><span className="text-xs">Free Shipping</span></div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-[#007D7B]" /><span className="text-xs">Quality Promise</span></div>
                <div className="flex items-center gap-2"><RotateCcw className="w-5 h-5 text-[#007D7B]" /><span className="text-xs">Easy Returns</span></div>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="flex gap-8 border-b border-gray-200">
              {["description", "reviews"].map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`pb-3 text-sm font-semibold uppercase tracking-wide ${tab===t ? 'text-[#007D7B] border-b-2 border-[#007D7B]' : 'text-gray-500'}`} data-testid={`tab-${t}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="py-6 text-gray-700 leading-relaxed">
              {tab === "description" && <p>{p.description}</p>}
              {tab === "reviews" && (
                <div className="space-y-4">
                  {[
                    { name: "Aarav Sharma", text: "Beautiful craftsmanship — feels premium & sustainable.", rating: 5 },
                    { name: "Priya Mehta", text: "Perfect for daily use, lightweight and durable.", rating: 4 },
                  ].map((r, i) => (
                    <div key={i} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{r.name}</span>
                        <div className="flex">
                          {[1,2,3,4,5].map(s => <Star key={s} className={`w-3.5 h-3.5 ${s<=r.rating?'fill-[#FFD600] text-[#FFD600]':'text-gray-300'}`} />)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Similar */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Items You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.similar.slice(0, 3).map((sp, i) => <ProductCard key={sp.id} product={sp} index={i} />)}
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default ProductDetail;