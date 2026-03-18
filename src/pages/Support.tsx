import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Mail, MessageCircle, HelpCircle, FileText, Shield, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const supportTopics = [
  {
    icon: HelpCircle,
    title: "Getting Started",
    desc: "How to use GlowUp Kids, set up AR, and navigate the app.",
  },
  {
    icon: Shield,
    title: "Privacy & Safety",
    desc: "Learn about our zero-data-collection policy and safety features.",
  },
  {
    icon: FileText,
    title: "Subscriptions",
    desc: "Manage, cancel, or restore your GlowUp Pro subscription.",
  },
  {
    icon: MessageCircle,
    title: "Report an Issue",
    desc: "Found a bug or something not working right? Let us know.",
  },
];

const quickAnswers = [
  {
    q: "How do I cancel my subscription?",
    a: "Open your iPhone Settings → tap your name → Subscriptions → GlowUp Kids → Cancel. Apple manages all billing.",
  },
  {
    q: "The AR isn't tracking my child's face",
    a: "Make sure you're in a well-lit area and the front camera has a clear view of the face. AR works best within arm's length of the device.",
  },
  {
    q: "How do I restore my purchases?",
    a: "Open the app → Settings (behind parental gate) → Subscription → Restore Purchases. This will restore your Pro access on any device signed into the same Apple ID.",
  },
  {
    q: "Is GlowUp Kids safe for my child?",
    a: "Yes. We collect zero data, show zero ads, and the app works entirely offline. All settings are behind a parental gate. See our Privacy Policy for full details.",
  },
];

const Support = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-landing-bg font-landing text-landing-text">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-landing-bg/80 backdrop-blur-xl border-b border-landing-text/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-landing-pink to-landing-lavender flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-landing-text">GlowUp Kids</span>
          </button>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-landing-text/60 hover:text-landing-text transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-landing-text mb-3">How Can We Help?</h1>
            <p className="text-landing-text/50">We're here to make sure you and your little one have the best experience.</p>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-landing-pink/10 to-landing-lavender/10 rounded-3xl p-8 text-center mb-12 border border-landing-text/5"
          >
            <Mail className="w-10 h-10 text-landing-pink mx-auto mb-4" />
            <h2 className="text-xl font-bold text-landing-text mb-2">Email Support</h2>
            <p className="text-sm text-landing-text/50 mb-4">We typically respond within 24 hours.</p>
            <a
              href="mailto:support@glowupkids.app"
              className="inline-flex items-center gap-2 bg-landing-dark text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:bg-landing-dark/90 transition-colors"
            >
              <Mail className="w-4 h-4" />
              support@glowupkids.app
            </a>
          </motion.div>

          {/* Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold text-landing-text mb-5">Support Topics</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {supportTopics.map((topic, i) => (
                <motion.a
                  key={topic.title}
                  href={`mailto:support@glowupkids.app?subject=${encodeURIComponent(topic.title)}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-landing-text/5 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-10 h-10 rounded-xl bg-landing-light flex items-center justify-center flex-shrink-0 group-hover:bg-landing-pink/10 transition-colors">
                    <topic.icon className="w-5 h-5 text-landing-text/50 group-hover:text-landing-pink transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-landing-text mb-1">{topic.title}</h3>
                    <p className="text-xs text-landing-text/50 leading-relaxed">{topic.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-landing-text/20 mt-1 flex-shrink-0" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Answers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-landing-text mb-5">Quick Answers</h2>
            <div className="space-y-4">
              {quickAnswers.map((qa, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  className="bg-white rounded-2xl p-6 border border-landing-text/5"
                >
                  <h3 className="text-sm font-bold text-landing-text mb-2">{qa.q}</h3>
                  <p className="text-sm text-landing-text/50 leading-relaxed">{qa.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="py-10 px-6 border-t border-landing-text/5">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-landing-text/30">© {new Date().getFullYear()} GlowUp Kids. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-xs text-landing-text/40 hover:text-landing-text transition-colors">Privacy</a>
            <a href="/terms" className="text-xs text-landing-text/40 hover:text-landing-text transition-colors">Terms</a>
            <a href="/support" className="text-xs text-landing-text/40 hover:text-landing-text transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Support;
