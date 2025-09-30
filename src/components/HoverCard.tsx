import React, { useRef, useEffect, useState } from 'react';
import './HoverCard.css';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
}

const HoverCard: React.FC<HoverCardProps> = ({ 
  children, 
  className = '', 
  intensity = 0.1,
  scale = 1.05 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * intensity;
      const deltaY = (e.clientY - centerY) * intensity;
      
      setMousePosition({ x: deltaX, y: deltaY });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered, intensity]);

  return (
    <div
      ref={cardRef}
      className={`hover-card ${className}`}
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(${isHovered ? scale : 1})`,
        transition: isHovered ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {children}
    </div>
  );
};

export default HoverCard;
