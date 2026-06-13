const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "attendance.json");

function loadAttendance() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "{}");
  }

  return JSON.parse(
    fs.readFileSync(DATA_FILE, "utf8")
  );
}

function saveAttendance(data) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(data, null, 2)
  );
}

function isRegistered(rollNo) {
  const num = Number(rollNo);

  return num >= 240001 && num <= 240400;
}

function markPresent(rollNo) {
  const attendance = loadAttendance();

  if (attendance[rollNo]) {
    return {
      success: false,
      timestamp: attendance[rollNo],
    };
  }

  const timestamp = new Date().toISOString();

  attendance[rollNo] = timestamp;

  saveAttendance(attendance);

  return {
    success: true,
    timestamp,
  };
}

function getStats() {
  const attendance = loadAttendance();

  return {
    total: Object.keys(attendance).length,
    rollNumbers: Object.keys(attendance),
  };
}

module.exports = {
  isRegistered,
  markPresent,
  getStats,
};
