from flask import Blueprint, request, jsonify
import sqlite3

fav_routes = Blueprint("favorites", __name__)
DB = "../database/db.sqlite"

@fav_routes.route("/favorites", methods=["POST"])
def add_favorite():
    try:
        data = request.json
        
        if not data.get("user_id") or not data.get("title") or not data.get("url"):
            return jsonify({"error": "Missing required fields"}), 400

        conn = sqlite3.connect(DB)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO favorites (user_id, title, description, url, image)
            VALUES (?, ?, ?, ?, ?)
        """, (data["user_id"], data["title"], data.get("description", ""), data["url"], data.get("image", "")))

        conn.commit()
        conn.close()

        return jsonify({"message": "Added to favorites"})
    except Exception as e:
        return jsonify({"error": f"Error adding favorite: {str(e)}"}), 500


@fav_routes.route("/favorites/<int:user_id>", methods=["GET"])
def get_favorites(user_id):
    try:
        conn = sqlite3.connect(DB)
        cursor = conn.cursor()

        rows = cursor.execute(
            "SELECT id, title, url, image FROM favorites WHERE user_id = ? ORDER BY created_at DESC", (user_id,)
        ).fetchall()
        
        conn.close()

        result = []
        for r in rows:
            result.append({
                "id": r[0],
                "title": r[1],
                "url": r[2],
                "image": r[3]
            })

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": f"Error fetching favorites: {str(e)}"}), 500


@fav_routes.route("/favorites/<int:id>", methods=["DELETE"])
def remove_favorite(id):
    try:
        conn = sqlite3.connect(DB)
        cursor = conn.cursor()

        cursor.execute("DELETE FROM favorites WHERE id = ?", (id,))
        conn.commit()
        conn.close()

        return jsonify({"message": "Removed from favorites"})
    except Exception as e:
        return jsonify({"error": f"Error removing favorite: {str(e)}"}), 500