import type { Habit } from "../types";

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
  return (
    <div className="habit-card">
      {editingHabitId === habit.id ? (
        <>
          <input
            value={editingHabitName}
            onChange={(e) => setEditingHabitName(e.target.value)}
          />

          <button onClick={() => onSaveEdit(habit.id)}>Save</button>
        </>
      ) : (
        <>
          <h3>{habit.name}</h3>
          <p>{habit.category}</p>

          <button onClick={() => onStartEdit(habit)}>Edit</button>
        </>
      )}

      <p>{habit.completedToday ? "✅ Done" : "❌ Not Done"}</p>

      <button onClick={() => onToggle(habit.id)}>Toggle</button>

      <button onClick={() => onDelete(habit.id)}>Delete</button>
    </div>
  );
}

export default HabitItem;
