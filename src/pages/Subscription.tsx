import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles } from "lucide-react";

const freeFeatures = ["2 Routine Packs", "Basic Products", "15s Recording"];
const proFeatures = ["All 10 Routines", "500+ Products", "60s Recording", "New drops monthly"];

const Subscription = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center gap-4 px-6 pt-14 pb-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/parents")}
          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={1.8} />
        </motion.button>
      </div>

      <div className="px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-accent" strokeWidth={1.8} />
          </div>
          <h1 className="text-2xl font-display font-semibold text-foreground mb-1">Go Pro</h1>
          <p className="text-sm text-muted-foreground">Unlock the full beauty experience</p>
        </motion.div>

        {/* Comparison */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-muted rounded-2xl p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-3 text-center">FREE</p>
            <div className="space-y-2.5">
              {freeFeatures.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5" strokeWidth={2} />
                  <span className="text-xs text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-foreground rounded-2xl p-4">
            <p className="text-xs font-semibold text-primary-foreground mb-3 text-center">PRO</p>
            <div className="space-y-2.5">
              {proFeatures.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-accent mt-0.5" strokeWidth={2} />
                  <span className="text-xs text-primary-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-2 mb-8">
          <button className="w-full bg-card rounded-2xl p-4 flex items-center justify-between ring-2 ring-foreground shadow-soft">
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Yearly</p>
              <p className="text-xs text-primary font-semibold">Save 50%</p>
            </div>
            <p className="font-semibold text-foreground">$29.99/yr</p>
          </button>
          <button className="w-full bg-card rounded-2xl p-4 flex items-center justify-between shadow-soft">
            <p className="text-sm font-medium text-foreground">Monthly</p>
            <p className="font-semibold text-foreground">$4.99/mo</p>
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full bg-foreground text-background py-4 rounded-2xl text-base font-medium mb-4"
        >
          Subscribe
        </motion.button>

        <div className="text-center space-y-1.5 pb-8">
          <p className="text-[11px] text-muted-foreground">Cancel anytime · Managed by Apple</p>
          <button className="text-[11px] text-primary font-medium">Restore Purchases</button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
