import products from "../products.js";

const cart = () => {
    // ---------------- EVENT LISTENERS ----------------
    let openSidebar = document.querySelector('.cart-icon');
    let closeSidebar = document.querySelector('.close-icon');
    let overlay = document.querySelector('.overlay');
    let body = document.querySelector('body');
    let cart = [];

    openSidebar.addEventListener('click', () => {
        body.classList.add('activeSidebar');
        overlay.classList.add('active');
    })
    closeSidebar.addEventListener('click', () => {
        body.classList.remove('activeSidebar');
        overlay.classList.remove('active');
    })

    // ---------------- ADD/REMOVE ITEMS ----------------
    const productInCart = (productId, quantity, position) => {
        if(quantity > 0) {
            if(position < 0) {  // If cannot find index/position within cart array
                cart.push({     // Add item into cart array
                    product_id: productId,
                    quantity: quantity
                });
            } else {
                cart[position].quantity = quantity; // Add quantity if already exist
            } 
        } else if (quantity === 0 && position >= 0) {
            cart.splice(position, 1);  // Remove the item from the cart
        }

        // Save cart to localStorage (Internet said to use)
        localStorage.setItem('cart', JSON.stringify(cart));
        cartItemList();
    }

    // ---------------- DISPLAY CONTENT ----------------
    const cartItemList = () => {
        let cartList = document.querySelector('.cart-items');
        let cartSpan = document.querySelector('.cart-icon-filled span');
        let myCartSpan = document.querySelector('.my-cart span');
        let totalQuantity = 0; // Number of the items in cart icon
        cartList.innerHTML = ''; // Clear previous .cart-items content

        // Check if cart is empty or filled
        if (cart.length === 0) {
            let emptyCart = document.createElement('div');
            emptyCart.classList.add('empty-cart');
            emptyCart.innerHTML = 
            `<h1 class="cart-empty-title">OH NO!</h1>
            <h3 class="cart-empty-message">Your cart is <span class="highlight">empty</span></h3>
            <div class="cart-btn-2">
                <button class="close-btn">CONTINUE SHOPPING</button>
            </div>`;

            cartList.appendChild(emptyCart);
            cartSpan.textContent = '0'; 
            myCartSpan.textContent = '0'; 

            // Event listener for 'continue shopping' button
            let closeBtn = document.querySelector('.cart-btn-2');
        
            closeBtn.addEventListener('click', () => {
                body.classList.remove('activeSidebar');
                overlay.classList.remove('active');
            });

        } else {
            cart.forEach(item => {
                let newItem = document.createElement('div')
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id; // Add item identifier

                // Get information about the product
                let positionProduct = products.findIndex((value) => value.id == item.product_id);
                let info = products[positionProduct];

                if (positionProduct >= 0 && info) {
                    newItem.innerHTML = 
                    `<div class="image-bg">
                        <div class="image">
                            <img src="${info.images[0]}" alt="cart-image">
                        </div>
                    </div>
                    <div class="info">
                        <div class="name">
                            ${info.name}
                        </div>
                        <div class="price">
                            <p>${info.price}.-</p>
                        </div>
                        <div class="addRemove">
                            <div class="quantity">
                                <span class="minus" data-id="${info.id}">-</span>
                                <span>${item.quantity}</span>
                                <span class="plus" data-id="${info.id}">+</span>
                            </div>
                            <span class="remove" data-id="${info.id}">Remove</span>
                        </div>
                    </div>`;

                    cartList.appendChild(newItem); // Append code to .cart-items
                    totalQuantity = totalQuantity + item.quantity;
                }
            })

            // Create a checkout button
            let navBtn = document.createElement('div');
            navBtn.classList.add('cart-navigation');
            navBtn.innerHTML = 
            `<button class="checkout-cart-btn-2" onclick="window.location='checkout.html'">CHECKOUT</button>`;
            
            cartList.appendChild(navBtn);
            
            cartSpan.textContent = totalQuantity; // Show quantity in cart icon
            myCartSpan.textContent = totalQuantity;
        }
    }

    // ---------------- EVENT LISTENERS: INSIDE CART ----------------
    document.addEventListener('click', (event) => {
        let clickBtn = event.target;
        let productId = clickBtn.dataset.id;
        let position = cart.findIndex((value) => value.product_id == productId);
        
        let quantity;
        if (position < 0) { // Item is not in the cart
            quantity = 0; 
        } else {
            quantity = cart[position].quantity; // Get quantity of item
        }

        if (clickBtn.classList.contains('btn-cart') || clickBtn.classList.contains('plus')){
            quantity++;
            productInCart(productId, quantity, position);
        } else if (clickBtn.classList.contains('minus')) {
            quantity--;
            productInCart(productId, quantity, position);
        } else if (clickBtn.classList.contains('remove')) {
            productInCart(productId, 0, position); // Remove from cart
        } 
    })
    
    // ------------ LOAD SAVED ITEMS ----------------
    const currentCart = () => {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            cartItemList();
        }
    }
    currentCart();
};
export default cart;

export const getCartItems = () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    return cart;
};