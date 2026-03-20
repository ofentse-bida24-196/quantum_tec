/* ============================================================
   QUANTUM TECH — script.js
   All JavaScript logic:
     - Product data
     - Cart system (localStorage)
     - Auth system (localStorage)
     - Order system (localStorage)
     - Toast notifications
     - Navigation builder
     - Footer builder
   ============================================================ */

/* ────────────────────────────────────────────────────────────
   1. PRODUCT DATA
   All laptops available in the shop
   ──────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    brand: "Dell",
    name: "Dell Latitude 5480",
    specs: ["Intel Core i5-7300U (2.6GHz)", "8GB DDR4 RAM", "256GB SSD", '14" FHD Display', "Windows 10 Pro"],
    condition: "Good",
    price: 3500,
    originalPrice: 7200,
    stock: 4,
    // ── To use your own photo: save it as  images/dell-latitude-5480.jpg
    image: "images/dell-latitude-5480.jpg",
    fallback: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=400&h=260&q=80",
    category: "dell"
  },
  {
    id: 2,
    brand: "HP",
    name: "HP EliteBook 840 G4",
    specs: ["Intel Core i7-7500U (3.5GHz)", "16GB DDR4 RAM", "512GB SSD", '14" FHD Display', "Windows 11 Pro"],
    condition: "Excellent",
    price: 4900,
    originalPrice: 9800,
    stock: 2,
    // ── To use your own photo: save it as  images/hp-elitebook-840.jpg
    image: "images/hp-elitebook-840.jpg",
    fallback: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=400&h=260&q=80",
    category: "hp"
  },
  {
    id: 3,
    brand: "Lenovo",
    name: "Lenovo ThinkPad T470",
    specs: ["Intel Core i5-6300U (3.0GHz)", "8GB DDR4 RAM", "500GB HDD", '14" HD Display', "Windows 10 Home"],
    condition: "Fair",
    price: 2800,
    originalPrice: 5500,
    stock: 6,
    // ── To use your own photo: save it as  images/lenovo-thinkpad-t470.jpg
    image: "images/lenovo-thinkpad-t470.jpg",
    fallback: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=400&h=260&q=80",
    category: "lenovo"
  },
  {
    id: 4,
    brand: "Acer",
    name: "Acer Aspire 5 A515",
    specs: ["AMD Ryzen 5 3500U (3.7GHz)", "8GB DDR4 RAM", "256GB SSD", '15.6" FHD Display', "Windows 10 Home"],
    condition: "Good",
    price: 3200,
    originalPrice: 6400,
    stock: 5,
    // ── To use your own photo: save it as  images/acer-aspire-5.jpg
    image: "images/acer-aspire-5.jpg",
    fallback: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&h=260&q=80",
    category: "acer"
  },
  {
    id: 5,
    brand: "HP",
    name: "HP ProBook 450 G6",
    specs: ["Intel Core i5-8265U (3.9GHz)", "8GB DDR4 RAM", "256GB SSD", '15.6" FHD Display', "Windows 11 Home"],
    condition: "Good",
    price: 3600,
    originalPrice: 7100,
    stock: 3,
    // ── To use your own photo: save it as  images/hp-probook-450.jpg
    image: "images/hp-probook-450.jpg",
    fallback: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&h=260&q=80",
    category: "hp"
  },
  {
    id: 6,
    brand: "Dell",
    name: "Dell Inspiron 15 3000",
    specs: ["Intel Core i3-8145U (3.9GHz)", "4GB DDR4 RAM", "1TB HDD", '15.6" HD Display', "Windows 10 Home"],
    condition: "Fair",
    price: 2200,
    originalPrice: 4500,
    stock: 7,
    // ── To use your own photo: save it as  images/dell-inspiron-15.jpg
    image: "images/dell-inspiron-15.jpg",
    fallback: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&h=260&q=80",
    category: "dell"
  },
  {
    id: 7,
    brand: "Lenovo",
    name: "Lenovo IdeaPad 330S",
    specs: ["AMD A9-9425 (3.7GHz)", "4GB DDR4 RAM", "1TB HDD", '15.6" HD Display', "Windows 10 Home"],
    condition: "Fair",
    price: 1950,
    originalPrice: 3800,
    stock: 8,
    // ── To use your own photo: save it as  images/lenovo-ideapad-330s.jpg
    image: "images/lenovo-ideapad-330s.jpg",
    fallback: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&h=260&q=80",
    category: "lenovo"
  },
  {
    id: 8,
    brand: "Toshiba",
    name: "Toshiba Tecra Z40",
    specs: ["Intel Core i5-5300U (2.9GHz)", "8GB DDR3 RAM", "128GB SSD", '14" HD Display', "Windows 10 Pro"],
    condition: "Good",
    price: 2950,
    originalPrice: 5800,
    stock: 3,
    // ── To use your own photo: save it as  images/toshiba-tecra-z40.jpg
    image: "images/toshiba-tecra-z40.jpg",
    fallback: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=400&h=260&q=80",
    category: "other"
  }
];

/* ────────────────────────────────────────────────────────────
   2. STORAGE KEY CONSTANTS
   Centralised so we don't mistype key names
   ──────────────────────────────────────────────────────────── */
