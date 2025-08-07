import React from "react";

interface GlitchTextProps {
  children: React.ReactNode;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = "",
}) => {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        textShadow: enableShadows ? "2px 0 red, -2px 0 blue" : "none",
        animation: enableOnHover ? "none" : `glitch ${speed}s infinite`,
      }}
      onMouseEnter={(e) => {
        if (enableOnHover) {
          (
            e.currentTarget as HTMLElement
          ).style.animation = `glitch ${speed}s infinite`;
        }
      }}
      onMouseLeave={(e) => {
        if (enableOnHover) {
          (e.currentTarget as HTMLElement).style.animation = "none";
        }
      }}
    >
      {children}
      <style jsx>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </span>
  );
};

export default GlitchText;
