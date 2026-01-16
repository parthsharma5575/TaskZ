# Taskaz Deployment Guide

This guide provides step-by-step instructions for deploying the Taskaz application (Spring Boot backend + React frontend).

## Prerequisites

- Java 17 or higher
- Node.js 18 or higher and npm
- Maven 3.6+
- Docker and Docker Compose (optional, for containerized deployment)
- A web server (Nginx, Apache) for production frontend serving (optional)

## Table of Contents

1. [🚀 FREE Cloud Deployment (Recommended)](#-free-cloud-deployment-recommended)
2. [Local Development Setup](#local-development-setup)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Docker Deployment](#docker-deployment)
6. [Production Deployment](#production-deployment)

---

## 🚀 FREE Cloud Deployment (Recommended)

**Best Free Options:**
- **Backend**: Railway.app or Render.com (Free tiers available)
- **Frontend**: Vercel or Netlify (100% Free, unlimited)

### Option 1: Railway (Backend) + Vercel (Frontend) ⭐ EASIEST

#### Deploy Backend to Railway (FREE)

1. **Sign up at Railway**: Go to [railway.app](https://railway.app) and sign up with GitHub

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account and select the Taskaz repository

3. **Configure Backend**:
   - Railway will auto-detect it's a Java/Maven project
   - Add these environment variables in Railway dashboard:
     ```
     PORT=8080
     JAVA_OPTS=-Xmx512m
     ```
   - Railway will automatically build and deploy

4. **Get Backend URL**:
   - After deployment, Railway provides a URL like: `https://your-app.up.railway.app`
   - Copy this URL - you'll need it for the frontend

#### Deploy Frontend to Vercel (100% FREE)

1. **Sign up at Vercel**: Go to [vercel.com](https://vercel.com) and sign up with GitHub

2. **Install Vercel CLI** (optional, or use web interface):
   ```bash
   npm i -g vercel
   ```

3. **Update Frontend API Configuration**:
   ```bash
   cd frontend
   ```
   
   Edit `src/api/axiosConfig.js`:
   ```javascript
   const api = axios.create({
       baseURL: process.env.VITE_API_URL || 'https://your-app.up.railway.app',
       headers: {
           'Content-Type': 'application/json',
       },
   });
   ```

4. **Deploy to Vercel**:
   ```bash
   cd frontend
   vercel
   ```
   
   Or use the web interface:
   - Go to Vercel dashboard
   - Click "Add New Project"
   - Import your GitHub repository
   - Set **Root Directory** to `frontend`
   - Add environment variable:
     - Key: `VITE_API_URL`
     - Value: `https://your-app.up.railway.app` (your Railway backend URL)
   - Click "Deploy"

5. **Done!** Your app is live at `https://your-app.vercel.app`

---

### Option 2: Render (Backend) + Netlify (Frontend)

#### Deploy Backend to Render (FREE)

1. **Sign up at Render**: Go to [render.com](https://render.com) and sign up

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the Taskaz repository

3. **Configure**:
   - **Name**: `taskaz-backend`
   - **Environment**: `Java`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/Taskaz-0.0.1-SNAPSHOT.jar`
   - **Plan**: Free (spins down after 15 min inactivity)

4. **Environment Variables** (optional):
   ```
   PORT=8080
   ```

5. **Deploy**: Click "Create Web Service"
   - Render will provide URL: `https://taskaz-backend.onrender.com`

#### Deploy Frontend to Netlify (100% FREE)

1. **Sign up at Netlify**: Go to [netlify.com](https://netlify.com) and sign up with GitHub

2. **Install Netlify CLI** (optional):
   ```bash
   npm i -g netlify-cli
   ```

3. **Update Frontend API Configuration**:
   Edit `frontend/src/api/axiosConfig.js`:
   ```javascript
   const api = axios.create({
       baseURL: process.env.VITE_API_URL || 'https://taskaz-backend.onrender.com',
       headers: {
           'Content-Type': 'application/json',
       },
   });
   ```

4. **Deploy to Netlify**:
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod
   ```
   
   Or use web interface:
   - Go to Netlify dashboard
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select repository
   - **Build settings**:
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `frontend/dist`
   - **Environment variables**:
     - Key: `VITE_API_URL`
     - Value: `https://taskaz-backend.onrender.com`
   - Click "Deploy site"

5. **Done!** Your app is live at `https://your-app.netlify.app`

---

### Option 3: Fly.io (Both Backend & Frontend) - FREE

#### Deploy Backend to Fly.io

1. **Install Fly CLI**:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Sign up and login**:
   ```bash
   fly auth signup
   fly auth login
   ```

3. **Create Backend App**:
   ```bash
   cd /Users/parthsharma/Desktop/Taskaz
   fly launch
   ```
   - Follow prompts (name your app, select region)
   - Don't deploy yet

4. **Create `fly.toml`** in root:
   ```toml
   app = "your-app-name-backend"
   primary_region = "iad"

   [build]

   [http_service]
     internal_port = 8080
     force_https = true
     auto_stop_machines = true
     auto_start_machines = true
     min_machines_running = 0
     processes = ["app"]

   [[vm]]
     cpu_kind = "shared"
     cpus = 1
     memory_mb = 256
   ```

5. **Create `Dockerfile`** in root:
   ```dockerfile
   FROM eclipse-temurin:17-jre-alpine
   WORKDIR /app
   COPY target/Taskaz-0.0.1-SNAPSHOT.jar app.jar
   EXPOSE 8080
   ENTRYPOINT ["java", "-jar", "app.jar"]
   ```

6. **Build and Deploy**:
   ```bash
   ./mvnw clean package -DskipTests
   fly deploy
   ```

#### Deploy Frontend to Fly.io

1. **Create Frontend App**:
   ```bash
   cd frontend
   fly launch
   ```

2. **Create `Dockerfile`** in frontend:
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   ENV VITE_API_URL=https://your-backend-app.fly.dev
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

3. **Deploy**:
   ```bash
   fly deploy
   ```

---

### Quick Comparison of Free Platforms

| Platform | Backend | Frontend | Free Tier | Ease of Use |
|----------|---------|----------|-----------|-------------|
| **Railway** | ✅ | ❌ | $5 credit/month | ⭐⭐⭐⭐⭐ |
| **Render** | ✅ | ✅ | Free (sleeps after 15min) | ⭐⭐⭐⭐ |
| **Vercel** | ❌ | ✅ | Unlimited | ⭐⭐⭐⭐⭐ |
| **Netlify** | ❌ | ✅ | Unlimited | ⭐⭐⭐⭐⭐ |
| **Fly.io** | ✅ | ✅ | 3 shared VMs free | ⭐⭐⭐ |

**Recommended Combo**: Railway (Backend) + Vercel (Frontend) - Easiest and most reliable!

---

### Important Notes for Free Cloud Deployment

1. **CORS Configuration**: Update `src/main/java/com/example/taskaz/config/WebConfig.java`:
   ```java
   @CrossOrigin(origins = {"https://your-frontend.vercel.app", "https://your-frontend.netlify.app"})
   ```

2. **Environment Variables**: Always use environment variables for API URLs:
   - Frontend: `VITE_API_URL`
   - Backend: Set in platform dashboard

3. **Free Tier Limitations**:
   - Render: Apps sleep after 15 min (first request takes ~30s to wake)
   - Railway: Limited to $5 credit/month
   - Fly.io: 3 shared VMs, apps can sleep

4. **Database**: For production, consider:
   - **Free PostgreSQL**: [Supabase](https://supabase.com), [Neon](https://neon.tech), or [Railway](https://railway.app)
   - Update `application.properties` with database URL

---

## Local Development Setup

---

## Local Development Setup

### Backend Setup

1. Navigate to the project root directory:
```bash
cd /Users/parthsharma/Desktop/Taskaz
```

2. Build the Spring Boot application:
```bash
./mvnw clean package
```

3. Run the backend:
```bash
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update the API base URL in `src/api/axiosConfig.js` if needed:
```javascript
baseURL: 'http://localhost:8080'  // Change this for production
```

4. Run the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

---

## Backend Deployment

### Option 1: Standalone JAR Deployment

1. **Build the JAR file:**
```bash
./mvnw clean package -DskipTests
```

The JAR file will be created at: `target/Taskaz-0.0.1-SNAPSHOT.jar`

2. **Run the JAR:**
```bash
java -jar target/Taskaz-0.0.1-SNAPSHOT.jar
```

3. **Run with custom configuration:**
```bash
java -jar target/Taskaz-0.0.1-SNAPSHOT.jar --spring.profiles.active=production
```

### Option 2: Deploy to Cloud Platforms

#### Heroku

1. Install Heroku CLI and login
2. Create a `Procfile` in the root directory:
```
web: java -jar target/Taskaz-0.0.1-SNAPSHOT.jar
```

3. Deploy:
```bash
heroku create your-app-name
git push heroku main
```

#### AWS Elastic Beanstalk

1. Install EB CLI
2. Initialize:
```bash
eb init
eb create
eb deploy
```

#### Google Cloud Platform

1. Use Cloud Run:
```bash
gcloud run deploy taskaz-backend --source .
```

#### Azure App Service

1. Use Azure CLI:
```bash
az webapp up --name taskaz-backend --runtime "JAVA:17-java17"
```

### Environment Variables

Set these environment variables for production:

- `SPRING_PROFILES_ACTIVE=production`
- `SPRING_DATASOURCE_URL=jdbc:postgresql://your-db-host:5432/taskaz`
- `SPRING_DATASOURCE_USERNAME=your-username`
- `SPRING_DATASOURCE_PASSWORD=your-password`

---

## Frontend Deployment

### Option 1: Build and Serve Static Files

1. **Build for production:**
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `dist/` directory.

2. **Update API configuration:**
Before building, update `src/api/axiosConfig.js`:
```javascript
const api = axios.create({
    baseURL: process.env.VITE_API_URL || 'http://your-backend-url:8080',
    // ...
});
```

Or use environment variables:
```bash
VITE_API_URL=http://your-backend-url:8080 npm run build
```

3. **Serve the build:**

#### Using a Simple HTTP Server:
```bash
cd frontend/dist
python3 -m http.server 8000
# or
npx serve -s dist -l 8000
```

#### Using Nginx:

Create an Nginx configuration file:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Option 2: Deploy to Cloud Platforms

#### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Set environment variable `VITE_API_URL` in Vercel dashboard

#### Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
cd frontend
netlify deploy --prod
```

3. Set environment variable `VITE_API_URL` in Netlify dashboard

#### AWS S3 + CloudFront

1. Build the frontend:
```bash
npm run build
```

2. Upload to S3:
```bash
aws s3 sync dist/ s3://your-bucket-name
```

3. Configure CloudFront for CDN

#### GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/taskaz"
}
```

3. Deploy:
```bash
npm run deploy
```

---

## Docker Deployment

### Backend Dockerfile

Create `Dockerfile` in the root directory:
```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/Taskaz-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Frontend Dockerfile

Create `Dockerfile` in the `frontend/` directory:
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

Update `docker-compose.yml`:
```yaml
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=production
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/taskaz
      - SPRING_DATASOURCE_USERNAME=taskaz
      - SPRING_DATASOURCE_PASSWORD=password
    depends_on:
      - db

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://localhost:8080

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=taskaz
      - POSTGRES_USER=taskaz
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Deploy with Docker Compose

```bash
docker-compose up -d
```

---

## Production Deployment

### Complete Production Setup

1. **Backend:**
   - Use a production-grade database (PostgreSQL, MySQL)
   - Enable HTTPS with SSL certificates
   - Configure CORS properly for your frontend domain
   - Set up monitoring and logging
   - Use environment variables for sensitive data

2. **Frontend:**
   - Build with production optimizations
   - Serve through CDN for better performance
   - Enable gzip compression
   - Set up proper caching headers
   - Configure CORS on backend to allow frontend domain

3. **Security:**
   - Use HTTPS everywhere
   - Implement rate limiting
   - Add authentication/authorization if needed
   - Sanitize user inputs
   - Keep dependencies updated

### CORS Configuration

Update `WebConfig.java` to allow your production frontend domain:
```java
@CrossOrigin(origins = "https://your-frontend-domain.com")
```

### Environment-Specific Builds

Create `.env.production` in frontend:
```
VITE_API_URL=https://api.your-domain.com
```

Build with:
```bash
npm run build -- --mode production
```

---

## Quick Start Commands

### Development
```bash
# Terminal 1 - Backend
./mvnw spring-boot:run

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Production Build
```bash
# Backend
./mvnw clean package -DskipTests

# Frontend
cd frontend && npm run build
```

### Docker
```bash
docker-compose up -d
```

---

## Troubleshooting

### Backend Issues
- Check if port 8080 is available
- Verify database connection
- Check application logs

### Frontend Issues
- Clear browser cache
- Check browser console for errors
- Verify API base URL is correct
- Check CORS configuration

### Common Errors
- **CORS errors**: Update `WebConfig.java` with correct frontend URL
- **API connection failed**: Verify backend is running and URL is correct
- **Build errors**: Clear `node_modules` and reinstall dependencies

---

## Support

For issues or questions, please check:
- Application logs
- Browser console
- Network tab in browser dev tools
- Backend server logs
