import { useState } from "react";
import { Sparkles, TrendingUp, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./ProductCard";

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

interface PersonalizedRecommendationsProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

// Mock recommendation data
const recommendations = {
  aiPowered: [
    {
      id: "ai1",
      name: "Smart Home Hub Pro",
      price: 199.99,
      image: "photo-1558618666-fcd25c85cd64",
      rating: 4.7,
      reviews: 892,
      category: "Electronics",
      brand: "SmartTech",
      isNew: true,
      sustainabilityScore: 82,
    },
    {
      id: "ai2",
      name: "Ergonomic Office Chair",
      price: 449.99,
      originalPrice: 599.99,
      image: "photo-1586023492125-27b2c045efd7",
      rating: 4.8,
      reviews: 1243,
      category: "Furniture",
      brand: "ComfortCo",
      isSale: true,
      sustainabilityScore: 90,
    },
    {
      id: "ai3",
      name: "Premium Coffee Maker",
      price: 299.99,
      image: "photo-1495474472287-4d71bcdd2085",
      rating: 4.6,
      reviews: 567,
      category: "Appliances",
      brand: "BrewMaster",
      sustainabilityScore: 75,
    },
  ],
  trending: [
    {
      id: "t1",
      name: "Wireless Charging Pad",
      price: 49.99,
      image: "photo-1580649415019-122032824c80",
      rating: 4.5,
      reviews: 2341,
      category: "Electronics",
      brand: "ChargeFast",
      sustainabilityScore: 85,
    },
    {
      id: "t2",
      name: "Sustainable Water Bottle",
      price: 29.99,
      image: "photo-1602143407151-7111542de6e8",
      rating: 4.9,
      reviews: 892,
      category: "Lifestyle",
      brand: "EcoBottle",
      sustainabilityScore: 98,
    },
  ],
  recent: [
    {
      id: "r1",
      name: "Bluetooth Speaker Mini",
      price: 79.99,
      image: "photo-1608043152269-423dbba4e7e1",
      rating: 4.4,
      reviews: 1567,
      category: "Electronics",
      brand: "SoundWave",
      sustainabilityScore: 70,
    },
  ],
  personal: [
    {
      id: "p1",
      name: "Meditation Cushion Set",
      price: 89.99,
      image: "photo-1593812623322-4a8e3a0a8c80",
      rating: 4.8,
      reviews: 434,
      category: "Wellness",
      brand: "ZenLife",
      sustainabilityScore: 95,
    },
    {
      id: "p2",
      name: "Plant-Based Protein Powder",
      price: 39.99,
      image: "photo-1571019613531-2a66e1ac9b41",
      rating: 4.7,
      reviews: 1789,
      category: "Health",
      brand: "GreenProtein",
      sustainabilityScore: 92,
    },
  ],
};

const PersonalizedRecommendations = ({ onAddToCart, onQuickView }: PersonalizedRecommendationsProps) => {
  const [activeTab, setActiveTab] = useState("ai");

  return (
    <section className="py-16 bg-gradient-to-br from-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Personalized for You</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI analyzes your preferences, browsing history, and purchase patterns to curate the perfect product recommendations just for you.
          </p>
        </div>

        {/* AI Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">AI Prediction Score</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary mb-1">94%</div>
              <CardDescription>
                Likelihood you'll love our recommendations based on your profile
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Sustainability Match</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-1">89%</div>
              <CardDescription>
                Your eco-friendly preferences aligned with sustainable products
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Time Saved</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-1">2.5h</div>
              <CardDescription>
                Average time saved per week with personalized recommendations
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Recommendation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">AI Picks</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Trending</span>
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Recently Viewed</span>
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">For You</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">AI-Powered Recommendations</h3>
              <p className="text-muted-foreground">
                Products selected by our advanced AI based on your unique preferences and behavior patterns
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.aiPowered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Trending Now</h3>
              <p className="text-muted-foreground">
                Popular products that are making waves in your interests
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.trending.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Recently Viewed</h3>
              <p className="text-muted-foreground">
                Pick up where you left off with these recently browsed items
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.recent.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Curated for Your Lifestyle</h3>
              <p className="text-muted-foreground">
                Products that align with your personal interests and values
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.personal.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="px-8">
            View All Recommendations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedRecommendations;