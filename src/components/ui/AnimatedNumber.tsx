import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedNumberProps {
  value: number | string;
  suffix?: string;
  duration?: number;
  once?: boolean;
}

export const AnimatedNumber = ({
  value,
  suffix = "",
  duration = 2,
  once = true,
}: AnimatedNumberProps) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    if (typeof value === "string") {
      setCount(value as any);
      return;
    }

    setIsAnimating(true);
    const end = value;
    const start = 0;
    const frames = duration * 60;
    const increment = end / frames;
    let current = start;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      current += increment;
      
      if (frame >= frames) {
        setCount(end);
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

    const formatNumber = (num: number | string) => {
      if (typeof num === "string") return num;
      
      // If we are animating, show the raw integer to prevent layout jumps with commas/suffixes
      if (isAnimating) return Math.floor(num).toString();

      if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
      if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
      if (num >= 1000) {
        if (num < 100000) return Math.floor(num).toLocaleString();
        return (num / 1000).toFixed(1) + "K";
      }
      return Math.floor(num).toString();
    };

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

