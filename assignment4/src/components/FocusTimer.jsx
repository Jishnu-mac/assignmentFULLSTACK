import { useEffect, useState } from "react";
import useTimer from "../hooks/useTimer";
import "../styles/FocusTimer.css";

function FocusTimer({ tasks, setTasks }) {
  const [duration, setDuration] = useState(10);
  const [selectedTaskId, setSelectedTaskId] = useState("");

  const {
    minutes,
    seconds,
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    setMinutes,
  } = useTimer(duration);

  const incompleteTasks = tasks.filter((task) => !task.completed);

  const selectedTask = incompleteTasks.find(
    (task) => String(task.id) === selectedTaskId
  );

  useEffect(() => {
    if (
      timeLeft === 0 &&
      selectedTaskId &&
      tasks.length > 0
    ) {
      setTasks(
        tasks.map((task) =>
          String(task.id) === selectedTaskId
            ? { ...task, completed: true }
            : task
        )
      );
    }
  }, [timeLeft]);

  function handleDurationChange(e) {
    const value = Number(e.target.value);

    if (value > 0) {
      setDuration(value);
      setMinutes(value);
    }
  }

  return (
    <div className="focus-timer">

      <h1>Focus Timer</h1>

      <div className="timer-display">
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>

      <div className="timer-controls">

        <button onClick={start}>
          Start
        </button>

        <button onClick={pause}>
          Pause
        </button>

        <button onClick={() => reset(duration)}>
          Reset
        </button>

      </div>

      <div className="timer-settings">

        <label>
          Duration (minutes)
        </label>

        <input
          type="number"
          min="1"
          max="180"
          value={duration}
          onChange={handleDurationChange}
          disabled={isRunning}
        />

      </div>

      <div className="focus-task">

        <label>
          Select Task
        </label>

        <select
          value={selectedTaskId}
          onChange={(e) =>
            setSelectedTaskId(e.target.value)
          }
        >

          <option value="">
            -- None --
          </option>

          {incompleteTasks.map((task) => (
            <option
              key={task.id}
              value={task.id}
            >
              {task.title}
            </option>
          ))}

        </select>

      </div>

      {selectedTask && (
        <div className="current-focus">

          <strong>
            Focusing on:
          </strong>

          <p>{selectedTask.title}</p>

        </div>
      )}

    </div>
  );
}

export default FocusTimer;