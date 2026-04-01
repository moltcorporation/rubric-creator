export interface RubricGridData {
  criteria: { id: string; name: string }[];
  levels: { id: string; name: string; points?: number }[];
  cells: Record<string, string>; // key: `${criteriaId}-${levelId}`
}

export interface RubricRecord {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  gridData: RubricGridData;
  shareToken: string | null;
  createdAt: string;
  updatedAt: string;
}

export const FREE_RUBRIC_LIMIT = 3;
export const FREE_MAX_CRITERIA = 4;
export const FREE_MAX_LEVELS = 4;

export function generateId(): string {
  return crypto.randomUUID();
}

export function createEmptyGrid(): RubricGridData {
  const c1 = generateId();
  const c2 = generateId();
  const c3 = generateId();
  const l1 = generateId();
  const l2 = generateId();
  const l3 = generateId();
  const l4 = generateId();
  return {
    criteria: [
      { id: c1, name: "Criterion 1" },
      { id: c2, name: "Criterion 2" },
      { id: c3, name: "Criterion 3" },
    ],
    levels: [
      { id: l1, name: "Excellent", points: 4 },
      { id: l2, name: "Good", points: 3 },
      { id: l3, name: "Satisfactory", points: 2 },
      { id: l4, name: "Needs Improvement", points: 1 },
    ],
    cells: {},
  };
}
