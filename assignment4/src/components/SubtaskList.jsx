import { useState } from "react";

function SubtaskList({
  taskId,
  subtasks,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
}) {
  const [newSubtask, setNewSubtask] = useState("");

  function handleAddSubtask() {
    if (!newSubtask.trim()) return;

    onAddSubtask(taskId, newSubtask.trim());
    setNewSubtask("");
  }

  return (
    <div className="subtask-list">
      <h4>Subtasks</h4>

      <div className="subtask-input">
        <input
          type="text"
          placeholder="Add a subtask..."
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddSubtask();
            }
          }}
        />

        <button
          onClick={handleAddSubtask}
          disabled={!newSubtask.trim()}
        >
          Add
        </button>
      </div>

      {subtasks.length === 0 ? (
        <p className="empty-subtasks">
          No subtasks yet.
        </p>
      ) : (
        <div className="subtask-items">
          {subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className="subtask-item"
            >
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() =>
                  onToggleSubtask(
                    taskId,
                    subtask.id
                  )
                }
              />

              <span
                className={
                  subtask.completed
                    ? "completed-subtask"
                    : ""
                }
              >
                {subtask.title}
              </span>

              <button
                className="delete-subtask-btn"
                onClick={() =>
                  onDeleteSubtask(
                    taskId,
                    subtask.id
                  )
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubtaskList;