from flask import Blueprint, request, jsonify
import requests

news_routes = Blueprint("news", __name__)

API_KEY = "ff6824e0b00149afa71aa854ec89a789"

@news_routes.route("/news", methods=["GET"])
def get_news():
    category = request.args.get("category", "technology")
    
    if not API_KEY or API_KEY == "SUA_API_KEY":
        return jsonify({"error": "NewsAPI key not configured"}), 500
    
    try:
        url = f"https://newsapi.org/v2/top-headlines?category={category}&apiKey={API_KEY}&pageSize=20"
        response = requests.get(url, timeout=10)
        data = response.json()
        
        if data.get("status") != "ok":
            return jsonify({"error": data.get("message", "API error")}), 400

        articles = []
        for item in data.get("articles", []):
            articles.append({
                "title": item.get("title", "Untitled"),
                "description": item.get("description", ""),
                "url": item.get("url", ""),
                "image": item.get("urlToImage", "")
            })

        return jsonify(articles)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to fetch news: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500