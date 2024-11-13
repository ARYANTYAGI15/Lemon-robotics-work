FROM --platform=$BUILDPLATFORM python:3.11.6-slim AS builder
ENV PYTHONUNBUFFERED=1

EXPOSE 8000  

WORKDIR /app

# Install dependencies for MySQL and other required libraries
RUN apt-get update \
    && apt-get install python3-dev default-libmysqlclient-dev gcc pkg-config -y

# Copy the requirements file and install dependencies
COPY requirements.txt /app
RUN pip3 install -r requirements.txt --no-cache-dir

# Install additional packages (optional but useful)
RUN pip3 install django-debug-toolbar
RUN pip3 install django-cors-headers

# Copy the entire project to the container
COPY . /app 

# Run the Django development server on port 8000
CMD ["sh", "-c", "sleep 10 && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]

