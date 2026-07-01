function Sidebar({
  activeSection,
  setActiveSection,
}) {
  const menuItems = [
    {
      id: "tasks",
      label: "Task Board",
    },
    {
      id: "goals",
      label: "Goal Tracker",
    },
    {
      id: "focus",
      label: "Focus Timer",
    },
    {
      id: "mood",
      label: "Mood Board",
    },
  ];

  return (
    <aside className="sidebar">

      <h2>Cipher MVP</h2>

      <p className="sidebar-subtitle">
        Productivity Dashboard
      </p>

      {menuItems.map((item) => (
        <button
          key={item.id}
          className={
            activeSection === item.id
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveSection(item.id)
          }
        >
          {item.label}
        </button>
      ))}

    </aside>
  );
}

export default Sidebar;