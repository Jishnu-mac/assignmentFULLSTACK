import { useState } from "react";
import TaskItem from "./TaskItem";
import { groupTasks } from "../utils/groupTasks";
import { generateId } from "../utils/helpers";
import "../styles/TaskBoard.css";

function TaskBoard({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [searchTerm, setSearchTerm] = useState("");

  function addTask() {
    if (!newTask.trim()) return;

    const task = {
      id: generateId(),
      title: newTask.trim(),
      completed: false,
      dueDate: "",
      priority,
      subtasks: [],
    };

    setTasks([...tasks, task]);

    setNewTask("");
    setPriority("Medium");
  }

  function deleteTask(id) {
    if (!window.confirm("Delete this task?")) return;

    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }

  function updateTaskTitle(id, title) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
            }
          : task
      )
    );
  }

  function updatePriority(id, priority) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              priority,
            }
          : task
      )
    );
  }

  function updateDueDate(id, dueDate) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              dueDate,
            }
          : task
      )
    );
  }

  function addSubtask(taskId, title) {
    if (!title.trim()) return;

    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks,
                {
                  id: generateId(),
                  title,
                  completed: false,
                },
              ],
            }
          : task
      )
    );
  }

  function toggleSubtask(taskId, subtaskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? {
                      ...subtask,
                      completed: !subtask.completed,
                    }
                  : subtask
              ),
            }
          : task
      )
    );
  }

  function deleteSubtask(taskId, subtaskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter(
                (subtask) => subtask.id !== subtaskId
              ),
            }
          : task
      )
    );
  }

  const filteredTasks = tasks.filter((task) =>
    task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const groupedTasks = groupTasks(filteredTasks);

    return (
    <div className="task-board">
      <h1>Task Board</h1>

      {/* Add Task */}
      <div className="task-input-section">

        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button onClick={addTask}>
          Add Task
        </button>

      </div>

      {/* Search */}

      <div className="search-bar">

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

      </div>

      {/* Empty State */}

      {filteredTasks.length === 0 ? (

        <div className="empty-state">

          <p>No tasks found.</p>

        </div>

      ) : (

        Object.entries(groupedTasks).map(
          ([groupName, group]) => {

            if (group.length === 0) return null;

            return (

              <div
                key={groupName}
                className="task-group"
              >

                <h2>{groupName}</h2>

                {group.map((task) => (

                  <div
                    key={task.id}
                    className="task-card"
                  >

                    <div className="priority-row">

                      <span
                        className={`priority ${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>

                      <select
                        value={task.priority}
                        onChange={(e) =>
                          updatePriority(
                            task.id,
                            e.target.value
                          )
                        }
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>

                    </div>

                    <TaskItem
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                      onDateChange={updateDueDate}
                      onUpdateTitle={updateTaskTitle}
                      onAddSubtask={addSubtask}
                      onToggleSubtask={toggleSubtask}
                      onDeleteSubtask={deleteSubtask}
                    />

                  </div>

                ))}

              </div>

            );
          }
        )

      )}
          </div>
  );
}

export default TaskBoard;