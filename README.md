# BrewIT
## React
Prerequisities: `npm` must be installed.
### Running React project
1. Move to `app` directory
```bash
cd app
```

2. Install packages
```bash
npm install
```

3. Run the app
```
npm start
```

4. The app is now alive at [localhost:3000](localhost:3000)

## Django
Prerequisities: `python3` must be installed.
### Running Django project (WIP)
1. Create a virtual environment and activate it
```bash
python -m venv .venv
source .venv/bin/activate
```

2. Install all dependencies
```bash
pip install -r requirements.txt
```

3. Migrate the (temporary) database
```bash
python manage.py migrate
```

4. Run the development server
```bash
python manage.py runserver
```

5. The app is now alive at [localhost:8000](localhost:8000)

### Another commands
Adding another integration:
```bash
python manage.py makemigrations
```

Adding superuser account
```bash
python manage.py createsuperuser
```
After adding superuser, you can log in by username and password at `/admin` page on server