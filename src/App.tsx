import { useState } from "react";
import type { Habit } from "./types";
import HabitItem from "./components/HabitItem";

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  const [habitName, setHabitName] = useState("");
  const [category, setCategory] = useState("");

  const [search, setSearch] = useState("");

  const [editingHabitId, setEditingHabitId] = useState<number | null>(null);

  const [editingHabitName, setEditingHabitName] = useState("");

  // ADD
  function handleAddHabit() {
    if (!habitName || !category) return;

    const newHabit: Habit = {
      id: Date.now(),
      name: habitName,
      category,
      completedToday: false,
    };

    setHabits([...habits, newHabit]);

    setHabitName("");
    setCategory("");
  }

  // DELETE
  function handleDeleteHabit(id: number) {
    setHabits(habits.filter((h) => h.id !== id));
  }

  // TOGGLE
  function handleToggleHabit(id: number) {
    setHabits(
      habits.map((h) =>
        h.id === id
          ? {
              ...h,
              completedToday: !h.completedToday,
            }
          : h,
      ),
    );
  }

  // START EDIT
  function handleStartEdit(habit: Habit) {
    setEditingHabitId(habit.id);
    setEditingHabitName(habit.name);
  }

  // SAVE EDIT
  function handleSaveEdit(id: number) {
    setHabits(
      habits.map((h) => (h.id === id ? { ...h, name: editingHabitName } : h)),
    );

    setEditingHabitId(null);
    setEditingHabitName("");
  }

  // SEARCH FILTER
  const filteredHabits = habits.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1>Habit Tracker</h1>

      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        placeholder="Habit name"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button onClick={handleAddHabit}>Add Habit</button>

      {filteredHabits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onDelete={handleDeleteHabit}
          onToggle={handleToggleHabit}
          onStartEdit={handleStartEdit}
          editingHabitId={editingHabitId}
          editingHabitName={editingHabitName}
          setEditingHabitName={setEditingHabitName}
          onSaveEdit={handleSaveEdit}
        />
      ))}
    </div>
  );
}

export default App;
