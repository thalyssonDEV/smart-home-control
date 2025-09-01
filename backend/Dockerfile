FROM python:3.11-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
# CORREÇÃO: Troque "projeto_django.wsgi:application" por "smart_home.wsgi:application"
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "smart_home.wsgi:application"]
