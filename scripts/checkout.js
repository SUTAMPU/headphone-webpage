import pageHeader from './header.js';
import cart from './cart.js';

import products from "../products.js";
import { getCartItems } from './cart.js';

window.onload = () => {
    pageHeader();
    cart();
    orderSummary();
}

// Load separately since cart needs to be shown in every page
// Would not work with checkout as it needs checkout.html for class name
// Error in import

// ---------------- DISPLAY CONTENT ----------------
const orderSummary = () => {
    const cart = getCartItems(); // Get cart items

    if (cart.length === 0) {
        console.log("Checkout page loaded: Cart is empty")
    } else {
        console.log(cart); // Check cart items
        const summaryList = document.querySelector('.summary-list');

        let totalQuantity = 0;
        let subtotalPrice = 0;

        cart.forEach(cartItem => { // Convert to number to match data type with product.id (originally string)
            let product = products.find(product => product.id === Number(cartItem.product_id)); // Get product details from items id

            if (product) { // If product is found
                let summaryItems = document.createElement('div');
                summaryItems.classList.add('item');
                summaryItems.dataset.id = cartItem.id;  // Add data-id for each item added
                
                console.log(cartItem.product_id);
                console.log(cartItem.quantity)
                console.log(product.price)

                let totalPrice = cartItem.quantity * product.price;

                summaryItems.innerHTML = 
                `<div class="summary-product">
                    <div class="image-bg">
                        <div class="image">
                            <img src="${product.images[0]}" alt="item-image">
                        </div>
                    </div>
                    
                    <div class="product-details">
                        <h4>${product.name}</h4>
                        <h4>${product.price.toLocaleString('en')}.-</h4>
                        <div class="quantity">
                            <h5>Quantity:</h5>
                            <h5>x${cartItem.quantity}</h5>
                        </div>
                        <div class="total">
                            <h5>Total:</h5>
                            <h5>${totalPrice.toLocaleString('en')}.-</h5>
                        </div>
                    </div>
                </div>
                <hr>`;

                summaryList.appendChild(summaryItems);
                
                // Add the number every time the loop goes through
                totalQuantity = totalQuantity + cartItem.quantity;
                subtotalPrice = subtotalPrice + totalPrice;
            }
        })

        // Create order total summary after all product listed
        let orderTotals = document.createElement('div');
        orderTotals.classList.add('order-totals');
        
        let shippingPrice = 50;
        let superTotalPrice = subtotalPrice + shippingPrice;

        orderTotals.innerHTML = 
        `<div class="subtotal-price">
            <h5>Subtotal</h5>
            <h5>${subtotalPrice.toLocaleString('en')}THB</h5>
        </div>
        <div class="shipping-price">
            <h5>Shipping</h5>
            <h5>${shippingPrice.toLocaleString('en')}THB</h5>
        </div>
        <div class="total-price">
            <h3>Total</h3>
            <h3>${superTotalPrice.toLocaleString('en')}THB</h3>
        </div>`;
        
        console.log(orderTotals)
        console.log(summaryList)
        summaryList.appendChild(orderTotals);
        
        // Update the quantity text
        let orderSummarySpan = document.querySelector('.order-summary span');
        orderSummarySpan.textContent = totalQuantity;
    }
};