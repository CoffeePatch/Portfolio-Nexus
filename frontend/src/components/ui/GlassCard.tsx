import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "sidebar";
}

export const GlassCard = ({ children, className = "", variant = "primary" }: GlassCardProps) => {
  const baseStyles = "relative overflow-hidden transition-all duration-300";
  
  const radius = "rounded-[32px]";
  
  const bgStyle = variant === "primary" 
    ? "bg-[#121212] border border-[#2a2a2a]" 
    : "bg-[#0a0a0a] border-l border-[#222]";

  return (
    <div className={`${baseStyles} ${radius} ${bgStyle} ${className}`}>
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};
