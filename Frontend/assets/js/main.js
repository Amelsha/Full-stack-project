/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== QUESTIONS ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.questions__item')

accordionItems.forEach((item) =>{
    const accordionHeader = item.querySelector('.questions__header')

    accordionHeader.addEventListener('click', () =>{
        const openItem = document.querySelector('.accordion-open')

        toggleItem(item)

        if(openItem && openItem!== item){
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) =>{
    const accordionContent = item.querySelector('.questions__content')

    if(item.classList.contains('accordion-open')){
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    }else{
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
    }

}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        if (navLink) {
          if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
              navLink.classList.add('active-link')
          }else{
              navLink.classList.remove('active-link')
          }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 400 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 400) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// Doctor Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the doctor page
    const uploadArea = document.getElementById('uploadArea');
    if (!uploadArea) return;

    const imageInput = document.getElementById('imageInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultContent = document.getElementById('resultContent');

    uploadArea.addEventListener('click', () => imageInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--first-color)';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ccc';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ccc';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImage(file);
        }
    });

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImage(file);
        }
    });

    function handleImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadArea.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 200px;">`;
        };
        reader.readAsDataURL(file);
    }

    analyzeBtn.addEventListener('click', () => {
        // Simulate analysis (replace with actual API call)
        resultContainer.style.display = 'block';
        resultContent.innerHTML = `
            <p><strong>Disease Detected:</strong> Leaf Blight</p>
            <p><strong>Confidence:</strong> 85%</p>
            <p><strong>Recommendation:</strong> Apply fungicide treatment and ensure proper air circulation.</p>
        `;
    });

    // Chatbot Functionality
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendMessage = document.getElementById('sendMessage');

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendMessage.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, true);
            messageInput.value = '';
            
            // Simulate bot response (replace with actual chatbot logic)
            setTimeout(() => {
                const responses = [
                    "I understand your concern. Let me help you with that.",
                    "Based on the symptoms you're describing, it could be a nutrient deficiency.",
                    "Have you checked the soil moisture levels?",
                    "I recommend checking for pests and applying appropriate treatment."
                ];
                addMessage(responses[Math.floor(Math.random() * responses.length)]);
            }, 1000);
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage.click();
        }
    });
});

/*=============== CHECKOUT ===============*/
const checkoutForm = document.getElementById('shipping-form');

if (checkoutForm) {
    // Card number formatting
    const cardNumberInput = document.getElementById('cardnumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }

    // Expiry date formatting
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    // CVV validation
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
        });
    }

    // Form submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic form validation
        const requiredFields = checkoutForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        // Card number validation (16 digits)
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        if (cardNumber.length !== 16) {
            isValid = false;
            cardNumberInput.classList.add('error');
        }

        // Expiry date validation
        const expiry = expiryInput.value;
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            isValid = false;
            expiryInput.classList.add('error');
        }

        // CVV validation (3 digits)
        if (cvvInput.value.length !== 3) {
            isValid = false;
            cvvInput.classList.add('error');
        }

        if (isValid) {
            // Show success message
            alert('Order placed successfully! Thank you for your purchase.');
            // Redirect to home page
            window.location.href = 'index.html';
        } else {
            alert('Please fill in all required fields correctly.');
        }
    });
}

// Add error styles to CSS
const style = document.createElement('style');
style.textContent = `
    .checkout__form-input.error {
        border-color: #ff3860;
    }
    .checkout__form-input.error:focus {
        border-color: #ff3860;
        box-shadow: 0 0 0 2px rgba(255, 56, 96, 0.2);
    }
`;
document.head.appendChild(style);

