import { useState } from "react";
import DatePicker from "./DatePicker";
import SubtaskList from "./SubtaskList";

function TaskItem({
  task,
  onToggle,
  onDelete,
  onDateChange,
  onUpdateTitle,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  function saveTitle() {
    const titletrim = title.trim();

    if (!titletrim) {
      setTitle(task.title);
      setEditing(false);
      return;
    }

    onUpdateTitle(task.id, titletrim);
    setEditing(false);
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-header">

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {editing ? (
          <input
            className="task-edit-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveTitle();

              if (e.key === "Escape") {
                setTitle(task.title);
                setEditing(false);
              }
            }}
            autoFocus
          />
        ) : (
          <span
            className={`task-title ${
              task.completed ? "completed-text" : ""
            }`}
            onDoubleClick={() => setEditing(true)}
          >
            {task.title}
          </span>
        )}

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>

      <DatePicker
        dueDate={task.dueDate}
        onChange={(date) =>
          onDateChange(task.id, date)
        }
      />

      <SubtaskList
        taskId={task.id}
        subtasks={task.subtasks}
        onAddSubtask={onAddSubtask}
        onToggleSubtask={onToggleSubtask}
        onDeleteSubtask={onDeleteSubtask}
      />
    </div>
  );
}

export default TaskItem;