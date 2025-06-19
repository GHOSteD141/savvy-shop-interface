import { useState } from "react";
import { Grid, List, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest gadgets and tech innovations",
    image: "photo-1498049794561-7780e7231661",
    productCount: 247,
    trending: true,
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Trendy clothing and accessories",
    image: "photo-1441986300917-64674bd600d8",
    productCount: 189,
    trending: true,
  },
  {
    id: "home",
    name: "Home & Garden",
    description: "Beautiful furniture and decor",
    image: "photo-1586023492125-27b2c045efd7",
    productCount: 156,
    trending: false,
  },
  {
    id: "beauty",
    name: "Beauty & Health",
    description: "Premium skincare and wellness",
    image: "photo-1522335789203-aabd1fc54bc9",
    productCount: 98,
    trending: true,
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    description: "Athletic gear and equipment",
    image: "photo-1571019613454-1cb2f99b2d8b",
    productCount: 134,
    trending: false,
  },
  {
    id: "books",
    name: "Books & Media",
    description: "Knowledge and entertainment",
    image: "photo-1481627834876-b7833e8f5570",
    productCount: 87,
    trending: false,
  },
];

const Categories = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  const sortedCategories = [...categories].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "products":
        return b.productCount - a.productCount;
      case "trending":
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      default:
        return 0;
    }
  });

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
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our carefully curated categories to find exactly what you're looking for
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-sm text-muted-foreground">
            {categories.length} categories available
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="products">Product Count</SelectItem>
                <SelectItem value="trending">Trending First</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {sortedCategories.map((category) => (
            <Card key={category.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${category.image}?auto=format&fit=crop&w=400&q=80`}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {category.trending && (
                  <Badge className="absolute top-4 left-4 bg-primary">
                    Trending
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {category.productCount} products
                  </span>
                  <Button variant="outline" size="sm">
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;