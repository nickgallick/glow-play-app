export interface MakeupItem {
  id: string;
  name: string;
  category: string;
  color: string;
  icon: string;
  premium: boolean;
}

export const categories = [
  { id: "lips", icon: "💄", label: "Lips" },
  { id: "eyes", icon: "👁️", label: "Eyes" },
  { id: "blush", icon: "✨", label: "Blush" },
  { id: "nails", icon: "💅", label: "Nails" },
  { id: "accessories", icon: "🎀", label: "Accessories" },
  { id: "facepaint", icon: "🌈", label: "Face Paint" },
  { id: "looks", icon: "🎭", label: "Full Looks" },
  { id: "stickers", icon: "⭐", label: "Stickers" },
];

export const makeupItems: MakeupItem[] = [
  // Lips
  { id: "lip-1", name: "Rose Red", category: "lips", color: "#E53E3E", icon: "💋", premium: false },
  { id: "lip-2", name: "Hot Pink", category: "lips", color: "#FF8FAB", icon: "💋", premium: false },
  { id: "lip-3", name: "Coral", category: "lips", color: "#FF7F50", icon: "💋", premium: false },
  { id: "lip-4", name: "Berry", category: "lips", color: "#8B5CF6", icon: "💋", premium: true },
  { id: "lip-5", name: "Nude", category: "lips", color: "#D4A68C", icon: "💋", premium: false },
  { id: "lip-6", name: "Candy", category: "lips", color: "#FF69B4", icon: "💋", premium: true },

  // Eyes
  { id: "eye-1", name: "Sparkle", category: "eyes", color: "#C4B5FD", icon: "✨", premium: false },
  { id: "eye-2", name: "Rainbow", category: "eyes", color: "#EF4444", icon: "🌈", premium: false },
  { id: "eye-3", name: "Smoky", category: "eyes", color: "#4B5563", icon: "💫", premium: true },
  { id: "eye-4", name: "Ocean", category: "eyes", color: "#3B82F6", icon: "🌊", premium: false },
  { id: "eye-5", name: "Gold", category: "eyes", color: "#F59E0B", icon: "⭐", premium: true },
  { id: "eye-6", name: "Mint", category: "eyes", color: "#6EE7B7", icon: "💚", premium: false },

  // Blush
  { id: "blush-1", name: "Pink", category: "blush", color: "#FFB3C6", icon: "🌸", premium: false },
  { id: "blush-2", name: "Peach", category: "blush", color: "#FBBF24", icon: "🍑", premium: false },
  { id: "blush-3", name: "Rose", category: "blush", color: "#FB7185", icon: "🌹", premium: false },
  { id: "blush-4", name: "Coral", category: "blush", color: "#FF8C69", icon: "🧡", premium: true },

  // Accessories
  { id: "acc-1", name: "Tiara", category: "accessories", color: "#FDE68A", icon: "👑", premium: false },
  { id: "acc-2", name: "Sunglasses", category: "accessories", color: "#1F2937", icon: "🕶️", premium: false },
  { id: "acc-3", name: "Bow", category: "accessories", color: "#FF8FAB", icon: "🎀", premium: false },
  { id: "acc-4", name: "Bunny Ears", category: "accessories", color: "#FDF2F8", icon: "🐰", premium: true },
  { id: "acc-5", name: "Cat Ears", category: "accessories", color: "#6B7280", icon: "🐱", premium: false },
  { id: "acc-6", name: "Flowers", category: "accessories", color: "#34D399", icon: "🌺", premium: true },

  // Face Paint
  { id: "fp-1", name: "Butterfly", category: "facepaint", color: "#818CF8", icon: "🦋", premium: false },
  { id: "fp-2", name: "Tiger", category: "facepaint", color: "#F97316", icon: "🐯", premium: false },
  { id: "fp-3", name: "Cat", category: "facepaint", color: "#6B7280", icon: "🐱", premium: false },
  { id: "fp-4", name: "Superhero", category: "facepaint", color: "#EF4444", icon: "🦸", premium: true },

  // Stickers
  { id: "st-1", name: "Stars", category: "stickers", color: "#FDE68A", icon: "⭐", premium: false },
  { id: "st-2", name: "Hearts", category: "stickers", color: "#FF8FAB", icon: "💖", premium: false },
  { id: "st-3", name: "Sparkles", category: "stickers", color: "#C4B5FD", icon: "✨", premium: false },
  { id: "st-4", name: "Butterflies", category: "stickers", color: "#818CF8", icon: "🦋", premium: true },
];

export const themePacks = [
  { id: "princess", name: "Princess", emoji: "🌸", color: "#FFB3C6", free: true },
  { id: "superhero", name: "Superhero", emoji: "🦸", color: "#EF4444", free: false },
  { id: "halloween", name: "Halloween", emoji: "🎃", color: "#F97316", free: false },
  { id: "christmas", name: "Christmas", emoji: "🎄", color: "#22C55E", free: false },
  { id: "mermaid", name: "Mermaid", emoji: "🌊", color: "#3B82F6", free: false },
  { id: "butterfly", name: "Butterfly", emoji: "🦋", color: "#818CF8", free: false },
  { id: "rainbow", name: "Rainbow", emoji: "🌈", color: "#EF4444", free: true },
  { id: "fairy", name: "Fairy", emoji: "🧚", color: "#A78BFA", free: false },
  { id: "animals", name: "Animals", emoji: "🐱", color: "#F59E0B", free: false },
  { id: "popstar", name: "Pop Star", emoji: "⭐", color: "#EC4899", free: false },
];
