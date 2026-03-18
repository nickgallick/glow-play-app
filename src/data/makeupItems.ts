export interface BeautyItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  color: string;
  image: string;
  premium: boolean;
}

export const categories = [
  { id: "lips", icon: "💋", label: "Lips" },
  { id: "eyes", icon: "👁️", label: "Eyes" },
  { id: "face", icon: "✨", label: "Face" },
  { id: "skincare", icon: "🧴", label: "Skincare" },
  { id: "blush", icon: "🌸", label: "Blush" },
  { id: "brows", icon: "✏️", label: "Brows" },
  { id: "accessories", icon: "💎", label: "Accessories" },
  { id: "looks", icon: "🪞", label: "Full Looks" },
];

export const beautyItems: BeautyItem[] = [
  // Lips
  { id: "lip-1", name: "Velvet Lip Gloss", brand: "Glossy Co", category: "lips", color: "#C44569", image: "💋", premium: false },
  { id: "lip-2", name: "Matte Lipstick", brand: "Lux Beauty", category: "lips", color: "#B33939", image: "💄", premium: false },
  { id: "lip-3", name: "Lip Oil", brand: "Dewy", category: "lips", color: "#E8A0BF", image: "✨", premium: false },
  { id: "lip-4", name: "Berry Stain", brand: "Fresh Face", category: "lips", color: "#6C3483", image: "🫐", premium: true },
  { id: "lip-5", name: "Nude Liner", brand: "Contour Co", category: "lips", color: "#C4A882", image: "✏️", premium: false },
  { id: "lip-6", name: "Glazed Donut Gloss", brand: "Glow Lab", category: "lips", color: "#F0C8A8", image: "🍩", premium: true },

  // Eyes
  { id: "eye-1", name: "Shimmer Shadow", brand: "Sparkle", category: "eyes", color: "#C9B1FF", image: "✨", premium: false },
  { id: "eye-2", name: "Cat Eye Liner", brand: "Bold Line", category: "eyes", color: "#2C3E50", image: "🖊️", premium: false },
  { id: "eye-3", name: "Lash Serum", brand: "Lash Lab", category: "eyes", color: "#1A1A2E", image: "👁️", premium: true },
  { id: "eye-4", name: "Bronze Palette", brand: "Sunkissed", category: "eyes", color: "#CD853F", image: "🎨", premium: false },
  { id: "eye-5", name: "Gel Liner", brand: "Precision", category: "eyes", color: "#34495E", image: "✏️", premium: false },
  { id: "eye-6", name: "Glitter Pigment", brand: "Party Glow", category: "eyes", color: "#DAA520", image: "💫", premium: true },

  // Face
  { id: "face-1", name: "Dewy Foundation", brand: "Skin First", category: "face", color: "#DBBFA0", image: "💧", premium: false },
  { id: "face-2", name: "Concealer Pen", brand: "Cover Up", category: "face", color: "#E8CCAB", image: "✏️", premium: false },
  { id: "face-3", name: "Setting Spray", brand: "Lock It", category: "face", color: "#87CEEB", image: "💨", premium: false },
  { id: "face-4", name: "Contour Stick", brand: "Sculpt", category: "face", color: "#A0785A", image: "🖌️", premium: true },
  { id: "face-5", name: "Highlighter", brand: "Glow Getter", category: "face", color: "#FFD700", image: "⭐", premium: false },
  { id: "face-6", name: "Primer", brand: "Base Camp", category: "face", color: "#FFF0DB", image: "🧴", premium: false },

  // Skincare
  { id: "skin-1", name: "Gentle Cleanser", brand: "Pure Skin", category: "skincare", color: "#B2DFDB", image: "🧼", premium: false },
  { id: "skin-2", name: "Vitamin C Serum", brand: "Glow Lab", category: "skincare", color: "#FFB74D", image: "🍊", premium: false },
  { id: "skin-3", name: "Moisturizer SPF", brand: "Shield", category: "skincare", color: "#E3F2FD", image: "☀️", premium: false },
  { id: "skin-4", name: "Niacinamide", brand: "Clear Skin", category: "skincare", color: "#E8F5E9", image: "💧", premium: true },
  { id: "skin-5", name: "Clay Mask", brand: "Deep Clean", category: "skincare", color: "#8D6E63", image: "🪨", premium: false },
  { id: "skin-6", name: "Hyaluronic Acid", brand: "Hydra Boost", category: "skincare", color: "#BBDEFB", image: "💎", premium: true },

  // Blush
  { id: "blush-1", name: "Cream Blush", brand: "Flush", category: "blush", color: "#F48FB1", image: "🌸", premium: false },
  { id: "blush-2", name: "Liquid Blush", brand: "Drop Glow", category: "blush", color: "#EF9A9A", image: "💧", premium: false },
  { id: "blush-3", name: "Bronzer", brand: "Sunkissed", category: "blush", color: "#D4A76A", image: "☀️", premium: false },
  { id: "blush-4", name: "Peach Glow", brand: "Fruit Beauty", category: "blush", color: "#FFCC80", image: "🍑", premium: true },

  // Brows
  { id: "brow-1", name: "Brow Gel", brand: "Arch", category: "brows", color: "#5D4037", image: "✏️", premium: false },
  { id: "brow-2", name: "Brow Pencil", brand: "Define", category: "brows", color: "#4E342E", image: "🖊️", premium: false },
  { id: "brow-3", name: "Brow Lamination", brand: "Sleek Brow", category: "brows", color: "#795548", image: "✨", premium: true },

  // Accessories
  { id: "acc-1", name: "Hair Clips", brand: "Clip Co", category: "accessories", color: "#FFD700", image: "📎", premium: false },
  { id: "acc-2", name: "Sunglasses", brand: "Shade", category: "accessories", color: "#2C2C2C", image: "🕶️", premium: false },
  { id: "acc-3", name: "Headband", brand: "Band It", category: "accessories", color: "#F8BBD0", image: "🎀", premium: false },
  { id: "acc-4", name: "Hoop Earrings", brand: "Luxe", category: "accessories", color: "#FFD700", image: "⭕", premium: true },
  { id: "acc-5", name: "Claw Clip", brand: "Hold Up", category: "accessories", color: "#D7CCC8", image: "🦀", premium: false },
];

export const routinePacks = [
  { id: "clean-girl", name: "Clean Girl", emoji: "✨", color: "#F5E6D3", free: true },
  { id: "soft-glam", name: "Soft Glam", emoji: "🌸", color: "#F8BBD0", free: true },
  { id: "glass-skin", name: "Glass Skin", emoji: "💎", color: "#E3F2FD", free: false },
  { id: "sunset-glow", name: "Sunset Glow", emoji: "🌅", color: "#FFE0B2", free: false },
  { id: "doe-eyes", name: "Doe Eyes", emoji: "🦌", color: "#D7CCC8", free: false },
  { id: "berry-lip", name: "Berry Lip", emoji: "🫐", color: "#E1BEE7", free: false },
  { id: "bronze-goddess", name: "Bronze Goddess", emoji: "☀️", color: "#FFD54F", free: false },
  { id: "night-out", name: "Night Out", emoji: "🌙", color: "#263238", free: false },
  { id: "natural-beauty", name: "Natural Beauty", emoji: "🌿", color: "#C8E6C9", free: false },
  { id: "y2k-glam", name: "Y2K Glam", emoji: "💿", color: "#CE93D8", free: false },
];
