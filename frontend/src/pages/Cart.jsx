import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageTransition from "../components/common/PageTransition";
import { useCart } from "../context/CartContext";
import { X, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Cart = () => {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = subtotal > 50 ? 0 : (items.length ? 5 : 0);
  const total = Math.max(0, subtotal + shipping - discount);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "JUTE10") {
      setDiscount(subtotal * 0.1);
      toast.success("Coupon applied — 10% off!");
    } else {
      toast.error("Invalid coupon");
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <PageTransition>
          <div className="max-w-3xl mx-auto px-4 py-24 text-center">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Discover our timeless jute essentials.</p>
            <Link to="/shop" className="bg-[#007D7B] hover:bg-[#006B69] text-white px-6 py-3 rounded-md font-semibold inline-block btn-press" data-testid="empty-cart-shop-btn">Continue Shopping</Link>
          </div>
        </PageTransition>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8" data-testid="cart-title">Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
            <div className="space-y-4" data-testid="cart-items">
              {items.map((it) => (
                <motion.div key={it.id} layout initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,x:-20}} className="flex items-center gap-4 border border-gray-100 rounded-xl p-4">
                  <Link to={`/product/${it.slug}`} className="w-24 h-24 rounded-lg overflow-hidden bg-[#F5EFE6] shrink-0">
                    <img src={it.image} alt="" className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{it.name}</h3>
                    <div className="text-sm text-gray-500">${it.price.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button onClick={()=>updateQty(it.id, it.quantity-1)} className="px-2 py-1.5"><Minus className="w-3 h-3" /></button>
                    <span className="w-8 text-center text-sm font-semibold">{it.quantity}</span>
                    <button onClick={()=>updateQty(it.id, it.quantity+1)} className="px-2 py-1.5"><Plus className="w-3 h-3" /></button>
                  </div>
                  <div className="font-semibold w-20 text-right">${(it.price*it.quantity).toFixed(2)}</div>
                  <button onClick={()=>removeItem(it.id)} className="text-gray-400 hover:text-red-500" data-testid={`remove-item-${it.id}`}><X className="w-5 h-5" /></button>
                </motion.div>
              ))}
            </div>

            <aside className="bg-[#FBF8F2] rounded-2xl p-6 h-fit">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm pb-4 border-b border-gray-200">
                <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                <Row label="Shipping" value={shipping ? `$${shipping.toFixed(2)}` : "Free"} />
                {discount > 0 && <Row label="Discount" value={`-$${discount.toFixed(2)}`} />}
              </div>
              <div className="flex items-center justify-between font-bold text-lg pt-4 mb-6">
                <span>Total</span><span data-testid="cart-total">${total.toFixed(2)}</span>
              </div>
              <div className="flex gap-2 mb-4">
                <input value={coupon} onChange={(e)=>setCoupon(e.target.value)} placeholder="Apply Coupon" className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm" data-testid="cart-coupon-input" />
                <button onClick={applyCoupon} className="bg-gray-900 text-white text-sm px-4 rounded-md btn-press" data-testid="cart-coupon-apply">Apply</button>
              </div>
              <button onClick={()=>navigate("/checkout")} className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-md btn-press" data-testid="cart-checkout-btn">
                Checkout
              </button>
            </aside>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between"><span className="text-gray-600">{label}</span><span className="font-medium">{value}</span></div>
);

export default Cart;