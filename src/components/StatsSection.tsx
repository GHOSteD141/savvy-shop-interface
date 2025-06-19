import { TrendingUp, Users, Zap, Award, Globe, Heart } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "2.5M+",
      label: "Happy Shoppers",
      description: "Mind-blown customers worldwide",
      color: "from-blue-400 to-cyan-400",
      bgGradient: "from-blue-900/30 to-cyan-900/30"
    },
    {
      icon: TrendingUp,
      number: "$1.2B",
      label: "Revenue Generated",
      description: "Through AI predictions",
      color: "from-green-400 to-emerald-400",
      bgGradient: "from-green-900/30 to-emerald-900/30"
    },
    {
      icon: Zap,
      number: "0.3s",
      label: "Response Time",
      description: "Quantum-speed recommendations",
      color: "from-yellow-400 to-orange-400",
      bgGradient: "from-yellow-900/30 to-orange-900/30"
    },
    {
      icon: Award,
      number: "50+",
      label: "Industry Awards",
      description: "For innovation excellence",
      color: "from-purple-400 to-pink-400",
      bgGradient: "from-purple-900/30 to-pink-900/30"
    },
    {
      icon: Globe,
      number: "195",
      label: "Countries Served",
      description: "Global AI commerce network",
      color: "from-indigo-400 to-purple-400",
      bgGradient: "from-indigo-900/30 to-purple-900/30"
    },
    {
      icon: Heart,
      number: "99.9%",
      label: "Satisfaction Rate",
      description: "Customers love our AI",
      color: "from-pink-400 to-red-400",
      bgGradient: "from-pink-900/30 to-red-900/30"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl animate-ping"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white text-sm font-bold mb-6 animate-pulse">
            ⚡ MIND-BLOWING STATS
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            CRUSHING THE
            <br />
            <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              COMPETITION
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            🎯 Numbers that prove we're not just another e-commerce platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 animate-fade-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Glowing border effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-30 rounded-3xl transition-opacity duration-500 blur-xl -z-10`}></div>
              
              <div className="text-center relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.color} rounded-full mb-6 animate-float group-hover:animate-bounce`}>
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                
                {/* Number */}
                <div className={`text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent animate-pulse`}>
                  {stat.number}
                </div>
                
                {/* Label */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                  {stat.label}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 font-medium">
                  {stat.description}
                </p>
                
                {/* Pulse effect on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl animate-ping opacity-20`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl text-white text-lg font-bold animate-rainbow hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => window.location.href = '/new-arrivals'}>
            🚀 Join the AI Revolution
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;