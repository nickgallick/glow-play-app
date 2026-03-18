import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck, WifiOff, EyeOff, Lock, Apple,
  Palette, Sparkles, Video, Share2, Star, ChevronRight,
  Heart, Camera, Crown, CheckCircle2, Play,
  X, Menu, Zap, Wand2, Download
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/grwm-logo.png";

const trustBadges = [
  { icon: EyeOff, label: "No Ads" },
  { icon: Lock, label: "No Data Collection" },
  { icon: WifiOff, label: "Works Offline" },
  { icon: ShieldCheck, label: "COPPA Compliant" },
];

const reviews = [
  { text: "My daughter loves creating her own GRWM videos!", stars: 5, name: "Sarah M." },
  { text: "Finally an app I trust my kids with. No ads, no nonsense.", stars: 5, name: "Jessica T." },
  { text: "The AR tracking is honestly impressive. My girls are obsessed.", stars: 5, name: "Amanda K." },
];

const steps = [
  {
    num: 1,
    title: "Pick a Look",
    desc: "Choose from 10 themed beauty packs with 55+ items",
    icon: Palette,
    emoji: "🎨",
    gradient: "from-landing-pink/20 to-landing-pink/5",
  },
  {
    num: 2,
    title: "Try It On",
    desc: "AR face tracking maps makeup perfectly in real-time",
    icon: Sparkles,
    emoji: "✨",
    gradient: "from-landing-lavender/20 to-landing-lavender/5",
  },
  {
    num: 3,
    title: "Record & Share",
    desc: "Capture GRWM videos up to 60 seconds with full audio",
    icon: Video,
    emoji: "📹",
    gradient: "from-landing-mint/20 to-landing-mint/5",
  },
];

const packs = [
  { name: "Princess", emoji: "🌸" },
  { name: "Superhero", emoji: "🦸" },
  { name: "Halloween", emoji: "🎃" },
  { name: "Christmas", emoji: "🎄" },
  { name: "Mermaid", emoji: "🌊" },
  { name: "Butterfly", emoji: "🦋" },
  { name: "Rainbow", emoji: "🌈" },
  { name: "Fairy", emoji: "🧚" },
  { name: "Animals", emoji: "🐱" },
  { name: "Pop Star", emoji: "⭐" },
];

const safetyCards = [
  { emoji: "🚫", title: "No Ads", desc: "Zero advertising. Ever. Not even 'kid-safe' ads." },
  { emoji: "🔒", title: "No Data Collection", desc: "We don't collect names, emails, locations, or any personal data." },
  { emoji: "📵", title: "Works Offline", desc: "No internet required. No servers. Nothing leaves the device." },
  { emoji: "👶", title: "COPPA Compliant", desc: "Fully compliant with children's privacy protection laws." },
  { emoji: "🧮", title: "Parental Gate", desc: "Math problem guards settings and purchases. Kids can't buy without you." },
  { emoji: "🍎", title: "Apple Managed", desc: "Subscriptions managed through Apple. Cancel anytime in Settings." },
];

