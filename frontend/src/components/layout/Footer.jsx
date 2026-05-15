import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { contactApi } from "../../services/api";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await contactApi.newsletter(email);
      toast.success("Subscribed to newsletter!");
      setEmail("");
    } catch { toast.error("Subscribe failed"); } finally { setLoading(false); }
  };

  return (
    <footer className="bg-white border-t border-gray-100 mt-12" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h4 className="font-bold text-lg text-gray-900 mb-3">Bharat Natural Jute</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            400 University Drive Suite 200<br />Coral Gables,<br />FL 33134 USA
          </p>
        </div>
        <div>
          <h5 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Links</h5>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="text-gray-700 hover:text-[#007D7B]">Home</Link></li>
            <li><Link to="/shop" className="text-gray-700 hover:text-[#007D7B]">Shop</Link></li>
            <li><Link to="/about" className="text-gray-700 hover:text-[#007D7B]">About Us</Link></li>
            <li><Link to="/blog" className="text-gray-700 hover:text-[#007D7B]">Blog</Link></li>
            <li><Link to="/contact" className="text-gray-700 hover:text-[#007D7B]">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Help</h5>
          <ul className="space-y-3 text-sm">
            <li className="text-gray-700">Payment Options</li>
            <li className="text-gray-700">Return & Exchange</li>
            <li className="text-gray-700">Privacy & Policy</li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Newsletter</h5>
          <form onSubmit={subscribe} className="flex items-center gap-2 border-b border-gray-300 pb-2" data-testid="newsletter-form">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Address"
              className="flex-1 bg-transparent text-sm placeholder-gray-400 outline-none py-1"
              data-testid="newsletter-email"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2D5A2A] text-white text-xs uppercase tracking-wider px-4 py-2 rounded hover:bg-[#234820] btn-press"
              data-testid="newsletter-submit"
            >
              {loading ? '...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-gray-500">
          {new Date().getFullYear()} Bharat Natural Jute. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;