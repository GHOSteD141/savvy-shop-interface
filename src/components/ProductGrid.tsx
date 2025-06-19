import { useState, useMemo } from "react";
import { Filter, SlidersHorizontal, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 349.99,
    image: "photo-1505740420928-5e560c06d30e",
    rating: 4.8,
    reviews: 2847,
    category: "Electronics",
    brand: "AudioTech",
    isNew: true,
    sustainabilityScore: 85,
  },
  {
    id: "2",
    name: "Luxury Leather Handbag",
    price: 599.99,
    image: "photo-1553062407-98eeb64c6a62",
    rating: 4.9,
    reviews: 1543,
    category: "Fashion",
    brand: "LuxBrand",
    sustainabilityScore: 92,
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    price: 249.99,
    originalPrice: 299.99,
    image: "photo-1523275335684-37898b6baf30",
    rating: 4.6,
    reviews: 3921,
    category: "Electronics",
    brand: "FitTech",
    isSale: true,
    sustainabilityScore: 78,
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    price: 39.99,
    image: "photo-1521572163474-6864f9cf17ab",
    rating: 4.7,
    reviews: 892,
    category: "Fashion",
    brand: "EcoWear",
    sustainabilityScore: 95,
  },
  {
    id: "5",
    name: "Professional Camera Lens",
    price: 899.99,
    image: "photo-1502920917128-1aa500764cbd",
    rating: 4.9,
    reviews: 567,
    category: "Electronics",
    brand: "OpticsPro",
    isNew: true,
  },
  {
    id: "6",
    name: "Minimalist Desk Lamp",
    price: 129.99,
    image: "photo-1507003211169-0a1dd7228f2d",
    rating: 4.5,
    reviews: 1234,
    category: "Home",
    brand: "DesignCo",
    sustainabilityScore: 88,
  },
];

const ProductGrid = ({ onAddToCart, onQuickView }: ProductGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [showEcoFriendly, setShowEcoFriendly] = useState(false);

  const categories = [...new Set(mockProducts.map(p => p.category))];
  const brands = [...new Set(mockProducts.map(p => p.brand))];

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
      if (product.rating < minRating) return false;
      if (showEcoFriendly && (!product.sustainabilityScore || product.sustainabilityScore < 80)) return false;
      return true;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Keep original order for "featured"
        break;
    }

    return filtered;
  }, [mockProducts, priceRange, selectedCategories, selectedBrands, minRating, showEcoFriendly, sortBy]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Price Range</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Categories</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
              />
              <Label htmlFor={category} className="text-sm">{category}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Brands</Label>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
              />
              <Label htmlFor={brand} className="text-sm">{brand}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
        <Slider
          value={[minRating]}
          onValueChange={(value) => setMinRating(value[0])}
          max={5}
          step={0.5}
          className="mb-2"
        />
        <div className="text-sm text-muted-foreground">{minRating}+ stars</div>
      </div>

      {/* Sustainability */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="eco-friendly"
          checked={showEcoFriendly}
          onCheckedChange={(checked) => setShowEcoFriendly(!!checked)}
        />
        <Label htmlFor="eco-friendly" className="text-sm">Eco-Friendly Only</Label>
      </div>
    </div>
  );

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Discover our AI-curated selection</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
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

            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your search to find the perfect products
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-lg p-6 border">
              <h3 className="font-semibold mb-4 flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </h3>
              <FilterContent />
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {mockProducts.length} products
            </div>
            
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setPriceRange([0, 1000]);
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setMinRating(0);
                    setShowEcoFriendly(false);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
