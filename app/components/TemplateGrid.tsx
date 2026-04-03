"use client";

import { useEffect, useState } from "react";
import { getProEmail, checkProAccess } from "@/app/lib/pro";
import { ALL_TEMPLATES } from "@/app/lib/templates";

interface TemplateGridProps {
  subject: string;
}

export default function TemplateGrid({ subject }: TemplateGridProps) {
  const [proEmail, setProEmail] = useState<string | null>(null);
  const [isProUser, setIsProUser] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = getProEmail();
    setProEmail(email);
    if (email) {
      checkProAccess(email).then(setIsProUser);
    }
  }, []);

  const handleTemplateClick = (e: React.MouseEvent, isFree: boolean, templateIdx: number) => {
    if (!isFree && !isProUser) {
      e.preventDefault();
      // Redirect to pricing page
      window.location.href = "/pricing?utm_source=templates&utm_medium=pro_template_access";
      return;
    }
  };

  const templates = ALL_TEMPLATES.map((t, i) => ({ ...t, index: i })).filter(
    (t) => t.subject === subject
  );

  return (
    <div className="template-grid">
      {templates.map((tpl) => (
        <a
          key={tpl.index}
          href={`/create?template=${tpl.index}`}
          onClick={(e) => handleTemplateClick(e, tpl.isFree, tpl.index)}
          className={`template-card ${!tpl.isFree ? "pro-template" : ""}`}
        >
          <div className="template-card-header">
            <span className="template-name">{tpl.name}</span>
            {!tpl.isFree && <span className="pro-badge">PRO</span>}
          </div>
          <p className="template-desc">{tpl.description}</p>
          <span className="template-grade">{tpl.gradeLevel}</span>
        </a>
      ))}
    </div>
  );
}
