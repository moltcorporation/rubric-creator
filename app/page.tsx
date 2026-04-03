import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Rubric Maker for Teachers | Rubric Creator",
  description:
    "Create professional rubrics in minutes. Free rubric maker for teachers with templates, custom criteria, and instant sharing. The best Rubistar alternative.",
  keywords: [
    "rubric maker",
    "free rubric maker",
    "rubric maker for teachers",
    "rubistar alternative",
    "rubric creator",
    "rubric generator",
    "how to make a rubric",
  ],
  openGraph: {
    title: "Free Rubric Maker for Teachers | Rubric Creator",
    description:
      "Create professional rubrics in minutes. Free templates, custom criteria, instant sharing.",
    url: "https://rubriccreator.com",
    siteName: "Rubric Creator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Rubric Maker for Teachers",
    description:
      "Create professional rubrics in minutes. Free templates, custom criteria, instant sharing.",
  },
  alternates: {
    canonical: "https://rubriccreator.com",
  },
};

const faqItems = [
  {
    question: "How do I make a rubric?",
    answer:
      "Choose a template or start from scratch. Add your criteria and performance levels (e.g., Excellent, Good, Needs Improvement). Describe what each level looks like for each criterion. Save and share with students instantly.",
  },
  {
    question: "Is this rubric maker really free?",
    answer:
      "Yes. Create up to 3 rubrics with full features — custom criteria, performance levels, and sharing links. No credit card required. Upgrade to Pro ($3.99/mo or $29.99/yr) for unlimited rubrics and advanced features.",
  },
  {
    question: "What makes this better than Rubistar?",
    answer:
      "Modern interface, instant sharing via link (no PDF needed), real-time editing, template library, and it works on mobile. Rubistar hasn't been updated in years. Rubric Creator is built for how teachers work today.",
  },
  {
    question: "Can I share rubrics with students?",
    answer:
      "Yes. Every rubric gets a unique shareable link. Students can view the rubric on any device — no account needed. Pro users can also export to PDF.",
  },
  {
    question: "What subjects are the templates for?",
    answer:
      "Templates cover ELA, math, science, social studies, art, presentations, group projects, and more. Each template is fully customizable — use it as-is or modify every criterion.",
  },
];

