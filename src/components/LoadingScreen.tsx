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
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      {/* Percentage in bottom left */}
      <div className="absolute bottom-8 left-8 text-white text-xl font-mono">
        {progress.toString().padStart(3, '0')}%
      </div>
      
      {/* Central loading box */}
      <div className="relative w-64 h-32 perspective-1000">
        <div 
          className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-500 relative overflow-hidden"
          style={{
            clipPath: `inset(0 ${100 - progress}% 0 0)`
          }}
        >
          {/* Loading fill effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-200 opacity-90" />
        </div>
        
        {/* Box outline */}
        <div className="absolute inset-0 border-2 border-gray-400" />
      </div>
    </div>
  );
};

const LogoAnimation = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-64 h-32 perspective-1000">
        {/* Left half - folds 90 degrees */}
        <div 
          className="absolute left-0 top-0 w-32 h-32 bg-gradient-to-r from-gray-300 to-gray-400 origin-right"
          style={{
            transformStyle: 'preserve-3d',
            animation: 'foldLeft 1s ease-out forwards'
          }}
        />
        
        {/* Right half - stays in place */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-r from-gray-400 to-gray-500" />
        
        {/* Box outline */}
        <div className="absolute inset-0 border-2 border-gray-400" />
        
        {/* Completion indicator */}
        <div className="absolute bottom-8 left-8 text-white text-xl font-mono">
          100%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;