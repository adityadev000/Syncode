# Syncode 🚀  
### Real-Time Collaborative Code Editor (VS Code–like)

Syncode is a **real-time collaborative code editor** that enables multiple users to write, edit, and manage code together seamlessly.  
It is built to provide a **VS Code–like experience on the web**, focusing on real-time synchronization, collaboration, and performance.

---

## ✨ Features

- 🔄 **Real-Time Collaboration**
  - Multi-user editing with conflict-free synchronization using **CRDTs (Yjs)**
  - Live cursor & presence indicators

- 🗂️ **Project-Based Workspace**
  - File & folder management system
  - Autosave with persistent project storage

- 💬 **Collaboration Tools**
  - Real-time chat within rooms
  - Role-based access control for users

- 🧠 **Code Editor**
  - Monaco Editor (VS Code editor engine)
  - Syntax highlighting & themes
  - Fast and responsive editing experience

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Monaco Editor
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Socket.IO

### Real-Time Sync
- Yjs (CRDT-based synchronization)
- WebSockets

### Database
- MongoDB

### Authentication & Security
- JWT (JSON Web Tokens)

---

## 🧩 Architecture Overview

- **Client** connects to the server via WebSockets
- **Yjs CRDTs** ensure conflict-free real-time edits
- **Socket.IO** handles live sync, presence, and chat
- **MongoDB** stores projects, files, and metadata
- **Autosave mechanism** ensures persistence and reliability

---

## 📸 Screenshots
<img width="1080" height="725" alt="image" src="https://github.com/user-attachments/assets/bd2a545d-c202-409a-8d87-5ba13a32961d" />
<img width="1082" height="726" alt="image" src="https://github.com/user-attachments/assets/cd832795-42b1-4a48-9472-c8ea5c7654c5" />



