import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck, WifiOff, EyeOff, Baby, Lock, Apple,
  Palette, Sparkles, Video, Share2, Star, ChevronRight,
  Heart, Camera, Crown, CheckCircle2, ArrowRight, Play,
  X, Menu
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-transparent.png";

const trustBadges = [
  { icon: EyeOff, label: "No Ads" },
  { icon: Lock, label: "No Data Collection" },
  { icon: WifiOff, label: "Works Offline" },
  { icon: ShieldCheck, label: "COPPA Compliant" },
];

const reviews = [
  { text: "My daughter plays with this for hours!", stars: 5 },
  { text: "Finally an app I trust my kids with.", stars: 5 },
  { text: "No ads, no tracking — exactly what I wanted.", stars: 5 },
];

const steps = [
  {
    num: 1,
    title: "Pick a Look",
    desc: "Choose from 10 themed beauty packs with 55+ items",
    icon: Palette,
    emoji: "🎨",
  },
  {
    num: 2,
    title: "Try It On",
    desc: "AR face tracking maps makeup perfectly to your child's face",
    icon: Sparkles,
    emoji: "✨",
  },
  {
    num: 3,
    title: "Record & Share",
    desc: "Capture photos & GRWM videos up to 60 seconds",
    icon: Video,
    emoji: "📹",
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
    q: "What age is GlowUp Kids for?",
    a: "GlowUp Kids is designed for children ages 2-8. The AR technology is safe and uses only the front-facing camera in real-time — no photos or videos are stored unless the child or parent chooses to save them to the device.",
  },
  {
    q: "Does the app collect any data?",
    a: "No. GlowUp Kids collects zero personal data. No names, no emails, no analytics, no tracking. The app works entirely offline and nothing leaves the device.",
  },
  {
    q: "How does the subscription work?",
    a: "GlowUp Kids offers a free tier with 2 beauty packs. GlowUp Pro unlocks all 10+ packs for a small weekly or annual subscription, managed entirely through Apple. Cancel anytime in your iPhone Settings.",
  },
  {
    q: "Is the AR safe for kids?",
    a: "Absolutely. The AR uses Apple's standard camera APIs to overlay digital items on the face in real-time. No facial data is stored, transmitted, or used for any purpose beyond the live preview.",
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

const PhoneMockup = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative mx-auto ${className}`}>
    <div className="relative w-[220px] h-[440px] bg-landing-dark rounded-[36px] p-[8px] shadow-2xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-landing-dark rounded-b-2xl z-10" />
      <div className="w-full h-full rounded-[28px] overflow-hidden bg-gradient-to-br from-landing-pink/30 via-landing-lavender/20 to-landing-mint/30 flex items-center justify-center">
        {children}
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-landing-bg font-landing text-landing-text">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-landing-bg/80 backdrop-blur-xl border-b border-landing-text/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <img src={logo} alt="GRWM Studio" className="w-9 h-9 object-contain" />
            <span className="font-bold text-lg text-landing-text">GlowUp Kids</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-landing-text/60 hover:text-landing-text transition-colors">Features</a>
            <a href="#safety" className="text-sm text-landing-text/60 hover:text-landing-text transition-colors">Safety</a>
            <a href="#pricing" className="text-sm text-landing-text/60 hover:text-landing-text transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-landing-text/60 hover:text-landing-text transition-colors">FAQ</a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-landing-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-landing-dark/90 transition-colors"
            >
              <Apple className="w-4 h-4" />
              Download
            </a>
          </div>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-10 h-10 flex items-center justify-center">
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-landing-bg border-b border-landing-text/5 px-6 pb-6 pt-2 flex flex-col gap-4"
          >
            <a href="#features" onClick={() => setMobileMenu(false)} className="text-sm text-landing-text/70 py-2">Features</a>
            <a href="#safety" onClick={() => setMobileMenu(false)} className="text-sm text-landing-text/70 py-2">Safety</a>
            <a href="#pricing" onClick={() => setMobileMenu(false)} className="text-sm text-landing-text/70 py-2">Pricing</a>
            <a href="#faq" onClick={() => setMobileMenu(false)} className="text-sm text-landing-text/70 py-2">FAQ</a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-landing-dark text-white px-5 py-3 rounded-full text-sm font-semibold"
            >
              <Apple className="w-4 h-4" />
              Download on App Store
            </a>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-landing-pink/10 via-landing-lavender/10 to-landing-mint/10" />
        <motion.div
          className="absolute top-20 -right-20 w-[400px] h-[400px] rounded-full bg-landing-pink/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <motion.div
          className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full bg-landing-lavender/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 5, delay: 1 }}
        />

        <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-landing-pink/10 text-landing-pink px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Heart className="w-3.5 h-3.5" fill="currentColor" />
              Made for kids ages 2–8
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-landing-text">
              The Safest Get Ready With Me App for Kids ✨
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg text-landing-text/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Real AR face tracking. 55+ beauty items. Zero data collection. Built for ages 2–8.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-landing-dark text-white px-7 py-4 rounded-2xl text-base font-semibold hover:bg-landing-dark/90 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <Apple className="w-5 h-5" />
                Download on App Store
              </a>
              <button
                onClick={() => navigate("/app")}
                className="inline-flex items-center gap-2 border-2 border-landing-text/15 text-landing-text px-7 py-4 rounded-2xl text-base font-semibold hover:border-landing-text/30 transition-all"
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} custom={4} className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-landing-text/5">
                  <badge.icon className="w-4 h-4 text-landing-mint" />
                  <span className="text-xs font-semibold text-landing-text/70">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: -8 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0"
          >
            <PhoneMockup>
              <div className="flex flex-col items-center gap-3 px-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-landing-pink/50 to-landing-lavender/50 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white/80" />
                </div>
                <div className="flex gap-2">
                  {["💄", "👑", "🌟", "💜"].map((e, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mt-2">
                  <motion.div
                    className="h-full bg-white/60 rounded-full"
                    animate={{ width: ["30%", "80%", "30%"] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  />
                </div>
                <p className="text-[10px] text-white/60 font-medium">AR Face Tracking Active</p>
              </div>
            </PhoneMockup>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-6 bg-white/50 border-y border-landing-text/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 justify-center">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-landing-yellow fill-landing-yellow" />
                  ))}
                </div>
                <p className="text-sm text-landing-text/70 italic max-w-[250px]">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-landing-lavender uppercase tracking-wider">How It Works</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-landing-text">Three Simple Steps</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-landing-pink/20 to-landing-lavender/20 flex items-center justify-center">
                    <span className="text-3xl">{step.emoji}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-landing-dark text-white text-xs font-bold flex items-center justify-center">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-landing-text mb-2">{step.title}</h3>
                <p className="text-sm text-landing-text/60 leading-relaxed max-w-[280px]">{step.desc}</p>

                <div className="mt-6">
                  <PhoneMockup className="scale-75">
                    <div className="flex flex-col items-center gap-2">
                      <step.icon className="w-8 h-8 text-white/50" />
                      <span className="text-[10px] text-white/40 font-medium">{step.title}</span>
                    </div>
                  </PhoneMockup>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-landing-light">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-landing-text">
              Everything Kids Love,<br />Everything Parents Trust
            </h2>
          </motion.div>

          {/* Feature 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-landing-pink/10 text-landing-pink px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <Sparkles className="w-3 h-3" /> AR Technology
              </div>
              <h3 className="text-2xl font-bold text-landing-text mb-4">Real AR Face Tracking</h3>
              <p className="text-landing-text/60 leading-relaxed">
                468-point face mesh technology. Lipstick follows lips. Blush lands on cheeks. Crown sits on head. All in real-time with zero lag.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <PhoneMockup>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-landing-pink/40 to-landing-lavender/40 flex items-center justify-center">
                    <span className="text-3xl">💄</span>
                  </div>
                  <div className="flex gap-1">
                    {["👄", "✨", "👑"].map((e, i) => (
                      <motion.span key={i} className="text-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}>{e}</motion.span>
                    ))}
                  </div>
                  <p className="text-[9px] text-white/50">468 Face Points Active</p>
                </div>
              </PhoneMockup>
            </motion.div>
          </div>

          {/* Feature 2 — Packs */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
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
                    className="flex flex-col items-center gap-1 p-2 bg-white rounded-xl shadow-sm border border-landing-text/5"
                  >
                    <span className="text-2xl">{pack.emoji}</span>
                    <span className="text-[8px] font-semibold text-landing-text/60 text-center leading-tight">{pack.name}</span>
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
              <div className="inline-flex items-center gap-2 bg-landing-lavender/10 text-landing-lavender px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <Palette className="w-3 h-3" /> Content Packs
              </div>
              <h3 className="text-2xl font-bold text-landing-text mb-4">10 Themed Packs</h3>
              <p className="text-landing-text/60 leading-relaxed">
                Two free packs included. New packs added monthly with Pro. From Princess to Pop Star — there's a look for every mood.
              </p>
            </motion.div>
          </div>

          {/* Feature 3 — GRWM */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-landing-mint/20 text-landing-text/70 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <Video className="w-3 h-3" /> Video Recording
              </div>
              <h3 className="text-2xl font-bold text-landing-text mb-4">Record GRWM Videos</h3>
              <p className="text-landing-text/60 leading-relaxed">
                Kids can record their own Get Ready With Me videos — the trend they love, in a safe app they can call their own. Up to 60 seconds with full audio.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <PhoneMockup>
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-destructive/80 flex items-center justify-center"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-white" />
                  </motion.div>
                  <p className="text-[10px] text-white/50 font-medium">0:32 / 1:00</p>
                  <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-destructive/60 rounded-full"
                      animate={{ width: ["0%", "53%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                </div>
              </PhoneMockup>
            </motion.div>
          </div>

          {/* Feature 4 — Share */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 flex justify-center"
            >
              <PhoneMockup>
                <div className="flex flex-col items-center gap-3 px-4">
                  <Share2 className="w-8 h-8 text-white/50" />
                  <div className="flex gap-2">
                    {["📱", "💬", "📷"].map((e, i) => (
                      <motion.span key={i} className="text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.3 }}>{e}</motion.span>
                    ))}
                  </div>
                  <p className="text-[9px] text-white/40">AirDrop • Messages • Camera Roll</p>
                </div>
              </PhoneMockup>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-landing-yellow/20 text-landing-text/70 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <Share2 className="w-3 h-3" /> Sharing
              </div>
              <h3 className="text-2xl font-bold text-landing-text mb-4">Share With Family</h3>
              <p className="text-landing-text/60 leading-relaxed">
                Share photos and videos via AirDrop, Messages, or save to camera roll. Built-in share sheet makes it easy for parents to send creations to grandparents.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-24 px-6 bg-landing-dark">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <ShieldCheck className="w-10 h-10 text-landing-mint mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Built With Your Child's Safety First</h2>
            <p className="mt-4 text-white/50 max-w-lg mx-auto">Every decision we make starts with one question: is this safe for a 3-year-old to use unsupervised?</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {safetyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <span className="text-3xl mb-3 block">{card.emoji}</span>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-landing-text">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-landing-text/50">Start free. Upgrade when your kid wants more looks.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-landing-text/5"
            >
              <h3 className="text-lg font-bold text-landing-text">Free</h3>
              <div className="mt-2">
                <span className="text-4xl font-extrabold text-landing-text">$0</span>
              </div>
              <p className="text-sm text-landing-text/50 mt-1">Forever free</p>
              <div className="mt-6 space-y-3">
                {["2 Beauty Packs (Princess & Rainbow)", "Full AR face tracking", "Photo & video recording", "Works offline", "No ads"].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-landing-mint mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-landing-text/70">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-landing-pink/5 to-landing-lavender/5 rounded-3xl p-8 shadow-sm border-2 border-landing-pink/30 relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-landing-pink text-white text-xs font-bold px-4 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-lg font-bold text-landing-text">GlowUp Pro</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-landing-text">$4.99</span>
                <span className="text-sm text-landing-text/50">/week</span>
              </div>
              <p className="text-sm text-landing-text/50 mt-1">or $29.99/year (save 88%)</p>
              <div className="mt-6 space-y-3">
                {["All 10+ Beauty Packs", "55+ beauty items", "New packs every month", "Priority new features", "Everything in Free"].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-landing-pink mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-landing-text/70">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-landing-light">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-landing-text">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-3">
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
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-landing-text pr-4">{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-landing-text/30 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-6 pb-5"
                  >
                    <p className="text-sm text-landing-text/60 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-landing-pink/10 via-landing-lavender/10 to-landing-mint/10 rounded-3xl p-12 border border-landing-text/5"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-landing-text mb-4">
              Ready for the Safest GRWM App?
            </h2>
            <p className="text-landing-text/50 mb-8 max-w-md mx-auto">
              Download GlowUp Kids today. Free to start, no account required, zero data collection.
            </p>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-landing-dark text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-landing-dark/90 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <Apple className="w-5 h-5" />
              Download on App Store
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-landing-text/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-landing-pink to-landing-lavender flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-landing-text">GlowUp Kids</span>
              </div>
              <p className="text-xs text-landing-text/40">The safest beauty app for kids ages 2–8.</p>
            </div>
            <div className="flex flex-wrap gap-6">
              <a href="/privacy" className="text-sm text-landing-text/50 hover:text-landing-text transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-sm text-landing-text/50 hover:text-landing-text transition-colors">Terms of Use</a>
              <a href="/support" className="text-sm text-landing-text/50 hover:text-landing-text transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-landing-text/5 text-center">
            <p className="text-xs text-landing-text/30">© {new Date().getFullYear()} GlowUp Kids. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
