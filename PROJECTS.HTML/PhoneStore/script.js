// =====================
// PRODUCT DATA
// =====================
const phones = [
  {
    id: 1,
    brand: "apple",
    name: "iPhone 16 Pro Max",
    specs: "A18 Pro chip · 6.9\" OLED · 48MP · 256GB",
    price: 1199,
    oldPrice: 1399,
    emoji: "📱",
    badge: "New",
    stars: 5,
    reviews: 2841,
  },
  {
    id: 2,
    brand: "samsung",
    name: "Galaxy S25 Ultra",
    specs: "Snapdragon 8 Elite · 6.9\" AMOLED · 200MP · 512GB",
    price: 1249,
    oldPrice: 1499,
    emoji: "📲",
    badge: "Hot",
    stars: 5,
    reviews: 1923,
  },
  {
    id: 3,
    brand: "google",
    name: "Pixel 9 Pro XL",
    specs: "Google Tensor G4 · 6.8\" LTPO OLED · 50MP · 256GB",
    price: 1099,
    oldPrice: 1199,
    emoji: "🤖",
    badge: null,
    stars: 4,
    reviews: 874,
  },
  {
    id: 4,
    brand: "oneplus",
    name: "OnePlus 13",
    specs: "Snapdragon 8 Gen 4 · 6.82\" AMOLED · 50MP · 512GB",
    price: 799,
    oldPrice: 899,
    emoji: "🔴",
    badge: "Sale",
    stars: 4,
    reviews: 612,
  },
  {
    id: 5,
    brand: "xiaomi",
    name: "Xiaomi 15 Pro",
    specs: "Snapdragon 8 Elite · 6.73\" AMOLED · 50MP · 512GB",
    price: 999,
    oldPrice: 1099,
    emoji: "🟠",
    badge: null,
    stars: 4,
    reviews: 431,
  },
  {
    id: 6,
    brand: "samsung",
    name: "Galaxy Z Fold 7",
    specs: "Snapdragon 8 Elite · 7.6\" AMOLED Foldable · 200MP",
    price: 1799,
    oldPrice: 1999,
    emoji: "🪭",
    badge: "New",
    stars: 5,
    reviews: 389,
  },
  {
    id: 7,
    brand: "apple",
    name: "iPhone 16",
    specs: "A18 chip · 6.1\" OLED · 48MP · 128GB",
    price: 799,
    oldPrice: 899,
    emoji: "📱",
    badge: null,
    stars: 4,
    reviews: 3120,
  },
  {
    id: 8,
    brand: "google",
    name: "Pixel 9a",
    specs: "Google Tensor G4 · 6.4\" OLED · 48MP · 128GB",
    price: 499,
    oldPrice: 599,
    emoji: "🟢",
    badge: "Sale",
    stars: 4,
    reviews: 561,
  },
];

// =====================
// STATE
// =====================
let cart = [];
let activeFilter = "all";

// =====================
// RENDER PRODUCTS
// =====================
function renderProducts(filter = "all") {
  const grid = document.getElementById("productGrid");
  const filtered = filter === "all" ? phones : phones.filter(p => p.brand === filter);

  grid.innerHTML = filtered.map(phone => `
    <div class="product-card" data-id="${phone.id}">
      <div class="product-img">
        <span>${phone.emoji}</span>
        ${phone.badge ? `<span class="product-badge">${phone.badge}</span>` : ""}
      </div>
      <div class="product-info">
        <div class="product-brand">${phone.brand}</div>
        <div class="product-name">${phone.name}</div>
        <div class="product-stars">
          ${"★".repeat(phone.stars)}${"☆".repeat(5 - phone.stars)}
          <span>(${phone.reviews.toLocaleString()})</span>
        </div>
        <div class="product-specs">${phone.specs}</div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">$${phone.price.toLocaleString()}</span>
            <span class="price-old">$${phone.oldPrice.toLocaleString()}</span>
          </div>
          <button class="add-to-cart" data-id="${phone.id}" aria-label="Add to cart">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("");

  // Attach add-to-cart events
  grid.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      addToCart(id);
    });
  });
}

// =====================
// CART LOGIC
// =====================
function addToCart(id) {
  const phone = phones.find(p => p.id === id);
  if (!phone) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...phone, qty: 1 });
  }

  updateCartUI();
  showToast(`${phone.name} added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = `$${total.toLocaleString()}`;

  const cartItemsEl = document.getElementById("cartItems");
  const cartEmptyEl = document.getElementById("cartEmpty");
  const cartFooterEl = document.getElementById("cartFooter");

  if (cart.length === 0) {
    cartEmptyEl.style.display = "flex";
    cartFooterEl.style.display = "none";
    cartItemsEl.innerHTML = "";
    cartItemsEl.appendChild(cartEmptyEl);
    return;
  }

  cartEmptyEl.style.display = "none";
  cartFooterEl.style.display = "block";

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name} ${item.qty > 1 ? `× ${item.qty}` : ""}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toLocaleString()}</div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join("");

  cartItemsEl.querySelectorAll(".cart-item-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromCart(parseInt(btn.dataset.id));
    });
  });
}

// =====================
// CART SIDEBAR
// =====================
function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}

function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", closeCart);

// =====================
// BRAND FILTER
// =====================
document.querySelectorAll(".pill").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    activeFilter = pill.dataset.brand;
    renderProducts(activeFilter);
  });
});

// =====================
// MOBILE MENU
// =====================
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

// =====================
// TOAST
// =====================
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// =====================
// NAVBAR SCROLL EFFECT
// =====================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 20) {
    navbar.style.background = "rgba(10, 10, 15, 0.97)";
  } else {
    navbar.style.background = "rgba(10, 10, 15, 0.85)";
  }
});

// =====================
// INIT
// =====================
renderProducts();
updateCartUI();
