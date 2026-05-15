import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageTransition from "../components/common/PageTransition";
import { useCart } from "../context/CartContext";
import { productsApi } from "../services/api";
import ProductCard from "../components/common/ProductCard";

const Wishlist = () => {
  const { wishlist } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsApi.list({ limit: 100 }).then((d) => {
      setProducts(d.items.filter((p) => wishlist.includes(p.id)));
    });
  }, [wishlist]);

  return (
    <Layout>
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8" data-testid="wishlist-title">My Wishlist</h1>
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
              <Link to="/shop" className="bg-[#007D7B] text-white px-6 py-3 rounded-md font-semibold inline-block">Browse Products</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Wishlist;