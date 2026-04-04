"use client";

import { useState } from "react";

const YEARLY_URL = "https://buy.stripe.com/3cI7sLcW71lT6zr8Qs3Nm1f";

const features = {
  free: [
    "Up to 3 rubrics",
    "4x4 grid (4 criteria, 4 levels)",
    "5 starter templates",
    "Share via link",
    "Print rubrics",
  ],
  pro: [
    "Unlimited rubrics",
    "Up to 10x10 grids",
    "50+ templates (all subjects)",
    "Student scoring with CSV export",
    "Clean PDF export (no watermark)",
    "Share via link",
    "Priority updates",
  ],
};

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="pricing-page">
      <div className="container">
        <div className="pricing-hero">
          <a href="/" className="back-link">
            &larr; Rubric Creator
          </a>
          <h1>Simple, transparent pricing</h1>
          <p className="pricing-sub">
            Start free. Upgrade when you need more rubrics, bigger grids, and all
            50+ templates.
          </p>

          <div className="billing-toggle">
            <button
              className={!annual ? "toggle-active" : ""}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={annual ? "toggle-active" : ""}
              onClick={() => setAnnual(true)}
            >
              Annual
              <span className="save-badge">Save 37%</span>
            </button>
          </div>
        </div>

        <div className="pricing-cards">
          <div className="plan-card">
            <div className="plan-header">
              <h2>Free</h2>
              <div className="plan-price">
                <span className="price-amount">$0</span>
                <span className="price-period">forever</span>
              </div>
            </div>
            <ul className="plan-features">
              {features.free.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="/create" className="btn btn-secondary btn-lg plan-cta">
              Get Started Free
            </a>
          </div>

          <div className="plan-card plan-card-pro">
            <div className="plan-popular">Most Popular</div>
            <div className="plan-header">
              <h2>Pro</h2>
              <div className="plan-price">
                <span className="price-amount">
                  {annual ? "$29.99" : "$3.99"}
                </span>
                <span className="price-period">
                  {annual ? "/year" : "/month"}
                </span>
              </div>
              {annual && (
                <p className="price-breakdown">
                  That&apos;s just $2.50/month
                </p>
              )}
            </div>
            <ul className="plan-features">
              {features.pro.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a
              href={YEARLY_URL}
              className="btn btn-primary btn-lg plan-cta"
              target="_blank"
              rel="noopener"
            >
              Upgrade to Pro
            </a>
            <p className="plan-note">
              Already subscribed?{" "}
              <a href="/pro/success">Activate Pro access</a>
            </p>
          </div>
        </div>

        <div className="pricing-faq">
          <h2>Questions?</h2>
          <details className="faq-item">
            <summary>How do I activate Pro after payment?</summary>
            <p>
              After checkout, you&apos;ll be redirected to enter the email you
              used during payment. Your Pro features will unlock instantly.
            </p>
          </details>
          <details className="faq-item">
            <summary>Can I cancel anytime?</summary>
            <p>
              Yes. Cancel your subscription anytime. You&apos;ll keep Pro access
              until the end of your billing period.
            </p>
          </details>
          <details className="faq-item">
            <summary>What happens to my rubrics if I downgrade?</summary>
            <p>
              All your rubrics are saved. You just won&apos;t be able to create
              new ones beyond the free limit or use Pro templates until you
              re-subscribe.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
