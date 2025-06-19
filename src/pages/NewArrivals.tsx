import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ShoppingCart from "@/components/ShoppingCart";
import { Link } from "react-router-dom";
import { ChevronLeft, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  brand: string;
  isNew?: boolean;
  isSale?: boolean;
  sustainabilityScore?: number;
}

// Mock data for new arrivals
const newArrivalsProducts: Product[] = [
  {
    id: "new-1",
    name: "Quantum Mesh Sneakers",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    rating: 4.9,
    reviews: 127,
    category: "Footwear",
    brand: "FutureTech",
    isNew: true,
    isSale: true,
    sustainabilityScore: 95
  },
  {
    id: "new-2", 
    name: "Holographic Display Watch",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    rating: 4.8,
    reviews: 89,
    category: "Tech",
    brand: "ChronoLux",
    isNew: true,
    sustainabilityScore: 88
  },
  {
    id: "new-3",
    name: "Neural Interface Headphones",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    rating: 4.7,
    reviews: 203,
    category: "Audio",
    brand: "SoundWave",
    isNew: true,
    sustainabilityScore: 92
  },
  {
    id: "new-4",
    name: "Smart Fabric Jacket",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400", 
    rating: 4.6,
    reviews: 156,
    category: "Fashion",
    brand: "TechWear",
    isNew: true,
    sustainabilityScore: 87
  },
  {
    id: "new-5",
    name: "Levitating Desk Lamp",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 4.8,
    reviews: 94,
    category: "Home",
    brand: "LightLux",
    isNew: true,
    sustainabilityScore: 90
  },
  {
    id: "new-6",
    name: "Biometric Fitness Ring",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400",
    rating: 4.7,
    reviews: 178,
    category: "Health",
    brand: "VitalTech",
    isNew: true,
    sustainabilityScore: 93
  },
  {
    id: "new-7",
    name: "Molecular Gastronomy Kit",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    rating: 4.5,
    reviews: 67,
    category: "Kitchen",
    brand: "ChefMaster",
    isNew: true,
    sustainabilityScore: 85
  },
  {
    id: "new-8",
    name: "Telepathic Gaming Controller",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400",
    rating: 4.9,
    reviews: 312,
    category: "Gaming",
    brand: "MindLink",
    isNew: true,
    sustainabilityScore: 89
  }
];

const NewArrivals = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("all");

  // Theme configurations
  const themes = {
    default: {
      primary: "222.2 47.4% 11.2%",
      accent: "210 40% 96.1%",
    },
    ecorp: {
      primary: "0 0% 0%",
      accent: "0 0% 5%",
    },
    icorp: {
      primary: "210 100% 50%",
      accent: "210 100% 95%",
    },
    agency: {
      primary: "142 76% 36%",
      accent: "142 76% 95%",
    },
  };

  const applyTheme = (themeId: string) => {
    const theme = themes[themeId as keyof typeof themes];
    if (theme) {
      document.documentElement.style.setProperty('--primary', theme.primary);
      document.documentElement.style.setProperty('--accent', theme.accent);
      setCurrentTheme(themeId);
    }
  };

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.category,
      }]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuickView = (product: Product) => {
    console.log("Quick view:", product);
  };

  // Filter and sort products
  const filteredProducts = newArrivalsProducts
    .filter(product => filterCategory === "all" || product.category.toLowerCase() === filterCategory.toLowerCase())
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
        default:
          return 0; // Keep original order for newest
      }
    });

  const categories = ["all", ...Array.from(new Set(newArrivalsProducts.map(p => p.category.toLowerCase())))];

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItems={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onThemeChange={applyTheme}
        currentTheme={currentTheme}
      />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10"></div>
          <div className="container mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <ChevronLeft className="h-5 w-5" />
                Back to Home
              </Link>
            </div>
            
            <div className="text-center">
              <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                ✨ Fresh & Exclusive
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                NEW ARRIVALS
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                🚀 Discover the latest innovations and cutting-edge products that just landed in our store
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-8 px-4 border-b">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} of {newArrivalsProducts.length} products
                </p>
              </div>
              
              <div className="flex items-center gap-4 flex-wrap">
                {/* Category Filter */}
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex items-center gap-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid/List */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
              : "space-y-6"
            }>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">No products found in this category</p>
                <Button onClick={() => setFilterCategory("all")}>
                  Show All Products
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default NewArrivals;