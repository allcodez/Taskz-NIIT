# Star Taskz

Star Taskz is a weather-integrated task manager application built with React and Spring Boot. The app allows users to create, manage, and track their tasks while providing intelligent weather-based task suggestions.

## Features

- Create, update, and delete tasks
- Set start and end dates/times for tasks
- View task details and status
- Integrated weather data based on user's location
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
- PostgreSQL

## Installation

1. Clone the repository:

```bash
git clone https://github.com/allcodez/Taskz-NIIT.git
```

2. Navigate to the project directory:

```bash
cd Taskz-NIIT
```

3. Install frontend dependencies:

```bash
npm install
```

4. In a new terminal window, start the React development server:

```bash
npm start
```

The app should now be running at `http://localhost:3000`.

## API Endpoints

The backend provides the following API endpoints:

```
Registration Endpoints:
- POST /auth/register
- POST /auth/login

User Endpoints:
- POST /user/create-task/{userId}
- PUT /user/update-task/{userId}/{taskId}
- GET /user/get-tasks/{userId}
- GET /user/get-tasks/{userId}/{taskId}
- DELETE /user/delete-task/{userId}/{taskId}
```
