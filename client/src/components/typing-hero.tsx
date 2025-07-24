import { useEffect, useRef, useState } from "react";

interface TypingHeroProps {
  className?: string;
}

export function TypingHero({ className = "" }: TypingHeroProps) {
  const products = [
    "a mobile app",
    "a dashboard",
    "an admin panel",
    "a rapid prototype",
    "a landing page",
    "a API backend",
    "a blockchain app",
    "an A.I. assistant",
    "a SaaS platform",
    "a web application",
    "a microservice",
    "an automation tool",
    "an internal tool",
  ];

  const purposes = [
    "startup",
    "sales team",
    "client project",
    "demo day",
    "hobby project",
    "sales pitch",
    "product launch",
    "marketing team",
    "security team",
    "school project",
    "hackathon",
    "community event",
  ];

  const colors = [
    "text-red-500",
    "text-green-500",
    "text-yellow-500",
    "text-purple-500",
    "text-pink-500",
    "text-indigo-500",
    "text-orange-500",
    "text-teal-500",
    "text-cyan-500",
    "text-emerald-500",
    "text-violet-500",
    "text-fuchsia-500",
    "text-rose-500",
  ];

  // Calculate the longest possible text combinations
  const longestProduct = products.reduce((a, b) => a.length > b.length ? a : b);
  const longestPurpose = purposes.reduce((a, b) => a.length > b.length ? a : b);
  
  const [currentProduct, setCurrentProduct] = useState(0);
  const [currentPurpose, setCurrentPurpose] = useState(0);
  const [productText, setProductText] = useState("");
  const [purposeText, setPurposeText] = useState("");
  const [isTypingProduct, setIsTypingProduct] = useState(true);
  const [isTypingPurpose, setIsTypingPurpose] = useState(false);
  const [productColor, setProductColor] = useState(colors[Math.floor(Math.random() * colors.length)]);
  const [purposeColor, setPurposeColor] = useState(colors[Math.floor(Math.random() * colors.length)]);
  const [fontSize, setFontSize] = useState("1em");
  const placeholderRef = useRef<HTMLDivElement>(null);

  // Calculate optimal font size based on longest text combinations
  useEffect(() => {
    if (!placeholderRef.current) return;

    const element = placeholderRef.current;
    const computedStyle = window.getComputedStyle(element);
    const lineHeight = parseFloat(computedStyle.lineHeight);
    const maxHeight = lineHeight * 2; // 2 lines maximum

    // Start with base font size and scale down if needed
    let currentSize = 1;
    element.style.fontSize = `${currentSize}em`;

    // Check if the longest text fits in 2 lines
    while (element.scrollHeight > maxHeight && currentSize > 0.5) {
      currentSize -= 0.02;
      element.style.fontSize = `${currentSize}em`;
    }

    setFontSize(`${currentSize}em`);
  }, []); // Only run once on mount

  useEffect(() => {
    const productTarget = products[currentProduct];
    const purposeTarget = purposes[currentPurpose];

    let productIndex = 0;
    let purposeIndex = 0;
    let productTimer: NodeJS.Timeout;
    let purposeTimer: NodeJS.Timeout;

    // Type product
    const typeProduct = () => {
      if (productIndex <= productTarget.length) {
        setProductText(productTarget.slice(0, productIndex));
        productIndex++;
        productTimer = setTimeout(typeProduct, 100);
      } else {
        setIsTypingProduct(false);
        setIsTypingPurpose(true);
        // Start typing purpose after product is done
        setTimeout(() => {
          typePurpose();
        }, 500);
      }
    };

    // Type purpose
    const typePurpose = () => {
      if (purposeIndex <= purposeTarget.length) {
        setPurposeText(purposeTarget.slice(0, purposeIndex));
        purposeIndex++;
        purposeTimer = setTimeout(typePurpose, 100);
      } else {
        setIsTypingPurpose(false);
        // Wait 3 seconds then start over with new words
        setTimeout(() => {
          // Clear text and move to next words
          setProductText("");
          setPurposeText("");
          setCurrentProduct(Math.floor(Math.random() * products.length));
          setCurrentPurpose(Math.floor(Math.random() * purposes.length));
          // Set new random colors
          setProductColor(colors[Math.floor(Math.random() * colors.length)]);
          setPurposeColor(colors[Math.floor(Math.random() * colors.length)]);
          setIsTypingProduct(true);
        }, 3000);
      }
    };

    // Start typing product
    typeProduct();

    return () => {
      clearTimeout(productTimer);
      clearTimeout(purposeTimer);
    };
  }, [currentProduct, currentPurpose]);

  return (
    <div className={`${className} relative`}>
      {/* Invisible placeholder with longest possible text to calculate optimal font size */}
      <div 
        ref={placeholderRef}
        className="invisible absolute top-0 left-0 w-full pointer-events-none leading-tight -z-10"
        aria-hidden="true"
      >
        <div className="leading-tight">
          Build {longestProduct}
        </div>
        <div className="leading-tight">
          for your {longestPurpose}
        </div>
      </div>
      
      {/* Actual visible content with pre-calculated font size */}
      <h1 
        className="relative leading-tight z-10"
        style={{ fontSize }}
      >
        <div className="leading-tight">
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Build{" "}
          </span>
          <span className={productColor}>
            {productText}
            {isTypingProduct && <span className="animate-pulse">|</span>}
          </span>
        </div>
        <div className="leading-tight">
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            for your{" "}
          </span>
          <span className={purposeColor}>
            {purposeText}
            {isTypingPurpose && <span className="animate-pulse">|</span>}
          </span>
        </div>
      </h1>
    </div>
  );
}