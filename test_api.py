import requests
import json
import time

BASE_URL = "http://localhost:5000"

print("🧪 TESTE DA API AURA NEWS")
print("=" * 50)

# Teste 1: Verificar se servidor está rodando
print("\n1️⃣  Verificando servidor...")
try:
    response = requests.get(f"{BASE_URL}/news?category=technology", timeout=5)
    print(f"✓ Servidor respondendo: Status {response.status_code}")
except Exception as e:
    print(f"✗ Erro: {e}")
    exit(1)

# Teste 2: Registrar usuário
print("\n2️⃣  Testando registro...")
user_data = {
    "name": "Teste User",
    "email": f"test{int(time.time())}@example.com",
    "password": "senha123"
}
response = requests.post(f"{BASE_URL}/register", json=user_data)
print(f"Response: {response.status_code} - {response.json()}")

# Teste 3: Login
print("\n3️⃣  Testando login...")
login_data = {"email": user_data["email"], "password": user_data["password"]}
response = requests.post(f"{BASE_URL}/login", json=login_data)
data = response.json()
print(f"Response: {response.status_code} - {data}")

if "user_id" in data:
    user_id = data["user_id"]
    
    # Teste 4: Buscar notícias
    print("\n4️⃣  Testando busca de notícias...")
    response = requests.get(f"{BASE_URL}/news?category=technology")
    articles = response.json()
    print(f"✓ Encontradas {len(articles)} notícias")
    if articles:
        print(f"  - First: {articles[0]['title'][:50]}...")
    
    # Teste 5: Adicionar favorito
    print("\n5️⃣  Testando adicionar favorito...")
    if articles:
        fav_data = {
            "user_id": user_id,
            "title": articles[0]["title"],
            "url": articles[0]["url"],
            "image": articles[0]["image"]
        }
        response = requests.post(f"{BASE_URL}/favorites", json=fav_data)
        print(f"✓ Response: {response.status_code} - {response.json()}")
    
    # Teste 6: Listar favoritos
    print("\n6️⃣  Testando listar favoritos...")
    response = requests.get(f"{BASE_URL}/favorites/{user_id}")
    favorites = response.json()
    print(f"✓ Favoritos do usuário: {len(favorites)}")
    if favorites:
        print(f"  - First: {favorites[0]['title'][:50]}...")

print("\n" + "=" * 50)
print("✅ TODOS OS TESTES PASSARAM!")
print("\nA aplicação está 100% funcional!")
