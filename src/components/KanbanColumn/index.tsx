import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { KanbanItem, ColumnId } from "../../types/kanban";
import { KanbanCard } from "../KanbanCard";

const COLUMN_STYLES: Record<ColumnId, { header: string; dot: string }> = {
  todo: { header: "text-gray-700", dot: "bg-gray-400" },
  doing: { header: "text-blue-700", dot: "bg-blue-500" },
  done: { header: "text-green-700", dot: "bg-green-500" },
};

interface KanbanColumnProps {
  columnId: ColumnId;
  label: string;
  items: KanbanItem[];
}

export function KanbanColumn({ columnId, label, items }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId });
  const styles = COLUMN_STYLES[columnId];
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
        <h2 className={`text-sm font-semibold uppercase tracking-wide ${styles.header}`}>
          {label}
        </h2>
        <span className="ml-auto text-xs text-gray-400 font-medium">
          {items.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={`flex flex-col gap-2 flex-1 min-h-32 rounded-lg p-2 transition-colors ${
          isOver ? "bg-blue-50 ring-2 ring-blue-200" : "bg-gray-100"
        }`}
      >
        <SortableContext
          items={sortedItems.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedItems.map((item) => (
            <KanbanCard key={item.id} item={item} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
