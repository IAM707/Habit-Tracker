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
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-6">Habit Tracker</h1>

        {/* Search Input */}
        <input
          className="w-full p-3 rounded-lg bg-zinc-800 mb-6 outline-none"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Habit Form */}
        <div className="bg-zinc-800 p-4 rounded-xl mb-6 outline-none">
          <div className="flex flex-col gap-3 ">
            <input
              className="p-3 rounded-lg bg-zinc-700 outline-none"
              placeholder="Habit name"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
            />

            <input
              className="p-3 rounded-lg bg-zinc-700 outline-none"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <button
              onClick={handleAddHabit}
              className="bg-red-700 hover:bg-red-900 transition p-1 rounded-lg"
            >
              Add Habit
            </button>
          </div>
        </div>

        {/* Habit List */}
        <div className="flex flex-col gap-4">
          {filteredHabits.length === 0 ? (
            <p>No habits yet. Add your first habit 🚀</p>
          ) : (
            filteredHabits.map((habit) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
