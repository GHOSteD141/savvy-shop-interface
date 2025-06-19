import { Brain, Zap, Target, Shield, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "🧠 Neural Shopping AI",
      description: "Mind-reading algorithms that predict your next purchase before you even think about it",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-900/20 to-pink-900/20"
    },
    {
      icon: Zap,
      title: "⚡ Quantum Speed",
      description: "Lightning-fast recommendations powered by quantum computing infrastructure",
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-900/20 to-blue-900/20"
    },
    {
      icon: Target,
      title: "🎯 Precision Targeting",
      description: "99.9% accuracy in predicting customer preferences using advanced behavioral analysis",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-900/20 to-emerald-900/20"
    },
    {
      icon: Shield,
      title: "🛡️ Secure Vault",
      description: "Military-grade encryption protecting your data with blockchain technology",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-900/20 to-red-900/20"
    },
    {
      icon: Rocket,
      title: "🚀 Future Commerce",
      description: "Experience tomorrow's shopping today with AR/VR integration and holographic displays",
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-900/20 to-purple-900/20"
    },
    {
      icon: Sparkles,
      title: "✨ Magic Moments",
      description: "Turn every purchase into an extraordinary experience with gamification and rewards",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-900/20 to-orange-900/20"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-bold mb-6">
            <Sparkles className="h-5 w-5 mr-2" />
            🔥 REVOLUTIONARY FEATURES
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            SUPERPOWERS FOR
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              SHOPPING GODS
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            🌟 Unleash the future of commerce with cutting-edge technology that makes science fiction reality
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:rotate-1`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glowing effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-500 blur-xl`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 animate-float`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="px-12 py-8 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 rounded-2xl shadow-2xl shadow-purple-500/50"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            🎉 Experience the Magic
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;