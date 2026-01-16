# Taskaz Frontend

This is the React frontend for the Taskaz application.

## Prerequisites

- Node.js installed.
- The Taskaz Spring Boot backend running on `http://localhost:8080`.

## Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Features

- **Dashboard**: View all task lists. Create new task lists. Delete task lists.
- **Task List Details**: View tasks within a list. Create new tasks. Toggle task status (Open/Closed). Delete tasks. View progress of the list.

## Technologies

- React (Vite)
- Material UI (MUI)
- Axios
- React Router DOM