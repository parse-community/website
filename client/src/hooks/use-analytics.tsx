import { trackPageView } from "@/lib/analytics";
import { useEffect } from "react";
import { useLocation } from "wouter";

// Route to title mapping
const routeTitles: Record<string, string> = {
  "/": "Home",
  "/donations": "Donations",
  "/security": "Security", 
  "/extensions": "Extensions",
};

export const useAnalytics = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Track page view on route change
    const title = routeTitles[location] || location;
    trackPageView(location, title);
  }, [location]);
};
