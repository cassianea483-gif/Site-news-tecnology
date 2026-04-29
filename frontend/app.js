// ============================================
// InfoGlobo - Frontend Application
// ============================================

const API_BASE = "http://localhost:5000";

// ============================================
// STATE MANAGEMENT
// ============================================

let currentUser = null;
let currentCategory = "technology";

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  checkLoggedIn();
  setupEventListeners();
  
  // Load news on index page
  if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
    loadNews();
  }
  
  // Load favorites on favorites page
  if (window.location.pathname.includes("favorites.html")) {
    if (currentUser) {
      loadFavorites();
    }
  }
});

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

function checkLoggedIn() {
  const userId = localStorage.getItem("user_id");
  const userName = localStorage.getItem("user_name");
  
  if (userId && userName) {
    currentUser = { id: userId, name: userName };
    
    // Show user info
    const userEl = document.getElementById("user-info");
    if (userEl) {
      userEl.textContent = `👤 ${userName}`;
      userEl.style.display = "inline";
    }
    
    // Hide login/register, show logout
    const loginLink = document.getElementById("login-link");
    const regLink = document.getElementById("reg-link");
    const logoutBtn = document.getElementById("logout-btn");
    
    if (loginLink) loginLink.style.display = "none";
    if (regLink) regLink.style.display = "none";
    if (logoutBtn) {
      logoutBtn.style.display = "inline";
      logoutBtn.onclick = logout;
    }
  } else {
    // Show login/register, hide logout
    const userEl = document.getElementById("user-info");
    const logoutBtn = document.getElementById("logout-btn");
    const loginLink = document.getElementById("login-link");
    const regLink = document.getElementById("reg-link");
    
    if (userEl) userEl.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (loginLink) loginLink.style.display = "inline";
    if (regLink) regLink.style.display = "inline";
    
    // Redirect se tentando acessar favorites
    if (window.location.pathname.includes("favorites.html")) {
      window.location.href = "login.html";
    }
  }
}

// Translate common backend/client messages to Portuguese for user-facing alerts
function translateError(msg) {
  if (!msg) return 'Ocorreu um erro.';
  const m = msg.toString();
  if (/missing required fields|Missing required fields/i.test(m)) return 'Faltam campos obrigatórios.';
  if (/email already exists|Email already exists/i.test(m)) return 'Email já existe.';
  if (/invalid email or password|Invalid email or password/i.test(m)) return 'Email ou senha inválidos.';
  if (/missing email or password|Missing email or password/i.test(m)) return 'Email ou senha em falta.';
  if (/registration error/i.test(m)) return 'Erro ao registar a conta.';
  // fallback: return original message but in Portuguese context prefix
  return m;
}

function register(name, email, password, confirmPassword) {
  if (password !== confirmPassword) {
    showError("As senhas não coincidem!");
    return;
  }
  
  fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      showError(translateError(data.error));
    } else {
      const box = createAlert("Conta criada com sucesso! Você pode entrar agora.", "success", 0);
      const action = document.createElement('button');
      action.className = 'btn';
      action.style.marginLeft = '12px';
      action.textContent = 'Ir para login';
      action.onclick = () => window.location.href = 'login.html';
      box.appendChild(action);
    }
  })
  .catch(err => showError("Falha ao criar conta: " + err.message));
}

function login(email, password) {
  fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      showError(translateError(data.error));
    } else {
      // Save user info
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("user_name", email.split("@")[0]); // Store username
      localStorage.setItem("user_email", email);
      
      showSuccess("Login bem sucedido! Redirecionando...");
      setTimeout(() => window.location.href = "index.html", 1500);
    }
  })
  .catch(err => showError("Falha no login: " + err.message));
}

function logout() {
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_email");
  currentUser = null;
  window.location.href = "login.html";
}

// ============================================
// NEWS FUNCTIONS
// ============================================

