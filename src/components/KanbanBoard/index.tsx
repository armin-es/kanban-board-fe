import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useKanbanStore } from "../../store/kanbanStore";
import { useConfetti } from "../../hooks/useConfetti";
import { COLUMNS, COLUMN_IDS, type ColumnId, type KanbanItem } from "../../types/kanban";
import { KanbanColumn } from "../KanbanColumn";
import { CardDragOverlay } from "../KanbanCard/CardDragOverlay";
import { CreateItemForm } from "../CreateItemForm";

export function KanbanBoard() {
  const items = useKanbanStore((s) => s.items);
  const moveItem = useKanbanStore((s) => s.moveItem);
  const reorderItems = useKanbanStore((s) => s.reorderItems);
  const confetti = useConfetti();

  const [activeItem, setActiveItem] = useState<KanbanItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function onDragStart(event: DragStartEvent) {
    const item = items.find((i) => i.id === event.active.id);
    if (item) setActiveItem(item);
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveItem(null);
    if (!over) return;

    const draggedItem = items.find((i) => i.id === active.id);
    if (!draggedItem) return;

    const targetColumnId = (
      COLUMN_IDS.includes(over.id as ColumnId)
        ? over.id
        : items.find((i) => i.id === over.id)?.columnId
    ) as ColumnId | undefined;

    if (!targetColumnId) return;

    if (targetColumnId !== draggedItem.columnId) {
      moveItem(draggedItem.id, targetColumnId);
      if (targetColumnId === "done") confetti();
    } else if (active.id !== over.id) {
      reorderItems(targetColumnId, String(active.id), String(over.id));
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
            <p className="text-sm text-gray-500 mt-1">Drag cards between columns to update their status</p>
          </div>
          <CreateItemForm />
        </div>

        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <div className="flex gap-4">
            {COLUMNS.map((col) => (
              <KanbanColumn
                key={col.id}
                columnId={col.id}
                label={col.label}
                items={items.filter((i) => i.columnId === col.id)}
              />
            ))}
          </div>

          <DragOverlay>
            {activeItem ? <CardDragOverlay item={activeItem} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
