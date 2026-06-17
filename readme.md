# QR Code Attendance System

## Overview

This project is a Telegram bot for QR-based attendance.

A volunteer sends a photo of a student's IITK ID card. The bot:

* Downloads the image from Telegram.
* Decodes the QR code.
* Extracts the student's roll number.
* Checks that the roll number is within the valid IITK range (240001–240400).
* Marks attendance in a JSON store.
* Prevents duplicate attendance entries.
* Generates attendance reports.
* Exports attendance as a CSV file.

---

## Features

### QR Attendance

Upload an IITK ID card photo containing a QR code.

The bot automatically:

1. Detects the QR code.
2. Extracts the roll number.
3. Validates the roll number.
4. Marks attendance.

### Attendance Report

Use:

```bash
/report
```

to view:

* Total students present
* List of roll numbers marked present

### CSV Export

Use:

```bash
/export
```

to download attendance as:

```csv
RollNumber,Timestamp
240054,2026-06-15T08:20:10.000Z
240120,2026-06-15T08:25:41.000Z
```

---

## Project Structure

```text
assignment2/
│
├── bot.js
├── qr.js
├── parser.js
├── attendance.js
├── attendance.json
├── .env
├── package.json
└── README.md
```

---

## Setup

### 1. Install Dependencies

```bash
npm install
```

or

```bash
npm install grammy dotenv jimp jsqr
```

---

### 2. Create a Telegram Bot

1. Open Telegram.
2. Search for **@BotFather**.
3. Run:

```text
/newbot
```

4. Follow the instructions.
5. Copy the bot token.

---

### 3. Configure Environment Variables

Create a file named `.env` in the project root.

Example:

```env
BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
```

Replace:

```text
YOUR_TELEGRAM_BOT_TOKEN
```

with the token received from BotFather.

---

## Running the Bot

Start the bot using:

```bash
node bot.js
```

Expected output:

```text
Bot started...
```

---

## Bot Commands

### Start

```bash
/start
```

Shows a menu with:

* Scan QR
* Report
* Export

### Report

```bash
/report
```

Displays attendance statistics.

### Export

```bash
/export
```

Downloads attendance as a CSV file.

---

## Attendance Storage

Attendance data is stored in:

```text
attendance.json
```

Example:

```json
{
  "240054": "2026-06-15T08:20:10.000Z",
  "240120": "2026-06-15T08:25:41.000Z"
}
```

---

## Technologies Used

* Node.js
* Grammy
* Jimp
* jsQR
* Telegram Bot API

---