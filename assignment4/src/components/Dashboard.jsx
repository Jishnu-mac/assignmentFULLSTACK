import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

import Sidebar from "./Sidebar";
import TaskBoard from "./TaskBoard";
import GoalTracker from "./GoalTracker";
import FocusTimer from "./FocusTimer";
import MoodBoard from "./MoodBoard";

import "../styles/Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("tasks");

  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const [goals, setGoals] = useLocalStorage("goals", []);

  const [moodEntries, setMoodEntries] = useLocalStorage("moodEntries", []);

  function renderContent() {
    switch (activeSection) {
      case "tasks":
        return (
          <TaskBoard
            tasks={tasks}
            setTasks={setTasks}
          />
        );

      case "goals":
        return (
          <GoalTracker
            goals={goals}
            setGoals={setGoals}
          />
        );

      case "focus":
        return (
          <FocusTimer
            tasks={tasks}
            setTasks={setTasks}
          />
        );

      case "mood":
        return (
          <MoodBoard
            moodEntries={moodEntries}
            setMoodEntries={setMoodEntries}
          />
        );

      default:
        return (
          <TaskBoard
            tasks={tasks}
            setTasks={setTasks}
          />
        );
    }
  }

  return (
    <div className="dashboard">

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="dashboard-content">

        <header className="dashboard-header">

          <h1>Cipher MVP</h1>

          <p>
            Personal Productivity Dashboard
          </p>

        </header>

        {renderContent()}

      </main>

    </div>
  );
}

export default Dashboard;