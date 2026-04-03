import type { Metadata } from "next";
import { ALL_TEMPLATES } from "@/app/lib/templates";
import TemplateGrid from "@/app/components/TemplateGrid";

export const metadata: Metadata = {
  title: "Rubric Templates for Teachers | Rubric Creator",
  description:
    "Browse 50 free and pro rubric templates for essays, presentations, science labs, math, art, and more. Start creating in seconds.",
  alternates: { canonical: "https://rubriccreator.com/templates" },
};

const subjects = Array.from(new Set(ALL_TEMPLATES.map((t) => t.subject))).sort();

export default function TemplatesPage() {
  return (
    <>
      <section className="templates-hero">
        <div className="container">
          <h1>Rubric Templates</h1>
          <p className="hero-sub">
            50 ready-to-use templates. Pick one, customize it, done.
          </p>
          <a href="/create" className="btn btn-primary">
            Start from Scratch
          </a>
        </div>
      </section>

      {subjects.map((subject) => {
        return (
          <section key={subject} className="template-section">
            <div className="container">
              <h2>{subject}</h2>
              <TemplateGrid subject={subject} />
            </div>
          </section>
        );
      })}

      <section className="final-cta">
        <div className="container">
          <h2>Don&apos;t see what you need?</h2>
          <p>Start from scratch and build any rubric in minutes.</p>
          <a href="/create" className="btn btn-primary btn-lg">
            Create a Custom Rubric
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <h4>Rubric Creator</h4>
            <p>Free rubric maker for teachers.</p>
          </div>
          <div>
            <h4>Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/templates">Templates</a></li>
              <li><a href="/create">Create</a></li>
              <li><a href="/dashboard">My Rubrics</a></li>
            </ul>
          </div>
          <div>
            <h4>Related Tools</h4>
            <ul>
              <li><a href="https://nametracingmaker.com">Name Tracing Maker</a></li>
              <li><a href="https://classroomseatingchartmaker.com">Classroom Seating Chart Maker</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
