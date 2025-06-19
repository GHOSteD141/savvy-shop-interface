import { useState } from "react";
import { Check, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BrandKit {
  id: string;
  name: string;
  color: string;
  description: string;
}

interface BrandKitSelectorProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

const BrandKitSelector = ({ currentTheme, onThemeChange }: BrandKitSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const brandKits: BrandKit[] = [
    {
      id: "ecorp",
      name: "ECorp",
      color: "#10b981", // green
      description: "Professional green theme for corporate environments"
    },
    {
      id: "icorp", 
      name: "ICorp",
      color: "#3b82f6", // blue
      description: "Dynamic blue theme for innovation-focused brands"
    },
    {
      id: "agency",
      name: "The Agency",
      color: "#8b5cf6", // purple
      description: "Creative purple theme for agencies and startups"
    },
    {
      id: "default",
      name: "Default",
      color: "#6b7280", // gray
      description: "Classic neutral theme for universal appeal"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="fixed bottom-20 right-4 bg-background/80 backdrop-blur-sm border-2 border-purple-400/50 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl z-50"
        >
          <Palette className="h-4 w-4 mr-2" />
          Brand Kits
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm border-2 border-purple-400/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Brand Kits
          </DialogTitle>
          <DialogDescription>
            Choose a brand kit to customize your experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          {brandKits.map((kit) => (
            <Card 
              key={kit.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                currentTheme === kit.id 
                  ? 'ring-2 ring-purple-400 bg-purple-50/50' 
                  : 'hover:bg-accent/50'
              }`}
              onClick={() => {
                onThemeChange(kit.id);
                setIsOpen(false);
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: kit.color }}
                    />
                    <div>
                      <div className="font-semibold">{kit.name}</div>
                      <div className="text-sm text-muted-foreground">{kit.description}</div>
                    </div>
                  </div>
                  
                  {currentTheme === kit.id && (
                    <Check className="h-5 w-5 text-purple-600" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Theme changes apply instantly across the platform
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BrandKitSelector;