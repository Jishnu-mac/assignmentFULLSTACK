function DatePicker({ dueDate, onChange }) {
  return (
    <div className="date-picker">
      <label htmlFor="due-date">Due Date:</label>

      <input
        id="due-date"
        type="date"
        value={dueDate || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default DatePicker;