const faqs = [
  {
    q: "What age is GRWM Studio for?",
    a: "GRWM Studio is designed for children. The AR technology is safe and uses only the front-facing camera in real-time — no photos or videos are stored unless saved to the device.",
  },
  {
    q: "Does the app collect any data?",
    a: "No. GRWM Studio collects zero personal data. No names, no emails, no analytics, no tracking. The app works entirely offline and nothing leaves the device.",
  },
  {
    q: "How does the subscription work?",
    a: "GRWM Studio offers a free tier with 2 beauty packs. Pro unlocks all 10+ packs for a small weekly or annual subscription, managed entirely through Apple. Cancel anytime.",
  },
  {
    q: "Is the AR safe for kids?",
    a: "Absolutely. The AR uses standard camera APIs to overlay digital items on the face in real-time. No facial data is stored, transmitted, or used for any purpose beyond the live preview.",
  },
  {
    q: "Can my child make purchases?",
    a: "All purchase options are behind a parental gate (a simple math problem). Kids cannot access subscription or purchase screens without a parent present.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-landing-bg font-landing text-landing-text">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-landing-bg/70 backdrop-blur-2xl border-b border-landing-text/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <img src={logo} alt="GRWM Studio" className="w-10 h-10 object-contain" />
            <span className="font-bold text-lg tracking-tight text-landing-text">GRWM Studio</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "Safety", "Pricing", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-landing-text/50 hover:text-landing-text transition-colors font-medium"
              >
                {item}
              </a>
            ))}
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-landing-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-landing-dark/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <Apple className="w-4 h-4" />
              Download
            </a>
          </div>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-landing-text/5 transition-colors">
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-landing-bg/95 backdrop-blur-2xl border-b border-landing-text/5 px-6 pb-6 pt-2 flex flex-col gap-1"
          >
            {["Features", "Safety", "Pricing", "FAQ"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="text-sm text-landing-text/70 py-3 font-medium">{item}</a>
            ))}
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-landing-dark text-white px-5 py-3.5 rounded-2xl text-sm font-semibold mt-2"
            >
              <Apple className="w-4 h-4" />
              Download on App Store
            </a>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 px-6 overflow-hidden">
        {/* Animated blobs */}
        <motion.div
          className="absolute top-10 -right-32 w-[500px] h-[500px] rounded-full bg-landing-pink/8 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full bg-landing-lavender/8 blur-[100px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 6, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-landing-mint/5 blur-[80px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 7, delay: 1 }}
        />

        <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-landing-pink/10 text-landing-pink px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              The #1 AR Beauty App for Kids
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-landing-text">
              Get Ready With Me
              <br />
              <span className="bg-gradient-to-r from-landing-pink via-landing-lavender to-landing-mint bg-clip-text text-transparent">
                Made Safe & Fun
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg text-landing-text/50 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Real AR face tracking. 55+ beauty items. Zero data collection. Record GRWM videos your kids will love.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-landing-dark text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-landing-dark/90 transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                <Apple className="w-5 h-5" />
                Download Free
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <button
                onClick={() => navigate("/app")}
                className="inline-flex items-center gap-2 text-landing-text/60 hover:text-landing-text px-6 py-4 rounded-2xl text-base font-medium transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
                Try Demo
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} custom={4} className="mt-12 flex flex-wrap gap-2.5 justify-center lg:justify-start">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3.5 py-2 rounded-full border border-landing-text/5">
                  <badge.icon className="w-3.5 h-3.5 text-landing-mint" />
                  <span className="text-xs font-semibold text-landing-text/60">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero visual — Logo showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 relative"
          >
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-gradient-to-br from-landing-pink/20 via-landing-lavender/15 to-landing-mint/20 rounded-[40px] blur-2xl scale-110" />
              
              {/* Phone mockup */}
              <div className="relative w-[260px] sm:w-[280px] h-[520px] sm:h-[560px] bg-landing-dark rounded-[40px] p-[6px] shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-landing-dark rounded-b-2xl z-10" />
                <div className="w-full h-full rounded-[34px] overflow-hidden bg-gradient-to-b from-[hsl(350,60%,95%)] to-[hsl(30,30%,95%)] flex flex-col items-center justify-center gap-6 px-6">
                  <motion.img
                    src={logo}
                    alt="GRWM Studio"
                    className="w-32 h-32 object-contain drop-shadow-lg"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  />
                  <div className="flex gap-3 mt-2">
                    {["💄", "👑", "🌟", "💜", "✨"].map((e, i) => (
                      <motion.span
                        key={i}
                        className="text-2xl"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.2, ease: "easeInOut" }}
                      >
                        {e}
                      </motion.span>
                    ))}
                  </div>
                  <div className="w-full space-y-3 mt-4">
                    <div className="w-full h-12 rounded-2xl bg-landing-dark/90 flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-white/80" />
                      <span className="text-sm font-semibold text-white/90">Start GRWM</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 rounded-xl bg-landing-pink/15 flex items-center justify-center">
                        <Palette className="w-4 h-4 text-landing-pink/60" />
                      </div>
                      <div className="flex-1 h-10 rounded-xl bg-landing-lavender/15 flex items-center justify-center">
                        <Camera className="w-4 h-4 text-landing-lavender/60" />
                      </div>
                      <div className="flex-1 h-10 rounded-xl bg-landing-mint/15 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-landing-mint/60" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-2xl px-3 py-2 shadow-lg border border-landing-text/5 flex items-center gap-2"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
            >
              <span className="text-lg">✨</span>
              <span className="text-xs font-bold text-landing-text">AR Ready</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-6 bg-white rounded-2xl px-3 py-2 shadow-lg border border-landing-text/5 flex items-center gap-2"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
            >
              <ShieldCheck className="w-4 h-4 text-landing-mint" />
              <span className="text-xs font-bold text-landing-text">100% Safe</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-white/40 backdrop-blur-sm border-y border-landing-text/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white/60 border border-landing-text/5"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-landing-yellow fill-landing-yellow" />
                  ))}
                </div>
                <p className="text-sm text-landing-text/70 italic leading-relaxed">"{review.text}"</p>
                <span className="text-xs font-semibold text-landing-text/40">{review.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-24 sm:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-landing-lavender uppercase tracking-wider bg-landing-lavender/10 px-4 py-1.5 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              How It Works
            </span>
            <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-landing-text">Three Simple Steps</h2>
            <p className="mt-4 text-landing-text/40 max-w-md mx-auto">From picking a look to sharing the video — it's that easy.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-b ${step.gradient} border border-landing-text/5`}
              >
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-landing-dark text-white text-xs font-bold flex items-center justify-center shadow-lg">
                  {step.num}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center mb-5 shadow-sm">
                  <span className="text-3xl">{step.emoji}</span>
                </div>
                <h3 className="text-lg font-bold text-landing-text mb-2">{step.title}</h3>
                <p className="text-sm text-landing-text/50 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 sm:py-32 px-6 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-landing-text">
              Everything Kids Love
              <br />
              <span className="text-landing-text/40">Everything Parents Trust</span>
            </h2>
          </motion.div>

          {/* Feature 1 — AR */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-landing-pink/10 text-landing-pink px-3 py-1.5 rounded-full text-xs font-semibold mb-5">
                <Wand2 className="w-3 h-3" /> AR Technology
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-landing-text mb-4">Real AR Face Tracking</h3>
              <p className="text-landing-text/50 leading-relaxed mb-6">
                468-point face mesh technology. Lipstick follows lips. Blush lands on cheeks. Crown sits on head. All in real-time with zero lag.
              </p>
              <div className="flex flex-wrap gap-2">
                {["468 Points", "Real-time", "Zero Lag", "Front Camera"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-landing-pink/5 text-landing-text/50 text-xs font-medium rounded-lg border border-landing-pink/10">{tag}</span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-[320px] aspect-square rounded-3xl bg-gradient-to-br from-landing-pink/10 to-landing-lavender/10 flex items-center justify-center border border-landing-text/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(344,100%,78%,0.1),_transparent_70%)]" />
                <div className="flex flex-col items-center gap-4 relative z-10">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-landing-pink/30 to-landing-lavender/30 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <span className="text-5xl">💄</span>
                  </motion.div>
                  <div className="flex gap-2">
                    {["👄", "✨", "👑"].map((e, i) => (
                      <motion.span key={i} className="text-2xl" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}>{e}</motion.span>
                    ))}
                  </div>
                  <p className="text-xs text-landing-text/30 font-medium">468 Face Points Active</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 2 — Packs */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 flex justify-center"
            >
              <div className="grid grid-cols-5 gap-3 max-w-[320px]">
                {packs.map((pack, i) => (
                  <motion.div
                    key={pack.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="flex flex-col items-center gap-1.5 p-2.5 bg-white rounded-2xl shadow-sm border border-landing-text/5 cursor-default"
                  >
                    <span className="text-2xl">{pack.emoji}</span>
                    <span className="text-[8px] font-semibold text-landing-text/50 text-center leading-tight">{pack.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-landing-lavender/10 text-landing-lavender px-3 py-1.5 rounded-full text-xs font-semibold mb-5">
                <Crown className="w-3 h-3" /> Content Packs
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-landing-text mb-4">10 Themed Packs</h3>
              <p className="text-landing-text/50 leading-relaxed">
                Two free packs included. New packs added monthly with Pro. From Princess to Pop Star — there's a look for every mood.
              </p>
            </motion.div>
          </div>

          {/* Feature 3 — Video */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-landing-mint/15 text-landing-text/60 px-3 py-1.5 rounded-full text-xs font-semibold mb-5">
                <Video className="w-3 h-3" /> GRWM Videos
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-landing-text mb-4">Record & Share</h3>
              <p className="text-landing-text/50 leading-relaxed">
                Kids can record their own Get Ready With Me videos — the trend they love, in a safe app they can call their own. Up to 60 seconds with full audio. Share via AirDrop, Messages, or save to camera roll.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-3xl bg-gradient-to-br from-landing-mint/10 to-landing-lavender/10 flex items-center justify-center border border-landing-text/5 overflow-hidden">
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-destructive/60" />
                  </motion.div>
                  <p className="text-sm font-medium text-landing-text/30">0:32 / 1:00</p>
                  <div className="w-32 h-2 bg-landing-text/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-destructive/40 rounded-full"
                      animate={{ width: ["0%", "53%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex gap-3 mt-2">
                    {["📱", "💬", "📷"].map((e, i) => (
                      <motion.span key={i} className="text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.3 }}>{e}</motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-24 sm:py-32 px-6 bg-landing-dark relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-landing-mint/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-landing-mint/10 mb-6">
              <ShieldCheck className="w-7 h-7 text-landing-mint" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Built With Safety First</h2>
            <p className="mt-4 text-white/40 max-w-lg mx-auto">Every decision starts with one question: is this safe for a child to use unsupervised?</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {safetyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.08] transition-all hover:border-white/15"
              >
                <span className="text-3xl mb-4 block">{card.emoji}</span>
                <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 sm:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-landing-text">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-landing-text/40">Start free. Upgrade when your kid wants more looks.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-landing-text/5 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-base font-bold text-landing-text">Free</h3>
              <div className="mt-3">
                <span className="text-5xl font-extrabold text-landing-text tracking-tight">$0</span>
              </div>
              <p className="text-sm text-landing-text/40 mt-2">Forever free</p>
              <div className="mt-8 space-y-3.5">
                {["2 Beauty Packs included", "Full AR face tracking", "Photo & video recording", "Works offline", "No ads ever"].map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-landing-mint mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-landing-text/60">{f}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 border-2 border-landing-text/10 text-landing-text px-6 py-3.5 rounded-2xl text-sm font-semibold hover:border-landing-text/20 transition-colors"
              >
                Get Started
              </a>
            </motion.div>

            {/* Pro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative bg-gradient-to-b from-landing-pink/5 to-landing-lavender/5 rounded-3xl p-8 border-2 border-landing-pink/20 hover:shadow-lg transition-shadow"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-landing-pink to-landing-lavender text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                Most Popular
              </div>
              <h3 className="text-base font-bold text-landing-text">GRWM Pro</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-landing-text tracking-tight">$4.99</span>
                <span className="text-sm text-landing-text/40">/week</span>
              </div>
              <p className="text-sm text-landing-text/40 mt-2">or $29.99/year (save 88%)</p>
              <div className="mt-8 space-y-3.5">
                {["All 10+ Beauty Packs", "55+ beauty items", "New packs monthly", "Priority features", "Everything in Free"].map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-landing-pink mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-landing-text/60">{f}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-landing-dark text-white px-6 py-3.5 rounded-2xl text-sm font-semibold hover:bg-landing-dark/90 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Go Pro
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 sm:py-32 px-6 bg-white/30">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-landing-text">FAQ</h2>
            <p className="mt-4 text-landing-text/40">Everything you need to know.</p>
          </motion.div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-landing-text/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-landing-text/[0.02] transition-colors"
                >
                  <span className="text-sm font-semibold text-landing-text pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 text-landing-text/30 flex-shrink-0" />
                  </motion.div>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-6 pb-5"
                  >
                    <p className="text-sm text-landing-text/50 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-landing-dark rounded-[2rem] p-12 sm:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-landing-pink/10 via-transparent to-landing-mint/10" />
            <motion.div
              className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-landing-pink/10 blur-[80px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 6 }}
            />
            <div className="relative z-10">
              <motion.img
                src={logo}
                alt="GRWM Studio"
                className="w-20 h-20 object-contain mx-auto mb-6"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to Get Glam?
              </h2>
              <p className="text-white/40 mb-8 max-w-md mx-auto">
                Download GRWM Studio today. Free to start, no account required, zero data collection.
              </p>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-landing-dark px-8 py-4 rounded-2xl text-base font-semibold hover:bg-white/90 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <Apple className="w-5 h-5" />
                Download on App Store
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-landing-text/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <img src={logo} alt="GRWM Studio" className="w-8 h-8 object-contain" />
                <span className="font-bold text-landing-text">GRWM Studio</span>
              </div>
              <p className="text-xs text-landing-text/30">The safest beauty app for kids.</p>
            </div>
            <div className="flex flex-wrap gap-6">
              <a href="/privacy" className="text-sm text-landing-text/40 hover:text-landing-text transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-sm text-landing-text/40 hover:text-landing-text transition-colors">Terms of Use</a>
              <a href="/support" className="text-sm text-landing-text/40 hover:text-landing-text transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-landing-text/5 text-center">
            <p className="text-xs text-landing-text/25">© {new Date().getFullYear()} GRWM Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
