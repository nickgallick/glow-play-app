import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Palette, Heart, Settings, Sparkles } from "lucide-react";

const menuItems = [
  { icon: Palette, label: "Routines", path: "/themes" },
  { icon: Camera, label: "Closet", path: "/closet" },
  { icon: Heart, label: "Favorites", path: "/favorites" },
  { icon: Settings, label: "Settings", path: "/gate", state: { destination: "/parents" } },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {/* Subtle gradient bg */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] gradient-subtle opacity-60" />

      {/* Header */}
      <div className="relative flex items-center justify-between px-6 pt-14 pb-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-foreground">GlowUp</h1>
        </div>
        <button
          onClick={() => navigate("/gate", { state: { destination: "/subscription" } })}
          className="flex items-center gap-1.5 bg-foreground/5 px-3 py-1.5 rounded-full"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-medium text-foreground">PRO</span>
        </button>
      </div>

      {/* Camera Preview */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-[280px] aspect-[3/4] rounded-3xl overflow-hidden bg-muted shadow-elevated"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="w-12 h-12 text-muted-foreground/30" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent" />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/camera")}
          className="mt-8 bg-foreground text-background px-12 py-4 rounded-2xl text-base font-medium flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Start GRWM
        </motion.button>
      </div>

      {/* Bottom Menu */}
      <div className="relative px-6 pb-10 pt-4">
        <div className="flex justify-between">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path, { state: item.state })}
              className="flex flex-col items-center gap-1.5 py-2 px-4"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <item.icon className="w-5 h-5 text-foreground/70" strokeWidth={1.8} />
              </div>
              <span className="text-[11px] text-muted-foreground font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
