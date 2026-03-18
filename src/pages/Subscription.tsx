import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Check, Crown } from "lucide-react";
import { SquishButton } from "@/components/SparkleEffect";

const freeFeatures = ["2 Theme Packs", "Basic Items", "15s Video"];
const premiumFeatures = ["All 10 Theme Packs", "500+ Items", "60s Video", "New Packs Monthly"];

const Subscription = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-muted font-parent">
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <SquishButton size="md" onClick={() => navigate("/parents")} className="bg-card">
          <X className="w-7 h-7 text-foreground" strokeWidth={3} />
        </SquishButton>
        <div className="w-16" />
        <div className="w-16" />
      </div>

      <div className="px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Unlock Everything! 🌟</h1>
        </motion.div>

        {/* Comparison */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Free */}
          <div className="bg-card rounded-3xl p-5">
            <p className="text-sm font-bold text-muted-foreground mb-4 text-center">FREE</p>
            <div className="space-y-3">
              {freeFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                  <span className="text-xs text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium */}
          <div className="bg-card rounded-3xl p-5 ring-2 ring-warning relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-warning px-3 py-1 rounded-full">
              <Crown className="w-4 h-4 text-warning-foreground inline" strokeWidth={3} />
            </div>
            <p className="text-sm font-bold text-foreground mb-4 text-center mt-2">PREMIUM</p>
            <div className="space-y-3">
              {premiumFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                  <span className="text-xs text-foreground font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-3 mb-8">
          <button className="w-full bg-card rounded-2xl p-4 flex items-center justify-between ring-2 ring-primary">
            <div>
              <p className="font-semibold text-foreground">Yearly</p>
              <p className="text-xs text-accent font-bold">Save 50%</p>
            </div>
            <p className="font-bold text-foreground">$29.99/yr</p>
          </button>
          <button className="w-full bg-card rounded-2xl p-4 flex items-center justify-between">
            <p className="font-semibold text-foreground">Monthly</p>
            <p className="font-bold text-foreground">$4.99/mo</p>
          </button>
        </div>

        {/* Subscribe */}
        <SquishButton
          size="lg"
          className="w-full bg-primary text-primary-foreground py-5 text-lg font-bold"
        >
          Subscribe ✨
        </SquishButton>

        <div className="text-center mt-4 space-y-2">
          <p className="text-xs text-muted-foreground">Cancel anytime • Managed by Apple</p>
          <button className="text-xs text-primary underline">Restore Purchases</button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
