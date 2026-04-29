from flask import Blueprint, request, jsonify
import requests

news_routes = Blueprint("news", __name__)

API_KEY = "ff6824e0b00149afa71aa854ec89a789"

DEFAULT_ARTICLES = [
    {
        "title": "InfoGlobo traz as principais manchetes do dia",
        "description": "Fique informado com um resumo rápido dos eventos mais relevantes no Brasil e no mundo.",
        "url": "https://www.infoglobo.com",
        "image": "https://via.placeholder.com/640x360?text=InfoGlobo"
    },
    {
        "title": "Mercado financeiro em atenção: tendências e movimentos",
        "description": "Analistas indicam os principais pontos de atenção para investidores nesta semana.",
        "url": "https://www.infoglobo.com",
        "image": "https://via.placeholder.com/640x360?text=Economia"
    },
    {
        "title": "Novas descobertas em saúde e ciência",
        "description": "Pesquisa aponta avanços no combate a doenças e novas tecnologias para laboratórios.",
        "url": "https://www.infoglobo.com",
        "image": "https://via.placeholder.com/640x360?text=Ci%C3%AAncia"
    }
]

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
            return jsonify({"error": data.get("message", "API error"), "fallback": DEFAULT_ARTICLES}), 400

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
        return jsonify({"error": f"Falha ao buscar notícias: {str(e)}", "fallback": DEFAULT_ARTICLES}), 500
    except Exception as e:
        return jsonify({"error": f"Erro no servidor: {str(e)}", "fallback": DEFAULT_ARTICLES}), 500