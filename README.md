# 🚀 IssueHub

> A modern, full-stack issue tracking board built with the MERN stack and TypeScript.

## 🔍 Browse and Try

https://issuehub.chatd.dev
---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login and registration with token-based sessions
- 📋 **Issue Board** — Visual grid of all issues with real-time status indicators
- 📊 **Issue Counter** — Live stat cards showing counts and percentages per status
- 🔍 **Advanced Filters** — Filter by status, priority, severity, and free-text search
- ✏️ **Create & Edit Issues** — Modal form with live badge preview before saving
- 🎨 **Soft Modern UI** — Clean, accessible design system built with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (JSON Web Tokens) |
| HTTP Client | Axios |
| Routing | React Router v6 |

---

## 📁 Project Structure

```
issuehub/
├── client/                       # React frontend
│   ├── src/
│   │   ├── assets/               # Images, logo
│   │   ├── components/
│   │   │   ├── IssueCounter.tsx  # Status stat cards
│   │   │   ├── IssueFilters.tsx  # Filter bar
│   │   │   ├── IssuesList.tsx    # Issues grid
│   │   │   ├── IssueTile.tsx     # Single issue card
│   │   │   ├── IssueModal.tsx    # Create / edit modal
│   │   │   ├── LoginForm.tsx     # Login form
│   │   │   └── RegisterForm.tsx  # Register form
│   │   ├── pages/
│   │   │   ├── Login.tsx         # Auth page
│   │   │   └── IssueBoard.tsx    # Main board page
│   │   ├── services/
│   │   │   ├── authService.ts    # Login / register API calls
│   │   │   └── issueService.ts   # Issue CRUD + stats API calls
│   │   └── types/
│   │       └── issue.ts          # Shared TypeScript types
│
└── server/src/                       # Express backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── server.ts
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB
- npm 

### 1. Clone the repository

```bash
git clone https://github.com/chathuradissanayake/IssueHub-the-Issue-tracker.git
cd issuehub
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/issuehub
JWT_SECRET=your_super_secret_key
```

Start the server:

```bash
npm run dev
```

### 3. Set up the client

```bash
cd client
npm install
npm run dev
```

The app will be available at `https://issuehub.chatd.dev/`.

---

## 📌 Issue Schema

```ts
interface Issue {
  _id: string;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  severity?: "MINOR" | "MAJOR" | "CRITICAL";
  createdAt: string;
  updatedAt: string;
}
```

---


## 🔒 Authentication Flow

1. User registers or logs in via `/login`
2. Server validates credentials and returns a signed JWT
3. Token is stored in `localStorage`
4. All protected API requests include the token in the `Authorization` header
5. JWT is decoded client-side to display the logged-in user's email and role

---

## 🚧 Roadmap

- [ ] Pagination controls on the issue board
- [ ] Role-based access control (Admin / Developer / Viewer)
- [ ] Issue assignment to team members
- [ ] Comment threads per issue
- [ ] Email notifications on status change
- [ ] Dark mode support
- [ ] Export issues to CSV

---

## 📄 License

This project is licensed under the [License](./https://github.com/chathuradissanayake).

---

<p align="center">Built with ❤️ using the MERN stack</p>