/*=============== CART FUNCTIONALITY ===============*/
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('cart.html')) {
        const cartItemsContainer = document.querySelector('.cart__items');
        const cartEmpty = document.querySelector('.cart__empty');
        const cartSummary = document.querySelector('.cart__summary');
        const subtotalElement = cartSummary.querySelector('.cart__summary-item:nth-child(1) span:last-child');
        const totalElement = cartSummary.querySelector('.cart__summary-total span:last-child');
        const shippingCost = 99;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';

        let subtotal = 0;
        cart.forEach(item => {
            cartItemsContainer.innerHTML += `
                <div class="cart__item">
                    <img src="${item.image}" alt="${item.name}" class="cart__item-img">
                    <div class="cart__item-content">
                        <h3 class="cart__item-title">${item.name}</h3>
                        <span class="cart__item-price">₹${item.price}</span>
                        <div class="cart__item-quantity">
                            <button class="cart__quantity-btn" onclick="decreaseQuantityCart('${item._id}')">-</button>
                            <input type="number" value="${item.quantity}" min="1" class="cart__quantity-input" readonly>
                            <button class="cart__quantity-btn" onclick="increaseQuantityCart('${item._id}')">+</button>
                        </div>
                    </div>
                    <button class="cart__item-remove" onclick="removeFromCart('${item._id}')">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            `;
            subtotal += item.price * item.quantity;
        });

        // Update summary
        if (subtotalElement) subtotalElement.textContent = `₹${subtotal}`;
        if (totalElement) totalElement.textContent = `₹${subtotal + shippingCost}`;

        // Show/hide empty cart message and summary
        if (cart.length === 0) {
            cartEmpty.style.display = 'flex';
            cartSummary.style.display = 'none';
        } else {
            cartEmpty.style.display = 'none';
            cartSummary.style.display = 'block';
        }
    }
});

//subscibe button functionality
const subscribeBtn = document.getElementById("subscribeBtn");
if (subscribeBtn) {
  subscribeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const emailInput = document.getElementById("emailInput");
    const message = document.getElementById("subscribeMessage");
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^-\s@]+\.[^\s@]+$/;
    if (email === "" || !emailPattern.test(email)) {
      message.textContent = "Please enter a valid email address.";
      message.style.color = "red";
      return;
    }
    fetch('http://localhost:5000/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        message.textContent = data.error;
        message.style.color = "red";
      } else {
        message.textContent = "Thank you for subscribing!";
        message.style.color = "green";
        emailInput.value = "";
      }
    });
  });
}

// ========== BACKEND API INTEGRATION ========== //
const API_BASE = 'http://localhost:5000/api';

// 1. Fetch and render products in shop.html
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith('shop.html')) {
    const productContainer = document.querySelector('.product__container');
    if (productContainer) {
      fetch(`${API_BASE}/products`)
        .then(res => res.json())
        .then(products => {
          productContainer.innerHTML = '';
          products.forEach(product => {
            productContainer.innerHTML += `
              <article class="product__card">
                <div class="product__circle"></div>
                <img src="${product.image}" alt="${product.name}" class="product__img">
                <h3 class="product__title">${product.name}</h3>
                <span class="product__price">₹${product.price}</span>
                <button class="button--flex product__button" onclick='addToCart(${JSON.stringify(product)})'>
                  <i class="ri-shopping-bag-line"></i>
                </button>
              </article>
            `;
          });
        });
    }
  }
});

// 2. Add to cart (works on any page)
window.addToCart = function(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item._id === product._id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
  window.location.href = 'cart.html'; // Redirect to cart page
};

// 3. Render cart in cart.html
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith('cart.html')) {
    const cartItemsContainer = document.querySelector('.cart__items');
    if (cartItemsContainer) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cartItemsContainer.innerHTML = '';
      cart.forEach(item => {
        cartItemsContainer.innerHTML += `
          <div class="cart__item">
            <img src="${item.image}" alt="${item.name}" class="cart__item-img">
            <div class="cart__item-content">
              <h3 class="cart__item-title">${item.name}</h3>
              <span class="cart__item-price">₹${item.price}</span>
              <div class="cart__item-quantity">
                <button class="cart__quantity-btn" onclick="decreaseQuantityCart('${item._id}')">-</button>
                <input type="number" value="${item.quantity}" min="1" class="cart__quantity-input" readonly>
                <button class="cart__quantity-btn" onclick="increaseQuantityCart('${item._id}')">+</button>
              </div>
            </div>
            <button class="cart__item-remove" onclick="removeFromCart('${item._id}')">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        `;
      });
      updateCartTotals();
    }
  }
});

