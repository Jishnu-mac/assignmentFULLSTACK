export function generateId() {
  return (
    Date.now().toString() +
    Math.random().toString(36).substring(2, 9)
  );
}

export function capitalize(text) {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}
