import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SparkleEffect } from "@/components/SparkleEffect";
import appIcon from "@/assets/app-icon.png";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/onboarding"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gradient-splash relative overflow-hidden">
      <SparkleEffect count={12} />
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative"
      >
        <motion.img
          src={appIcon}
          alt="GlowUp Kids"
          className="w-40 h-40 rounded-4xl shadow-soft"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-4xl font-bold text-primary-foreground mt-8 font-kid"
      >
        GlowUp Kids
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xl text-primary-foreground/80 mt-3 font-kid"
      >
        Get Ready With Me! ✨
      </motion.p>
    </div>
  );
};

export default Splash;
