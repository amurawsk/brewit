# BrewIT
## Setup
Prerequisities: Docker and Docker Compose must be installed.

1. Create `.env` file based on `example.env` file.
2. Build and run container:
    ```bash
    docker compose up --build
    ```
3. The app is now alive at [localhost:3000](localhost:3000) and the server is alive at [localhost:8000](localhost:8000).

## Database backup
Creating a database backup:
```bash
docker compose exec db pg_dump -U <db_username> <db_name> > backup.sql
```

Restoring the database:
```bash
docker compose exec db psql -U <użytkownik> <nazwa_bazy> < backup.sql
```

## Other commands
Testing backend (with code coverage):
```bash
docker compose exec backend pytest --cov=core
```

Testing frontend:
```bash
docker compose exec frontend npm test
```

Adding a superuser account:
```bash
docker compose exec backend python manage.py createsuperuser
```
After adding the superuser, you can log in by username and password at `/admin` page on server.
