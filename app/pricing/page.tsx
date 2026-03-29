"use client";

import { useState } from "react";

const MONTHLY_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || "price_monthly";
const ANNUAL_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID || "price_annual";

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    try {
      const email = prompt("Enter your email to continue:");
      if (!email) { setLoading(false); return; }

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "0.5rem" }}>
        Simple pricing for every teacher
      </h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>
        Free forever for basic rubrics. Pro for power users.
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem", gap: "0.5rem" }}>
        <button
          onClick={() => setAnnual(false)}
          style={{
            padding: "0.5rem 1.5rem", borderRadius: "6px", border: "1px solid #ddd",
            background: !annual ? "#000" : "#fff", color: !annual ? "#fff" : "#333",
            cursor: "pointer",
          }}
        >Monthly</button>
        <button
          onClick={() => setAnnual(true)}
          style={{
            padding: "0.5rem 1.5rem", borderRadius: "6px", border: "1px solid #ddd",
            background: annual ? "#000" : "#fff", color: annual ? "#fff" : "#333",
            cursor: "pointer",
          }}
        >Annual (save 39%)</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Free Tier */}
        <div style={{
          border: "1px solid #e5e5e5", borderRadius: "12px", padding: "2rem",
          background: "#fafafa",
        }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>Free</h2>
          <div style={{ fontSize: "2.5rem", fontWeight: 700 }}>$0</div>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>Forever free</p>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: 2 }}>
            <li>✓ 3 saved rubrics</li>
            <li>✓ 4×4 grid max</li>
            <li>✓ 5 templates</li>
            <li>✓ Share via link</li>
            <li>✗ Student scoring</li>
            <li>✗ PDF has watermark</li>
            <li>✗ Custom branding</li>
          </ul>
          <a href="/create" style={{
            display: "block", textAlign: "center", padding: "0.75rem",
            background: "#f5f5f5", borderRadius: "8px", color: "#333",
            textDecoration: "none", marginTop: "1.5rem", border: "1px solid #ddd",
          }}>Get Started Free</a>
        </div>

        {/* Pro Tier */}
        <div style={{
          border: "2px solid #000", borderRadius: "12px", padding: "2rem",
          background: "#fff", position: "relative",
        }}>
          <div style={{
            position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
            background: "#000", color: "#fff", padding: "0.25rem 1rem", borderRadius: "20px",
            fontSize: "0.75rem", fontWeight: 600,
          }}>MOST POPULAR</div>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>Pro</h2>
          <div style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            {annual ? "$2.42" : "$3.99"}
            <span style={{ fontSize: "1rem", color: "#666" }}>/mo</span>
          </div>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>
            {annual ? "$29/year — save 39%" : "$3.99/month"}
          </p>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: 2 }}>
            <li>✓ <strong>Unlimited</strong> saved rubrics</li>
            <li>✓ <strong>10×10</strong> grid max</li>
            <li>✓ <strong>50+</strong> templates</li>
            <li>✓ Share via link</li>
            <li>✓ <strong>Student scoring + CSV export</strong></li>
            <li>✓ <strong>Clean PDF (no watermark)</strong></li>
            <li>✓ <strong>Custom branding (school logo)</strong></li>
          </ul>
          <button
            onClick={() => handleCheckout(annual ? ANNUAL_PRICE_ID : MONTHLY_PRICE_ID)}
            disabled={loading}
            style={{
              display: "block", width: "100%", padding: "0.75rem",
              background: "#000", color: "#fff", borderRadius: "8px",
              border: "none", cursor: loading ? "wait" : "pointer",
              fontSize: "1rem", fontWeight: 600, marginTop: "1.5rem",
            }}
          >{loading ? "Loading..." : "Start Pro"}</button>
        </div>
      </div>

      <p style={{ textAlign: "center", color: "#999", marginTop: "2rem", fontSize: "0.85rem" }}>
        No credit card required for Free tier. Cancel Pro anytime.
      </p>
    </div>
  );
}
