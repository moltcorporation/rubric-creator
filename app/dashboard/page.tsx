"use client";

import { useState, useEffect } from "react";
import { getUserId } from "@/app/lib/user";
import { RubricGridData, FREE_RUBRIC_LIMIT } from "@/app/lib/types";

interface Rubric {
  id: string;
  title: string;
  description: string | null;
  gridData: RubricGridData;
  shareToken: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const [rubrics, setRubrics] = useState<Rubric[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const uid = getUserId();
    setUserId(uid);
    fetch(`/api/rubrics?userId=${uid}`)
      .then((r) => r.json())
      .then((data) => {
        setRubrics(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this rubric? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/rubrics/${id}?userId=${userId}`, { method: "DELETE" });
    setRubrics((prev) => prev.filter((r) => r.id !== id));
    setDeleting(null);
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>My Rubrics</h1>
          <div className="dashboard-actions">
            <span className="rubric-count">
              {rubrics.length} / {FREE_RUBRIC_LIMIT} free rubrics
            </span>
            {rubrics.length >= FREE_RUBRIC_LIMIT && (
              <a href="/pricing" className="btn btn-sm btn-outline">
                Upgrade to Pro
              </a>
            )}
            <a href="/create" className="btn btn-primary">
              + New Rubric
            </a>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading your rubrics...</div>
        ) : rubrics.length === 0 ? (
          <div className="empty-state">
            <h2>No rubrics yet</h2>
            <p>Create your first rubric or start from a template.</p>
            <div className="empty-actions">
              <a href="/create" className="btn btn-primary">
                Create from Scratch
              </a>
              <a href="/templates" className="btn btn-secondary">
                Browse Templates
              </a>
            </div>
          </div>
        ) : (
          <div className="rubric-list">
            {rubrics.map((rubric) => (
              <div key={rubric.id} className="rubric-card">
                <div className="rubric-card-info">
                  <h3>
                    <a href={`/edit/${rubric.id}`}>{rubric.title}</a>
                  </h3>
                  <p className="rubric-meta">
                    {rubric.gridData.criteria.length} criteria ×{" "}
                    {rubric.gridData.levels.length} levels · Updated{" "}
                    {new Date(rubric.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="rubric-card-actions">
                  <a href={`/edit/${rubric.id}`} className="btn btn-sm btn-secondary">
                    Edit
                  </a>
                  {rubric.shareToken && (
                    <a
                      href={`/share/${rubric.shareToken}`}
                      className="btn btn-sm btn-ghost"
                      target="_blank"
                    >
                      View Share
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(rubric.id)}
                    disabled={deleting === rubric.id}
                    className="btn btn-sm btn-danger"
                  >
                    {deleting === rubric.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="dashboard-footer">
          <a href="/" className="btn btn-ghost">
            ← Home
          </a>
        </div>
      </div>
    </div>
  );
}
