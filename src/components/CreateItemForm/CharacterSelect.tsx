import { useEffect, useRef, useState } from "react";
import { useCharacters } from "../../hooks/useCharacters";
import type { Character } from "../../types/kanban";

interface CharacterSelectProps {
  value: Character | null;
  onChange: (character: Character) => void;
}

export function CharacterSelect({ value, onChange }: CharacterSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { characters, loading } = useCharacters(query);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function handleSelect(character: Character) {
    onChange(character);
    setQuery("");
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {value ? (
          <>
            <img src={value.image} alt={value.name} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
            <span className="text-sm text-gray-900 flex-1 truncate">{value.name}</span>
          </>
        ) : (
          <span className="text-sm text-gray-400 flex-1">Select a character…</span>
        )}
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-2 border-b border-gray-100">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <ul className="max-h-52 overflow-y-auto py-1">
            {loading && (
              <li className="px-3 py-2 text-sm text-gray-400">Loading…</li>
            )}
            {!loading && characters.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-400">No characters found</li>
            )}
            {characters.map((c: Character) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(c)}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50 text-left"
                >
                  <img src={c.image} alt={c.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.species}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
