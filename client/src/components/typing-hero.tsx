import { useEffect, useState } from "react";

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
  ];

  const purposes = [
    "startup",
    "sales team",
    "internal tool",
    "client project",
    "demo day",
    "hobby project",
    "sales pitch",
    "product launch",
    "marketing team",
    "university project",
    "hackathon",
  ];

  const [currentProduct, setCurrentProduct] = useState(0);
  const [currentPurpose, setCurrentPurpose] = useState(0);
  const [productText, setProductText] = useState("");
  const [purposeText, setPurposeText] = useState("");
  const [isTypingProduct, setIsTypingProduct] = useState(true);
  const [isTypingPurpose, setIsTypingPurpose] = useState(false);

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
    <h1 className={className}>
      <div>
        Build{" "}
        <span className="text-primary">
          {productText}
          {isTypingProduct && <span className="animate-pulse">|</span>}
        </span>
      </div>
      <div>
        for your{" "}
        <span className="text-blue-600">
          {purposeText}
          {isTypingPurpose && <span className="animate-pulse">|</span>}
        </span>
      </div>
    </h1>
  );
}