import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-landing-bg font-landing text-landing-text">
      {/* Nav */}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-landing-text mb-2">Privacy Policy</h1>
          <p className="text-sm text-landing-text/40 mb-10">Last updated: March 18, 2026</p>

          <div className="prose-landing space-y-8">
            <Section title="Overview">
              <p>GlowUp Kids ("the App") is designed with children's privacy as the highest priority. We do not collect, store, transmit, or share any personal information from children or adults who use the App.</p>
            </Section>

            <Section title="Information We Do NOT Collect">
              <ul>
                <li>Names, usernames, or email addresses</li>
                <li>Photos, videos, or camera data</li>
                <li>Location data</li>
                <li>Device identifiers or advertising IDs</li>
                <li>Usage analytics or behavioral data</li>
                <li>Contacts, messages, or call logs</li>
                <li>Any biometric or facial recognition data</li>
              </ul>
            </Section>

            <Section title="Camera Usage">
              <p>The App uses the device's front-facing camera solely for real-time AR face tracking. Camera data is processed entirely on-device in real-time. No camera data, facial data, or images are ever stored, transmitted, or sent to any server. When the user chooses to save a photo or video, it is saved only to the device's local camera roll.</p>
            </Section>

            <Section title="Data Storage">
              <p>The App stores minimal data on-device only:</p>
              <ul>
                <li>User preferences (selected themes, favorites)</li>
                <li>Subscription status (managed by Apple)</li>
              </ul>
              <p>This data never leaves the device and is not accessible to us.</p>
            </Section>

            <Section title="Third-Party Services">
              <p>The App does not integrate with any third-party analytics, advertising, or tracking services. The only third-party service used is Apple's StoreKit for subscription management, which is governed by Apple's own privacy policy.</p>
            </Section>

            <Section title="Children's Privacy (COPPA Compliance)">
              <p>GlowUp Kids is fully compliant with the Children's Online Privacy Protection Act (COPPA). Since we collect zero personal information from any user, including children under 13, there is no personal data to protect, share, or delete.</p>
            </Section>

            <Section title="Internet Connectivity">
              <p>The App is designed to work entirely offline. No internet connection is required for core functionality. The only network activity occurs during subscription purchases, which are handled entirely by Apple's App Store infrastructure.</p>
            </Section>

            <Section title="Parental Controls">
              <p>All settings, subscription management, and purchase options are protected by a parental gate (math problem verification). Children cannot access these sections without parent assistance.</p>
            </Section>

            <Section title="Changes to This Policy">
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the App constitutes acceptance of the updated policy.</p>
            </Section>

            <Section title="Contact Us">
              <p>If you have questions about this Privacy Policy, please contact us at:</p>
              <p className="font-semibold">support@glowupkids.app</p>
            </Section>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="text-xl font-bold text-landing-text mb-3">{title}</h2>
    <div className="text-sm text-landing-text/60 leading-relaxed space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">{children}</div>
  </div>
);

const Footer = () => (
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
);

export default PrivacyPolicy;
