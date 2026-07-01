export function getToday() {
  return new Date().toISOString().split("T")[0];
}

export function isToday(date) {
  if (!date) return false;
  return date === getToday();
}

export function isOverdue(date) {
  if (!date) return false;
  return date < getToday();
}

export function isUpcoming(date) {
  if (!date) return false;
  return date > getToday();
}

export function formatDate(date) {
  if (!date) return "No Due Date";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}