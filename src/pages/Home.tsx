import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Palette, Crown, Star, Lock, Sparkles } from "lucide-react";
import { SquishButton, SparkleEffect } from "@/components/SparkleEffect";
import appIcon from "@/assets/app-icon.png";

const menuItems = [
  { icon: Palette, label: "Themes", color: "bg-secondary", path: "/themes" },
  { icon: Crown, label: "Closet", color: "bg-warning", path: "/closet" },
  { icon: Star, label: "Faves", color: "bg-accent", path: "/favorites" },
  { icon: Lock, label: "Parents", color: "bg-muted", path: "/gate", state: { destination: "/parents" } },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background confetti-bg relative">
      <SparkleEffect count={6} />

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <img src={appIcon} alt="GlowUp Kids" className="w-12 h-12 rounded-2xl" />
        <div className="flex items-center gap-1 bg-warning/30 px-4 py-2 rounded-full">
          <Crown className="w-5 h-5 text-warning-foreground" strokeWidth={3} />
          <span className="text-sm font-bold text-warning-foreground font-kid">FREE</span>
        </div>
      </div>

      {/* Camera Preview */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative"
        >
          <div className="w-64 h-64 rounded-full overflow-hidden shadow-soft border-4 border-card gradient-pink-lavender flex items-center justify-center">
            <div className="text-6xl">📸</div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-2 -right-2 w-12 h-12 bg-warning rounded-full flex items-center justify-center shadow-soft"
          >
            <span className="text-xl">✨</span>
          </motion.div>
        </motion.div>

        <SquishButton
          size="xl"
          onClick={() => navigate("/camera")}
          className="bg-primary text-primary-foreground px-16 py-6 mt-10 text-2xl font-bold font-kid gap-3"
        >
          <Sparkles className="w-7 h-7" strokeWidth={3} />
          START
        </SquishButton>
      </div>

      {/* Bottom Menu */}
      <div className="px-6 pb-10">
        <div className="flex justify-between gap-4">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-2"
            >
              <SquishButton
                size="lg"
                onClick={() => navigate(item.path, { state: item.state })}
                className={`${item.color}`}
              >
                <item.icon className="w-8 h-8 text-foreground" strokeWidth={3} />
              </SquishButton>
              <span className="text-xs font-bold text-muted-foreground font-kid">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
