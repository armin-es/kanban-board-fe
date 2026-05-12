import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { KanbanItem } from "../../types/kanban";

const STATUS_STYLES: Record<string, string> = {
  Alive: "bg-green-100 text-green-800",
  Dead: "bg-red-100 text-red-800",
  unknown: "bg-gray-100 text-gray-600",
};

interface KanbanCardProps {
  item: KanbanItem;
}

export function KanbanCard({ item }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 cursor-grab active:cursor-grabbing select-none"
    >
      <div className="flex items-start gap-3">
        <img
          src={item.character.image}
          alt={item.character.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {item.title}
          </p>
          <p className="text-xs text-gray-500 mt-0.5 truncate">
            {item.character.name}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span
              className={`inline-block text-xs px-1.5 py-0.5 rounded font-medium ${
                STATUS_STYLES[item.character.status] ?? STATUS_STYLES["unknown"]
              }`}
            >
              {item.character.status}
            </span>
            <span className="text-xs text-gray-400">{item.character.species}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
