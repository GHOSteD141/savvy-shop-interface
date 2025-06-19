import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  cartItems: number;
  onCartClick: () => void;
  onThemeChange: (theme: string) => void;
  currentTheme: string;
}

const Header = ({ cartItems, onCartClick, onThemeChange, currentTheme }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const themes = [
    { id: "default", name: "Elegance", primary: "hsl(222.2 47.4% 11.2%)" },
    { id: "ecorp", name: "ECorp", primary: "hsl(0 0% 0%)" },
    { id: "icorp", name: "ICorp", primary: "hsl(210 100% 50%)" },
    { id: "agency", name: "The Agency", primary: "hsl(142 76% 36%)" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent tracking-widest">
              s h o p z
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/new-arrivals" className="text-sm font-medium hover:text-primary transition-colors tracking-wider">N e w   A r r i v a l s</Link>
            <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">Categories</Link>
            <Link to="/brands" className="text-sm font-medium hover:text-primary transition-colors">Brands</Link>
            <Link to="/sale" className="text-sm font-medium hover:text-primary transition-colors">Sale</Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden lg:flex">
                  Theme
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border">
                {themes.map((theme) => (
                  <DropdownMenuItem
                    key={theme.id}
                    onClick={() => onThemeChange(theme.id)}
                    className={currentTheme === theme.id ? "bg-accent" : ""}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span>{theme.name}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 pr-4"
                />
              </div>
              <nav className="flex flex-col space-y-2">
                <Link to="/new-arrivals" className="py-2 text-sm font-medium hover:text-primary transition-colors tracking-wider">N e w   A r r i v a l s</Link>
                <Link to="/categories" className="py-2 text-sm font-medium hover:text-primary transition-colors">Categories</Link>
                <Link to="/brands" className="py-2 text-sm font-medium hover:text-primary transition-colors">Brands</Link>
                <Link to="/sale" className="py-2 text-sm font-medium hover:text-primary transition-colors">Sale</Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;