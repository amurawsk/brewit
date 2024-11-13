### How to run this project (WIP)
First download the project and navigate to *brewit* directory

Create a virtual environment and activate it
```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install all dependencies
```bash
pip install -r requirements.txt
```

Migrate the (temporary) database
```bash
python manage.py migrate
```

Run the development server
```bash
python manage.py runserver
```

The app is now alive at <localhost:8000>