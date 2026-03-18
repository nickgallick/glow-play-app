import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo-transparent.png";

const TermsOfUse = () => {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-landing-text mb-2">Terms of Use</h1>
          <p className="text-sm text-landing-text/40 mb-10">Last updated: March 18, 2026</p>

          <div className="space-y-8">
            <Section title="1. Acceptance of Terms">
              <p>By downloading, installing, or using GlowUp Kids ("the App"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the App. If you are a parent or guardian, you agree to these terms on behalf of your child.</p>
            </Section>

            <Section title="2. Description of Service">
              <p>GlowUp Kids is an augmented reality (AR) camera application designed for children ages 2–8. The App allows users to apply virtual beauty items to their face using AR technology, take photos, and record videos.</p>
            </Section>

            <Section title="3. Age Requirements">
              <p>The App is designed for children ages 2–8 under parental supervision. By using the App, you confirm that you are the parent or legal guardian of any child using the App, or that you are at least 18 years old.</p>
            </Section>

            <Section title="4. Subscriptions & Purchases">
              <ul>
                <li>GlowUp Kids offers both free and premium (Pro) content.</li>
                <li>Subscriptions are managed entirely through Apple's App Store.</li>
                <li>All purchases are protected by a parental gate within the App.</li>
                <li>Subscription terms, pricing, and renewal policies are governed by Apple's terms.</li>
                <li>You may cancel your subscription at any time through your Apple ID settings.</li>
              </ul>
            </Section>

            <Section title="5. User Content">
              <p>Photos and videos created within the App are stored locally on your device. You retain full ownership of any content you create. We do not access, collect, or store any user-created content.</p>
            </Section>

            <Section title="6. Acceptable Use">
              <p>You agree not to:</p>
              <ul>
                <li>Reverse engineer, decompile, or disassemble the App</li>
                <li>Use the App for any unlawful purpose</li>
                <li>Attempt to circumvent any security features, including the parental gate</li>
                <li>Redistribute or resell the App or its content</li>
              </ul>
            </Section>

            <Section title="7. Intellectual Property">
              <p>All content within the App — including but not limited to graphics, animations, designs, AR assets, and user interface elements — is the property of GlowUp Kids and is protected by copyright and intellectual property laws.</p>
            </Section>

            <Section title="8. Disclaimer of Warranties">
              <p>The App is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the App will be error-free, uninterrupted, or free of harmful components.</p>
            </Section>

            <Section title="9. Limitation of Liability">
              <p>To the maximum extent permitted by law, GlowUp Kids shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the App.</p>
            </Section>

            <Section title="10. Changes to Terms">
              <p>We reserve the right to modify these Terms at any time. Updated terms will be posted on this page. Continued use of the App constitutes acceptance of updated terms.</p>
            </Section>

            <Section title="11. Governing Law">
              <p>These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.</p>
            </Section>

            <Section title="12. Contact">
              <p>For questions about these Terms, contact us at:</p>
              <p className="font-semibold">support@glowupkids.app</p>
            </Section>
          </div>
        </motion.div>
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

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="text-xl font-bold text-landing-text mb-3">{title}</h2>
    <div className="text-sm text-landing-text/60 leading-relaxed space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">{children}</div>
  </div>
);

export default TermsOfUse;
