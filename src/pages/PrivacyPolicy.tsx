import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const font = { fontFamily: "Georgia, 'Times New Roman', serif" };

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors mb-10"
        >
          <span>&larr;</span> Back to home
        </Link>

        <h1
          className="text-white text-3xl md:text-4xl italic tracking-tight mb-2"
          style={font}
        >
          Privacy Policy
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Last updated: March 9, 2026
        </p>

        <div className="space-y-10 text-white/70 text-sm leading-relaxed">
          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              1. Introduction
            </h2>
            <p>
              Construct Computer ("Construct," "we," "us," or "our") operates
              a cloud-based virtual desktop platform where each user receives an
              isolated personal computer powered by an AI agent. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website at construct.computer, use
              our platform at beta.construct.computer, or interact with any of
              our related services (collectively, the "Services"). By using the
              Services, you consent to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              2. Information We Collect
            </h2>

            <h3 className="text-white/90 font-medium mt-4 mb-2">
              2.1 Account Information
            </h3>
            <p className="mb-3">
              When you create an account or join our waitlist, we collect:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Your email address and name (provided directly or via Google
                OAuth)
              </li>
              <li>
                Google profile information if you sign in with Google, including
                your profile ID and avatar URL
              </li>
              <li>
                Any additional information you voluntarily provide, such as
                responses on our waitlist form
              </li>
            </ul>

            <h3 className="text-white/90 font-medium mt-6 mb-2">
              2.2 Virtual Desktop & Agent Data
            </h3>
            <p className="mb-3">
              When you use the Construct platform, the following data is created
              and stored within your isolated virtual environment:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <span className="text-white/90">Files and content</span> -- any
                files, documents, code, or other content you create or that the
                AI agent creates on your behalf within your virtual desktop
              </li>
              <li>
                <span className="text-white/90">Chat messages</span> --
                conversations between you and your AI agent, including session
                history
              </li>
              <li>
                <span className="text-white/90">Agent memory</span> -- your AI
                agent maintains a persistent memory of facts, preferences, and
                context from your interactions to provide a personalized
                experience
              </li>
              <li>
                <span className="text-white/90">Activity logs</span> -- a record
                of actions performed by the AI agent, including tool usage,
                commands executed, and tasks completed
              </li>
              <li>
                <span className="text-white/90">Calendar data</span> -- events
                and schedules managed through the built-in calendar
              </li>
            </ul>

            <h3 className="text-white/90 font-medium mt-6 mb-2">
              2.3 Integration Credentials
            </h3>
            <p className="mb-3">
              If you connect third-party services to your Construct environment,
              we store the necessary credentials to maintain those connections:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Google Calendar and Google Drive OAuth tokens (for calendar sync
                and file sync)
              </li>
              <li>Slack workspace tokens (for Slack bot integration)</li>
              <li>Telegram bot tokens (for Telegram integration)</li>
              <li>
                API keys you provide for third-party AI and tool services (such
                as OpenRouter, TinyFish, or AgentMail)
              </li>
            </ul>
            <p className="mt-2">
              All integration credentials and API keys are encrypted at rest
              using AES-256-GCM encryption.
            </p>

            <h3 className="text-white/90 font-medium mt-6 mb-2">
              2.4 Technical & Usage Data
            </h3>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                IP address (used for rate limiting and security purposes)
              </li>
              <li>Browser type and operating system</li>
              <li>
                Authentication tokens (JSON Web Tokens stored in your browser's
                local storage)
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <span className="text-white/90">
                  Providing the Services
                </span>{" "}
                -- to operate your virtual desktop, run the AI agent, maintain
                your files and data, and facilitate integrations with
                third-party services you connect
              </li>
              <li>
                <span className="text-white/90">Authentication</span> -- to
                verify your identity via Google OAuth or magic link email and
                manage your session
              </li>
              <li>
                <span className="text-white/90">Personalization</span> -- to
                enable your AI agent to remember your preferences, context, and
                prior interactions across sessions
              </li>
              <li>
                <span className="text-white/90">Communication</span> -- to send
                you transactional emails (such as magic link sign-in emails) and,
                with your consent, product updates
              </li>
              <li>
                <span className="text-white/90">
                  Security & abuse prevention
                </span>{" "}
                -- to enforce rate limits, detect unauthorized access, and
                protect the integrity of our infrastructure
              </li>
              <li>
                <span className="text-white/90">Improvement</span> -- to
                diagnose technical issues and improve the Services
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              4. Third-Party Services & Data Sharing
            </h2>
            <p className="mb-3">
              We do not sell your personal information. Your data may be shared
              with or processed by third parties only in the following
              circumstances:
            </p>

            <h3 className="text-white/90 font-medium mt-4 mb-2">
              4.1 Services You Connect
            </h3>
            <p className="mb-3">
              When you choose to integrate third-party services with your
              Construct environment, data is exchanged with those services as
              necessary to provide the integration:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <span className="text-white/90">Google</span> -- if you sign in
                with Google or connect Google Calendar or Google Drive, your
                account data, calendar events, and files are exchanged with
                Google's APIs as needed
              </li>
              <li>
                <span className="text-white/90">OpenRouter</span> -- if you
                provide an OpenRouter API key, your AI agent's prompts and
                conversations are sent to OpenRouter's API to generate responses.
                OpenRouter may route requests to various AI model providers.
                Refer to{" "}
                <a
                  href="https://openrouter.ai/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6cb4ee] hover:underline"
                >
                  OpenRouter's privacy policy
                </a>{" "}
                for details
              </li>
              <li>
                <span className="text-white/90">Slack & Telegram</span> -- if
                you connect these services, messages you send through them are
                processed to enable communication with your AI agent
              </li>
              <li>
                <span className="text-white/90">
                  Other third-party tools
                </span>{" "}
                -- services such as TinyFish (web scraping) and AgentMail
                (email) are used only when you provide your own API keys and
                initiate tasks that require them
              </li>
            </ul>

            <h3 className="text-white/90 font-medium mt-6 mb-2">
              4.2 Email Delivery
            </h3>
            <p>
              We use Resend as our email delivery provider to send
              authentication emails (such as magic link sign-in). Your email
              address is shared with Resend solely for this purpose.
            </p>

            <h3 className="text-white/90 font-medium mt-6 mb-2">
              4.3 Legal & Safety
            </h3>
            <p>
              We may disclose your information if required by law, regulation,
              or legal process, or if we believe in good faith that disclosure
              is necessary to protect the rights, safety, or property of
              Construct Computer, our users, or the public.
            </p>

            <h3 className="text-white/90 font-medium mt-6 mb-2">
              4.4 Business Transfers
            </h3>
            <p>
              In the event of a merger, acquisition, reorganization, or sale of
              assets, your information may be transferred as part of that
              transaction. We will notify you of any such change.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              5. Data Storage & Security
            </h2>
            <p className="mb-3">
              We take the security of your data seriously and implement the
              following measures:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <span className="text-white/90">Container isolation</span> --
                each user's virtual desktop runs in an isolated Docker container
                with its own network, ensuring your data is separated from other
                users
              </li>
              <li>
                <span className="text-white/90">Encryption at rest</span> --
                sensitive credentials including OAuth tokens and API keys are
                encrypted using AES-256-GCM before storage
              </li>
              <li>
                <span className="text-white/90">Resource limits</span> -- each
                container is subject to CPU, memory, and storage limits to
                prevent abuse and ensure stability
              </li>
              <li>
                <span className="text-white/90">Rate limiting</span> --
                authentication endpoints and API routes are rate-limited to
                prevent brute-force attacks
              </li>
              <li>
                <span className="text-white/90">JWT authentication</span> --
                sessions are managed via signed JSON Web Tokens with configurable
                expiration
              </li>
            </ul>
            <p className="mt-3">
              Despite these measures, no system is completely secure. We cannot
              guarantee absolute security of your data.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              6. Bring Your Own Key (BYOK) Model
            </h2>
            <p>
              Construct operates on a Bring Your Own Key model for AI and
              third-party tool services. When you provide API keys for services
              like OpenRouter, TinyFish, or AgentMail, those keys are used
              solely to make requests on your behalf. API usage and billing for
              these services are between you and the respective provider.
              Construct does not monitor, log, or retain the content of API
              responses from these services beyond what is necessary to display
              results to you and maintain your agent's conversation context.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              7. Data Retention
            </h2>
            <p className="mb-3">
              We retain your data as follows:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <span className="text-white/90">Account data</span> -- retained
                for as long as your account is active. You may request deletion
                at any time.
              </li>
              <li>
                <span className="text-white/90">Virtual desktop data</span> --
                files, agent memory, chat history, and logs within your container
                persist for as long as your account is active. Container data is
                deleted when your account is closed.
              </li>
              <li>
                <span className="text-white/90">Waitlist data</span> -- email
                addresses and responses submitted via our waitlist form are
                retained until you are granted access or request removal.
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              8. Cookies & Local Storage
            </h2>
            <p>
              The Construct platform does not use cookies for user session
              management. Authentication tokens are stored in your browser's
              local storage. We do not use third-party analytics or tracking
              cookies. An HTTP-only session cookie is used only for
              administrative access to internal dashboards and does not apply to
              regular users.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              9. Your Rights
            </h2>
            <p className="mb-3">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Access the personal data we hold about you
              </li>
              <li>
                Correct inaccurate or incomplete data
              </li>
              <li>
                Request deletion of your account and all associated data,
                including your virtual desktop container and its contents
              </li>
              <li>
                Object to or restrict the processing of your data
              </li>
              <li>
                Withdraw consent for optional processing at any time
              </li>
              <li>
                Request a portable copy of your data
              </li>
              <li>
                Disconnect third-party integrations (Google, Slack, Telegram) at
                any time through your account settings, which revokes stored
                credentials
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at the address
              below.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              10. Children's Privacy
            </h2>
            <p>
              The Services are not directed to individuals under the age of 13.
              We do not knowingly collect personal information from children
              under 13. If we become aware that we have collected data from a
              child under 13 without parental consent, we will promptly delete
              that information and terminate the associated account.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              11. Third-Party Links
            </h2>
            <p>
              Our website and your virtual desktop environment may contain links
              to third-party websites. The AI agent may also navigate to
              third-party websites on your behalf. We are not responsible for the
              privacy practices or content of those websites. We encourage you to
              review their privacy policies.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              12. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of material changes by posting the updated policy on
              this page with a revised "Last updated" date. Your continued use
              of the Services after any changes constitutes your acceptance of
              the updated policy.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              13. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or wish to
              exercise your data rights, please contact us at:{" "}
              <a
                href="mailto:support@construct.computer"
                className="text-[#6cb4ee] hover:underline"
              >
                support@construct.computer
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
