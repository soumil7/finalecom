// JavaScript to handle section switching
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    
    // Show the selected section
    document.getElementById(sectionId).classList.remove('hidden');
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Set default section as active on page load
document.addEventListener('DOMContentLoaded', () => {
    showSection('section1');
});


//sidebar while mobile layout start//
const sideBar = document.getElementById("sideBar");
const openButton = document.getElementById("openButton");
const closeBar = document.getElementById("close");

let sideBarState = false;
// Function to open/close sidebar
function toggleSideBar() {
    if (!sideBarState) {
        sideBar.style.right = "0"; 
        sideBarState = true;
    } else {
        sideBar.style.right = "-300px";
        sideBarState = false;
    }
}
// Open sidebar when openButton is clicked
openButton.addEventListener("click", () => {
    toggleSideBar();
});
// Close sidebar when close button is clicked
closeBar.addEventListener("click", () => {
    sideBar.style.right = "-300px";
    sideBarState = false;
});
//sidebar while mobile layout end//



//chatbot sidebar start//
const sideBar2 = document.getElementById("sideBar2");
const openButton2 = document.getElementById("openButton2");
const closeBar2 = document.getElementById("close2");

let sideBarState2 = false;
// Function to open/close sidebar
function toggleSideBar2() {
    if (!sideBarState2) {
        sideBar2.style.right = "0"; 
        sideBarState2 = true;
    } else {
        sideBar2.style.right = "-600px";
        sideBarState2 = false;
    }
}
// Open sidebar when openButton is clicked
openButton2.addEventListener("click", () => {
    toggleSideBar2();
});
// Close sidebar when close button is clicked
closeBar2.addEventListener("click", () => {
    sideBar2.style.right = "-600px";
    sideBarState2 = false;
});
//chatbot sidebar end//


//filter sidebar start//
const sideBar3 = document.getElementById("sideBar3");
const openButton3 = document.getElementById("openButton3");
const closeBar3 = document.getElementById("close3");

let sideBarState3 = false;
// Function to open/close sidebar
function toggleSideBar3() {
    if (!sideBarState3) {
        sideBar3.style.left = "0"; 
        sideBarState3 = true;
    } else {
        sideBar3.style.left = "-600px";
        sideBarState3 = false;
    }
}
// Open sidebar when openButton is clicked
openButton3.addEventListener("click", () => {
    toggleSideBar3();
});
// Close sidebar when close button is clicked
closeBar3.addEventListener("click", () => {
    sideBar3.style.left = "-600px";
    sideBarState3 = false;
});
//filter sidebar end//


// chatbot starting //
document.addEventListener('DOMContentLoaded', function () {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatbox = document.querySelector('.chatbox');

    chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            addMessage('User', message);
            userInput.value = '';
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage('Bot', response);
            }, 500);
        }
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = `flex ${sender === 'User' ? 'justify-end' : 'justify-start'}`;
        messageElement.innerHTML = `
            <div class="${sender === 'User' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} p-2 rounded-lg max-w-xs">
                ${message}
            </div>
        `;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function getBotResponse(message) {
        // Basic responses for demonstration
        const responses = {
            'hello': 'Hi there! How can I help you today?',
            'how are you': 'I\'m a bot, but I\'m doing great! How can I assist you?',
            'bye': 'Goodbye! Have a great day!',
        };
        return responses[message.toLowerCase()] || 'I\'m not sure how to respond to that.';
    }
});
// chatbot ending //



// Function to update cart count in the UI
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.length;
    document.getElementById('cartCount').innerText = cartCount;
}
// Function to add an item to the cart
function addToCart(productName, imageUrl, price, description) {
    // Get cart from localStorage or initialize an empty array if not present
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add new product to the cart with description
    cart.push({ name: productName, image: imageUrl, price: price, description: description });

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count in the UI
    updateCartCount();

    // Optionally, show a confirmation message
    alert('Product added to cart!');
}
// Function to redirect to the cart page
function redirectToCartPage() {
    window.location.href = 'cart.html';
}
// Initial cart count update
updateCartCount();