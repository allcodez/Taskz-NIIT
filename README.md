# Star Taskz

Star Taskz is a weather-integrated task manager application built with React and Spring Boot. The app allows users to create, manage, and track their tasks while providing intelligent weather-based task suggestions.

## Features

- Create, update, and delete tasks
- Set start and end dates/times for tasks
- View task details and status
- Integrated weather data based on user's location
- Smart task suggestions based on weather conditions
- User authentication and authorization

## Technologies Used

### Frontend

- React
- React Router
- Boxicons (for icons)
- CSS for styling

### Backend
## 3rd party Backend service hosted on Railway
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL (or any other database)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/star-taskz.git
```

2. Navigate to the project directory:

```bash
cd star-taskz
```

3. Install frontend dependencies:

```bash
cd frontend
npm install
```

4. In a new terminal window, start the React development server:

```bash
cd ../frontend
npm start
```

The app should now be running at `http://localhost:3000`.

## API Endpoints

The backend provides the following API endpoints:

```
Base URL: https://startaskzbackend-production.up.railway.app/

Registration Endpoints:
- POST /auth/register
- POST /auth/login
- POST /auth/refresh (not yet implemented)

User Endpoints:
- POST /user/create-task/{userId}
- PUT /user/update-task/{userId}/{taskId}
- GET /user/get-tasks/{userId}
- GET /user/get-tasks/{userId}/{taskId}
- DELETE /user/delete-task/{userId}/{taskId}
```
