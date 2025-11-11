import { useState, useEffect } from "react";

const PREMIUM_KEY = "focusforge_premium";

export const usePremium = () => {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const premiumStatus = localStorage.getItem(PREMIUM_KEY) === "true";
    setIsPremium(premiumStatus);
  }, []);

  const unlockPremium = () => {
    localStorage.setItem(PREMIUM_KEY, "true");
    setIsPremium(true);
  };

  const lockPremium = () => {
    localStorage.setItem(PREMIUM_KEY, "false");
    setIsPremium(false);
  };

  return { isPremium, unlockPremium, lockPremium };
};
