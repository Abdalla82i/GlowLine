document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    updateCartCount();
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCartItems() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const productElement = document.createElement('div');
        productElement.className = 'cart-item';
        const product = getProductDetails(item.id);
        productElement.innerHTML = `
            <img src="${product.image}" alt="Product Image">
            <p>${product.name}</p>
            <p>Quantity: <button onclick="updateQuantity(${item.id}, -1)">-</button> ${item.quantity} <button onclick="updateQuantity(${item.id}, 1)">+</button></p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartList.appendChild(productElement);

        total += item.quantity * product.price;
    });

    cartTotal.innerText = `Total: $${total}`;
}

function getProductDetails(productId) {
    const products = {
        1: { name: "CARWORNIC Men's Hoodies Pullover", image: "/imgs/hoodie_.jpg", price: 45 },
        2: { name: "Keasmto Mens Hoodies Pullover", image: "/imgs/greyhoodie_.jpg", price: 50 },
        3: { name: "Men's Corduroy Shorts", image: "/imgs/menshorts_.jpg", price: 35 },
        4: { name: "Nike Men's Sportswear Pants", image: "/imgs/nike-pants_.jpg", price: 70 },
        5: { name: "adidas Men's Vl Court 3.0 Sneaker", image: "/imgs/addidas-samba_.jpg", price: 90 },
        6: { name: "adidas Samba OG Sneakers", image: "/imgs/adidas samba-og_.jpg", price: 120 },
        7: { name: "LILLUSORY 2 Piece Outfits for Women", image: "/imgs/women-1_.jpg", price: 100 },
        8: { name: "Darong Women's 2 Piece Outfits", image: "/imgs/women2_.jpg", price: 80 },
        9: { name: "ANRABESS Women's Oversized T Shirts", image: "/imgs/women3_.jpg", price: 35 },
        10: { name: "Langwyqu Womens Oversized Tshirts", image: "/imgs/women4_.jpg", price: 35 },
        11: { name: "Taos Footwear Women's Xcellent 2 Wedge Sandal", image: "/imgs/womenfoot1_.jpg", price: 50 },
        12: { name: "Nike Dunk Low Women's Shoe", image: "/imgs/womenfoot2_.jpg", price: 90 },
        13: { name: "The Children's Place Geometric Dino T Shirt", image: "/imgs/kids1_.jpg", price: 30 },
        14: { name: "The Children's Place Short Sleeve Graphic T Shirt", image: "/imgs/kid2_.jpg", price: 25 },
        15: { name: "The Children's Place Boys' Colorblock T-Shirt", image: "/imgs/kid3_.jpg", price: 35 },
        16: { name: "Leveret Kids & Toddler Boys Pants", image: "/imgs/kid4_.jpg", price: 30 },
        17: { name: "The Children's Place Baby Boys' Sports T-Shirts", image: "/imgs/kid5_.jpg", price: 35 },
        18: { name: "Jingle Bongala Kids Youth Waterproof Hiking Pants", image: "/imgs/kid6_.jpg", price: 30 }
    };
    return products[productId];
}

function updateQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateCartCount();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.innerText = `(${totalItems})`;
}

function checkout() {
    if (confirm('Are you sure you want to purchase?')) {
        cart = []; 
        localStorage.removeItem('cart'); 
        displayCartItems(); 
        updateCartCount(); 
        alert('Thank you for your purchase!'); 
    }
}
