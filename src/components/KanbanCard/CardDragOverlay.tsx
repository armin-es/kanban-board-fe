import type { KanbanItem } from "../../types/kanban";

const STATUS_STYLES: Record<string, string> = {
  Alive: "bg-green-100 text-green-800",
  Dead: "bg-red-100 text-red-800",
  unknown: "bg-gray-100 text-gray-600",
};

interface CardDragOverlayProps {
  item: KanbanItem;
}

export function CardDragOverlay({ item }: CardDragOverlayProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-blue-300 p-3 cursor-grabbing rotate-2 w-64">
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
