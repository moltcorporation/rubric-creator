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

function ClipboardCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

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
            Stop wrestling with spreadsheets. Create clear, professional rubrics
            in minutes — then share them with students in one click.
          </p>
          <div className="hero-cta">
            <a href="/create" className="btn btn-primary">
              Create Your First Rubric — Free
            </a>
            <a href="/templates" className="btn btn-secondary">
              Browse 50+ Templates
            </a>
          </div>
          <p className="hero-trust">
            No credit card required &middot; No signup to try &middot; Works on any device
          </p>

          {/* Mini rubric preview */}
          <div className="hero-preview">
            <div className="hero-rubric">
              <table>
                <thead>
                  <tr>
                    <th className="hr-corner">Criteria</th>
                    <th className="hr-level">Excellent (4)</th>
                    <th className="hr-level">Proficient (3)</th>
                    <th className="hr-level">Developing (2)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="hr-criteria">Thesis Statement</td>
                    <td><span className="hr-grade-a">Clear, arguable, specific</span></td>
                    <td><span className="hr-grade-b">Present but could be sharper</span></td>
                    <td><span className="hr-grade-c">Vague or missing focus</span></td>
                  </tr>
                  <tr>
                    <td className="hr-criteria">Evidence & Support</td>
                    <td><span className="hr-grade-a">3+ strong examples cited</span></td>
                    <td><span className="hr-grade-b">1-2 relevant examples</span></td>
                    <td><span className="hr-grade-c">Limited or no evidence</span></td>
                  </tr>
                  <tr>
                    <td className="hr-criteria">Organization</td>
                    <td><span className="hr-grade-a">Logical flow, transitions</span></td>
                    <td><span className="hr-grade-b">Mostly organized</span></td>
                    <td><span className="hr-grade-c">Hard to follow structure</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="hero-rubric-label">
              Essay Writing Rubric — one of 50+ templates included free
            </p>
          </div>

          <div className="grade-bar">
            <span style={{ background: "#2d7d46" }} />
            <span style={{ background: "#3b82c6" }} />
            <span style={{ background: "#d4a017" }} />
            <span style={{ background: "#c0392b" }} />
          </div>
        </div>
      </section>

      {/* Use cases strip */}
      <section className="use-cases">
        <div className="container">
          <div className="use-case-grid">
            <div className="use-case-item">
              <div className="use-case-number">50+</div>
              <div className="use-case-label">Ready-made templates</div>
            </div>
            <div className="use-case-item">
              <div className="use-case-number">K-12</div>
              <div className="use-case-label">All grade levels</div>
            </div>
            <div className="use-case-item">
              <div className="use-case-number">8</div>
              <div className="use-case-label">Subject areas covered</div>
            </div>
            <div className="use-case-item">
              <div className="use-case-number">&lt;3 min</div>
              <div className="use-case-label">Create any rubric</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="container">
          <h2>Built by teachers, for teachers</h2>
          <p className="section-sub">
            Everything you need to set clear expectations and grade more fairly
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon"><ClipboardCheckIcon /></div>
              <h3>Flexible Criteria & Scales</h3>
              <p>
                Define any criteria and performance levels. Add weighted points,
                4-point scales, or descriptive levels. Build rubrics that match
                exactly how you grade.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><ClockIcon /></div>
              <h3>Save Hours Every Term</h3>
              <p>
                Build once, reuse forever. Our template library covers essays,
                labs, presentations, and projects across K-12. Start grading in
                seconds, not hours.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><ShareIcon /></div>
              <h3>One Link, Every Student</h3>
              <p>
                Share rubrics before the assignment is due. Students see clear
                expectations on any device. Update once — every link stays current.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><BarChartIcon /></div>
              <h3>Print & Export Ready</h3>
              <p>
                Clean PDF exports for portfolios, parent conferences, and IEP
                meetings. Print-friendly formatting that looks professional on paper.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><ZapIcon /></div>
              <h3>3-Minute Setup</h3>
              <p>
                No steep learning curve. No training required. Pick a template or
                start blank — your rubric is ready before the bell rings.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><AwardIcon /></div>
              <h3>The Modern Rubistar</h3>
              <p>
                Rubistar hasn&apos;t been updated since 2014. We&apos;re built for
                today&apos;s classrooms — mobile-first, instant sharing, and a clean
                interface your students will actually read.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual rubric example */}
      <section className="templates-preview">
        <div className="container">
          <h2>See what your rubrics look like</h2>
          <p className="section-sub">
            Color-coded performance levels help students understand expectations at a glance
          </p>
          <div className="rubric-example">
            <table className="rubric-example-table">
              <thead>
                <tr>
                  <th className="re-corner">Criteria</th>
                  <th className="re-level-excellent">Excellent (4 pts)</th>
                  <th className="re-level-good">Good (3 pts)</th>
                  <th className="re-level-needs">Needs Work (2 pts)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="re-criteria">Organization</td>
                  <td>Clear intro, body, and conclusion with smooth transitions between ideas</td>
                  <td>Structure is present but transitions could be stronger</td>
                  <td>Lacks clear structure; ideas jump without connection</td>
                </tr>
                <tr>
                  <td className="re-criteria">Evidence</td>
                  <td>3+ strong examples with proper citations from source material</td>
                  <td>1-2 relevant examples, some missing citations</td>
                  <td>Limited evidence; claims are unsupported</td>
                </tr>
                <tr>
                  <td className="re-criteria">Writing Quality</td>
                  <td>Engaging voice, varied sentences, no grammar errors</td>
                  <td>Clear writing with minor errors that don&apos;t distract</td>
                  <td>Frequent errors make meaning unclear</td>
                </tr>
              </tbody>
            </table>
            <p className="rubric-example-note">
              Fully customizable — change criteria, levels, descriptions, and point values to match any assignment.
            </p>
          </div>
        </div>
      </section>

      {/* Template subjects */}
      <section className="browse-templates-section">
        <div className="container">
          <h2>Templates for every subject</h2>
          <p className="section-sub">
            Pre-built by experienced educators. Customize any template in seconds.
          </p>
          <div className="template-grid">
            {[
              { name: "Essay Writing", icon: "📝", count: "8 templates" },
              { name: "Oral Presentations", icon: "🎤", count: "5 templates" },
              { name: "Group Projects", icon: "👥", count: "4 templates" },
              { name: "Science Labs", icon: "🔬", count: "6 templates" },
              { name: "Art & Design", icon: "🎨", count: "4 templates" },
              { name: "Math Problem Solving", icon: "📐", count: "5 templates" },
              { name: "Research Papers", icon: "📚", count: "5 templates" },
              { name: "Class Participation", icon: "✋", count: "3 templates" },
            ].map((subject) => (
              <a key={subject.name} href="/templates" className="subject-card">
                <div className="subject-icon">{subject.icon}</div>
                <div className="subject-card-text">
                  <span className="subject-card-title">{subject.name}</span>
                  <span className="subject-card-count">{subject.count}</span>
                </div>
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
            <p>Free rubric maker for K-12 teachers.</p>
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
