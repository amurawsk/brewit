FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=3000

# EXPOSE 8000
WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-dev \
    libpq-dev \
    && apt-get clean

COPY ./requirements.txt /app/
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . /app
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
