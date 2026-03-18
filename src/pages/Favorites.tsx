import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";

const Favorites = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      <div className="flex items-center gap-4 px-6 pt-14 pb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")}
          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={1.8} />
        </motion.button>
        <motion.h1 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display font-semibold text-foreground"
        >
          Favorites
        </motion.h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.div 
            className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart className="w-8 h-8 text-muted-foreground/40" strokeWidth={1.5} />
          </motion.div>
          <p className="text-lg font-display font-semibold text-foreground mb-2">
            No favorites yet
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Heart products you love to save them here
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/camera")}
            className="bg-foreground text-background px-8 py-3 rounded-2xl text-sm font-medium flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Explore products
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Favorites;
