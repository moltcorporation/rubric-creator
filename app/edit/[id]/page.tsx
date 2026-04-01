"use client";

import { useState, useEffect, use } from "react";
import RubricEditor from "@/app/components/RubricEditor";
import { RubricGridData } from "@/app/lib/types";
import { getUserId } from "@/app/lib/user";

export default function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [userId, setUserId] = useState("");
  const [rubric, setRubric] = useState<{
    title: string;
    gridData: RubricGridData;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUserId(getUserId());
    fetch(`/api/rubrics/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setRubric({ title: data.title, gridData: data.gridData as RubricGridData });
        }
      })
      .catch(() => setError("Failed to load rubric"));
  }, [id]);

  const handleSave = async (data: {
    title: string;
    gridData: RubricGridData;
    id?: string;
  }) => {
    const res = await fetch(`/api/rubrics/${id}`, {
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
    return id;
  };

  if (error) {
    return (
      <div className="error-page">
        <h1>Rubric not found</h1>
        <p>{error}</p>
        <a href="/dashboard" className="btn btn-primary">
          Go to My Rubrics
        </a>
      </div>
    );
  }

  if (!rubric || !userId) {
    return <div className="loading">Loading rubric...</div>;
  }

  return (
    <RubricEditor
      initialData={rubric.gridData}
      initialTitle={rubric.title}
      rubricId={id}
      userId={userId}
      onSave={handleSave}
    />
  );
}
