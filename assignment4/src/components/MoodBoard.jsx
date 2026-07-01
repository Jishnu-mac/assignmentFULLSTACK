import { useState } from "react";
import "../styles/MoodBoard.css";

function MoodBoard({ moodEntries, setMoodEntries }) {
  const [selectedMood, setSelectedMood] = useState("Happy");
  const [note, setNote] = useState("");

  function addMood() {
    if (!note.trim()) return;

    const newEntry = {
      id: Date.now(),
      mood: selectedMood,
      note,
      date: new Date().toLocaleString(),
    };

    setMoodEntries([newEntry, ...moodEntries]);
    setNote("");
    setSelectedMood("Happy");
  }

  function deleteMood(id) {
    if (!window.confirm("Delete this mood entry?")) return;

    setMoodEntries(
      moodEntries.filter((entry) => entry.id !== id)
    );
  }

  return (
    <div className="mood-board">
      <h1>Mood Board</h1>

      <div className="mood-form">
        <select
          value={selectedMood}
          onChange={(e) =>
            setSelectedMood(e.target.value)
          }
        >
          <option>Happy</option>
          <option>Calm</option>
          <option>Neutral</option>
          <option>Sad</option>
          <option>Angry</option>
          <option>Tired</option>
        </select>

        <textarea
          placeholder="Write about your day..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.ctrlKey) {
              addMood();
            }
          }}
        />

        <button
          onClick={addMood}
          disabled={!note.trim()}
        >
          Add Entry
        </button>
      </div>

      {moodEntries.length === 0 ? (
        <div className="empty-state">
          No mood entries yet.
        </div>
      ) : (
        <div className="mood-list">
          {moodEntries.map((entry) => (
            <div
              key={entry.id}
              className="mood-card"
            >
              <h3>{entry.mood}</h3>

              <p>{entry.note}</p>

              <small>{entry.date}</small>

              <button
                onClick={() =>
                  deleteMood(entry.id)
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

export default MoodBoard;