const STORAGE = {
  CART:      "qt_cart",
  USERS:     "qt_users",
  SESSION:   "qt_session",   // logged-in user
  ORDERS:    "qt_orders",
  LAST_ORDER:"qt_last_order",
  FEEDBACK:  "qt_feedback",
  TRADE:     "qt_trade",
  MESSAGES:  "qt_messages"
};

/* ────────────────────────────────────────────────────────────
   3. HELPERS — read/write localStorage safely
   ──────────────────────────────────────────────────────────── */
function lsGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

// Format a number as BWP currency
function formatBWP(amount) {
  return "BWP " + Number(amount).toLocaleString("en-BW", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Generate a short unique ID for orders/trades
function generateId(prefix) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = prefix + "-";
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

/* ────────────────────────────────────────────────────────────
   4. TOAST NOTIFICATION SYSTEM
   Usage: showToast("Message here")
          showToast("Success!", "success")
          showToast("Error!", "error")
   ──────────────────────────────────────────────────────────── */
function getToastContainer() {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  return container;
}

function showToast(message, type = "default") {
  const icons = {
    default: "🛒",
    success: "✅",
    error:   "❌",
    warning: "⚠️",
    info:    "ℹ️"
  };

  const container = getToastContainer();

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.default}</span>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" aria-label="Close">✕</button>
  `;

  container.appendChild(toast);

  // Show with animation (small delay so CSS transition fires)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add("show"));
  });

  // Close button
  toast.querySelector(".toast-close").addEventListener("click", () => removeToast(toast));

  // Auto-remove after 3.8 seconds
  const timer = setTimeout(() => removeToast(toast), 3800);
  toast._timer = timer;
}

function removeToast(toast) {
  clearTimeout(toast._timer);
  toast.classList.remove("show");
  setTimeout(() => toast.remove(), 350);
}

/* ────────────────────────────────────────────────────────────
   5. AUTHENTICATION SYSTEM
   Users stored as array in localStorage
   Session = currently logged-in user object
   ──────────────────────────────────────────────────────────── */

// Get all registered users
function getUsers() {
  return lsGet(STORAGE.USERS, []);
}

// Get the currently logged-in user (or null)
function getSession() {
  return lsGet(STORAGE.SESSION, null);
}

// Log in with email + password
function loginUser(email, password) {
  const users = getUsers();
  const user  = users.find(
    u => u.email.toLowerCase() === email.trim().toLowerCase()
      && u.password === password
  );
  if (user) {
    // Save session (don't store password in session)
    const sessionData = { id: user.id, name: user.name, email: user.email };
    lsSet(STORAGE.SESSION, sessionData);
    return { ok: true, user: sessionData };
  }
  return { ok: false, message: "Incorrect email or password." };
}

// Register a new account
function registerUser(name, email, password) {
  const users = getUsers();

  // Check for duplicate email
  if (users.find(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
    return { ok: false, message: "An account with that email already exists." };
  }

  const newUser = {
    id: generateId("USR"),
    name:     name.trim(),
    email:    email.trim().toLowerCase(),
    password: password
  };

  users.push(newUser);
  lsSet(STORAGE.USERS, users);

  // Auto-login after signup
  const sessionData = { id: newUser.id, name: newUser.name, email: newUser.email };
  lsSet(STORAGE.SESSION, sessionData);

  return { ok: true, user: sessionData };
}

// Log out
function logoutUser() {
  localStorage.removeItem(STORAGE.SESSION);
  window.location.href = getRoot() + "login.html";
}

/* ────────────────────────────────────────────────────────────
   6. CART SYSTEM
   Cart = array of { id, qty } stored in localStorage
   ──────────────────────────────────────────────────────────── */

function getCart() {
  return lsGet(STORAGE.CART, []);
}

function saveCart(cart) {
  lsSet(STORAGE.CART, cart);
  refreshCartBadge();
}

function clearCart() {
  localStorage.removeItem(STORAGE.CART);
  refreshCartBadge();
}

// Add one item to cart
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cart    = getCart();
  const existing = cart.find(i => i.id === productId);

  if (existing) {
    if (existing.qty >= product.stock) {
      showToast("No more stock available for this item!", "warning");
      return;
    }
    existing.qty++;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  saveCart(cart);
  showToast(`${product.name} added to cart!`, "default");
}

// Remove item from cart entirely
function removeFromCart(productId) {
  const updated = getCart().filter(i => i.id !== productId);
  saveCart(updated);
}

// Change quantity (+1 or -1)
function changeQty(productId, delta) {
  const cart    = getCart();
  const item    = cart.find(i => i.id === productId);
  const product = PRODUCTS.find(p => p.id === productId);

  if (!item || !product) return;

  item.qty += delta;

  if (item.qty <= 0) {
    // Remove if qty drops to 0
    const updated = cart.filter(i => i.id !== productId);
    saveCart(updated);
  } else {
    if (item.qty > product.stock) {
      item.qty = product.stock;
      showToast("You've reached the maximum available stock.", "warning");
    }
    saveCart(cart);
  }
}

// Count total items in cart (sum of all qtys)
function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

// Total price of all cart items
function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

// Update the badge number on the cart icon
function refreshCartBadge() {
  const badges = document.querySelectorAll(".cart-badge");
  const count  = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle("hidden", count === 0);
  });
}

/* ────────────────────────────────────────────────────────────
   7. ORDER SYSTEM
   ──────────────────────────────────────────────────────────── */

function getOrders() {
  return lsGet(STORAGE.ORDERS, []);
}

// Place a new order from current cart
function placeOrder(deliveryInfo) {
  const cart   = getCart();
  const orders = getOrders();

  const newOrder = {
    id:        generateId("QT"),
    date:      new Date().toLocaleDateString("en-BW"),
    timestamp: Date.now(),
    status:    "Confirmed",
    items:     cart,
    delivery:  deliveryInfo,
    total:     getCartTotal()
  };

  orders.push(newOrder);
  lsSet(STORAGE.ORDERS, orders);
  lsSet(STORAGE.LAST_ORDER, newOrder.id);

  // Clear cart after ordering
  clearCart();

  return newOrder;
}

/* ────────────────────────────────────────────────────────────
   8. NAVIGATION BAR BUILDER
   Call buildNav("page-id") on each page.
   page-id matches the nav link's data-page attribute.
   ──────────────────────────────────────────────────────────── */
function buildNav(activePage) {
  const root    = getRoot();
  const session = getSession();

  // Define all nav links
  const links = [
    { id: "home",     href: root + "index.html",          label: "Home"      },
    { id: "products", href: root + "products.html",       label: "Shop"      },
    { id: "trade",    href: root + "trade.html",          label: "Trade-In"  },
    { id: "feedback", href: root + "feedback.html",       label: "Feedback"  },
    { id: "contact",  href: root + "contact.html",        label: "Contact"   }
  ];

  const mobileLinks = [...links];
  if (session) {
    mobileLinks.push({ id: "logout", href: "#", label: "Logout (" + session.name.split(" ")[0] + ")", isLogout: true });
  } else {
    mobileLinks.push({ id: "login",  href: root + "login.html",  label: "Login"  });
    mobileLinks.push({ id: "signup", href: root + "signup.html", label: "Sign Up" });
  }

  // Build desktop link HTML
  const desktopLinksHTML = links.map(l =>
    `<a href="${l.href}" class="${activePage === l.id ? "active" : ""}">${l.label}</a>`
  ).join("");

  // Build mobile link HTML
  const mobileLinksHTML = mobileLinks.map(l => {
    if (l.isLogout) {
      return `<a href="#" onclick="logoutUser(); return false;">${l.label}</a>`;
    }
    return `<a href="${l.href}" class="${activePage === l.id ? "active" : ""}">${l.label}</a>`;
  }).join("");

  // User area (right side of nav)
  let userAreaHTML = "";
  if (session) {
    userAreaHTML = `
      <button class="nav-user-btn" onclick="logoutUser()" title="Logout">
        👤 ${session.name.split(" ")[0]} &nbsp;·&nbsp; Logout
      </button>
    `;
  } else {
    userAreaHTML = `
      <a href="${root}login.html" class="btn btn-outline btn-sm">Login</a>
      <a href="${root}signup.html" class="btn btn-primary btn-sm">Sign Up</a>
    `;
  }

  // Insert navbar at the very start of <body>
  const navHTML = `
    <nav class="navbar" id="mainNav">
      <div class="container">
        <div class="nav-inner">

          <!-- Logo -->
          <a href="${root}index.html" class="nav-logo">
            <div class="logo-box">⚡</div>
            Quantum<span>Tech</span>
          </a>

          <!-- Desktop links -->
          <div class="nav-links">
            ${desktopLinksHTML}
          </div>

          <!-- Right-side actions -->
          <div class="nav-actions">
            <a href="${root}cart.html" class="cart-icon-btn" aria-label="Cart">
              🛒 Cart
              <span class="cart-badge hidden">0</span>
            </a>
            ${userAreaHTML}
            <button class="hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile dropdown -->
      <div class="mobile-menu" id="mobileMenu">
        <div class="container">
          ${mobileLinksHTML}
        </div>
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML("afterbegin", navHTML);

  // Wire up the hamburger toggle
  const hamburger  = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  // Update cart badge immediately
  refreshCartBadge();
}

/* ────────────────────────────────────────────────────────────
   9. FOOTER BUILDER
   Call buildFooter() at the bottom of each page.
   ──────────────────────────────────────────────────────────── */
function buildFooter() {
  const root = getRoot();

  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">

          <!-- Brand + Social -->
          <div class="footer-brand">
            <div class="footer-logo-text">
              <div class="logo-box" style="width:30px;height:30px;background:var(--orange);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:0.9rem;">⚡</div>
              Quantum<span>Tech</span>
            </div>
            <p>Giving laptops a second life. We buy damaged devices, fix them up, and sell them to students at prices that actually make sense.</p>

            <!-- ── SOCIAL MEDIA LINKS ──────────────────────────
                 Replace each # with your actual profile URL.
                 e.g. href="https://www.facebook.com/QuantumTechBW"
                 ─────────────────────────────────────────────── -->
            <div class="footer-social">
              <a href="https://www.facebook.com/share/1dHgWAASo2/?mibextid=wwXIfr"" class="social-btn" target="_blank" rel="noopener" aria-label="Facebook"
                title="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </a>
              <a href="https://www.instagram.com/" class="social-btn" target="_blank" rel="noopener" aria-label="Instagram"
                title="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
                Instagram
              </a>
              <a href="https://wa.me/26775718957" class="social-btn" target="_blank" rel="noopener" aria-label="WhatsApp"
                title="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a href="https://x.com/" class="social-btn" target="_blank" rel="noopener" aria-label="X / Twitter"
                title=" X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X / Twitter
              </a>
              <a href="https://www.tiktok.com/en/" class="social-btn" target="_blank" rel="noopener" aria-label="TikTok"
                title="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                </svg>
                TikTok
              </a>
            </div>
          </div>

          <!-- Shop -->
          <div class="footer-col">
            <h5>Shop</h5>
            <a href="${root}products.html">Browse Laptops</a>
            <a href="${root}cart.html">My Cart</a>
            <a href="${root}order.html">Place Order</a>
            <a href="${root}order_tracking.html">Track Order</a>
          </div>

          <!-- Account -->
          <div class="footer-col">
            <h5>Account</h5>
            <a href="${root}login.html">Login</a>
            <a href="${root}signup.html">Sign Up</a>
            <a href="${root}trade.html">Sell a Laptop</a>
            <a href="${root}feedback.html">Leave Feedback</a>
          </div>

          <!-- Help -->
          <div class="footer-col">
            <h5>Help</h5>
            <a href="${root}contact.html">Contact Us</a>
            <a href="${root}contact.html#faq">FAQs</a>
            <a href="${root}feedback.html">Reviews</a>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <span>© 2026 QuantumTech. All rights reserved.</span>
          <span>Made with love for Botswana</span>
        </div>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML("beforeend", footerHTML);
}

/* ────────────────────────────────────────────────────────────
   10. FORM VALIDATION HELPERS
   ──────────────────────────────────────────────────────────── */

// Show an error on a form field
function showFieldError(fieldId, message) {
  const group = document.querySelector(`#${fieldId}`)?.closest(".form-group");
  if (!group) return;
  group.classList.add("has-error");
  const errEl = group.querySelector(".field-error");
  if (errEl) errEl.textContent = message;
}

// Clear error on a form field
function clearFieldError(fieldId) {
  const group = document.querySelector(`#${fieldId}`)?.closest(".form-group");
  if (!group) return;
  group.classList.remove("has-error");
}

// Clear all errors in a form
function clearAllErrors(formEl) {
  formEl.querySelectorAll(".form-group.has-error").forEach(g => g.classList.remove("has-error"));
}

// Show an alert box inside a container element
function showAlert(containerId, message, type = "danger") {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}

function clearAlert(containerId) {
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = "";
}

/* ────────────────────────────────────────────────────────────
   11. ROOT PATH HELPER
   Detects if we're in a subfolder so links work correctly.
   All pages are in the root folder for this project.
   ──────────────────────────────────────────────────────────── */
function getRoot() {
  return "";
}

/* ────────────────────────────────────────────────────────────
   12. PRODUCT CARD RENDERER
   Reusable — used on index.html and products.html
   ──────────────────────────────────────────────────────────── */
function renderProductCard(product) {
  const savePct  = Math.round((1 - product.price / product.originalPrice) * 100);
  const stockPct = Math.min((product.stock / 10) * 100, 100);

  const conditionClass = {
    "Excellent": "badge-excellent",
    "Good":      "badge-good",
    "Fair":      "badge-fair"
  }[product.condition] || "badge-good";

  return `
    <div class="product-card" data-category="${product.category}">
      <div class="product-image">
        <span class="product-condition-badge ${conditionClass}">${product.condition}</span>
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null; this.src='${product.fallback}';"
        />
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-specs">
          ${product.specs.map(s => `<span>${s}</span>`).join("")}
        </div>
        <div class="stock-bar-wrap">
          <div class="stock-label">
            <span>Stock</span>
            <span>${product.stock} left</span>
          </div>
          <div class="stock-bar">
            <div class="stock-fill" style="width:${stockPct}%"></div>
          </div>
        </div>
        <div class="product-pricing">
          <div class="product-price">${formatBWP(product.price)}</div>
          <div class="product-original-price">Was: ${formatBWP(product.originalPrice)}</div>
          <div class="product-save">Save ${savePct}% off retail!</div>
        </div>
        <div class="product-actions">
          <button
            class="btn btn-primary btn-sm"
            style="flex:1"
            onclick="addToCart(${product.id})"
            ${product.stock === 0 ? "disabled" : ""}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────────────────────────
   13. CONDITION BADGE COLOURS for order confirmation
   ──────────────────────────────────────────────────────────── */
function conditionTag(condition) {
  const map = {
    "Excellent": "tag-success",
    "Good":      "tag-orange",
    "Fair":      "tag-gray"
  };
  return `<span class="tag ${map[condition] || "tag-gray"}">${condition}</span>`;
}

/* ────────────────────────────────────────────────────────────
   14. EXPOSE GLOBALS
   So inline onclick="" attributes in HTML can call these.
   ──────────────────────────────────────────────────────────── */
window.PRODUCTS       = PRODUCTS;
window.STORAGE        = STORAGE;
window.lsGet          = lsGet;
window.lsSet          = lsSet;
window.formatBWP      = formatBWP;
window.generateId     = generateId;
window.showToast      = showToast;
window.getUsers       = getUsers;
window.getSession     = getSession;
window.loginUser      = loginUser;
window.registerUser   = registerUser;
window.logoutUser     = logoutUser;
window.getCart        = getCart;
window.saveCart       = saveCart;
window.clearCart      = clearCart;
window.addToCart      = addToCart;
window.removeFromCart = removeFromCart;
window.changeQty      = changeQty;
window.getCartCount   = getCartCount;
window.getCartTotal   = getCartTotal;
window.refreshCartBadge = refreshCartBadge;
window.getOrders      = getOrders;
window.placeOrder     = placeOrder;
window.buildNav       = buildNav;
window.buildFooter    = buildFooter;
window.showFieldError = showFieldError;
window.clearFieldError= clearFieldError;
window.clearAllErrors = clearAllErrors;
window.showAlert      = showAlert;
window.clearAlert     = clearAlert;
window.getRoot        = getRoot;
window.renderProductCard = renderProductCard;
