# 🤖 ChatBot Web Application

A responsive chatbot web app built with **React** featuring secure authentication, real-time message stream, dark/light mode toggle, input history, and additional features like voice input and chat export.

---

##  Features

-  User Registration and Login (JWT-based)
-  Real-time chat with auto-scroll and loading indicator
-  Light/Dark theme toggle
-  Input history navigation
-  Export chat history
-  Fully responsive (mobile + desktop)

---

##  Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT
- **Email**: Mailtrap (for order/confirmation)
- **Voice Recognition**: Web Speech API

##  Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/snehamol/chatBox-app.git
cd chatbot-app

Install dependencies
npm install

touch backend/.env

backend/.env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

touch frontend/.env

frontend/.env
VITE_API_BASE_URL=http://localhost:5000/api

 Run the App

npm run server

Features

User Registration & Login (JWT-based)

Protected Routes

Real-Time Chat UI

Prompt Templates

Auto Scroll to Bottom

Input History (up/down arrows)

Dark/Light Theme Toggle

Chat Export (.txt)

Responsive (Mobile/Desktop)

Logout Functionality


Folder Structure

chatbot-app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── .env
│   └── main.jsx
│
├── package.json
├── README.md
└── ...



 Screenshots
| Light Mode                   |  Dark Mode                  |
| ---------------------------- | --------------------------- |
| ![](./screenshots/light.png) | ![](./screenshots/dark.png) |

 Mobile View
![](./screenshots/mobile.png) 

 Demo
![](./screenshots/domo.gif) 

Developed By
Sneha Mol K
