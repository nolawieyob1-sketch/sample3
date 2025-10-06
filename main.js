console.log("✅ main.js loaded!");

// ========== Mobile Menu Toggle ==========
const toggleBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggleBtn && navLinks) {
  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ========== Dynamic Year in Footer ==========
const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

// ========== Fade-In Animation ==========
const fadeStyle = document.createElement('style');
fadeStyle.innerHTML = `
  .fade-in {
    animation: fadeIn 0.6s ease-in-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(fadeStyle);

// ========== Gallery Filter ==========
const filterButtons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.grid-item');

if (filterButtons.length && items.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active')?.classList.remove('active');
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        if (filter === 'all' || item.dataset.status === filter) {
          item.classList.remove('hidden');
          item.classList.add('fade-in');
        } else {
          item.classList.add('hidden');
          item.classList.remove('fade-in');
        }
      });
    });
  });
}

const form = document.getElementById("contactForm");
const popup = document.getElementById("thankYouPopup");

if (form && popup) {
  const fields = form.querySelectorAll("input[required], textarea[required]");

  // Live validation
  fields.forEach(field => {
    field.addEventListener("input", () => {
      if (field.value.trim()) {
        field.classList.remove("error");
        field.parentElement.querySelector(".error-msg").textContent = "";
      }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let hasError = false;

    // Clear errors
    form.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
    form.querySelectorAll(".error").forEach(el => el.classList.remove("error"));

   fields.forEach(field => {
  const value = field.value.trim();

  if (!value) {
    field.classList.add("error");
    const label = field.placeholder.replace("Your ", "");
    let message = `Please enter your ${label.toLowerCase()}`;
    field.parentElement.querySelector(".error-msg").textContent = message;
    hasError = true;
  } else if (field.type === "email") {
    // Simple email regex for validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      field.classList.add("error");
      field.parentElement.querySelector(".error-msg").textContent = "Please enter a valid email address";
      hasError = true;
    }
  }
});
const closeBtn = document.getElementById("popupCloseBtn");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
}


    if (hasError) return;

    // Submit form
    fetch(form.action, {
      method: "POST",
      body: new FormData(form)
    })
      .then(response => {
        if (response.ok) {
          popup.style.display = "flex";
          form.reset();
        } else {
          alert("Something went wrong. Please try again later.");
        }
      })
      .catch(() => {
        alert("No internet connection. Please check your network and try again.");
      });
  });

  window.closePopup = function () {
    popup.style.display = "none";
  };
}

// ========== Slideshow ==========
let slideIndex = 1;

document.addEventListener("DOMContentLoaded", () => {
  showSlides(slideIndex);
});

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  if (slides.length === 0) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll('.scroll-animate');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, { threshold: 0.2 });

  animatedItems.forEach(item => observer.observe(item));
});
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    document.querySelectorAll('.grid-item').forEach(item => {
      if (filter === 'all' || item.dataset.status === filter) {
        item.style.display = 'block';
        requestAnimationFrame(() => {
          item.classList.remove('hidden');
        });
      } else {
        item.classList.add('hidden');
        // Wait for fade-out to finish, then fully hide it
        item.addEventListener('transitionend', () => {
          if (item.classList.contains('hidden')) {
            item.style.display = 'none';
          }
        }, { once: true });
      }
    });
  });
});
document.getElementById('addToCartBtn').addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Example item data — replace with your actual item info
  const item = {
    id: 'heritage-flame',
    title: 'Heritage Flame',
    price: 34000,
    img: '../pic/c.jpg',
    qty: 1,
  };

  // Check if already in cart, increase qty
  const existingItem = cart.find(i => i.id === item.id);
  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
});
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `
        <img src="${item.img}" alt="${item.title}" width="50" />
        <div>
          <strong>${item.title}</strong><br />
          Qty: ${item.qty}<br />
          $${(item.price * item.qty).toLocaleString()}
        </div>
      `;
      cartItemsContainer.appendChild(div);
    });
  }

  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

openCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('hidden');
  renderCart();
});

closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.add('hidden');
});

// Optionally update cart count on page load
document.addEventListener('DOMContentLoaded', renderCart);
// cart.js

// Helper: format price with 2 decimals
function formatPrice(price) {
  return price.toFixed(2);
}

// Load cart from localStorage or empty array
function loadCart() {
  const cart = localStorage.getItem('cherryArtCart');
  return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cherryArtCart', JSON.stringify(cart));
}

// Calculate total price
function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Render cart items in the container
function renderCart() {
  const cart = loadCart();
  const container = document.getElementById('cartItemsContainer');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    checkoutBtn.disabled = true;
    totalEl.textContent = '0.00';
    return;
  }

  cart.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';

    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-img" />
      <div class="cart-item-info">
        <h3>${item.title}</h3>
        <p>Price: $${formatPrice(item.price)}</p>
        <label>
          Quantity: 
          <input type="number" min="1" value="${item.quantity}" class="qty-input" data-index="${index}" />
        </label>
      </div>
      <button class="remove-btn" data-index="${index}" aria-label="Remove ${item.title} from cart">&times;</button>
    `;

    container.appendChild(itemEl);
  });

  totalEl.textContent = formatPrice(calculateTotal(cart));
  checkoutBtn.disabled = false;

  // Add event listeners for quantity inputs
  container.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', e => {
      const idx = e.target.dataset.index;
      let val = parseInt(e.target.value);
      if (isNaN(val) || val < 1) {
        val = 1;
        e.target.value = '1';
      }
      cart[idx].quantity = val;
      saveCart(cart);
      totalEl.textContent = formatPrice(calculateTotal(cart));
    });
  });

  // Add event listeners for remove buttons
  container.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = e.target.dataset.index;
      cart.splice(idx, 1);
      saveCart(cart);
      renderCart(); // re-render
    });
  });
}

// Initialize cart page rendering
document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  document.getElementById('checkoutBtn').addEventListener('click', () => {
    alert('Checkout functionality coming soon!');
    // You can link this to your real checkout process later
  });
});
// Example item data for the current page (fill dynamically or hardcode for each item page)
const currentItem = {
  id: 'heritage-flame',
  title: 'Heritage Flame',
  price: 34000,
  image: '../pic/c.jpg',
  link: window.location.href // link to this item page
};

const addToCartBtn = document.getElementById('addToCartBtn');
const cartCountSpan = document.getElementById('cartCount'); // Your cart count badge element

// Function to get cart from localStorage or create new array
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Function to save cart back to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count display
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (cartCountSpan) cartCountSpan.textContent = count;
}

// Add current item to cart
function addToCart(item) {
  const cart = getCart();

  // Check if item already exists in cart
  const existingItem = cart.find(i => i.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({...item, quantity: 1});
  }

  saveCart(cart);
  updateCartCount();
}

// Initialize count on page load
updateCartCount();

if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    addToCart(currentItem);
    alert(`Added "${currentItem.title}" to cart!`);
  });
}
