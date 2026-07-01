import { useState } from "react";

function GoalCard({
  goal,
  onUpdate,
  onDelete,
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(goal.title);

  function saveTitle() {
    onUpdate(goal.id, {
      title,
      progress: goal.progress,
    });
    setEditing(false);
  }

  return (
    <div className="goal-card">

      {editing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={saveTitle}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveTitle();
            }
          }}
          autoFocus
        />
      ) : (
        <h3 onDoubleClick={() => setEditing(true)}>
          {goal.title}
        </h3>
      )}

      <input
        type="range"
        min="0"
        max="100"
        value={goal.progress}
        onChange={(e) =>
          onUpdate(goal.id, {
            title: goal.title,
            progress: Number(e.target.value),
          })
        }
      />

      <p>{goal.progress}% Complete</p>

      <button onClick={() => onDelete(goal.id)}>
        Delete
      </button>

    </div>
  );
}

export default GoalCard;