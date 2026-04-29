from flask import Flask
try:
    from flask_cors import CORS
    cors_available = True
except ImportError:
    cors_available = False
from auth import auth_routes
from news_api import news_routes
from preferences import pref_routes
from favorites import fav_routes
import sqlite3
import os

app = Flask(__name__)

# Enable CORS if available
if cors_available:
    CORS(app)
else:
    # Manual CORS headers as fallback
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response

# Registrar rotas
app.register_blueprint(auth_routes)
app.register_blueprint(news_routes)
app.register_blueprint(pref_routes)
app.register_blueprint(fav_routes)

# Inicializar DB
def init_db():
    db_path = "../database/db.sqlite"
    schema_path = "../database/schema.sql"
    
    try:
        if not os.path.exists(db_path):
            print(f"Creating database at {db_path}...")
            conn = sqlite3.connect(db_path)
            with open(schema_path, "r") as f:
                conn.executescript(f.read())
            conn.commit()
            conn.close()
            print("Database initialized successfully!")
        else:
            print(f"Database already exists at {db_path}")
    except Exception as e:
        print(f"Error initializing database: {e}")
        raise

if __name__ == "__main__":
    init_db()
    app.run(debug=True, host="0.0.0.0", port=5000)