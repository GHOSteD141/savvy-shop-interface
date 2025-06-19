import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Zap, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-500/20" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full blur-3xl animate-bounce opacity-30" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-2xl animate-ping opacity-20" style={{ animationDelay: '1s' }} />
        
        {/* Floating icons */}
        <div className="absolute top-20 left-20 animate-float">
          <Sparkles className="h-8 w-8 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <div className="absolute top-32 right-32 animate-float" style={{ animationDelay: '1s' }}>
          <Zap className="h-10 w-10 text-cyan-400 animate-pulse" />
        </div>
        <div className="absolute bottom-32 left-32 animate-float" style={{ animationDelay: '2s' }}>
          <Star className="h-6 w-6 text-pink-400 animate-spin" style={{ animationDuration: '4s' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-medium animate-pulse">
            <Sparkles className="h-4 w-4 mr-2" />
            🚀 HACKATHON SPECIAL
          </div>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in leading-tight">
          NEXT-GEN
          <br />
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            AI COMMERCE
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in font-light" style={{ animationDelay: '0.3s' }}>
          🔥 Revolutionary shopping experience with <span className="text-cyan-400 font-semibold">quantum AI</span> predictions
          <br />
          ⚡ Real-time personalization that reads your mind
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button size="lg" className="px-10 py-8 text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-110 transition-all duration-300 rounded-2xl shadow-2xl shadow-purple-500/50">
            🚀 Launch Shopping
          </Button>
          <Button variant="outline" size="lg" className="px-10 py-8 text-xl font-bold border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transform hover:scale-110 transition-all duration-300 rounded-2xl">
            🎯 Explore AI Magic
          </Button>
        </div>

        {/* Enhanced metrics with neon effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="text-center bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-3xl p-6 border border-purple-500/30 hover:border-purple-400 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 animate-pulse">10M+</div>
            <div className="text-gray-300 font-medium">🛍️ Products in AI Database</div>
          </div>
          <div className="text-center bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-3xl p-6 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 animate-pulse">99.9%</div>
            <div className="text-gray-300 font-medium">⭐ Mind-Reading Accuracy</div>
          </div>
          <div className="text-center bg-gradient-to-br from-yellow-900/50 to-orange-900/50 rounded-3xl p-6 border border-yellow-500/30 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2 animate-pulse">⚡ AI</div>
            <div className="text-gray-300 font-medium">🧠 Quantum Predictions</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;