# Sip & Scribble ☕

A personal journaling app where you can log entries, track your mood, and organize thoughts with tags. Built with the MERN stack.

![MIT License](https://img.shields.io/badge/license-MIT-green) ![Node](https://img.shields.io/badge/node-20.x-brightgreen) ![React](https://img.shields.io/badge/react-18-blue)

---

## Features

- JWT-based auth — signup, login, logout
- Create, edit, and delete journal entries
- Mood picker per entry (Calm, Happy, Sad, Motivated, Tired)
- Comma-separated tags on each entry
- Entries sorted newest-first and persisted in MongoDB
- Auto-redirect to login when a token expires
- Protected routes — unauthenticated users can't reach the dashboard

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Axios, Vite |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT, bcryptjs |

---
