export type ColumnId = "todo" | "doing" | "done";

export interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
}

export interface KanbanItem {
  id: string;
  title: string;
  character: Character;
  columnId: ColumnId;
  order: number;
  createdAt: string;
}

export const COLUMNS: { id: ColumnId; label: string }[] = [
  { id: "todo", label: "To Do" },
  { id: "doing", label: "Doing" },
  { id: "done", label: "Done" },
];

export const COLUMN_IDS: ColumnId[] = COLUMNS.map((c) => c.id);
