"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  RubricGridData,
  generateId,
  FREE_MAX_CRITERIA,
  FREE_MAX_LEVELS,
} from "@/app/lib/types";
import { getProEmail, checkProAccess } from "@/app/lib/pro";

interface RubricEditorProps {
  initialData: RubricGridData;
  initialTitle: string;
  rubricId: string | null;
  userId: string;
  onSave: (data: {
    title: string;
    gridData: RubricGridData;
    id?: string;
  }) => Promise<string | null>;
}

export default function RubricEditor({
  initialData,
  initialTitle,
  rubricId,
  userId,
  onSave,
}: RubricEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [grid, setGrid] = useState<RubricGridData>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(rubricId);
  const [isPro, setIsPro] = useState(false);
  const [proChecked, setProChecked] = useState(false);
  const [exportCount, setExportCount] = useState(0);
  const printRef = useRef<HTMLDivElement>(null);

  // Check Pro status on mount
  useEffect(() => {
    const checkPro = async () => {
      const email = getProEmail();
      if (email) {
        const hasAccess = await checkProAccess(email);
        setIsPro(hasAccess);
      }
      setProChecked(true);
    };
    checkPro();
  }, []);

  // Load daily export count from localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem("rubric_export_date");
    const count = localStorage.getItem("rubric_export_count");
    if (stored === today && count) {
      setExportCount(parseInt(count));
    } else {
      setExportCount(0);
    }
  }, []);

  const updateCell = useCallback(
    (criteriaId: string, levelId: string, value: string) => {
      setGrid((prev) => ({
        ...prev,
        cells: { ...prev.cells, [`${criteriaId}-${levelId}`]: value },
      }));
      setSaved(false);
    },
    []
  );

  const updateCriterionName = useCallback(
    (id: string, name: string) => {
      setGrid((prev) => ({
        ...prev,
        criteria: prev.criteria.map((c) =>
          c.id === id ? { ...c, name } : c
        ),
      }));
      setSaved(false);
    },
    []
  );

  const updateLevelName = useCallback(
    (id: string, name: string) => {
      setGrid((prev) => ({
        ...prev,
        levels: prev.levels.map((l) =>
          l.id === id ? { ...l, name } : l
        ),
      }));
      setSaved(false);
    },
    []
  );

  const updateLevelPoints = useCallback(
    (id: string, points: number) => {
      setGrid((prev) => ({
        ...prev,
        levels: prev.levels.map((l) =>
          l.id === id ? { ...l, points } : l
        ),
      }));
      setSaved(false);
    },
    []
  );

  const addCriterion = useCallback(() => {
    const maxCriteria = isPro ? 10 : FREE_MAX_CRITERIA;
    if (grid.criteria.length >= maxCriteria) {
      setError(
        isPro
          ? `Pro tier allows up to ${maxCriteria} criteria.`
          : `Free tier allows up to ${FREE_MAX_CRITERIA} criteria. <a href="/pricing">Upgrade to Pro</a> for up to 10.`
      );
      return;
    }
    setGrid((prev) => ({
      ...prev,
      criteria: [
        ...prev.criteria,
        { id: generateId(), name: `Criterion ${prev.criteria.length + 1}` },
      ],
    }));
    setSaved(false);
    setError(null);
  }, [grid.criteria.length, isPro]);

  const removeCriterion = useCallback(
    (id: string) => {
      if (grid.criteria.length <= 1) return;
      setGrid((prev) => {
        const newCells = { ...prev.cells };
        prev.levels.forEach((l) => {
          delete newCells[`${id}-${l.id}`];
        });
        return {
          ...prev,
          criteria: prev.criteria.filter((c) => c.id !== id),
          cells: newCells,
        };
      });
      setSaved(false);
    },
    [grid.criteria.length]
  );

  const addLevel = useCallback(() => {
    const maxLevels = isPro ? 10 : FREE_MAX_LEVELS;
    if (grid.levels.length >= maxLevels) {
      setError(
        isPro
          ? `Pro tier allows up to ${maxLevels} performance levels.`
          : `Free tier allows up to ${FREE_MAX_LEVELS} performance levels. <a href="/pricing">Upgrade to Pro</a> for up to 10.`
      );
      return;
    }
    const minPoints = Math.min(...grid.levels.map((l) => l.points ?? 0));
    setGrid((prev) => ({
      ...prev,
      levels: [
        ...prev.levels,
        {
          id: generateId(),
          name: `Level ${prev.levels.length + 1}`,
          points: Math.max(0, minPoints - 1),
        },
      ],
    }));
    setSaved(false);
    setError(null);
  }, [grid.levels, isPro]);

  const removeLevel = useCallback(
    (id: string) => {
      if (grid.levels.length <= 2) return;
      setGrid((prev) => {
        const newCells = { ...prev.cells };
        prev.criteria.forEach((c) => {
          delete newCells[`${c.id}-${id}`];
        });
        return {
          ...prev,
          levels: prev.levels.filter((l) => l.id !== id),
          cells: newCells,
        };
      });
      setSaved(false);
    },
    [grid.levels.length]
  );

  const handleSave = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      const newId = await onSave({
        title,
        gridData: grid,
        id: currentId ?? undefined,
      });
      if (newId) {
        setCurrentId(newId);
      }
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }, [title, grid, currentId, onSave]);

  const handleShare = useCallback(async () => {
    if (!currentId) {
      setError("Save the rubric first before sharing.");
      return;
    }
    setShareLoading(true);
    try {
      const res = await fetch(`/api/rubrics/${currentId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const url = `${window.location.origin}/share/${data.shareToken}`;
      setShareUrl(url);
      await navigator.clipboard.writeText(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to share");
    } finally {
      setShareLoading(false);
    }
  }, [currentId, userId]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleExportPdf = useCallback(async () => {
    // Check export limit for free users
    if (!isPro) {
      const today = new Date().toDateString();
      const stored = localStorage.getItem("rubric_export_date");
      const count = parseInt(localStorage.getItem("rubric_export_count") || "0");

      if (stored === today && count >= 2) {
        setError(
          `Free tier allows 2 exports per day. <a href="/pricing">Upgrade to Pro</a> for unlimited exports.`
        );
        return;
      }

      // Increment counter
      localStorage.setItem("rubric_export_date", today);
      localStorage.setItem("rubric_export_count", String(count + 1));
      setExportCount(count + 1);
    }

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 10;
    const usableW = pageW - margin * 2;
    let y = margin;

    // Title
    doc.setFontSize(16);
    doc.text(title, margin, y + 6);
    y += 12;

    // Attribution / watermark for free users
    doc.setFontSize(8);
    if (!isPro) {
      doc.setTextColor(200, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text("FREE TIER - Created with Rubric Creator — rubriccreator.com", margin, y);
      doc.setFont("helvetica", "normal");
    } else {
      doc.setTextColor(180);
      doc.text("Created with Rubric Creator — rubriccreator.com", margin, y);
    }
    doc.setTextColor(0);
    y += 8;

    const colCount = grid.levels.length + 1;
    const criteriaColW = usableW * 0.18;
    const levelColW = (usableW - criteriaColW) / grid.levels.length;

    // Header row
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(59, 130, 246);
    doc.setTextColor(255);
    doc.rect(margin, y, criteriaColW, 12, "F");
    doc.text("Criteria", margin + 2, y + 7);
    grid.levels.forEach((level, i) => {
      const x = margin + criteriaColW + i * levelColW;
      doc.rect(x, y, levelColW, 12, "F");
      const label = level.points !== undefined ? `${level.name} (${level.points} pts)` : level.name;
      doc.text(label, x + 2, y + 7);
    });
    y += 12;
    doc.setTextColor(0);

    // Data rows
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    grid.criteria.forEach((criterion, rowIdx) => {
      // Calculate row height based on content
      let maxLines = 1;
      const cellTexts: string[][] = [];
      grid.levels.forEach((level) => {
        const text = grid.cells[`${criterion.id}-${level.id}`] || "";
        const lines = doc.splitTextToSize(text, levelColW - 4);
        cellTexts.push(lines);
        maxLines = Math.max(maxLines, lines.length);
      });
      const criterionLines = doc.splitTextToSize(criterion.name, criteriaColW - 4);
      maxLines = Math.max(maxLines, criterionLines.length);
      const rowH = Math.max(10, maxLines * 4 + 4);

      // Check page break
      if (y + rowH > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }

      const bg = rowIdx % 2 === 0 ? 248 : 255;
      doc.setFillColor(bg, bg, bg);

      // Criteria cell
      doc.rect(margin, y, criteriaColW, rowH, "FD");
      doc.setFont("helvetica", "bold");
      doc.text(criterionLines, margin + 2, y + 4);
      doc.setFont("helvetica", "normal");

      // Level cells
      grid.levels.forEach((level, i) => {
        const x = margin + criteriaColW + i * levelColW;
        doc.rect(x, y, levelColW, rowH, "FD");
        doc.text(cellTexts[i], x + 2, y + 4);
      });

      y += rowH;
    });

    doc.save(`${title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}.pdf`);
  }, [title, grid, isPro]);

  return (
    <div className="editor-layout">
      <div className="editor-toolbar">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSaved(false);
          }}
          className="title-input"
          placeholder="Rubric Title"
        />
        <div className="toolbar-actions">
          <button onClick={handleSave} disabled={saving} className="btn btn-primary">
            {saving ? "Saving..." : saved ? "Saved ✓" : "Save"}
          </button>
          <button onClick={handleShare} disabled={shareLoading || !currentId} className="btn btn-secondary">
            {shareLoading ? "..." : "Share Link"}
          </button>
          <button onClick={handlePrint} className="btn btn-secondary">
            Print
          </button>
          <button onClick={handleExportPdf} className="btn btn-secondary">
            Export PDF
          </button>
          <a href="/dashboard" className="btn btn-ghost">
            My Rubrics
          </a>
        </div>
      </div>

      {error && (
        <div className="editor-error">
          <span dangerouslySetInnerHTML={{ __html: error }} />
          <button onClick={() => setError(null)} className="error-dismiss">
            ×
          </button>
        </div>
      )}

      {shareUrl && (
        <div className="editor-success">
          Link copied to clipboard:{" "}
          <a href={shareUrl} target="_blank" rel="noopener">
            {shareUrl}
          </a>
          <button onClick={() => setShareUrl(null)} className="error-dismiss">
            ×
          </button>
        </div>
      )}

      <div className="editor-grid-controls">
        <button onClick={addCriterion} className="btn btn-sm btn-outline">
          + Add Row
        </button>
        <button onClick={addLevel} className="btn btn-sm btn-outline">
          + Add Column
        </button>
      </div>

      <div className="editor-grid-scroll" ref={printRef}>
        <table className="rubric-table editor-table">
          <thead>
            <tr>
              <th className="criteria-header">
                Criteria
              </th>
              {grid.levels.map((level) => (
                <th key={level.id} className="level-header editable-header">
                  <input
                    type="text"
                    value={level.name}
                    onChange={(e) => updateLevelName(level.id, e.target.value)}
                    className="header-input"
                  />
                  <div className="points-row">
                    <input
                      type="number"
                      value={level.points ?? ""}
                      onChange={(e) =>
                        updateLevelPoints(level.id, parseInt(e.target.value) || 0)
                      }
                      className="points-input"
                      min={0}
                    />
                    <span className="points-label">pts</span>
                    {grid.levels.length > 2 && (
                      <button
                        onClick={() => removeLevel(level.id)}
                        className="remove-btn"
                        title="Remove column"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.criteria.map((criterion) => (
              <tr key={criterion.id}>
                <td className="criteria-cell editable-criteria">
                  <input
                    type="text"
                    value={criterion.name}
                    onChange={(e) =>
                      updateCriterionName(criterion.id, e.target.value)
                    }
                    className="criteria-input"
                  />
                  {grid.criteria.length > 1 && (
                    <button
                      onClick={() => removeCriterion(criterion.id)}
                      className="remove-btn remove-row-btn"
                      title="Remove row"
                    >
                      ×
                    </button>
                  )}
                </td>
                {grid.levels.map((level) => (
                  <td key={level.id} className="description-cell editable-cell">
                    <textarea
                      value={
                        grid.cells[`${criterion.id}-${level.id}`] || ""
                      }
                      onChange={(e) =>
                        updateCell(criterion.id, level.id, e.target.value)
                      }
                      className="cell-textarea"
                      placeholder="Describe performance..."
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
