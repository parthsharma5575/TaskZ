# TaskZ - Task Management Application

A full-stack task management application built with Spring Boot and React. TaskZ helps you organize your tasks and task lists efficiently with a modern, responsive user interface.

## 📋 Features

- ✅ Create, read, update, and delete tasks
- 📝 Organize tasks into task lists
- 🎨 Modern Material-UI design with smooth animations
- 📱 Responsive design that works on all devices
- 🔄 Real-time task status updates
- 📅 Task date management
- 🌐 RESTful API architecture
- 🐳 Docker support for easy deployment

## 🛠️ Tech Stack

### Backend
- **Java 21** - Programming language
- **Spring Boot 3.2.1** - Application framework
  - Spring Boot Starter Web
  - Spring Boot Starter Data JPA
- **PostgreSQL** - Production database
- **H2 Database** - Development/testing database
- **Maven** - Build tool and dependency management

### Frontend
- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **Material-UI (MUI) 7.3.7** - Component library
  - @mui/material
  - @mui/icons-material
- **React Router DOM 7.12.0** - Navigation
- **Axios 1.13.2** - HTTP client
- **Framer Motion 12.26.2** - Animations
- **React Toastify 11.0.5** - Toast notifications
- **date-fns 4.1.0** - Date utilities

## 📁 Project Structure

```
TaskZ/
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── example/
│                   └── taskaz/
│                       ├── config/          # Configuration classes
│                       ├── controller/      # REST controllers
│                       ├── domain/          # Entity classes
│                       ├── mappers/         # DTO mappers
│                       ├── repo/            # JPA repositories
│                       └── services/        # Business logic
├── frontend/
│   ├── src/
│   │   ├── api/                # API configuration
│   │   ├── assets/             # Static assets
│   │   ├── components/         # React components
│   │   └── pages/              # Page components
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml          # Docker configuration
├── pom.xml                     # Maven configuration
├── DEPLOYMENT.md               # Detailed deployment guide
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 18 or higher and npm
- Maven 3.6+
- PostgreSQL (for production) or H2 (for development)
- Docker and Docker Compose (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/parthsharma5575/TaskZ.git
   cd TaskZ
   ```

2. **Backend Setup**
   ```bash
   # Build the project
   ./mvnw clean package
   
   # Run the backend
   ./mvnw spring-boot:run
   ```
   
   The backend will start on `http://localhost:8080`

3. **Frontend Setup**
   ```bash
   # Navigate to frontend directory
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start the development server
   npm run dev
   ```
   
   The frontend will start on `http://localhost:5173`

## 🐳 Docker Deployment

### Quick Start with Docker Compose

1. **Start PostgreSQL database**
   ```bash
   docker-compose up -d
   ```

2. **Build and run the application**
   ```bash
   # Backend
   ./mvnw clean package -DskipTests
   java -jar target/Taskaz-0.0.1-SNAPSHOT.jar
   
   # Frontend
   cd frontend
   npm run build
   npm run preview
   ```

### Database Configuration

The `docker-compose.yml` sets up PostgreSQL:
- **Port**: 5432
- **Database**: postgres
- **Default Password**: changemeatprod!d (⚠️ Change in production!)

## 📝 API Endpoints

The backend exposes RESTful API endpoints for task management:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get a specific task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
- `GET /api/tasklists` - Get all task lists
- `POST /api/tasklists` - Create a new task list

## 🧪 Development

### Running Tests

```bash
# Backend tests
./mvnw test

# Frontend tests (if available)
cd frontend
npm run test
```

### Code Linting

```bash
cd frontend
npm run lint
```

## 🔧 Configuration

### Backend Configuration

Update `src/main/resources/application.properties` for database and server settings:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/taskaz
spring.datasource.username=your_username
spring.datasource.password=your_password
server.port=8080
```

### Frontend Configuration

Update `frontend/src/api/axiosConfig.js` for API base URL:

```javascript
const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:8080',
});
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Parth Sharma**
- GitHub: [@parthsharma5575](https://github.com/parthsharma5575)

## 🙏 Acknowledgments

- Spring Boot for the robust backend framework
- React and Vite for the modern frontend development experience
- Material-UI for the beautiful component library
- All open-source contributors who made this project possible

## 📞 Support

If you have any questions or run into issues, please:
- Review application logs and browser console for errors
- Open an issue on GitHub

---

⭐ Star this repo if you find it helpful!
