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
      "Yes. Create up to 5 rubrics with full features — custom criteria, performance levels, and sharing links. No credit card required. Upgrade to Pro for unlimited rubrics and advanced features.",
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
  { name: "Rubric Creator", price: "Free / $7 Pro", cons: "Modern, fast, mobile-ready, template library" },
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
          <h1>Free Rubric Maker for Teachers</h1>
          <p className="hero-sub">
            Create professional rubrics in minutes. Custom criteria, performance
            levels, and instant sharing — no account required to start.
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
          <h2>Everything you need to create rubrics</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>📝 Custom Criteria</h3>
              <p>
                Add as many criteria as you need. Define performance levels with
                clear descriptions. Drag to reorder.
              </p>
            </div>
            <div className="feature-card">
              <h3>📚 Template Library</h3>
              <p>
                Start from proven templates for essays, presentations, projects,
                labs, and more. Fully customizable.
              </p>
            </div>
            <div className="feature-card">
              <h3>🔗 Instant Sharing</h3>
              <p>
                Share rubrics via link. Students view on any device — no account
                needed. Update anytime, link stays the same.
              </p>
            </div>
            <div className="feature-card">
              <h3>📱 Works Everywhere</h3>
              <p>
                Create and view rubrics on desktop, tablet, or phone. Responsive
                design that works the way you work.
              </p>
            </div>
            <div className="feature-card">
              <h3>⚡ Fast & Simple</h3>
              <p>
                No complex setup. No training needed. Create a professional
                rubric in under 3 minutes.
              </p>
            </div>
            <div className="feature-card">
              <h3>🎨 Professional Output</h3>
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
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
