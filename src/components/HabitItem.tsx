import type { Habit } from "../types";
import { useRef, useEffect } from "react"; // 1. Import useRef
type Props = {
  habit: Habit;

  onDelete: (id: number) => void;
  onToggle: (id: number) => void;

  onStartEdit: (habit: Habit) => void;

  editingHabitId: number | null;
  editingHabitName: string;
  setEditingHabitName: (value: string) => void;

  onSaveEdit: (id: number) => void;
};

function HabitItem({
  habit,
  onDelete,
  onToggle,
  onStartEdit,
  editingHabitId,
  editingHabitName,
  setEditingHabitName,
  onSaveEdit,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null); // 2. Create a ref for the input element

  useEffect(() => {
    if (editingHabitId === habit.id && inputRef.current) {
      inputRef.current.focus(); // 3. Focus the input when this habit is being edited
    }
  }, [editingHabitId, habit.id]);
  return (
    <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700">
      {editingHabitId === habit.id ? (
        <>
          <input
            ref={inputRef} // 4. Attach the ref to the input element
            value={editingHabitName}
            onChange={(e) => setEditingHabitName(e.target.value)}
          />

          <button
            onClick={() => onSaveEdit(habit.id)}
            className="bg-red-600 px-4 rounded-lg hover:bg-red-800 transition"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3>{habit.name}</h3>
          <p>{habit.category}</p>

          <button
            onClick={() => onStartEdit(habit)}
            className="bg-yellow-600 px-4 rounded-lg hover:bg-yellow-800 transition"
          >
            Edit
          </button>
        </>
      )}

      <p>{habit.completedToday ? "✅ Done" : "❌ Not Done"}</p>

      <button
        onClick={() => onToggle(habit.id)}
        className="bg-blue-600 px-4 rounded-lg hover:bg-blue-800 transition"
      >
        Toggle
      </button>

      <button
        onClick={() => onDelete(habit.id)}
        className="bg-red-600 px-4 rounded-lg hover:bg-red-800 transition"
      >
        Delete
      </button>
    </div>
  );
}

export default HabitItem;
