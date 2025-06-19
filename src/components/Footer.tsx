import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new product launches, and personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button className="px-6">Subscribe</Button>
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">s h o p z</h4>
            <p className="text-muted-foreground mb-4">
              The future of intelligent e-commerce. Discover premium products with AI-powered personalization.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" onClick={() => window.open('https://facebook.com', '_blank')}>
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => window.open('https://twitter.com', '_blank')}>
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => window.open('https://instagram.com', '_blank')}>
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => window.open('https://youtube.com', '_blank')}>
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/new-arrivals" className="hover:text-foreground transition-colors">New Arrivals</Link></li>
              <li><Link to="/categories" className="hover:text-foreground transition-colors">Categories</Link></li>
              <li><Link to="/brands" className="hover:text-foreground transition-colors">Brands</Link></li>
              <li><Link to="/sale" className="hover:text-foreground transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><span className="hover:text-foreground transition-colors cursor-pointer" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>Browse Products</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to Top</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">123 Commerce St, Business District</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@luxestore.com</span>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-6">
              <h5 className="font-medium mb-2">Secure Shopping</h5>
              <div className="flex gap-2">
                <div className="bg-background border rounded px-2 py-1 text-xs">SSL</div>
                <div className="bg-background border rounded px-2 py-1 text-xs">256-bit</div>
                <div className="bg-background border rounded px-2 py-1 text-xs">Verified</div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 s h o p z. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="text-muted-foreground">Built with AI-powered innovation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;