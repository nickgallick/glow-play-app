import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Palette, Heart, Settings, Sparkles, TrendingUp, Clock, Star } from "lucide-react";

const menuItems = [
  { icon: Palette, label: "Routines", path: "/themes" },
  { icon: Camera, label: "Closet", path: "/closet" },
  { icon: Heart, label: "Favorites", path: "/favorites" },
  { icon: Settings, label: "Settings", path: "/gate", state: { destination: "/parents" } },
];

const trendingLooks = [
  { name: "Clean Girl", emoji: "🧴", color: "hsl(var(--muted))" },
  { name: "Soft Glam", emoji: "✨", color: "hsl(var(--muted))" },
  { name: "Glass Skin", emoji: "💧", color: "hsl(var(--muted))" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Animated gradient bg */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[60vh] gradient-subtle"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between px-6 pt-14 pb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-display font-semibold text-foreground">GlowUp</h1>
          <p className="text-xs text-muted-foreground mt-0.5">What's the vibe today?</p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/gate", { state: { destination: "/subscription" } })}
          className="flex items-center gap-1.5 bg-foreground/5 px-3 py-1.5 rounded-full"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-medium text-foreground">PRO</span>
        </motion.button>
      </div>

      {/* Camera Preview */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[280px] aspect-[3/4] rounded-3xl overflow-hidden bg-muted shadow-elevated"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Camera className="w-12 h-12 text-muted-foreground/30" />
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
          
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-4 left-4 right-4 glass-dark rounded-2xl px-3 py-2 flex items-center gap-2"
          >
            <Clock className="w-3.5 h-3.5 text-primary-foreground/60" />
            <span className="text-[11px] text-primary-foreground/80">Record up to 60s</span>
          </motion.div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/camera")}
          className="mt-8 bg-foreground text-background px-12 py-4 rounded-2xl text-base font-medium flex items-center gap-2 shadow-elevated"
        >
          <Sparkles className="w-4 h-4" />
          Start GRWM
        </motion.button>
      </div>

      {/* Trending looks */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative px-6 pb-4"
      >
        <div className="flex items-center gap-1.5 mb-3">
          <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Trending</span>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {trendingLooks.map((look, i) => (
            <motion.button
              key={look.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/camera")}
              className="flex-shrink-0 flex items-center gap-2 bg-muted px-4 py-2.5 rounded-2xl"
            >
              <span className="text-base">{look.emoji}</span>
              <span className="text-xs font-medium text-foreground whitespace-nowrap">{look.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Bottom Menu */}
      <div className="relative px-6 pb-10 pt-4">
        <div className="flex justify-between">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ y: -2 }}
              onClick={() => navigate(item.path, { state: item.state })}
              className="flex flex-col items-center gap-1.5 py-2 px-4"
            >
              <motion.div 
                className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center"
                whileHover={{ backgroundColor: "hsl(var(--accent))" }}
              >
                <item.icon className="w-5 h-5 text-foreground/70" strokeWidth={1.8} />
              </motion.div>
              <span className="text-[11px] text-muted-foreground font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
