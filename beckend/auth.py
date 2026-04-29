from flask import Blueprint, request, jsonify
import sqlite3
import bcrypt

auth_routes = Blueprint("auth", __name__)

DB = "../database/db.sqlite"

@auth_routes.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        
        if not data.get("name") or not data.get("email") or not data.get("password"):
            return jsonify({"error": "Missing required fields"}), 400

        hashed = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())

        conn = sqlite3.connect(DB)
        cursor = conn.cursor()

        try:
            cursor.execute(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                (data["name"], data["email"], hashed)
            )
            conn.commit()
            return jsonify({"message": "User created successfully"})
        except sqlite3.IntegrityError:
            return jsonify({"error": "Email already exists"}), 400
        finally:
            conn.close()
    except Exception as e:
        return jsonify({"error": f"Registration error: {str(e)}"}), 500


@auth_routes.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        
        if not data.get("email") or not data.get("password"):
            return jsonify({"error": "Missing email or password"}), 400

        conn = sqlite3.connect(DB)
        cursor = conn.cursor()

        user = cursor.execute(
            "SELECT id, password FROM users WHERE email = ?", (data["email"],)
        ).fetchone()
        
        conn.close()

        if user:
            stored = user[1]
            try:
                # sqlite may return memoryview for BLOB, convert to bytes
                if isinstance(stored, memoryview):
                    stored = bytes(stored)
            except Exception:
                pass

            if bcrypt.checkpw(data["password"].encode(), stored):
                return jsonify({"message": "Login successful", "user_id": user[0]})

        return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": f"Login error: {str(e)}"}), 500