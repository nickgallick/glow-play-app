import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { SquishButton } from "@/components/SparkleEffect";
import emptyFavorites from "@/assets/empty-favorites.png";

const Favorites = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <SquishButton size="md" onClick={() => navigate("/home")} className="bg-muted">
          <X className="w-7 h-7 text-foreground" strokeWidth={3} />
        </SquishButton>
        <h1 className="text-2xl font-bold font-kid">⭐ Favorites</h1>
        <div className="w-16" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.img
          src={emptyFavorites}
          alt="No favorites"
          className="w-40 h-40 mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
        <p className="text-xl font-bold text-foreground font-kid text-center mb-2">
          No favorites yet!
        </p>
        <p className="text-muted-foreground font-kid text-center">
          ⭐ your favorite items!
        </p>
        <SquishButton
          size="lg"
          onClick={() => navigate("/camera")}
          className="bg-primary text-primary-foreground px-8 py-4 mt-8 font-bold font-kid"
        >
          ✨ Explore Items!
        </SquishButton>
      </div>
    </div>
  );
};

export default Favorites;
