import { useState } from "react";
import { Search, Star, Award, Verified } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const brands = [
  {
    id: "audiotech",
    name: "AudioTech",
    description: "Premium audio equipment and innovative sound solutions",
    logo: "photo-1611532736597-de2d4265fba3",
    rating: 4.8,
    products: 47,
    founded: 2015,
    category: "Electronics",
    verified: true,
    featured: true,
  },
  {
    id: "luxbrand",
    name: "LuxBrand",
    description: "Luxury fashion and accessories for the modern lifestyle",
    logo: "photo-1441986300917-64674bd600d8",
    rating: 4.9,
    products: 89,
    founded: 2010,
    category: "Fashion",
    verified: true,
    featured: true,
  },
  {
    id: "fittech",
    name: "FitTech",
    description: "Smart fitness technology for health enthusiasts",
    logo: "photo-1571019613454-1cb2f99b2d8b",
    rating: 4.6,
    products: 34,
    founded: 2018,
    category: "Electronics",
    verified: true,
    featured: false,
  },
  {
    id: "ecowear",
    name: "EcoWear",
    description: "Sustainable fashion made from organic materials",
    logo: "photo-1441984904996-e0b6ba687e04",
    rating: 4.7,
    products: 56,
    founded: 2019,
    category: "Fashion",
    verified: true,
    featured: false,
  },
  {
    id: "opticspro",
    name: "OpticsPro",
    description: "Professional photography and optical equipment",
    logo: "photo-1502920917128-1aa500764cbd",
    rating: 4.9,
    products: 23,
    founded: 2012,
    category: "Electronics",
    verified: true,
    featured: true,
  },
  {
    id: "designco",
    name: "DesignCo",
    description: "Modern furniture and home decor solutions",
    logo: "photo-1586023492125-27b2c045efd7",
    rating: 4.5,
    products: 67,
    founded: 2016,
    category: "Home",
    verified: false,
    featured: false,
  },
];

const Brands = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const categories = ["all", ...new Set(brands.map(b => b.category))];

  const filteredBrands = brands
    .filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           brand.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === "all" || brand.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "products":
          return b.products - a.products;
        case "newest":
          return b.founded - a.founded;
        case "featured":
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
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
          <h1 className="text-4xl font-bold mb-4">Premium Brands</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover trusted brands that deliver quality and innovation
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
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
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="products">Most Products</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {filteredBrands.length} of {brands.length} brands
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <Card key={brand.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage 
                      src={`https://images.unsplash.com/${brand.logo}?auto=format&fit=crop&w=64&q=80`}
                      alt={brand.name}
                    />
                    <AvatarFallback>{brand.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-xl">{brand.name}</CardTitle>
                      {brand.verified && (
                        <Verified className="h-4 w-4 text-primary" />
                      )}
                      {brand.featured && (
                        <Badge variant="secondary">
                          <Award className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{brand.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({brand.products} products)
                      </span>
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      {brand.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="mb-4">
                  {brand.description}
                </CardDescription>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Est. {brand.founded}
                  </span>
                  <Button variant="outline" size="sm">
                    View Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No brands found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setFilterCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Brands;