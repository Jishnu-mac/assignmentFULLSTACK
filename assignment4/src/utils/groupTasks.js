import { isToday, isOverdue, isUpcoming } from "./dateUtils";

export function groupTasks(tasks) {
  return {
    Overdue: tasks.filter(
      (task) =>
        !task.completed &&
        task.dueDate &&
        isOverdue(task.dueDate)
    ),

    Today: tasks.filter(
      (task) =>
        !task.completed &&
        task.dueDate &&
        isToday(task.dueDate)
    ),

    Upcoming: tasks.filter(
      (task) =>
        !task.completed &&
        task.dueDate &&
        isUpcoming(task.dueDate)
    ),

    "No Due Date": tasks.filter(
      (task) =>
        !task.completed &&
        !task.dueDate
    ),

    Completed: tasks.filter(
      (task) => task.completed
    ),
  };
}