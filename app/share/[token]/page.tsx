"use client";

import { useState, useEffect, use } from "react";
import RubricGrid from "@/app/components/RubricGrid";
import { RubricGridData } from "@/app/lib/types";

export default function SharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [rubric, setRubric] = useState<{
    title: string;
    gridData: RubricGridData;
  } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/share/${token}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) =>
        setRubric({
          title: data.title,
          gridData: data.gridData as RubricGridData,
        })
      )
      .catch(() => setError(true));
  }, [token]);

  if (error) {
    return (
      <div className="share-page error-page">
        <div className="container">
          <h1>Rubric not found</h1>
          <p>This share link may have expired or been removed.</p>
          <a href="/" className="btn btn-primary">
            Create Your Own Rubric
          </a>
        </div>
      </div>
    );
  }

  if (!rubric) {
    return <div className="loading">Loading rubric...</div>;
  }

  return (
    <div className="share-page">
      <div className="share-header">
        <div className="container">
          <a href="/" className="share-brand">
            Rubric Creator
          </a>
          <div className="share-actions">
            <button onClick={() => window.print()} className="btn btn-secondary btn-sm">
              Print
            </button>
            <a href="/create" className="btn btn-primary btn-sm">
              Create Your Own
            </a>
          </div>
        </div>
      </div>
      <div className="container share-body">
        <RubricGrid data={rubric.gridData} title={rubric.title} watermark />
      </div>
      <footer className="footer">
        <div className="container">
          <p>
            Made with{" "}
            <a href="https://rubriccreator.com">Rubric Creator</a> — Free
            rubric maker for teachers
          </p>
        </div>
      </footer>
    </div>
  );
}
