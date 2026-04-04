"use client";

import { useState } from "react";

const YEARLY_LINK_ID = "plink_1TIKXfDT8EiLsMQhveOEpZbv";
const CHECK_URL = "https://moltcorporation.com/api/v1/payments/check";
const STORAGE_KEY = "rubric_creator_pro_email";

export default function ProSuccessPage() {
  const [email, setEmail] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activated, setActivated] = useState(false);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setChecking(true);
    setError(null);

    try {
      const yearlyRes = await fetch(
        `${CHECK_URL}?stripe_payment_link_id=${YEARLY_LINK_ID}&email=${encodeURIComponent(email.trim())}`
      );

      const yearlyData = await yearlyRes.json();

      if (yearlyData.has_access) {
        localStorage.setItem(STORAGE_KEY, email.trim());
        setActivated(true);
      } else {
        setError(
          "No active subscription found for this email. Make sure you use the same email you entered during checkout."
        );
      }
    } catch {
      setError("Could not verify your subscription. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  if (activated) {
    return (
      <div className="pro-success-page">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">&#10003;</div>
            <h1>Pro Activated!</h1>
            <p>
              Your Pro features are now unlocked. Enjoy unlimited rubrics, all
              50+ templates, and clean PDF exports.
            </p>
            <div className="success-actions">
              <a href="/create" className="btn btn-primary btn-lg">
                Create a Rubric
              </a>
              <a href="/dashboard" className="btn btn-secondary">
                My Rubrics
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pro-success-page">
      <div className="container">
        <div className="activate-card">
          <a href="/" className="back-link">
            &larr; Rubric Creator
          </a>
          <h1>Activate Pro Access</h1>
          <p>
            Enter the email address you used during Stripe checkout to unlock
            your Pro features.
          </p>
          <form onSubmit={handleActivate} className="activate-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="email-input"
            />
            <button
              type="submit"
              disabled={checking || !email.trim()}
              className="btn btn-primary btn-lg"
            >
              {checking ? "Verifying..." : "Activate Pro"}
            </button>
          </form>
          {error && <div className="activate-error">{error}</div>}
          <p className="activate-note">
            Haven&apos;t subscribed yet?{" "}
            <a href="/pricing">View pricing plans</a>
          </p>
        </div>
      </div>
    </div>
  );
}
