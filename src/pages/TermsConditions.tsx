import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const font = { fontFamily: "Georgia, 'Times New Roman', serif" };

export default function TermsConditions() {
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
          Terms & Conditions
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
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the Construct Computer website at
              construct.computer, the Construct platform at
              beta.construct.computer, or any related services (collectively,
              the "Services"), you agree to be bound by these Terms & Conditions
              ("Terms"). If you do not agree to these Terms, you must not access
              or use the Services.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              2. Eligibility
            </h2>
            <p>
              You must be at least 13 years of age to use the Services. By using
              the Services, you represent and warrant that you meet this age
              requirement and have the legal capacity to enter into these Terms.
              Access to the platform may be subject to a waitlist or invitation
              system at our discretion.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              3. Description of Services
            </h2>
            <p className="mb-3">
              Construct Computer provides a cloud-based virtual desktop platform
              where each user receives an isolated personal computer operated by
              an AI agent. The Services include, but are not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                An isolated virtual desktop environment with a browser,
                terminal, file system, and code editor
              </li>
              <li>
                An AI agent that can operate the virtual desktop on your behalf,
                including browsing the web, running commands, managing files, and
                writing code
              </li>
              <li>
                Real-time observation of agent activity through live-streamed
                browser and terminal sessions
              </li>
              <li>
                Integrations with third-party services including Google Calendar,
                Google Drive, Slack, Telegram, and email
              </li>
              <li>
                Persistent agent memory that retains context across sessions
              </li>
            </ul>
            <p className="mt-3">
              The Services are currently in active development. We reserve the
              right to modify, suspend, or discontinue any feature or aspect of
              the Services at any time without prior notice.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              4. Accounts & Authentication
            </h2>
            <p className="mb-3">
              To use the platform, you must create an account using one of our
              supported authentication methods (Google OAuth or email magic
              link). You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Provide accurate and complete information when creating your
                account
              </li>
              <li>
                Maintain the security of your account and not share access with
                others
              </li>
              <li>
                Notify us immediately of any unauthorized use of your account
              </li>
              <li>
                Accept responsibility for all activity that occurs under your
                account, including actions taken by the AI agent on your behalf
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              5. Bring Your Own Key (BYOK)
            </h2>
            <p className="mb-3">
              Construct operates on a Bring Your Own Key model for certain
              third-party services. You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Providing your own API keys for AI model providers (such as
                OpenRouter), web scraping services (such as TinyFish), and email
                services (such as AgentMail)
              </li>
              <li>
                All usage charges incurred through your API keys with those
                third-party providers
              </li>
              <li>
                Complying with the terms of service of each third-party provider
                whose API keys you use within Construct
              </li>
              <li>
                Keeping your API keys secure and revoking them if you suspect
                compromise
              </li>
            </ul>
            <p className="mt-3">
              Construct Computer is not liable for any charges, data processing,
              or other consequences arising from your use of third-party
              services via your own API keys.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              6. AI Agent & Autonomous Actions
            </h2>
            <p className="mb-3">
              The AI agent operates within your virtual desktop and can perform
              actions autonomously on your behalf. You acknowledge and agree
              that:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                The AI agent may browse websites, execute commands, create and
                modify files, send emails, and interact with connected services
                as part of completing tasks you assign
              </li>
              <li>
                AI-generated outputs (including code, text, files, and actions)
                may contain errors, inaccuracies, or unexpected results. You are
                responsible for reviewing and verifying all agent output before
                relying on it
              </li>
              <li>
                You retain the ability to intervene, take over, or stop the
                agent at any time. You are ultimately responsible for any
                consequences of actions taken by the agent in your environment
              </li>
              <li>
                The agent's memory and context are based on your prior
                interactions and may not always produce accurate or complete
                information
              </li>
              <li>
                We do not guarantee the accuracy, reliability, or suitability of
                AI-generated content for any particular purpose
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              7. Acceptable Use
            </h2>
            <p className="mb-3">You agree not to use the Services to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Violate any applicable law, regulation, or third-party rights
              </li>
              <li>
                Direct the AI agent to perform illegal, harmful, or abusive
                actions
              </li>
              <li>
                Attempt to escape or circumvent the container isolation or
                resource limits of your virtual environment
              </li>
              <li>
                Interfere with or disrupt the Services, infrastructure, or other
                users' environments
              </li>
              <li>
                Use the Services for cryptocurrency mining, distributed denial
                of service attacks, or other resource-abusive activities
              </li>
              <li>
                Attempt to access other users' containers, data, or accounts
              </li>
              <li>
                Transmit malware, viruses, or other harmful code through the
                Services
              </li>
              <li>
                Reverse engineer, decompile, or disassemble any aspect of the
                Services except as permitted by applicable law
              </li>
              <li>
                Use the Services to violate the terms of service of any
                third-party service accessed through your virtual desktop
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              8. Resource Limits
            </h2>
            <p>
              Each virtual desktop environment is subject to resource limits,
              including but not limited to CPU, memory, storage, and process
              limits. These limits are in place to ensure fair usage and
              platform stability. We reserve the right to adjust these limits at
              any time. Attempting to circumvent or abuse resource limits may
              result in suspension or termination of your account.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              9. User Content
            </h2>
            <p className="mb-3">
              "User Content" includes all files, code, text, messages, and other
              content that you create or that the AI agent creates on your behalf
              within your virtual desktop environment. Regarding User Content:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                You retain ownership of your User Content
              </li>
              <li>
                You grant Construct Computer a limited, non-exclusive license to
                store, process, and display your User Content solely as
                necessary to provide the Services to you
              </li>
              <li>
                You are responsible for ensuring that your User Content does not
                violate any laws or third-party rights
              </li>
              <li>
                We do not claim ownership over any content generated by the AI
                agent within your environment
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              10. Intellectual Property
            </h2>
            <p>
              The Construct Computer platform, including its software, design,
              branding, documentation, and all related intellectual property, is
              owned by Construct Computer and its contributors. The platform
              software is licensed under the Business Source License 1.1, which
              permits non-commercial use. You may not copy, modify, distribute,
              sell, or create derivative works of the Services or any part
              thereof except as expressly permitted by the applicable license or
              with our prior written consent.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              11. Third-Party Services & Integrations
            </h2>
            <p className="mb-3">
              The Services integrate with and facilitate access to third-party
              services, including but not limited to Google (Calendar, Drive,
              OAuth), OpenRouter, Slack, Telegram, TinyFish, and AgentMail. You
              acknowledge that:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Your use of third-party services is governed by those services'
                own terms and privacy policies
              </li>
              <li>
                Construct Computer is not responsible for the availability,
                accuracy, or conduct of any third-party service
              </li>
              <li>
                Third-party services may change, restrict, or discontinue their
                APIs, which could affect the functionality of Construct
                integrations
              </li>
              <li>
                You are responsible for complying with the terms of service of
                any third-party service you connect or access through the
                platform
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              12. Disclaimer of Warranties
            </h2>
            <p>
              The Services are provided on an "as is" and "as available" basis.
              Construct Computer makes no warranties, whether express, implied,
              statutory, or otherwise, including implied warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement. We do not warrant that the Services will be
              uninterrupted, error-free, secure, or that the AI agent will
              produce accurate or reliable results. The Services are in active
              development and may contain bugs, errors, or incomplete features.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              13. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Construct Computer and its
              officers, directors, employees, contributors, and agents shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits, revenue, data, or
              goodwill arising from: your use of or inability to use the
              Services; any actions taken by the AI agent; any content or data
              loss within your virtual environment; reliance on AI-generated
              output; charges incurred through third-party API keys; or any
              unauthorized access to your account or data.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              14. Indemnification
            </h2>
            <p>
              You agree to indemnify, defend, and hold harmless Construct
              Computer and its affiliates, officers, directors, employees, and
              contributors from and against any claims, liabilities, damages,
              losses, and expenses (including reasonable attorneys' fees) arising
              out of or in connection with: your use of the Services; your
              violation of these Terms; actions taken by the AI agent in your
              environment; your use of third-party services via the platform; or
              your User Content.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              15. Termination
            </h2>
            <p className="mb-3">
              We reserve the right to suspend or terminate your access to the
              Services at any time, with or without cause, and with or without
              notice. You may also delete your account at any time. Upon
              termination:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Your right to use the Services will immediately cease
              </li>
              <li>
                Your virtual desktop container and all data within it may be
                deleted
              </li>
              <li>
                Stored integration credentials will be revoked and deleted
              </li>
              <li>
                Provisions of these Terms that by their nature should survive
                termination (including intellectual property, disclaimers,
                limitation of liability, and indemnification) shall survive
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              16. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of India, without regard to conflict of law principles.
              Any disputes arising from these Terms or the Services shall be
              subject to the exclusive jurisdiction of the courts in India.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              17. Changes to These Terms
            </h2>
            <p>
              We may revise these Terms at any time by posting the updated
              version on this page with a revised "Last updated" date. Your
              continued use of the Services after any changes constitutes your
              acceptance of the revised Terms. For material changes, we will
              make reasonable efforts to notify you via email or through the
              platform.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              18. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us
              at:{" "}
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
