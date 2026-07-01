# Cipher MVP – Personal Productivity Dashboard

## Overview

Cipher MVP is a React-based productivity dashboard built using **React**, **Vite**, and **Local Storage**. It helps users manage daily tasks, long-term goals, focus sessions, and mood journals in a single application.

The project demonstrates React fundamentals including:

* Functional Components
* Custom Hooks
* State Lifting
* Props
* Component Composition
* Local Storage Persistence

---

# Features

## Task Board

* Add tasks
* Edit task title (double-click)
* Delete tasks
* Mark tasks as completed
* Assign due dates
* Group tasks into:

  * Overdue
  * Today
  * Upcoming
  * No Due Date
  * Completed
* Search tasks
* Task priority (High / Medium / Low)
* Subtasks

---

## Goal Tracker

* Add goals
* Delete goals
* Edit goal titles
* Progress slider
* Progress percentage

---

## Focus Timer

* Start
* Pause
* Reset
* Custom duration
* Countdown timer

### Bonus

* Select an incomplete task from a dropdown.
* Display:

```
Focusing on:
<Task Name>
```

* Automatically marks the selected task as completed when the timer finishes.

---

## Mood Board

* Select mood
* Add journal entry
* Timestamp each entry
* Delete entries

---

# Tech Stack

* React
* Vite
* JavaScript (ES6)
* CSS3
* Local Storage

---

# Folder Structure

```
src
│
├── components
│   ├── Dashboard.jsx
│   ├── Sidebar.jsx
│   ├── TaskBoard.jsx
│   ├── TaskItem.jsx
│   ├── DatePicker.jsx
│   ├── SubtaskList.jsx
│   ├── GoalTracker.jsx
│   ├── GoalCard.jsx
│   ├── FocusTimer.jsx
│   └── MoodBoard.jsx
│
├── hooks
│   ├── useLocalStorage.js
│   └── useTimer.js
│
├── utils
│   ├── dateUtils.js
│   ├── groupTasks.js
│   └── helpers.js
│
├── styles
│
├── App.jsx
└── main.jsx
```

---

# State Shape Diagram

The application state is centralized in **Dashboard.jsx**.

```
Dashboard
│
├── tasks
│     ├── id
│     ├── title
│     ├── completed
│     ├── dueDate
│     ├── priority
│     └── subtasks
│            ├── id
│            ├── title
│            └── completed
│
├── goals
│     ├── id
│     ├── title
│     └── progress
│
├── moodEntries
│     ├── id
│     ├── mood
│     ├── note
│     └── date
│
└── activeSection
```

---

# Data Flow

```
Dashboard
│
├── TaskBoard
│      │
│      ├── TaskItem
│      │      ├── DatePicker
│      │      └── SubtaskList
│
├── GoalTracker
│      └── GoalCard
│
├── FocusTimer
│
└── MoodBoard
```

Dashboard owns the application state and passes data to child components through props.

---

# Custom Hooks

## useLocalStorage

Responsible for:

* Reading saved data
* Writing updates automatically
* JSON serialization
* Persistent storage

---

## useTimer

Responsible for:

* Countdown
* Start
* Pause
* Reset
* Duration management

---

# Completed Requirements

* Responsive dashboard
* Task management
* Goal tracking
* Mood journal
* Focus timer
* Local Storage persistence
* Custom hooks
* Reusable components
* Utility functions
* Task grouping
* Due dates
* Subtasks
* Inline editing

---

# Bonus Features

* Focus Timer linked with tasks
* Dropdown showing incomplete tasks
* Displays current focused task
* Automatic task completion after timer finishes
* Search tasks
* Task priority levels

---

# Known Limitations / Known Bugs

* Drag-and-drop task reordering is not implemented.
* Browser notifications are not implemented when the timer ends.
* If multiple browser tabs are open, Local Storage updates may not synchronize immediately.
* Data persistence depends on the browser's Local Storage. Clearing browser storage removes saved data.

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# Future Improvements

* Drag-and-drop task ordering
* Dark mode
* Charts and analytics
* Import / Export data
* Browser notifications
* Task categories
* Cloud synchronization

---

