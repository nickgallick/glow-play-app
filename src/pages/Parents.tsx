import { useNavigate } from "react-router-dom";
import { X, CreditCard, Camera as CameraIcon, Video, Shield, Info, HelpCircle, FileText } from "lucide-react";
import { SquishButton } from "@/components/SparkleEffect";

const sections = [
  {
    title: "Subscription",
    items: [
      { icon: CreditCard, label: "Current Plan: Free", action: "subscription" },
      { icon: CreditCard, label: "Upgrade to Premium", action: "subscription" },
    ],
  },
  {
    title: "Camera",
    items: [
      { icon: CameraIcon, label: "Default Camera: Front", action: null },
    ],
  },
  {
    title: "Video",
    items: [
      { icon: Video, label: "Max Recording: 15 seconds", action: null },
    ],
  },
  {
    title: "Privacy",
    items: [
      { icon: Shield, label: "This app collects no data", action: null },
    ],
  },
  {
    title: "About",
    items: [
      { icon: Info, label: "GlowUp Kids v1.0.0", action: null },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Contact Support", action: null },
      { icon: FileText, label: "Privacy Policy", action: null },
      { icon: FileText, label: "Terms of Use", action: null },
    ],
  },
];

const Parents = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-muted font-parent">
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <SquishButton size="md" onClick={() => navigate("/home")} className="bg-card">
          <X className="w-7 h-7 text-foreground" strokeWidth={3} />
        </SquishButton>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <div className="w-16" />
      </div>

      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-2">
              {section.title}
            </p>
            <div className="bg-card rounded-2xl overflow-hidden">
              {section.items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => item.action === "subscription" ? navigate("/gate", { state: { destination: "/subscription" } }) : undefined}
                  className="w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" strokeWidth={2} />
                  <span className="text-foreground text-sm">{item.label}</span>
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
