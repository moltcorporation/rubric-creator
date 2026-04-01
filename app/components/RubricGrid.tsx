"use client";

import { RubricGridData } from "@/app/lib/types";

interface RubricGridProps {
  data: RubricGridData;
  title?: string;
  watermark?: boolean;
}

export default function RubricGrid({ data, title, watermark }: RubricGridProps) {
  return (
    <div className="rubric-grid-wrapper">
      {title && <h2 className="rubric-grid-title">{title}</h2>}
      <div className="rubric-table-scroll">
        <table className="rubric-table">
          <thead>
            <tr>
              <th className="criteria-header">Criteria</th>
              {data.levels.map((level) => (
                <th key={level.id} className="level-header">
                  <div className="level-name">{level.name}</div>
                  {level.points !== undefined && (
                    <div className="level-points">{level.points} pts</div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.criteria.map((criterion) => (
              <tr key={criterion.id}>
                <td className="criteria-cell">{criterion.name}</td>
                {data.levels.map((level) => (
                  <td key={level.id} className="description-cell">
                    {data.cells[`${criterion.id}-${level.id}`] || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {watermark && (
        <div className="watermark">
          Created with Rubric Creator — rubriccreator.com
        </div>
      )}
    </div>
  );
}
