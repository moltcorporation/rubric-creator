"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import RubricEditor from "@/app/components/RubricEditor";
import { RubricGridData, createEmptyGrid } from "@/app/lib/types";
import { getUserId } from "@/app/lib/user";
import { ALL_TEMPLATES } from "@/app/lib/templates";

function CreateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateIdx = searchParams.get("template");
  const [userId, setUserId] = useState("");
  const [initialData, setInitialData] = useState<RubricGridData | null>(null);
  const [initialTitle, setInitialTitle] = useState("Untitled Rubric");

  useEffect(() => {
    setUserId(getUserId());
    if (templateIdx !== null) {
      const idx = parseInt(templateIdx);
      const tpl = ALL_TEMPLATES[idx];
      if (tpl) {
        setInitialData(tpl.gridData);
        setInitialTitle(tpl.name);
        return;
      }
    }
    setInitialData(createEmptyGrid());
  }, [templateIdx]);

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
