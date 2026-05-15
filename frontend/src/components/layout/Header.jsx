import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Logo = () => (
  <Link to="/" className="flex items-center gap-2" data-testid="header-logo">
    <div className="relative w-10 h-10 rounded-full bg-[#F57C00] flex items-center justify-center shrink-0">
      <span className="text-white font-bold text-xl font-display italic">B</span>
      <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-[#4CAF50]" />
    </div>
    <div className="leading-tight">
      <div className="font-bold text-[#4CAF50] text-lg tracking-wide">BHARAT</div>
      <div className="text-[10px] text-gray-700 -mt-1 italic">Natural Jute LLP</div>
    </div>
  </Link>
);

const navItems = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-${n.label.toLowerCase().replace(' ','-')}`}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-[#007D7B] ${isActive ? 'text-[#007D7B]' : 'text-gray-700'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <button onClick={() => { logout(); navigate('/'); }} className="text-gray-700 hover:text-[#007D7B] flex items-center gap-1 text-sm" data-testid="logout-btn">
              <User className="w-5 h-5" /><span className="hidden sm:inline">{user.full_name?.split(' ')[0]}</span>
            </button>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-[#007D7B] relative" data-testid="login-link">
              <User className="w-5 h-5" />
              <span className="absolute -top-1 -right-2 text-[10px] bg-[#FFD600] text-black rounded-full w-3 h-3 flex items-center justify-center">!</span>
            </Link>
          )}
          <Link to="/wishlist" className="text-gray-700 hover:text-[#007D7B]" data-testid="wishlist-link">
            <Heart className="w-5 h-5" />
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-[#007D7B] relative" data-testid="cart-link">
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] bg-[#007D7B] text-white rounded-full w-4 h-4 flex items-center justify-center">{count}</span>
            )}
          </Link>
          <button className="md:hidden" onClick={() => setOpen(!open)} data-testid="mobile-menu-btn">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-2 flex flex-col">
            {navItems.map((n) => (
              <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)}
                className={({ isActive }) => `py-2 text-sm font-medium ${isActive ? 'text-[#007D7B]' : 'text-gray-700'}`}>
                {n.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
