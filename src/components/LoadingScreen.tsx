import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowLogo(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showLogo) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLogo, onComplete]);

  if (showLogo) {
    return <LogoAnimation />;
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="text-center mb-8">
        <div className="text-8xl md:text-9xl font-bold text-white mb-8 font-mono tracking-wider">
          {progress.toString().padStart(3, '0')}
        </div>
        
        <div className="w-80 md:w-96 h-2 bg-gray-800 rounded-full mx-auto">
          <div 
            className="h-full bg-white rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const LogoAnimation = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-64 h-64">
        {/* Animated geometric shapes forming logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* First shape - vertical rectangle */}
            <div 
              className="absolute bg-gradient-to-b from-white to-gray-300 transform transition-all duration-1000 ease-out"
              style={{
                width: '40px',
                height: '120px',
                top: '-60px',
                left: '-20px',
                opacity: 0,
                animation: 'fadeInSlide 1s ease-out 0.5s forwards'
              }}
            />
            
            {/* Second shape - horizontal rectangle */}
            <div 
              className="absolute bg-gradient-to-r from-gray-300 to-gray-500 transform transition-all duration-1000 ease-out"
              style={{
                width: '80px',
                height: '40px',
                top: '20px',
                left: '20px',
                opacity: 0,
                animation: 'fadeInSlide 1s ease-out 1s forwards'
              }}
            />

            {/* Third shape - diagonal accent */}
            <div 
              className="absolute bg-gradient-to-br from-purple-500 to-pink-500 transform transition-all duration-1000 ease-out rotate-45"
              style={{
                width: '20px',
                height: '60px',
                top: '-10px',
                left: '40px',
                opacity: 0,
                animation: 'fadeInSlide 1s ease-out 1.5s forwards'
              }}
            />
          </div>
        </div>

        {/* Pulsing glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default LoadingScreen;