import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Component that automatically scrolls to top when the route changes.
 * Should be placed inside the Router component to detect route changes.
 */
export function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    } else {
      // If there's a hash, let the browser handle scrolling to the anchor
      // We need a small delay to ensure the page content is rendered
      setTimeout(() => {
        const element = document.getElementById(window.location.hash.substring(1));
        if (element) {
          // Calculate offset to account for fixed navigation bar (64px height + some padding)
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);

  // This component doesn't render anything
  return null;
}
