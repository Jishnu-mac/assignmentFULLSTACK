import { useState } from "react";
import GoalCard from "./GoalCard";

function GoalTracker({ goals, setGoals }) {
  const [newGoal, setNewGoal] = useState("");

  function addGoal() {
    if (!newGoal.trim()) return;

    const goal = {
      id: Date.now(),
      title: newGoal,
      progress: 0,
    };

    setGoals([...goals, goal]);
    setNewGoal("");
  }

  function updateGoal(id, updatedGoal) {
    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? { ...goal, ...updatedGoal }
          : goal
      )
    );
  }

  function deleteGoal(id) {
    if (!window.confirm("Delete this goal?")) return;

    setGoals(goals.filter((goal) => goal.id !== id));
  }

  return (
    <div className="goal-tracker">
      <h1>Goal Tracker</h1>

      <div className="goal-input">
        <input
          type="text"
          placeholder="Enter a new goal..."
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addGoal();
            }
          }}
        />

        <button
          onClick={addGoal}
          disabled={!newGoal.trim()}
        >
          Add Goal
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="empty-state">
          No goals yet.
        </div>
      ) : (
        <div className="goal-list">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdate={updateGoal}
              onDelete={deleteGoal}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalTracker;