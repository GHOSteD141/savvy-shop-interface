import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  sustainabilityScore?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onQuickView }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div
      className="group relative bg-gradient-to-br from-gray-900/80 to-purple-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/30 hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 transform hover:rotate-1 shadow-2xl hover:shadow-cyan-500/25"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-accent/10">
        <img
          src={`https://images.unsplash.com/${product.image}?w=400&h=400&fit=crop`}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Enhanced Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold animate-pulse border-0 shadow-lg shadow-purple-500/50">
              ✨ NEW
            </Badge>
          )}
          {product.isSale && (
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold animate-bounce border-0 shadow-lg shadow-red-500/50">
              🔥 SALE
            </Badge>
          )}
          {product.sustainabilityScore && product.sustainabilityScore > 80 && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold border-0 shadow-lg shadow-green-500/50">
              🌱 ECO
            </Badge>
          )}
        </div>

        {/* Enhanced Action buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-500 ${
          isHovered ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4'
        }`}>
          <Button
            size="icon"
            className={`h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 border-0 shadow-lg shadow-pink-500/50 transition-all duration-300 hover:scale-110 ${
              isFavorited ? 'animate-pulse' : ''
            }`}
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-white text-white animate-bounce' : 'text-white'}`} />
          </Button>
          <Button
            size="icon"
            className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 border-0 shadow-lg shadow-cyan-500/50 transition-all duration-300 hover:scale-110"
            onClick={() => onQuickView(product)}
          >
            <Eye className="h-5 w-5 text-white" />
          </Button>
        </div>

        {/* Enhanced quick add to cart overlay */}
        <div className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-purple-900/50 to-transparent transition-all duration-500 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl border-0 shadow-lg shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            🛒 Add to Cart
          </Button>
        </div>
      </div>

      {/* Enhanced Product info */}
      <div className="p-6 bg-gradient-to-t from-gray-900/50 to-transparent">
        <div className="text-sm font-medium text-cyan-400 mb-2 uppercase tracking-wider">
          {product.category}
        </div>
        <h3 className="font-bold text-white mb-3 line-clamp-2 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:bg-clip-text transition-all duration-300 text-lg">
          {product.name}
        </h3>
        
        {/* Enhanced Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 transition-all duration-200 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400 animate-pulse'
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-300 font-medium">
            {product.rating} ⭐ ({product.reviews} reviews)
          </span>
        </div>

        {/* Enhanced Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-sm bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full font-bold animate-pulse">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Enhanced Sustainability score */}
        {product.sustainabilityScore && (
          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-3 border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-400">🌱 Eco Score</span>
              <span className="text-sm font-bold text-green-300">{product.sustainabilityScore}/100</span>
            </div>
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${product.sustainabilityScore}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;