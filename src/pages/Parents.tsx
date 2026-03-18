import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Camera as CameraIcon, Video, Shield, Info, HelpCircle, FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Account",
    items: [
      { icon: CreditCard, label: "Subscription", subtitle: "Free plan", action: "subscription" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: CameraIcon, label: "Default Camera", subtitle: "Front", action: null },
      { icon: Video, label: "Max Recording", subtitle: "15 seconds", action: null },
    ],
  },
  {
    title: "Privacy & Legal",
    items: [
      { icon: Shield, label: "Privacy", subtitle: "No data collected", action: null },
      { icon: Info, label: "About", subtitle: "GlowUp v1.0", action: null },
      { icon: HelpCircle, label: "Support", subtitle: null, action: null },
      { icon: FileText, label: "Terms & Privacy Policy", subtitle: null, action: null },
    ],
  },
];

const Parents = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center gap-4 px-6 pt-14 pb-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")}
          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={1.8} />
        </motion.button>
        <h1 className="text-xl font-display font-semibold text-foreground">Settings</h1>
      </div>

      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
              {section.title}
            </p>
            <div className="bg-card rounded-2xl overflow-hidden shadow-soft">
              {section.items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => item.action === "subscription" ? navigate("/gate", { state: { destination: "/subscription" } }) : undefined}
                  className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-colors border-b border-border last:border-b-0"
                >
                  <item.icon className="w-4.5 h-4.5 text-muted-foreground" strokeWidth={1.8} />
                  <div className="flex-1 text-left">
                    <span className="text-sm text-foreground">{item.label}</span>
                    {item.subtitle && (
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parents;
