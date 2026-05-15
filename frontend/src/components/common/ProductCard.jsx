import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

const KW_COLORS = ["bg-[#FFE9A6] text-[#8a6d00]", "bg-[#C7E8C5] text-[#2D5A2A]", "bg-[#FFD2C9] text-[#a8341f]", "bg-[#FFE9A6] text-[#8a6d00]"];

const ProductCard = ({ product, index = 0 }) => {
  const { addItem, toggleWishlist, inWishlist } = useCart();

  const onBuy = () => {
    addItem(product, 1);
    toast.success(`${product.name} added — proceed to cart`);
  };
  const onAdd = () => {
    addItem(product, 1);
    toast.success(`Added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
      className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-4 relative group"
      data-testid={`product-card-${product.slug}`}
    >
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
        data-testid={`wishlist-toggle-${product.slug}`}
      >
        <Heart className={`w-5 h-5 ${inWishlist(product.id) ? 'fill-[#007D7B] text-[#007D7B]' : 'text-gray-400'}`} />
      </button>
      <Link to={`/product/${product.slug}`} className="block">
        <div className="aspect-[4/3] flex items-center justify-center overflow-hidden rounded-xl mb-3">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
        <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-relaxed">{product.description.slice(0, 80)}…</p>
        <div className="flex items-center gap-1 mb-2 flex-wrap">
          <span className="text-[10px] font-medium text-gray-500 mr-1">Keywords:</span>
          {product.keywords.slice(0, 3).map((k, i) => (
            <span key={k} className={`text-[10px] px-2 py-0.5 rounded-full ${KW_COLORS[i % KW_COLORS.length]}`}>{k}</span>
          ))}
        </div>
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map((s) => (
            <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(product.rating) ? 'fill-[#FFD600] text-[#FFD600]' : 'text-gray-300'}`} />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviews_count})</span>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-2 mt-3">
        <div className="text-2xl font-bold text-gray-900">${product.price}</div>
        <div className="flex items-center gap-2">
          <button onClick={onBuy} className="bg-[#FFD600] hover:bg-[#FFC700] text-black text-xs font-semibold px-4 py-2 rounded-md btn-press" data-testid={`buy-now-${product.slug}`}>Buy Now</button>
          <button onClick={onAdd} className="border border-gray-300 hover:border-[#007D7B] hover:text-[#007D7B] text-xs font-medium px-3 py-2 rounded-md btn-press" data-testid={`add-cart-${product.slug}`}>Add To Cart</button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
