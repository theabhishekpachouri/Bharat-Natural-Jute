import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageTransition from "../components/common/PageTransition";
import { ordersApi } from "../services/api";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const OrderComplete = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    ordersApi.get(orderId).then(setOrder).catch(()=>{});
  }, [orderId]);

  return (
    <Layout>
      <PageTransition>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring", stiffness:200, damping:15}}
            className="w-20 h-20 rounded-full bg-[#2D5A2A] mx-auto flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-display font-semibold mb-3" data-testid="order-complete-title">Complete!</h1>
          <p className="text-lg text-gray-600 mb-2">Thank You! Your order has been received.</p>
          {order && (
            <div className="bg-[#FBF8F2] rounded-2xl p-6 mt-8 text-left" data-testid="order-summary">
              <div className="flex flex-wrap justify-between gap-3 text-sm mb-6">
                <div><div className="text-gray-500">Order Number</div><div className="font-bold">#{order.id.slice(0,8).toUpperCase()}</div></div>
                <div><div className="text-gray-500">Date</div><div className="font-bold">{new Date(order.created_at).toLocaleDateString()}</div></div>
                <div><div className="text-gray-500">Total</div><div className="font-bold">${order.total.toFixed(2)}</div></div>
                <div><div className="text-gray-500">Payment</div><div className="font-bold capitalize">{order.payment_method}</div></div>
              </div>
              <div className="space-y-3">
                {order.items.map((it, i) => (
                  <div key={i} className="flex items-center gap-3 border-t border-gray-200 pt-3">
                    <img src={it.image} alt="" className="w-14 h-14 rounded object-cover" />
                    <div className="flex-1 text-sm"><div className="font-medium">{it.name}</div><div className="text-xs text-gray-500">x{it.quantity}</div></div>
                    <div className="font-semibold text-sm">${it.line_total.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/shop" className="bg-[#007D7B] hover:bg-[#006B69] text-white px-6 py-3 rounded-md font-semibold btn-press" data-testid="continue-shopping">Continue Shopping</Link>
            <Link to="/" className="border border-gray-300 hover:border-[#007D7B] hover:text-[#007D7B] px-6 py-3 rounded-md font-semibold btn-press">Back to Home</Link>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default OrderComplete;