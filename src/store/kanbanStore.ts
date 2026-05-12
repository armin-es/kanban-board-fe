import { create } from "zustand";
import type { KanbanItem, ColumnId, Character } from "../types/kanban";

interface KanbanStore {
  items: KanbanItem[];
  addItem: (title: string, character: Character) => void;
  moveItem: (itemId: string, toColumnId: ColumnId) => void;
  reorderItems: (columnId: ColumnId, activeId: string, overId: string) => void;
}

export const useKanbanStore = create<KanbanStore>((set) => ({
  items: [],

  addItem: (title, character) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          id: crypto.randomUUID(),
          title,
          character,
          columnId: "todo",
          order: state.items.filter((i) => i.columnId === "todo").length,
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  moveItem: (itemId, toColumnId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              columnId: toColumnId,
              order: state.items.filter((i) => i.columnId === toColumnId)
                .length,
            }
          : item,
      ),
    })),

  reorderItems: (columnId, activeId, overId) =>
    set((state) => {
      const colItems = state.items
        .filter((i) => i.columnId === columnId)
        .sort((a, b) => a.order - b.order);
      const activeIdx = colItems.findIndex((i) => i.id === activeId);
      const overIdx = colItems.findIndex((i) => i.id === overId);
      const reordered = [...colItems];
      const [moved] = reordered.splice(activeIdx, 1);
      reordered.splice(overIdx, 0, moved);
      const updated = reordered.map((item, idx) => ({ ...item, order: idx }));
      return {
        items: state.items.map((i) => updated.find((u) => u.id === i.id) ?? i),
      };
    }),
}));
