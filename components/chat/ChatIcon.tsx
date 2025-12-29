import { MessageCircle } from "lucide-react";
import React from "react";

interface ChatIconProps {
    setIsChatOpen: (open: boolean) => void;
}
const ChatIcon = ({ setIsChatOpen }: ChatIconProps) => {
    return (
        <div>
  <>
          {/* Chat Button with Curved Text */}
          <div className="fixed bottom-6 right-6 z-50">
            {/* Outer Pulsing Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-20 h-20 bg-emerald-500/30 rounded-full animate-ping"></div>
              <div className="absolute w-24 h-24 bg-emerald-500/20 rounded-full animate-pulse"></div>
            </div>

            {/* Curved Text Wrapper */}
            <div className="relative w-32 h-32 flex items-center justify-center animate-spin-slow">
              {/* SVG for Curved Text */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                <defs>
                  <path
                    id="circlePath"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                  />
                </defs>
              </svg>

              {/* Center Button */}
              <button
                onClick={() => setIsChatOpen(true)}
                className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-10 group animate-bounce-subtle"
              >
                {/* Sparkle Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Chat Icon */}
                <div className="relative">
                  <MessageCircle className="w-7 h-7 text-white animate-wiggle" />
                  {/* Notification Dot */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
              </button>
            </div>

            {/* Speech Bubble */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 animate-bounce-in pointer-events-none">
              <div className="bg-white px-4 py-2 rounded-2xl shadow-xl border-2 border-emerald-500 whitespace-nowrap">
                <p className="text-sm font-semibold text-gray-900">💬 Chat with me!</p>
              </div>
              {/* Triangle pointer */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-emerald-500"></div>
            </div>
          </div>

          {/* Custom Animations */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes bounce-subtle {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-8px); }
            }
            @keyframes wiggle {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(-10deg); }
              75% { transform: rotate(10deg); }
            }
            @keyframes bounce-in {
              0% { opacity: 0; transform: translateY(10px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .animate-spin-slow {
              animation: spin-slow 10s linear infinite;
            }
            .animate-bounce-subtle {
              animation: bounce-subtle 2s ease-in-out infinite;
            }
            .animate-wiggle {
              animation: wiggle 1s ease-in-out infinite;
            }
            .animate-bounce-in {
              animation: bounce-in 0.3s ease-out;
            }
          `}} />
        </>        </div>
    );
};

export default ChatIcon;
