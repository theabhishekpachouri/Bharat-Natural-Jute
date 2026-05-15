import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageTransition from "../components/common/PageTransition";
import { useCart } from "../context/CartContext";
import { ordersApi } from "../services/api";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = ["Shopping cart", "Checkout details", "Order complete"];

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [step] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({
    full_name: "", email: "", phone: "", address: "", city: "", state: "", zip_code: "", country: "USA",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");

  const shippingCost = subtotal > 50 ? 0 : 5;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return <Layout><div className="py-24 text-center"><p>Your cart is empty.</p></div></Layout>;
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const order = await ordersApi.create({
        items: items.map((i) => ({ product_id: i.id, quantity: i.quantity })),
        shipping,
        payment_method: paymentMethod,
      });
      clear();
      navigate(`/order-complete/${order.id}`);
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Order failed");
    } finally { setLoading(false); }
  };

  return (
    <Layout>
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <Stepper current={step} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 mt-10">
            <motion.form initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} onSubmit={placeOrder} className="space-y-6" data-testid="checkout-form">
              <Section title="Contact Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" value={shipping.full_name} onChange={(v)=>setShipping({...shipping, full_name:v})} testId="ck-full-name" />
                  <Field label="Email" type="email" value={shipping.email} onChange={(v)=>setShipping({...shipping, email:v})} testId="ck-email" />
                  <Field label="Phone" value={shipping.phone} onChange={(v)=>setShipping({...shipping, phone:v})} testId="ck-phone" />
                </div>
              </Section>
              <Section title="Shipping Address">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Address" value={shipping.address} onChange={(v)=>setShipping({...shipping, address:v})} testId="ck-address" />
                  <Field label="City" value={shipping.city} onChange={(v)=>setShipping({...shipping, city:v})} testId="ck-city" />
                  <Field label="State" value={shipping.state} onChange={(v)=>setShipping({...shipping, state:v})} testId="ck-state" />
                  <Field label="ZIP Code" value={shipping.zip_code} onChange={(v)=>setShipping({...shipping, zip_code:v})} testId="ck-zip" />
                </div>
              </Section>
              <Section title="Payment Method">
                <div className="space-y-3">
                  {[
                    { id: "card", label: "Pay by Credit/Debit Card", icons: "💳 Visa · Mastercard · Amex" },
                    { id: "upi", label: "UPI", icons: "Google Pay · PhonePe · Paytm" },
                  ].map((m) => (
                    <label key={m.id} className={`flex items-center gap-3 border rounded-md p-4 cursor-pointer transition-colors ${paymentMethod===m.id ? 'border-[#007D7B] bg-[#F0FAFA]' : 'border-gray-200'}`}>
                      <input type="radio" name="payment" value={m.id} checked={paymentMethod===m.id} onChange={()=>setPaymentMethod(m.id)} data-testid={`pm-${m.id}`} />
                      <div>
                        <div className="font-semibold text-sm">{m.label}</div>
                        <div className="text-xs text-gray-500">{m.icons}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </Section>
              <button type="submit" disabled={loading} className="w-full bg-[#2D5A2A] hover:bg-[#234820] text-white font-semibold py-3 rounded-md btn-press disabled:opacity-60" data-testid="place-order-btn">
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </motion.form>

            <aside className="bg-[#FBF8F2] rounded-2xl p-6 h-fit">
              <h3 className="font-bold text-lg mb-4">Your Order</h3>
              <div className="space-y-3 pb-4 border-b border-gray-200">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center gap-3 text-sm">
                    <img src={it.image} alt="" className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1">
                      <div className="font-medium">{it.name}</div>
                      <div className="text-xs text-gray-500">x{it.quantity}</div>
                    </div>
                    <div className="font-semibold">${(it.price*it.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm pt-4">
                <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                <Row label="Shipping" value={shippingCost ? `$${shippingCost.toFixed(2)}` : "Free"} />
                <div className="flex items-center justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

const Stepper = ({ current }) => (
  <div className="flex items-center justify-center gap-3 sm:gap-6 max-w-2xl mx-auto" data-testid="checkout-stepper">
    {STEPS.map((s, i) => (
      <React.Fragment key={s}>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i <= current ? 'bg-[#007D7B] text-white' : 'bg-gray-200 text-gray-500'}`}>
            {i < current ? <Check className="w-4 h-4" /> : i + 1}
          </div>
          <span className={`text-sm ${i <= current ? 'font-semibold text-gray-900' : 'text-gray-500'} hidden sm:inline`}>{s}</span>
        </div>
        {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 ${i < current ? 'bg-[#007D7B]' : 'bg-gray-200'}`} />}
      </React.Fragment>
    ))}
  </div>
);

const Section = ({ title, children }) => (
  <div className="border border-gray-100 rounded-xl p-5">
    <h3 className="font-bold text-base mb-4">{title}</h3>{children}
  </div>
);

const Field = ({ label, type="text", value, onChange, testId }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
    <input required type={type} value={value} onChange={(e)=>onChange(e.target.value)}
      className="w-full bg-gray-100 focus:bg-white focus:border-[#007D7B] border border-transparent rounded-md px-3 py-2.5 text-sm outline-none" data-testid={testId} />
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between"><span className="text-gray-600">{label}</span><span className="font-medium">{value}</span></div>
);

export default Checkout;