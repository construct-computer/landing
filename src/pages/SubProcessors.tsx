import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const font = { fontFamily: "Georgia, 'Times New Roman', serif" };

export default function SubProcessors() {
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
          Sub-Processors
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Last updated: March 14, 2026
        </p>

        <div className="space-y-10 text-white/70 text-sm leading-relaxed">
          <section>
            <p>
              Construct Computer uses the following third-party sub-processors to
              deliver its services. Each sub-processor is engaged under
              appropriate data processing agreements and processes data only as
              necessary to provide the described functionality.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              What is a Sub-Processor?
            </h2>
            <p>
              A sub-processor is a third-party service provider that processes
              customer data on behalf of Construct Computer in order to deliver
              or support our services. We only share the minimum data necessary
              for each sub-processor to perform its function.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              Current Sub-Processors
            </h2>

            {/* Table */}
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-left text-white/50 text-xs uppercase tracking-wider">
                    <th className="py-3 px-2 font-medium">Sub-Processor</th>
                    <th className="py-3 px-2 font-medium">Purpose</th>
                    <th className="py-3 px-2 font-medium">Location</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-2 text-white font-medium">
                      OpenRouter, Inc.
                    </td>
                    <td className="py-3 px-2">
                      AI language model inference
                    </td>
                    <td className="py-3 px-2">United States</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-2 text-white font-medium">
                      Mem0 AI, Inc.
                    </td>
                    <td className="py-3 px-2">
                      Semantic memory extraction and storage
                    </td>
                    <td className="py-3 px-2">United States</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-2 text-white font-medium">
                      TinyFish
                    </td>
                    <td className="py-3 px-2">
                      Cloud web browsing and data extraction
                    </td>
                    <td className="py-3 px-2">United States</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-2 text-white font-medium">
                      AgentMail
                    </td>
                    <td className="py-3 px-2">
                      Agent email provisioning and delivery
                    </td>
                    <td className="py-3 px-2">United States</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-2 text-white font-medium">
                      Resend, Inc.
                    </td>
                    <td className="py-3 px-2">
                      Transactional email delivery
                    </td>
                    <td className="py-3 px-2">United States</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-2 text-white font-medium">
                      Contabo GmbH
                    </td>
                    <td className="py-3 px-2">
                      Infrastructure hosting and data storage
                    </td>
                    <td className="py-3 px-2">Germany</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              OpenRouter
            </h2>
            <p className="mb-3">
              OpenRouter provides AI language model inference. When Construct's
              agent processes a request, the conversation context is sent to
              OpenRouter to generate a response. This may include:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Message text from connected platforms (Slack, Telegram, email,
                desktop chat)
              </li>
              <li>
                Usernames and channel names associated with the message context
              </li>
              <li>
                File contents when the agent reads or edits files as part of a
                task
              </li>
              <li>
                Agent memory context relevant to the current interaction
              </li>
            </ul>
            <p className="mt-3">
              OpenRouter does not store conversation data beyond the duration of
              the API request. Data is transmitted over HTTPS and is not used for
              model training.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              Mem0
            </h2>
            <p className="mb-3">
              Mem0 provides semantic long-term memory for the AI agent. At the
              end of each agent interaction, recent conversation messages are
              sent to Mem0 for automated knowledge extraction. This enables the
              agent to remember facts, preferences, and context across sessions.
              Data sent to Mem0 may include:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Recent user and assistant messages from the conversation
              </li>
              <li>
                Extracted facts, preferences, and entity relationships
              </li>
            </ul>
            <p className="mt-3">
              All data stored in Mem0 is scoped to the individual user account
              and is never shared across users or used for training. Memory
              entries can be viewed and deleted by the user from the Memory
              window in the desktop interface.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              TinyFish
            </h2>
            <p className="mb-3">
              TinyFish provides cloud-based web browsing and data extraction
              when the agent performs web research tasks. Data sent to TinyFish
              includes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Target URLs and goal descriptions for web scraping tasks
              </li>
            </ul>
            <p className="mt-3">
              No user credentials, authentication tokens, or raw message content
              from connected platforms are sent to TinyFish. Goal descriptions
              may indirectly reference information from user requests.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              AgentMail
            </h2>
            <p className="mb-3">
              AgentMail provides email provisioning and delivery for AI agents.
              Each user's agent is assigned a dedicated email address through
              AgentMail, enabling it to send and receive emails on the user's
              behalf. Data sent to AgentMail may include:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Outgoing email content composed by the agent (recipients,
                subject lines, and message bodies)
              </li>
              <li>
                Incoming email content delivered to the agent's provisioned
                address
              </li>
            </ul>
            <p className="mt-3">
              AgentMail processes email data solely for the purpose of delivery
              and does not use message content for training or other purposes.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              Resend
            </h2>
            <p>
              Resend provides transactional email delivery for authentication.
              When a user signs in via email magic link, their email address is
              shared with Resend solely to deliver the sign-in email. Resend does
              not store email addresses beyond what is necessary for delivery and
              does not use them for marketing or other purposes.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              Contabo
            </h2>
            <p>
              Contabo provides the VPS infrastructure on which
              Construct Computer runs. All user data, including the SQLite
              database, encrypted integration tokens, Docker container volumes,
              and agent memory files, is stored on Contabo infrastructure. Each
              user's environment is isolated in a dedicated Docker container with
              its own network and persistent storage volume.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              Changes to This List
            </h2>
            <p>
              We will update this page when we add or remove sub-processors. For
              material changes that affect the processing of customer data, we
              will make reasonable efforts to notify affected users in advance
              via email or through the platform. You can check this page at any
              time to see the current list of sub-processors.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-lg italic tracking-tight mb-3"
              style={font}
            >
              Questions
            </h2>
            <p>
              If you have questions about our sub-processors or data processing
              practices, please contact us at:{" "}
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
