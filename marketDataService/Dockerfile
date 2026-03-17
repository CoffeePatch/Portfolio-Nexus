FROM --platform=linux/amd64 python:3.11.4
WORKDIR /app

# Copy source and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ src/

# Set the environment variable for the Flask app
ENV FLASK_APP=src/app/__init__.py

# Expose the port
EXPOSE 8010

# Start the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=8010"]