import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, ShieldCheck, Truck, RotateCcw, HeadphonesIcon } from "lucide-react";
import Layout from "../components/layout/Layout";
import PageTransition from "../components/common/PageTransition";
import ProductCard from "../components/common/ProductCard";
import { productsApi } from "../services/api";
import { motion } from "framer-motion";

const HERO_BAG = "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1200";
const ABOUT_BAG = "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=900";

const RANGE_CARDS = [
  { name: "Jute Backpacks", img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600" },
  { name: "Hand-Painted Bags", img: "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=600" },
  { name: "Jute Drawstring/ Pouches", img: "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=600" },
  { name: "Jute Backpacks", img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600" },
  { name: "Jute Picnic Bags", img: "https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?w=600" },
  { name: "Jute Cosmetic Bags", img: "https://images.unsplash.com/photo-1572584642822-6f8de0243c93?w=600" },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   productsApi.list({ limit: 6 }).then((d) => setProducts(d.items));
  // }, []);

  useEffect(() => {
  productsApi.list({ limit: 6 })
    .then((d) => {

      if (d && d.items) {
        setProducts(d.items);
      } else {
        setProducts([]); 
      }
    })
    .catch((err) => {
      console.log("Backend not working");
      setProducts([]); 
    });
}, []);

  return (
    <Layout>
      <PageTransition>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="hero-gradient-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[560px]">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <img src={HERO_BAG} alt="Timeless jute essentials" className="w-full max-w-md mx-auto drop-shadow-2xl rounded-xl" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-white"
              >
                <div className="bg-white/95 rounded-full px-5 py-3 flex items-center gap-3 shadow-md max-w-md mb-10">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') window.location.href = `/shop?search=${encodeURIComponent(search)}`; }}
                    placeholder="What are you looking for?"
                    className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
                    data-testid="hero-search"
                  />
                </div>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mb-5">
                  TIMELESS JUTE<br />ESSENTIALS
                </h1>
                <p className="text-base text-white/90 max-w-md mb-8 leading-relaxed">
                  Sustainable jute products crafted for modern living and global markets.
                </p>
                <Link to="/shop" className="inline-flex items-center gap-2 bg-[#007D7B] hover:bg-[#006B69] text-white px-6 py-3 rounded-md font-semibold btn-press" data-testid="hero-explore-btn">
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <p className="text-gray-700 leading-relaxed mb-6">
              At Bharat Natural Jute, we create sustainable, eco-friendly products using 100% natural jute. Our range includes stylish and functional bags, home essentials, and gifting solutions—perfect for everyday use, special occasions, and bulk orders. From personalized designs to versatile lifestyle products, each piece is crafted to combine durability, aesthetics, and environmental responsibility.
            </p>
            <Link to="/about" className="inline-block bg-[#2D5A2A] hover:bg-[#234820] text-white px-6 py-3 rounded-md text-sm font-medium btn-press" data-testid="learn-more-btn">
              Learn more
            </Link>
          </motion.div>
          <motion.div initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:0.7}}>
            <img src={ABOUT_BAG} alt="Jute lifestyle" className="rounded-xl w-full max-w-sm mx-auto shadow-md" />
          </motion.div>
        </section>

        {/* Browse The Range */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 font-display">Browse The Range</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RANGE_CARDS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="bg-[#F5F1EA] rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 group"
                data-testid={`range-card-${i}`}
              >
                <div className="aspect-[4/3] mb-4 flex items-center justify-center overflow-hidden rounded-xl">
                  <img src={c.img} alt={c.name} className="max-h-44 object-contain group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                <h3 className="font-medium text-gray-900 mb-3">{c.name}</h3>
                <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider border border-gray-300 px-4 py-2 rounded-full hover:border-[#007D7B] hover:text-[#007D7B] transition-colors">
                  View All Bags <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 font-display">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>

        {/* Trust strip */}
        <section className="bg-[#FBF8F2] py-10 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, t: "High Quality", s: "100% Natural Jute" },
              { icon: Truck, t: "Free Shipping", s: "On orders over $50" },
              { icon: RotateCcw, t: "Easy Returns", s: "7-day money back" },
              { icon: HeadphonesIcon, t: "24/7 Support", s: "Always here for you" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3" data-testid={`trust-${i}`}>
                <f.icon className="w-8 h-8 text-[#007D7B]" />
                <div>
                  <div className="font-semibold text-sm text-gray-900">{f.t}</div>
                  <div className="text-xs text-gray-500">{f.s}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default Home;