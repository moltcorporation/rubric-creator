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
    question: "How is this different from other rubric makers?",
    answer:
      "Rubric Creator combines simplicity with power: create professional rubrics in under 3 minutes, share instantly via link (no PDF exports needed), access templates proven in classrooms, and works seamlessly on any device. Most alternatives require PDF exports, limit customization, or have clunky interfaces.",
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
  { name: "Rubistar", price: "Free (unmaintained)", cons: "Limited customization, no mobile support, desktop-only" },
  { name: "Quick Rubric", price: "$3/mo", cons: "Basic templates, manual scoring only" },
  { name: "Teach-nology", price: "$48/year", cons: "Complex interface, bundled with tools you may not need" },
  { name: "Rubric Creator", price: "Free / $3.99/mo Pro", cons: "Modern, responsive, professional templates, instant sharing" },
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
          <h1>Create Professional Rubrics in Minutes</h1>
          <p className="hero-sub">
            Build grading rubrics that your students understand. Customizable
            templates, instant sharing via link, and everything you need in one
            simple tool.
          </p>
          <div className="hero-cta">
            <a href="/create" className="btn btn-primary">
              Start Free — No Signup
            </a>
            <a href="/templates" className="btn btn-secondary">
              Explore Templates
            </a>
          </div>
          <p className="hero-trust">
            ✓ Up to 3 rubrics free &nbsp; ✓ Fully customizable &nbsp; ✓ Works
            on all devices
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="container">
          <h2>Built for teachers. Built for clarity.</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <h3>Custom Criteria</h3>
              <p>
                Add as many criteria as you need. Define performance levels with
                clear descriptions. Drag to reorder.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <h3>Template Library</h3>
              <p>
                Start from proven templates for essays, presentations, projects,
                labs, and more. Fully customizable.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
              <h3>Instant Sharing</h3>
              <p>
                Share rubrics via link. Students view on any device — no account
                needed. Update anytime, link stays the same.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12" y2="18.01" />
                </svg>
              </div>
              <h3>Works Everywhere</h3>
              <p>
                Create and view rubrics on desktop, tablet, or phone. Responsive
                design that works the way you work.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8 10 1 17" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <h3>Fast & Simple</h3>
              <p>
                No complex setup. No training needed. Create a professional
                rubric in under 3 minutes.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3>Professional Output</h3>
              <p>
                Clean, printable rubrics that look professional. Share digitally
                or export to PDF (Pro).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Preview */}
      <section className="templates-preview">
        <div className="container">
          <h2>Popular rubric templates</h2>
          <p className="section-sub">
            Start with a template and customize it to your needs
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
          <h2>Ready to simplify grading?</h2>
          <p>Create your first rubric free. No credit card. Takes under 3 minutes.</p>
          <a href="/create" className="btn btn-primary btn-lg">
            Get Started Free
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
