import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Component that automatically scrolls to top when the route changes.
 * Should be placed inside the Router component to detect route changes.
 */
export function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Scroll to top whenever the location changes
    window.scrollTo(0, 0);
  }, [location]);

  // This component doesn't render anything
  return null;
}
