# Mini Full Stack Search App (Backend)

This is the backend portion of a mini full stack search application, built with **Express** and **TypeScript**. It provides API endpoints to serve and search FAQ data.  
**Note**: This project is structured to work with a separate frontend application.

---

## 🚀 Features

- Fast, RESTful API built with Express
- TypeScript for type safety and maintainability
- FAQ data loading and robust error handling
- Security & CORS enabled by default

---

## 🗂️ Folder Structure

```
backend/
├── src/
│   ├── app.ts               # Main application entry point
│   ├── controllers/
│   │   └── faqController.ts # FAQ search logic/controller
│   ├── lib/
│   │   ├── data-loader.ts   # FAQ data loading utilities
│   │   └── util.ts          # Utility functions (e.g. retry)
│   ├── types/
│   │   └── types.ts         # TypeScript type definitions
│   └── ...                  # Additional source files
├── package.json
└── tsconfig.json
```

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## ⚡️ Getting Started

1. **Install dependencies**  
   ```
   npm install
   ```

2. **Run the server in development mode**  
   (auto-reloads with TypeScript support)
   ```
   npm run dev
   ```

3. **Start the server in production mode**  
   (compiles TypeScript, then starts Node)
   ```
   npm start
   ```

4. **Lint your code**  
   ```
   npm run lint
   ```

---

## 📦 Available Scripts

| Script          | Description                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Run server with auto-restart (dev mode)    |
| `npm start`     | Build TypeScript and start server          |
| `npm run lint`  | Check code for linting errors              |

---

## 🚨 API Endpoints

- **GET /**  
  Health check - returns `Server is running`.
- **POST /api/search**  
  Body: `{ "query": "your_search_term" }`  
  Response: `{ data: [...], message: "Success" }`

---

## 🖥️ Frontend

*This README is focused on the backend. If you want to merge with your frontend project's readme, place the backend and frontend documentation under clearly marked sections.*

Example:
```
# Mini Full Stack Search App

## Backend (`/backend`)
<---- this backend readme content here ---->

## Frontend (`/frontend`)
<---- your frontend readme content here ---->
```

---

## 📄 License

[MIT](LICENSE) (or your license here)

---

**Feel free to adjust or expand this README to match your workflow, deployment, or project-specific needs!**