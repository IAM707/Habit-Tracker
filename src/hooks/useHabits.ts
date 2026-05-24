import { useEffect, useState } from "react";
import type { Habit } from "../types";

export function useHabits() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [editingHabitId, setEditingHabitId] = useState<number | null>(null);
    const [editingHabitName, setEditingHabitName] = useState<string>("");
    const [hasLoaded, setHasLoaded] = useState(false);
    // ADD
    function addHabit(name: string, category: string) {
        if (!name || !category) return;

        const newHabit: Habit = {

            id: Date.now(),
            name,
            category: category,
            completedToday: false,
        };
        setHabits([...habits, newHabit])

    }

useEffect(() => {
  const storedHabits = localStorage.getItem("habits");
  if (storedHabits) {
    setHabits(JSON.parse(storedHabits));
  }
  setHasLoaded(true);
}, []);

useEffect(() => {
  if (!hasLoaded) return;
  localStorage.setItem("habits", JSON.stringify(habits));
}, [habits, hasLoaded]);





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

  
  // DELETE
  function handleDeleteHabit(id: number) {
    setHabits(habits.filter((h) => h.id !== id));
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
    console.log("Edit saved!");

    setEditingHabitId(null);
    
}


    return {
        habits,
        addHabit,
        handleToggleHabit,
        handleDeleteHabit,
        handleStartEdit,
        handleSaveEdit,
        editingHabitId,
        editingHabitName,
        setEditingHabitId,
        setEditingHabitName,


      };

        
    };
