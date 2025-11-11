import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Crown, Lock, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { usePremium } from "@/hooks/usePremium";
import { validatePromoCode } from "@/lib/promoCode";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Settings = () => {
  const navigate = useNavigate();
  const { isPremium, unlockPremium } = usePremium();
  const [promoCode, setPromoCode] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const handleUnlock = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    if (validatePromoCode(promoCode)) {
      unlockPremium();
      toast.success("🎉 Premium unlocked! Enjoy all features!");
      setPromoCode("");
    } else {
      toast.error("Invalid promo code. Please check and try again.");
    }
  };

  const premiumFeatures = [
    {
      name: "DeepFocus Mode",
      description: "Extended sessions with advanced analytics and custom durations",
      icon: "🎯",
    },
    {
      name: "Custom AI Coach Voice",
      description: "Choose your preferred coaching style: Calm, Energetic, or Disciplined",
      icon: "🎭",
    },
    {
      name: "FocusStreaks Dashboard",
      description: "Track consecutive focus days with detailed insights and trends",
      icon: "🔥",
    },
    {
      name: "Priority Support",
      description: "Get help faster with dedicated premium support",
      icon: "⚡",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and unlock premium features
          </p>
        </div>

        {/* Premium Status */}
        <Card className={`p-6 mb-6 ${isPremium ? "bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30" : ""}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${isPremium ? "bg-accent/20" : "bg-muted"}`}>
                <Crown className={`w-6 h-6 ${isPremium ? "text-accent" : "text-muted-foreground"}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {isPremium ? "Premium Active" : "Free Plan"}
                </h2>
                <p className="text-muted-foreground">
                  {isPremium
                    ? "You have access to all premium features"
                    : "Unlock premium features with a promo code"}
                </p>
              </div>
            </div>
            {isPremium && (
              <Check className="w-6 h-6 text-accent" />
            )}
          </div>
        </Card>

        {/* Premium Features */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Premium Features
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {premiumFeatures.map((feature, index) => (
              <Card
                key={index}
                className={`p-4 ${isPremium ? "border-accent/20" : "opacity-60"}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{feature.name}</h4>
                      {!isPremium && <Lock className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Unlock Section */}
        {!isPremium && (
          <Card className="p-6 border-primary/20">
            <h3 className="text-xl font-semibold mb-4">Unlock Premium</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Enter Promo Code
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="FF-PREMIUM-XXXX-XXXX-XXXX"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                    className="font-mono"
                  />
                  <Button onClick={handleUnlock} className="gap-2">
                    <Crown className="w-4 h-4" />
                    Unlock
                  </Button>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Don't have a promo code?
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentDialog(true)}
                  className="gap-2"
                >
                  Get Promo Code
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-sm">
                <p className="text-muted-foreground">
                  <strong>Developer Key:</strong> Use{" "}
                  <code className="bg-background px-2 py-1 rounded font-mono text-primary">
                    DEV-UNLOCK-2025
                  </code>{" "}
                  for testing
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Stats Section */}
        <Card className="p-6 mt-6 bg-calm">
          <h3 className="font-semibold mb-4">Your Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {localStorage.getItem("totalSessions") || "0"}
              </div>
              <div className="text-xs text-muted-foreground">Total Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">
                {localStorage.getItem("currentStreak") || "0"}
              </div>
              <div className="text-xs text-muted-foreground">Current Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {Math.floor((parseInt(localStorage.getItem("totalMinutes") || "0")) / 60)}h
              </div>
              <div className="text-xs text-muted-foreground">Total Focus Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {isPremium ? "Premium" : "Free"}
              </div>
              <div className="text-xs text-muted-foreground">Account Type</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-accent" />
              Payment System
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-4">
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <p className="font-semibold text-foreground mb-2">
                  Promo Code Price: $250
                </p>
                <p className="text-sm text-muted-foreground">
                  Our payment system is currently undergoing maintenance.
                </p>
              </div>
              <p className="text-sm">
                Please contact the administrator to obtain a promo code.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setShowPaymentDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
