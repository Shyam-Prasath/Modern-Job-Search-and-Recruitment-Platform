# Job Search Portal

A basic **Job Search Portal** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
The platform provides **dual role login** for **candidates** and **hiring members**, enabling role-based functionality.  

---

## 🚀 Features

### 🔑 Authentication & Roles
- Dual role login (Candidate / Hiring Member)
- Redirect users to respective dashboards after login

### 👨‍💻 Candidate Features
- Search for jobs using keywords and filters
- View detailed job postings
- Apply for jobs directly from the portal

### 🏢 Hiring Member Features
- Post new job listings
- Manage posted jobs
- Filter applicants by skills

### 🔍 Search Functionality
- Global search bar for filtering jobs by title, company, or skills

---

## 🛠️ Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT / Sessions (depending on implementation)  
- **Other Tools**: Axios, bcrypt.js, dotenv  

---

## 📂 Project Structure

```

Job-Search-Portal/
│── client/            # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│── server/            # Node.js + Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│── .env
│── package.json
│── README.md

````

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/job-search-portal.git
   cd job-search-portal

2. **Setup Backend**

   ```bash
   cd server
   npm install
   npm start
   ```

3. **Setup Frontend**

   ```bash
   cd client
   npm install
   npm start
   ```

4. **Environment Variables**
   Create a `.env` file in the `server/` folder:

   ```
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```

---

## 🧑‍💻 Skills Used

## MongoDB , Express.js , React.js , Node.js
---

## 📸 Screenshots (Optional)

* Candidate Dashboard
* Hiring Dashboard
* Job Search & Apply

---

## ✨ Future Improvements

* Role-based access control with Admin panel
* Resume upload & parsing
* Job recommendation engine using AI
* Email notifications for job applications

---
