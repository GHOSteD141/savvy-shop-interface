import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import ProductGrid from "@/components/ProductGrid";
import PersonalizedRecommendations from "@/components/PersonalizedRecommendations";
import ShoppingCart from "@/components/ShoppingCart";
import CustomerDashboard from "@/components/CustomerDashboard";
import Footer from "@/components/Footer";
import BrandKitSelector from "@/components/BrandKitSelector";
import LoadingScreen from "@/components/LoadingScreen";

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

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("default");
  const [showDashboard, setShowDashboard] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

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

  // Apply theme to CSS variables
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
    // This would typically open a modal with product details
    console.log("Quick view:", product);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setTimeout(() => setShowMainContent(true), 100);
  };

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          cartItems={cartItems.length}
          onCartClick={() => setIsCartOpen(true)}
          onThemeChange={applyTheme}
          currentTheme={currentTheme}
        />
        <div className="pt-16">
          <CustomerDashboard />
        </div>
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
  }

  return (
    <div className={`min-h-screen bg-background ${showMainContent ? 'animate-scale-in' : 'opacity-0'} transition-all duration-1000`}>
      <Header
        cartItems={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onThemeChange={applyTheme}
        currentTheme={currentTheme}
      />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <div id="products">
          <ProductGrid
            onAddToCart={handleAddToCart}
            onQuickView={handleQuickView}
          />
        </div>
        <PersonalizedRecommendations
          onAddToCart={handleAddToCart}
          onQuickView={handleQuickView}
        />
      </main>

      <Footer />

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Quick access to dashboard - would typically be in user menu */}
      <button
        onClick={() => setShowDashboard(true)}
        className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
        title="View Dashboard"
      >
        📊
      </button>
      
      {/* Brand Kit Selector */}
      <BrandKitSelector 
        currentTheme={currentTheme}
        onThemeChange={applyTheme}
      />
    </div>
  );
};

export default Index;