function loadNews(category = "technology") {
  currentCategory = category;
  
  const newsContainer = document.getElementById("news-container");
  if (!newsContainer) return;
  
  newsContainer.innerHTML = '<div class="loading"><span class="skeleton"></span></div>';
  
  fetch(`${API_BASE}/news?category=${category}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.error) {
        showError(translateError(data.error));
        newsContainer.innerHTML = '<div class="error-message">Falha ao carregar notícias.</div>';
        return;
      }

      if (!Array.isArray(data)) {
        showError('Resposta da API inválida.');
        newsContainer.innerHTML = '<div class="error-message">Falha ao carregar notícias.</div>';
        return;
      }

      const articles = data;
      newsContainer.innerHTML = "";
      
      if (articles.length === 0) {
        newsContainer.innerHTML = '<p class="no-content">Nenhuma notícia encontrada para esta categoria.</p>';
        return;
      }
      
      articles.forEach(article => {
        const card = createNewsCard(article);
        newsContainer.appendChild(card);
      });
    })
    .catch(err => {
      showError("Falha ao carregar notícias: " + err.message);
      newsContainer.innerHTML = '<div class="error-message">Falha ao carregar notícias.</div>';
    });
}

function createNewsCard(article) {
  const card = document.createElement("article");
  card.className = "glass-panel rounded-2xl overflow-hidden flex flex-col neon-border-hover transition-all duration-300 group";
  
  const imageHtml = article.image 
    ? `<img src="${article.image}" alt="News" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 200%22%3E%3Crect fill=%2223%22 width=%22400%22 height=%22200%22/%3E%3C/svg%3E'">`
    : '<div style="width: 100%; height: 192px; background: linear-gradient(135deg, rgba(0,242,255,0.1), rgba(112,0,255,0.1)); display: flex; align-items: center; justify-content: center;"><span class="material-symbols-outlined text-4xl text-slate-600">newspaper</span></div>';
  
  const description = article.description ? article.description.substring(0, 120) + "..." : "Notícia sem descrição disponível";
  
  card.innerHTML = `
    <div class="relative h-48 overflow-hidden">
        ${imageHtml}
        <div class="absolute top-4 right-4">
            <button class="bg-slate-950/60 backdrop-blur-md p-2 rounded-full text-slate-400 hover:text-cyan-400 transition-colors" onclick="addFavoriteFromCard('${article.title.replace(/'/g, "\\'")}', '${article.url.replace(/'/g, "\\'")}', '${(article.image || "").replace(/'/g, "\\'")}')" style="border: none; cursor: pointer;">
                <span class="material-symbols-outlined text-sm">favorite</span>
            </button>
        </div>
    </div>
    <div class="p-md flex flex-col flex-1">
        <div class="flex justify-between items-center mb-sm">
            <span class="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Notícia</span>
            <span class="text-[10px] text-slate-500 font-label-sm">Agora</span>
        </div>
        <h3 class="font-headline-md text-primary mb-xs group-hover:text-cyan-300 transition-colors line-clamp-2">${article.title}</h3>
        <p class="text-slate-400 text-sm font-body-md line-clamp-2 mb-md">${description}</p>
        <div class="mt-auto pt-md border-t border-white/5 flex gap-sm">
            <a href="${article.url}" target="_blank" class="flex-1 bg-white/5 hover:bg-white/10 text-on-surface text-xs font-bold py-2 rounded transition-all text-center no-underline">Ler mais</a>
            <button class="flex items-center justify-center gap-xs bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold px-4 py-2 rounded transition-all" style="border: none; cursor: pointer;">
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span> IA
            </button>
        </div>
    </div>
  `;
  return card;
}

// ============================================
// FAVORITES FUNCTIONS
// ============================================

function loadFavorites() {
  if (!currentUser) return;
  
  const favContainer = document.getElementById("favorites-container");
  if (!favContainer) return;
  
  favContainer.innerHTML = '<div class="loading">Loading favorites...</div>';
  
  fetch(`${API_BASE}/favorites/${currentUser.id}`)
    .then(res => res.json())
    .then(favorites => {
      favContainer.innerHTML = "";
      
      if (favorites.length === 0) {
        favContainer.innerHTML = '<p class="no-favorites">No favorites yet. Add some from the news feed!</p>';
        return;
      }
      
      favorites.forEach(fav => {
        const card = createFavoriteCard(fav);
        favContainer.appendChild(card);
      });
    })
    .catch(err => {
      showError("Failed to load favorites: " + err.message);
    });
}

function createFavoriteCard(favorite) {
  const card = document.createElement("article");
  card.className = "glass-panel rounded-2xl overflow-hidden flex flex-col neon-border-hover transition-all duration-300 group";
  
  const imageHtml = favorite.image 
    ? `<img src="${favorite.image}" alt="Favorite" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 200%22%3E%3Crect fill=%2223%22 width=%22400%22 height=%22200%22/%3E%3C/svg%3E'">`
    : '<div style="width: 100%; height: 192px; background: linear-gradient(135deg, rgba(0,242,255,0.1), rgba(112,0,255,0.1)); display: flex; align-items: center; justify-content: center;"><span class="material-symbols-outlined text-4xl text-slate-600">bookmark</span></div>';
  
  card.innerHTML = `
    <div class="relative h-48 overflow-hidden">
        ${imageHtml}
        <div class="absolute top-4 right-4">
            <button class="bg-slate-950/60 backdrop-blur-md p-2 rounded-full text-red-400 hover:text-red-300 transition-colors" onclick="removeFavorite(${favorite.id})" style="border: none; cursor: pointer;">
                <span class="material-symbols-outlined text-sm">close</span>
            </button>
        </div>
    </div>
    <div class="p-md flex flex-col flex-1">
        <div class="flex justify-between items-center mb-sm">
            <span class="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">⭐ Favorito</span>
            <span class="text-[10px] text-slate-500 font-label-sm">Salvo</span>
        </div>
        <h3 class="font-headline-md text-primary mb-xs group-hover:text-cyan-300 transition-colors line-clamp-2">${favorite.title}</h3>
        <p class="text-slate-400 text-sm font-body-md line-clamp-2 mb-md">Seu artigo favorito</p>
        <div class="mt-auto pt-md border-t border-white/5 flex gap-sm">
            <a href="${favorite.url}" target="_blank" class="flex-1 bg-white/5 hover:bg-white/10 text-on-surface text-xs font-bold py-2 rounded transition-all text-center no-underline">Ler mais</a>
            <button class="flex items-center justify-center gap-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold px-4 py-2 rounded transition-all" onclick="removeFavorite(${favorite.id})" style="border: none; cursor: pointer;">
                <span class="material-symbols-outlined text-[16px]">delete</span>
            </button>
        </div>
    </div>
  `;
  
  return card;
}

function addFavorite(title, url, image) {
  if (!currentUser) {
    showError("Please log in first!");
    window.location.href = "login.html";
    return;
  }
  
  fetch(`${API_BASE}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: currentUser.id,
      title,
      url,
      image
    })
  })
    .then(res => res.json())
    .then(data => {
      showSuccess("Added to favorites! ⭐");
    })
    .catch(err => showError("Failed to add favorite: " + err.message));
}

function addFavoriteFromCard(title, url, image) {
  addFavorite(title, url, image);
}

function removeFavorite(id) {
  if (!confirm("Remove this favorite?")) return;
  
  fetch(`${API_BASE}/favorites/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      showSuccess("Removed from favorites");
      setTimeout(() => loadFavorites(), 500);
    })
    .catch(err => showError("Failed to remove favorite: " + err.message));
}

