from flask import Blueprint, request, jsonify
import sqlite3

pref_routes = Blueprint("preferences", __name__)
DB = "../database/db.sqlite"

@pref_routes.route("/preferences", methods=["POST"])
def save_preferences():
    try:
        data = request.json
        
        if not data.get("user_id") or not data.get("categories"):
            return jsonify({"error": "Missing required fields"}), 400

        conn = sqlite3.connect(DB)
        cursor = conn.cursor()

        cursor.execute("DELETE FROM preferences WHERE user_id = ?", (data["user_id"],))

        for cat in data["categories"]:
            cursor.execute(
                "INSERT INTO preferences (user_id, category) VALUES (?, ?)",
                (data["user_id"], cat)
            )

        conn.commit()
        conn.close()

        return jsonify({"message": "Preferences saved successfully"})
    except Exception as e:
        return jsonify({"error": f"Error saving preferences: {str(e)}"}), 500


@pref_routes.route("/preferences/<int:user_id>", methods=["GET"])
def get_preferences(user_id):
    try:
        conn = sqlite3.connect(DB)
        cursor = conn.cursor()

        rows = cursor.execute(
            "SELECT category FROM preferences WHERE user_id = ?", (user_id,)
        ).fetchall()
        
        conn.close()

        return jsonify([r[0] for r in rows])
    except Exception as e:
        return jsonify({"error": f"Error fetching preferences: {str(e)}"}), 500