window.increaseQuantityCart = function(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(i => i._id === id);
  if (item) item.quantity += 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
};
window.decreaseQuantityCart = function(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(i => i._id === id);
  if (item && item.quantity > 1) item.quantity -= 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
};
window.removeFromCart = function(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(i => i._id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
};

// 4. Signup form (signup.html)
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith('signup.html')) {
    const form = document.querySelector('.auth__form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const [name, email, password, confirm] = form.querySelectorAll('input');
        if (password.value !== confirm.value) {
          alert('Passwords do not match');
          return;
        }
        fetch(`${API_BASE}/users/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.value, email: email.value, password: password.value })
        })
        .then(res => res.json())
        .then(data => {
          if (data.error) alert(data.error);
          else {
            alert('Signup successful! Please sign in.');
            window.location.href = 'signin.html';
          }
        });
      });
    }
  }
});

// 5. Signin form (signin.html)
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith('signin.html')) {
    const form = document.querySelector('.auth__form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const [email, password] = form.querySelectorAll('input');
        fetch(`${API_BASE}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.value, password: password.value })
        })
        .then(res => res.json())
        .then(data => {
          if (data.error) alert(data.error);
          else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('Signin successful!');
            window.location.href = 'shop.html';
          }
        });
      });
    }
  }
});

// 6. Checkout (checkout.html)
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith('checkout.html')) {
    const form = document.getElementById('shipping-form');
    const checkoutItemsContainer = document.querySelector('.checkout__items');
    const subtotalElement = document.querySelector('.checkout__summary-item span:last-child');
    const totalElement = document.querySelector('.checkout__summary-total span:last-child');
    const shippingCost = 99;

    // Render checkout items and summary
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    checkoutItemsContainer.innerHTML = '';
    let subtotal = 0;
    cart.forEach(item => {
      checkoutItemsContainer.innerHTML += `
        <div class="checkout__item">
          <img src="${item.image}" alt="${item.name}" class="checkout__item-img">
          <div class="checkout__item-content">
            <h4 class="checkout__item-title">${item.name}</h4>
            <span class="checkout__item-price">₹${item.price}</span>
            <span class="checkout__item-quantity">x${item.quantity}</span>
          </div>
        </div>
      `;
      subtotal += item.price * item.quantity;
    });
    if (subtotalElement) subtotalElement.textContent = `₹${subtotal}`;
    if (totalElement) totalElement.textContent = `₹${subtotal + shippingCost}`;

    // Place order logic (already present)
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You must be signed in to place an order.');
          window.location.href = 'signin.html';
          return;
        }
        if (cart.length === 0) {
          alert('Your cart is empty!');
          return;
        }
        const products = cart.map(item => ({ product: item._id, quantity: item.quantity }));
        const total = subtotal + shippingCost;
        fetch(`${API_BASE}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ products, total })
        })
        .then(res => res.json())
        .then(data => {
          if (data.error) alert(data.error);
          else {
            alert('Order placed successfully! Thank you for your purchase.');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
          }
        });
      });
    }
  }
});

// Contact form submission (contact.html)
if (window.location.pathname.endsWith('contact.html')) {
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact__form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const subject = form.querySelector('input[name="subject"]').value;
        const message = form.querySelector('textarea[name="message"]').value;
        fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        })
        .then(res => res.json())
        .then(data => {
          if (data.error) alert(data.error);
          else alert('Message sent successfully!');
          form.reset();
        });
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith('blog.html')) {
    const blogContainer = document.querySelector('.blog__container');
    if (blogContainer) {
      fetch('http://localhost:5000/api/blogs')
        .then(res => res.json())
        .then(blogs => {
          blogContainer.innerHTML = '';
          blogs.forEach(blog => {
            blogContainer.innerHTML += `
              <article class="blog__card">
                <div class="blog__image">
                  <img src="${blog.image}" alt="${blog.title}">
                </div>
                <div class="blog__content">
                  <h3 class="blog__title">${blog.title}</h3>
                  <span class="blog__author">By ${blog.author}</span>
                  <span class="blog__date">${new Date(blog.date).toLocaleDateString()}</span>
                  <p class="blog__text">${blog.content.substring(0, 120)}...</p>
                </div>
              </article>
            `;
          });
        });
    }
  }
});


