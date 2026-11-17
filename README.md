# MERN Attendance Application

This is a full-stack application designed to simplify the process of marking attendance. Built using the MERN stack (MongoDB, Express, React, Node.js), it allows users to sign up, log in, create classrooms, add students, and mark attendance for those students.


<img width="640" height="340" alt="Login" src="https://github.com/user-attachments/assets/2df769c2-cb20-4e1e-b550-1bcc3b692fac" >
<img width="640" height="340" alt="Landing" src="https://github.com/user-attachments/assets/fc9f8dac-76ba-42e6-b1b5-59c55bef8338" />
<img width="640" height="339" alt="Classroom" src="https://github.com/user-attachments/assets/468052d1-9b30-4a93-9ce0-1b4b671d9e17" >
<img width="640" height="340" alt="Attendance Marking" src="https://github.com/user-attachments/assets/c24189ac-e92c-45a5-9b17-6a66005a266c" />

## Features

- **User Authentication:** Sign up and log in securely.
- **Classroom Management:** Create and manage classrooms.
- **Student Management:** Add students to classrooms.
- **Attendance Marking:** Mark attendance for each student.

## Installation and Setup

To run this application locally, follow these steps:

### Step 1: Install Dependencies

Navigate to the `frontend` and `backend` directories and install the required dependencies.

```bash
# Install dependencies for frontend
cd frontend
npm install

# Install dependencies for backend
cd backend
npm install
```

### Step 2: Run the Application

You will need two terminals open simultaneously to run both the frontend and backend servers.

1. **In the first terminal:**

   ```bash
   cd backend
   nodemon start
   ```

2. **In the second terminal:**

   ```bash
   cd frontend
   npm start
   ```

The application should now be running locally at port 3000.

## Project Structure

- `frontend/`: Contains the React code for the user interface.
- `backend/`: Contains the Node.js/Express code for the server-side logic.

## Tech Stack

- **MongoDB:** NoSQL database for storing user data, classrooms, and attendance records.
- **Express:** Web framework for Node.js.
- **React:** Frontend library for building user interfaces.
- **Node.js:** JavaScript runtime environment.

## GitHub Repository

You can find the project repository [here](https://github.com/exodus31/mern-attendance.git).