const competitors = [
  { name: "Rubistar", price: "Free (outdated)", cons: "No updates since 2014, clunky interface, no mobile support" },
  { name: "Quick Rubric", price: "$3/mo", cons: "Limited templates, basic editor" },
  { name: "Teach-nology", price: "$48/year", cons: "Bundled with other tools, complex" },
  { name: "Rubric Creator", price: "Free / $3.99/mo Pro", cons: "Modern, fast, mobile-ready, template library" },
];

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>The Better Way to Grade</h1>
          <p className="hero-sub">
            Stop wrestling with spreadsheets. Create professional rubrics in
            minutes. Share with students instantly. Track progress clearly.
          </p>
          <div className="hero-cta">
            <a href="/create" className="btn btn-primary">
              Create Your First Rubric — Free
            </a>
            <a href="/templates" className="btn btn-secondary">
              Browse Templates
            </a>
          </div>
          <p className="hero-trust">
            ✓ No credit card required &nbsp; ✓ No signup to try &nbsp; ✓ Works
            on any device
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="container">
          <h2>Built by teachers, for teachers</h2>
          <p className="section-sub">
            Everything you need to create clearer expectations and grade more
            fairly
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>📋 Flexible Structure</h3>
              <p>
                Define any criteria and performance levels. Add weighted points,
                scales, or descriptive levels. Customize everything.
              </p>
            </div>
            <div className="feature-card">
              <h3>⏱️ Save Hours Every Year</h3>
              <p>
                Build once, reuse forever. Our template library covers K-12
                assignments across all subjects. Start in seconds.
              </p>
            </div>
            <div className="feature-card">
              <h3>👥 Share Smart</h3>
              <p>
                One link for all students. They see clear expectations before
                submitting. Share anytime, update instantly — no emails needed.
              </p>
            </div>
            <div className="feature-card">
              <h3>📊 Track Everything</h3>
              <p>
                View rubrics on any device. Print, screenshot, or export to PDF.
                Clean formatting that's ready for portfolios and parent
                conferences.
              </p>
            </div>
            <div className="feature-card">
              <h3>⚡ 3-Minute Setup</h3>
              <p>
                No steep learning curve. No technical knowledge required. Start
                from a template or blank slate — you're grading in minutes.
              </p>
            </div>
            <div className="feature-card">
              <h3>🎯 Modern Alternative</h3>
              <p>
                Rubistar hasn't been updated since 2014. We're built for today's
                teachers with mobile support, real-time editing, and clean
                design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Example */}
      <section className="templates-preview">
        <div className="container">
          <h2>See what you create</h2>
          <p className="section-sub">
            Clean, professional rubrics ready to share with students
          </p>
          <div style={{ maxWidth: "900px", margin: "40px auto" }}>
            <div
              style={{
                border: "1px solid var(--border-dark)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background:
                        "linear-gradient(135deg, #134e4a, #0f766e)",
                      color: "white",
                    }}
                  >
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: "600",
                        minWidth: "140px",
                      }}
                    >
                      Criterion
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Excellent
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Good
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Needs Work
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: "12px",
                        fontWeight: "600",
                        background: "var(--surface)",
                        borderRight: "1px solid var(--border-dark)",
                        borderBottom: "1px solid var(--border-dark)",
                      }}
                    >
                      Organization
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderRight: "1px solid var(--border-dark)",
                        borderBottom: "1px solid var(--border-dark)",
                      }}
                    >
                      Clear intro, body, conclusion
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderRight: "1px solid var(--border-dark)",
                        borderBottom: "1px solid var(--border-dark)",
                      }}
                    >
                      Mostly organized
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border-dark)",
                      }}
                    >
                      Unclear structure
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px",
                        fontWeight: "600",
                        background: "var(--surface)",
                        borderRight: "1px solid var(--border-dark)",
                        borderBottom: "1px solid var(--border-dark)",
                      }}
                    >
                      Evidence
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderRight: "1px solid var(--border-dark)",
                        borderBottom: "1px solid var(--border-dark)",
                      }}
                    >
                      Multiple strong examples
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderRight: "1px solid var(--border-dark)",
                        borderBottom: "1px solid var(--border-dark)",
                      }}
                    >
                      Some examples provided
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border-dark)",
                      }}
                    >
                      Limited examples
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px",
                        fontWeight: "600",
                        background: "var(--surface)",
                        borderRight: "1px solid var(--border-dark)",
                      }}
                    >
                      Writing Quality
                    </td>
                    <td style={{ padding: "12px", borderRight: "1px solid var(--border-dark)" }}>
                      Engaging, error-free
                    </td>
                    <td style={{ padding: "12px", borderRight: "1px solid var(--border-dark)" }}>
                      Clear, few errors
                    </td>
                    <td style={{ padding: "12px" }}>
                      Unclear, many errors
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p
              style={{
                textAlign: "center",
                color: "var(--muted)",
                fontSize: "13px",
                marginTop: "20px",
              }}
            >
              This is just one example. Fully customize criteria, levels,
              descriptions, and point values.
            </p>
          </div>
        </div>
      </section>

      {/* Template Preview */}
      <section style={{ padding: "60px 0", background: "white" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", fontSize: "24px", marginBottom: "12px" }}>
            Browse 30+ templates
          </h2>
          <p className="section-sub">
            Pre-built for essays, presentations, projects, labs, and more
          </p>
          <div className="template-grid">
            {[
              "Essay Writing",
              "Oral Presentation",
              "Group Project",
              "Science Lab Report",
              "Art Portfolio",
              "Math Problem Solving",
              "Research Paper",
              "Class Participation",
            ].map((name) => (
              <a key={name} href="/templates" className="template-card">
                <span className="template-name">{name}</span>
                <span className="template-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="pricing" id="pricing">
        <div className="container">
          <h2>How we compare</h2>
          <p className="section-sub">
            <a href="/pricing" className="btn btn-primary">
              View Pricing Plans
            </a>
          </p>
          <div className="pricing-table-wrapper">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Price</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c) => (
                  <tr
                    key={c.name}
                    className={c.name === "Rubric Creator" ? "highlight" : ""}
                  >
                    <td className="tool-name">{c.name}</td>
                    <td>{c.price}</td>
                    <td>{c.cons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="container">
          <h2>Frequently asked questions</h2>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Ready to create your first rubric?</h2>
          <p>Free. No signup required. Takes under 3 minutes.</p>
          <a href="/create" className="btn btn-primary btn-lg">
            Create a Rubric Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <h4>Rubric Creator</h4>
            <p>Free rubric maker for teachers.</p>
          </div>
          <div>
            <h4>Related Tools</h4>
            <ul>
              <li>
                <a href="https://nametracingmaker.com">Name Tracing Maker</a>
              </li>
              <li>
                <a href="https://classroomseatingchartmaker.com">
                  Classroom Seating Chart Maker
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><a href="/templates">Templates</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
