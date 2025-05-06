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

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
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
    // Check if we're on the cart page
    const cartItems = document.querySelector('.cart__items');
    if (!cartItems) return;

    const cartEmpty = document.querySelector('.cart__empty');
    const cartSummary = document.querySelector('.cart__summary');
    const subtotalElement = cartSummary.querySelector('.cart__summary-item:nth-child(1) span:last-child');
    const totalElement = cartSummary.querySelector('.cart__summary-total span:last-child');
    const shippingCost = 99;

    // Function to update cart totals
    function updateCartTotals() {
        let subtotal = 0;
        const items = document.querySelectorAll('.cart__item');
        
        items.forEach(item => {
            const price = parseInt(item.querySelector('.cart__item-price').textContent.replace('₹', ''));
            const quantity = parseInt(item.querySelector('.cart__quantity-input').value);
            subtotal += price * quantity;
        });

        const total = subtotal + shippingCost;
        
        subtotalElement.textContent = `₹${subtotal}`;
        totalElement.textContent = `₹${total}`;

        // Show/hide empty cart message
        if (items.length === 0) {
            cartEmpty.style.display = 'flex';
            cartSummary.style.display = 'none';
        } else {
            cartEmpty.style.display = 'none';
            cartSummary.style.display = 'block';
        }
    }

    // Quantity increment function
    window.increaseQuantity = function(button) {
        const input = button.parentElement.querySelector('.cart__quantity-input');
        input.value = parseInt(input.value) + 1;
        updateCartTotals();
    }

    // Quantity decrement function
    window.decreaseQuantity = function(button) {
        const input = button.parentElement.querySelector('.cart__quantity-input');
        const currentValue = parseInt(input.value);
        if (currentValue > 1) {
            input.value = currentValue - 1;
            updateCartTotals();
        }
    }

    // Remove item function
    const removeButtons = document.querySelectorAll('.cart__item-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.cart__item');
            item.remove();
            updateCartTotals();
        });
    });

    // Initialize cart totals
    updateCartTotals();
});

//subscibe button functionality
  document.getElementById("subscribeBtn").addEventListener("click", function () {
    const emailInput = document.getElementById("emailInput");
    const message = document.getElementById("subscribeMessage");
    const email = emailInput.value.trim();

    // Basic email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || !emailPattern.test(email)) {
      message.textContent = "Please enter a valid email address.";
      message.style.color = "red";
      return;
    }

    // Simulate storing
    localStorage.setItem("subscribedEmail", email);

    // Show success message
    message.textContent = "Thank you for subscribing!";
    message.style.color = "green";

    // Clear input
    emailInput.value = "";
  });


