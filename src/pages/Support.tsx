import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const font = { fontFamily: "Georgia, 'Times New Roman', serif" };

export default function Support() {
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
          Support
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Get help with Construct Computer
        </p>

        <div className="space-y-10 text-white/70 text-sm leading-relaxed">
          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              Contact Us
            </h2>
            <p className="mb-3">
              For any questions, issues, or feedback, you can reach our team at:
            </p>
            <p>
              <a
                href="mailto:support@construct.computer"
                className="text-[#6cb4ee] hover:underline"
              >
                support@construct.computer
              </a>
            </p>
            <p className="mt-3">
              We aim to respond to all inquiries within 24 hours during business
              days.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              Community
            </h2>
            <p className="mb-3">
              Join our community to ask questions, share feedback, report bugs,
              and connect with other users:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <a
                  href="https://discord.gg/puArEQHYN9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6cb4ee] hover:underline"
                >
                  Discord
                </a>{" "}
                &mdash; Our primary community hub for real-time discussions,
                support, and feature requests
              </li>
              <li>
                <a
                  href="https://x.com/use_construct"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6cb4ee] hover:underline"
                >
                  X / Twitter
                </a>{" "}
                &mdash; Follow us for product updates and announcements
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              Reporting Issues
            </h2>
            <p className="mb-3">
              If you encounter a bug or technical issue, please include the
              following information when reaching out:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>A description of what happened and what you expected</li>
              <li>Steps to reproduce the issue, if possible</li>
              <li>Your browser and operating system</li>
              <li>
                Screenshots or screen recordings, if applicable
              </li>
              <li>
                Any relevant entries from the Audit Logs window in the desktop
                interface
              </li>
            </ul>
            <p className="mt-3">
              You can submit bug reports via email at{" "}
              <a
                href="mailto:support@construct.computer"
                className="text-[#6cb4ee] hover:underline"
              >
                support@construct.computer
              </a>{" "}
              or through our{" "}
              <a
                href="https://discord.gg/puArEQHYN9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6cb4ee] hover:underline"
              >
                Discord server
              </a>
              .
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              Security Concerns
            </h2>
            <p>
              If you discover a security vulnerability or have concerns about
              data protection, please contact us immediately at{" "}
              <a
                href="mailto:security@construct.computer"
                className="text-[#6cb4ee] hover:underline"
              >
                security@construct.computer
              </a>
              . We take security reports seriously and will respond within 24
              hours. Please do not publicly disclose security vulnerabilities
              before we have had a chance to investigate and address them.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              Account & Billing
            </h2>
            <p>
              For questions about your account, data deletion requests, or
              billing inquiries, please email{" "}
              <a
                href="mailto:support@construct.computer"
                className="text-[#6cb4ee] hover:underline"
              >
                support@construct.computer
              </a>{" "}
              with your account email address. We will verify your identity
              before making any account changes.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              Data & Privacy Requests
            </h2>
            <p className="mb-3">
              You have the right to request access to, correction of, or
              deletion of your personal data. To submit a data request:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Email{" "}
                <a
                  href="mailto:support@construct.computer"
                  className="text-[#6cb4ee] hover:underline"
                >
                  support@construct.computer
                </a>{" "}
                with the subject line "Data Request"
              </li>
              <li>Include your account email address</li>
              <li>
                Specify whether you are requesting data access, correction, or
                deletion
              </li>
            </ul>
            <p className="mt-3">
              We will process your request within 30 days. For more details on
              how we handle your data, see our{" "}
              <Link
                to="/privacy"
                className="text-[#6cb4ee] hover:underline"
              >
                Privacy Policy
              </Link>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
