////////////////////PRODUCT PAGE JAVASCRIPT//////////////////////
document.addEventListener('DOMContentLoaded', function() {
    var menBtn = document.getElementById('menBtn');
    var womenBtn = document.getElementById('womenBtn');
    var kidsBtn = document.getElementById('kidsBtn');
    var menCategory = document.getElementById('menCategory');
    var womenCategory = document.getElementById('womenCategory');
    var kidsCategory = document.getElementById('kidsCategory');
    
    menBtn.addEventListener('click', function(){
        toggleCategory(menCategory);
    });
    womenBtn.addEventListener('click', function(){
        toggleCategory(womenCategory);
    });
    kidsBtn.addEventListener('click', function(){
        toggleCategory(kidsCategory);
    });
    function toggleCategory(category){
        category.classList.toggle('active');
    }
    initializeCart();
});
let cart = JSON.parse(localStorage.getItem('cart')) || [];//array to store the products on the cart
function addToCart(productId) {
    const product = cart.find(item => item.id === productId);//find product on cart
    if (product) {//if product is here
        product.quantity++;//increase its quantity
    } else {//if its not there make quanitity = 1
        cart.push({ id: productId, quantity: 1 });
    }
    updateCartCount();
    localStorage.setItem('cart', JSON.stringify(cart));// save cart to local storage
}
function initializeCart() {
    updateCartCount();//update the count of cart
}
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);//calculate total items
    cartCount.innerText = `(${totalItems})`;//the text will change after update
}
///////////////END OF PRODUCT PAGE JAVASCRIPT////////////////////////