// ============================================
// PREFERENCES FUNCTIONS
// ============================================

function savePreferences(categories) {
  if (!currentUser) return;
  
  fetch(`${API_BASE}/preferences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: currentUser.id,
      categories
    })
  })
    .then(res => res.json())
    .then(data => {
      showSuccess("Preferences saved!");
    })
    .catch(err => showError("Failed to save preferences: " + err.message));
}

// ============================================
// UI UTILITIES
// ============================================

function createAlert(message, type = "success", autoClose = 4000) {
  const box = document.createElement("div");
  box.className = `alert ${type}`;
  box.setAttribute('role', 'alert');
  box.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');

  const icon = document.createElement("div");
  icon.className = "icon";
  icon.textContent = type === "error" ? "❌" : "✅";

  const text = document.createElement("div");
  text.className = "text";
  text.textContent = message;

  const close = document.createElement("button");
  close.className = "close";
  close.innerHTML = "✕";
  close.onclick = () => box.remove();
  close.setAttribute('aria-label', 'Fechar alerta');

  box.appendChild(icon);
  box.appendChild(text);
  box.appendChild(close);
  document.body.appendChild(box);

  if (autoClose) setTimeout(() => { if (box.parentNode) box.remove(); }, autoClose);
  return box;
}

function showError(message, autoClose = 5000) { createAlert(message, "error", autoClose); }
function showSuccess(message, autoClose = 3000) { createAlert(message, "success", autoClose); }

function setupEventListeners() {
  // Register form
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reg-name").value;
      const email = document.getElementById("reg-email").value;
      const password = document.getElementById("reg-password").value;
      const confirmPassword = document.getElementById("reg-confirm").value;
      register(name, email, password, confirmPassword);
    });
  }
  
  // Login form
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      login(email, password);
    });
  }
  
  // Category buttons (mobile + old style)
  const categoryBtns = document.querySelectorAll(".category-btn");
  categoryBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      categoryBtns.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      loadNews(e.target.dataset.category);
    });
  });
  
  // Logout button
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  // Password visibility toggles (delegated)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('.pw-toggle');
    if (!btn) return;
    const wrapper = btn.closest('.input-with-toggle');
    if (!wrapper) return;
    const input = wrapper.querySelector('input');
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      btn.innerHTML = '<span class="material-symbols-outlined">visibility_off</span>';
    } else {
      input.type = 'password';
      btn.innerHTML = '<span class="material-symbols-outlined">visibility</span>';
    }
  });
}

// ============================================
// EXPORT FOR INLINE CALLS
// ============================================

window.addFavorite = addFavorite;
window.addFavoriteFromCard = addFavoriteFromCard;
window.removeFavorite = removeFavorite;
window.logout = logout;
window.loadNews = loadNews;
