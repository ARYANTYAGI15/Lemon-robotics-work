# Lemon Robotics Web Application

This is a full-stack web application built with a **React frontend**, **Django REST Framework backend**, and **MySQL database**. The project uses **Docker** and **Docker Compose** for containerization and easy deployment.

## Project Structure

The project consists of three main parts:

1. **Frontend (React)**  
   Located in the `lemon-frontend-main` directory.  
   Built using **React** and **Vite** for a fast and modern front-end experience.

2. **Backend (Django REST Framework)**  
   Located in the `backend/empmanagebackend-main/empmanage` directory.  
   Built using **Django REST Framework** to handle API requests.

3. **Database (MySQL)**  
   MySQL is used as the database for storing application data.

## Technologies Used

- **Frontend**: React, Vite, CSS, JavaScript
- **Backend**: Django, Django REST Framework (DRF)
- **Database**: MySQL
- **Containerization**: Docker, Docker Compose

## Requirements

Make sure you have the following tools installed on your local machine:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Git**: [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Getting Started

To get started with this project, follow these steps:

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/lemon-robotics-web-app.git
cd lemon-robotics-web-app

2. Install Frontend Dependencies and Build
Before you use Docker, you need to install the dependencies and build the frontend application. This will generate the static files that will be served by NGINX in the Docker container.

Navigate to the lemon-frontend-main directory:
    cd lemon-frontend-main
    npm install
    npm run build




3. Set Up Backend (Django REST Framework)
Ensure the backend is set up before running the Docker containers.

Install Backend Dependencies
The backend is a Django application. To install the dependencies, run the following commands inside the backend/empmanagebackend-main/empmanage directory:
cd backend/empmanagebackend-main/empmanage
python3 -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # Follow the prompts to create a superuser





4. Set Up Docker Compose
Docker Compose is used to spin up the necessary containers for the frontend, backend, and database.

Make sure you're in the root of the project directory (where the docker-compose.yml file is located).
docker-compose up --build



6. Access the Application
Once the containers are up and running, you can access the application:

Frontend (React): http://localhost:3000
Backend (Django API): http://localhost:5000 or http://localhost:5000/admin (for Django admin)
Database (MySQL): localhost:3306 (via MySQL Workbench, DBeaver, or other database tools)

/lemon-robotics-web-app
│
├── /Work
│   ├── /backend
│   │   ├── /empmanagebackend-main
│   │   │   ├── /empmanage
│   │   │   │   ├── Dockerfile              # Backend Dockerfile
│   │   │   │   ├── manage.py               # Django manage.py file
│   │   │   │   ├── requirements.txt        # Backend dependencies
│   │   │   │   └── ...                     # Other backend files
│   │   └── ...                             # Other backend files
│   │
│   ├── /lemon-frontend-main
│   │   ├── Dockerfile                      # Frontend Dockerfile
│   │   ├── dist/                           # Built production-ready files
│   │   ├── src/                            # Frontend source code
│   │   ├── public/                         # Public assets (HTML, images)
│   │   └── ...                             # Other frontend files
│
├── docker-compose.yml                      # Docker Compose configuration
└── README.md                               # Project README file
