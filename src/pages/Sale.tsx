import { useState } from "react";
import { Clock, Percent, Tag, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface SaleProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  brand: string;
  discountPercent: number;
  timeLeft: string;
  stock: number;
  maxStock: number;
}

const saleProducts: SaleProduct[] = [
  {
    id: "sale-1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 299.99,
    image: "photo-1505740420928-5e560c06d30e",
    rating: 4.8,
    reviews: 2847,
    category: "Electronics",
    brand: "AudioTech",
    discountPercent: 33,
    timeLeft: "2d 14h 32m",
    stock: 15,
    maxStock: 50,
  },
  {
    id: "sale-2",
    name: "Luxury Leather Handbag",
    price: 399.99,
    originalPrice: 599.99,
    image: "photo-1553062407-98eeb64c6a62",
    rating: 4.9,
    reviews: 1543,
    category: "Fashion",
    brand: "LuxBrand",
    discountPercent: 33,
    timeLeft: "1d 8h 15m",
    stock: 8,
    maxStock: 25,
  },
  {
    id: "sale-3",
    name: "Smart Fitness Watch",
    price: 179.99,
    originalPrice: 249.99,
    image: "photo-1523275335684-37898b6baf30",
    rating: 4.6,
    reviews: 3921,
    category: "Electronics",
    brand: "FitTech",
    discountPercent: 28,
    timeLeft: "5h 42m",
    stock: 23,
    maxStock: 100,
  },
  {
    id: "sale-4",
    name: "Organic Cotton T-Shirt Bundle",
    price: 59.99,
    originalPrice: 89.99,
    image: "photo-1521572163474-6864f9cf17ab",
    rating: 4.7,
    reviews: 892,
    category: "Fashion",
    brand: "EcoWear",
    discountPercent: 33,
    timeLeft: "3d 22h 18m",
    stock: 47,
    maxStock: 80,
  },
  {
    id: "sale-5",
    name: "Professional Camera Lens",
    price: 649.99,
    originalPrice: 899.99,
    image: "photo-1502920917128-1aa500764cbd",
    rating: 4.9,
    reviews: 567,
    category: "Electronics",
    brand: "OpticsPro",
    discountPercent: 28,
    timeLeft: "12h 5m",
    stock: 5,
    maxStock: 15,
  },
  {
    id: "sale-6",
    name: "Designer Desk Collection",
    price: 299.99,
    originalPrice: 449.99,
    image: "photo-1507003211169-0a1dd7228f2d",
    rating: 4.5,
    reviews: 1234,
    category: "Home",
    brand: "DesignCo",
    discountPercent: 33,
    timeLeft: "6d 11h 27m",
    stock: 12,
    maxStock: 30,
  },
];

const Sale = () => {
  const [sortBy, setSortBy] = useState("discount");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["all", ...new Set(saleProducts.map(p => p.category))];

  const filteredProducts = saleProducts
    .filter(product => filterCategory === "all" || product.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "discount":
          return b.discountPercent - a.discountPercent;
        case "time":
          // Simple time comparison (in reality would parse the time strings)
          return a.timeLeft.localeCompare(b.timeLeft);
        default:
          return 0;
      }
    });

  const totalSavings = saleProducts.reduce((sum, product) => 
    sum + (product.originalPrice - product.price), 0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItems={0} 
        onCartClick={() => {}} 
        onThemeChange={() => {}} 
        currentTheme="default" 
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Tag className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Flash Sale</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Limited time offers on premium products. Save big while stocks last!
          </p>
          
          {/* Sale Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-4 text-center">
                <Percent className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">Up to 35%</div>
                <div className="text-sm text-muted-foreground">Max Discount</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Tag className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">${totalSavings.toFixed(0)}</div>
                <div className="text-sm text-muted-foreground">Total Savings</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{saleProducts.length}</div>
                <div className="text-sm text-muted-foreground">Items on Sale</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-sm text-muted-foreground">
            {filteredProducts.length} sale items available
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">Highest Discount</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="time">Ending Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Sale Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="relative">
              {/* Sale Badge */}
              <Badge className="absolute top-4 left-4 z-10 bg-red-500 hover:bg-red-600">
                -{product.discountPercent}%
              </Badge>
              
              <ProductCard
                product={product}
                onAddToCart={() => {}}
                onQuickView={() => {}}
              />
              
              {/* Additional Sale Info */}
              <Card className="mt-2 p-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Time left:</span>
                    <span className="font-medium text-red-500">{product.timeLeft}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Stock:</span>
                      <span className="font-medium">{product.stock} left</span>
                    </div>
                    <Progress 
                      value={(product.stock / product.maxStock) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No sale items found in this category.</p>
            <Button
              variant="outline"
              onClick={() => setFilterCategory("all")}
            >
              View All Sales
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Sale;