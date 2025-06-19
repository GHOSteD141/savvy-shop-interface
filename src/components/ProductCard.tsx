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
      className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
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
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <Badge className="bg-primary">New</Badge>}
          {product.isSale && <Badge variant="destructive">Sale</Badge>}
          {product.sustainabilityScore && product.sustainabilityScore > 80 && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Eco-Friendly
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8"
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8"
            onClick={() => onQuickView(product)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick add to cart overlay */}
        <div className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent transition-transform duration-300 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
        <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-card-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-sm text-green-600 font-medium">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
            </span>
          )}
        </div>

        {/* Sustainability score */}
        {product.sustainabilityScore && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex-1 bg-muted rounded-full h-1">
              <div
                className="bg-green-500 h-1 rounded-full"
                style={{ width: `${product.sustainabilityScore}%` }}
              />
            </div>
            <span>Eco Score: {product.sustainabilityScore}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;