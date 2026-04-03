"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import RubricEditor from "@/app/components/RubricEditor";
import { RubricGridData, createEmptyGrid } from "@/app/lib/types";
import { getUserId } from "@/app/lib/user";
import { getProEmail } from "@/app/lib/pro";
import { ALL_TEMPLATES } from "@/app/lib/templates";

function CreateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateIdx = searchParams.get("template");
  const [userId, setUserId] = useState("");
  const [proEmail, setProEmail] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<RubricGridData | null>(null);
  const [initialTitle, setInitialTitle] = useState("Untitled Rubric");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUserId(getUserId());
    setProEmail(getProEmail());
  }, []);

  useEffect(() => {
    if (templateIdx !== null) {
      const idx = parseInt(templateIdx);
      const tpl = ALL_TEMPLATES[idx];
      if (tpl) {
        // Check if template is Pro-only
        if (!tpl.isFree) {
          // Verify Pro access before loading template
          if (!proEmail) {
            setError("This template is Pro-only. Please upgrade to access it.");
            return;
          }
          verifyProAccess();
        } else {
          setInitialData(tpl.gridData);
          setInitialTitle(tpl.name);
        }
        return;
      }
    }
    setInitialData(createEmptyGrid());
  }, [templateIdx, proEmail]);

  const verifyProAccess = async () => {
    if (!proEmail) return;
    try {
      const res = await fetch(`/api/pro-check?email=${encodeURIComponent(proEmail)}`);
      const data = await res.json();
      if (data.isProUser) {
        const idx = parseInt(templateIdx || "0");
        const tpl = ALL_TEMPLATES[idx];
        if (tpl) {
          setInitialData(tpl.gridData);
          setInitialTitle(tpl.name);
        }
      } else {
        setError("Pro access not verified. Please check your email or purchase a Pro subscription.");
      }
    } catch (err) {
      setError("Failed to verify Pro access. Please try again.");
    }
  };

  const handleSave = async (data: {
    title: string;
    gridData: RubricGridData;
    id?: string;
  }) => {
    if (data.id) {
      const res = await fetch(`/api/rubrics/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          email: proEmail,
          title: data.title,
          gridData: data.gridData,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      return data.id;
    } else {
      const res = await fetch("/api/rubrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          email: proEmail,
          title: data.title,
          gridData: data.gridData,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      // Update URL without full reload
      window.history.replaceState(null, "", `/edit/${result.id}`);
      return result.id;
    }
  };

  if (error) {
    return (
      <div className="loading">
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
        <a href="/templates" className="btn btn-primary">
          Back to Templates
        </a>
      </div>
    );
  }

  if (!initialData || !userId) {
    return <div className="loading">Loading editor...</div>;
  }

  return (
    <RubricEditor
      initialData={initialData}
      initialTitle={initialTitle}
      rubricId={null}
      userId={userId}
      onSave={handleSave}
    />
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <CreateContent />
    </Suspense>
  );
}
