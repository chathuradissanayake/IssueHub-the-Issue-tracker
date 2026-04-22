# 🚀 IssueHub

> A modern, full-stack issue tracking board built with the MERN stack and TypeScript.

## 🔍 Browse and Try

https://issuehub.chatd.dev/
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
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
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

## 🔌 API Reference

### Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT token |

### Issues

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/issues` | Get all issues (supports query filters) |
| `POST` | `/api/issues` | Create a new issue |
| `PUT` | `/api/issues/:id` | Update an issue by ID |
| `DELETE` | `/api/issues/:id` | Delete an issue by ID |
| `GET` | `/api/issues/stats` | Get issue counts grouped by status |

### Query Parameters for `GET /api/issues`

| Param | Type | Description |
|---|---|---|
| `page` | `number` | Page number (default: 1) |
| `limit` | `number` | Results per page (default: 10) |
| `status` | `string` | Filter by status |
| `priority` | `string` | Filter by priority |
| `severity` | `string` | Filter by severity |
| `search` | `string` | Search title or description |

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

## 🎨 UI Design System

The UI follows a soft, light design language with a consistent set of colours and components across all pages.

| Token | Value | Usage |
|---|---|---|
| Brand accent | `violet-500` | Buttons, rings, active states |
| Page background | `slate-50` | App background |
| Card surface | `white` | All cards and modals |
| Borders | `slate-100 / slate-200` | Subtle card and input borders |
| Open | `blue-400` | Status indicator |
| In Progress | `amber-400` | Status indicator |
| Resolved | `emerald-400` | Status indicator |
| Closed | `slate-300` | Status indicator |

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

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'Add your feature'`
4. Push to the branch — `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [License](./https://github.com/chathuradissanayake).

---

<p align="center">Built with ❤️ using the MERN stack</p>
