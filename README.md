# DGE-304: Final Project
![homepage-1](https://github.com/SUTAMPU/headphone-webpage/blob/main/previews/homepage-1.png?raw=true)

## Webpages
Previews of each page can be seen in the _previews_ folder, where it consists as follows:
- Homepage
- Catalogue
- Details
- Checkout

## How the code works
The webpage consists of the header, body, and footer. The container in each webpage is blank as the function will append innerHTML from the own __.js__ files. Each webpage uses __script.js__ to import all the functions depending on the kind of webpage. Therefore, all the functions and page displays will work depending on the URL redirected to.

## Main imports: script.js
The __page header__ and the __cart__ are imported in every webpage by calling the __pageHeader()__ and __cart() functions. The __searchDetails(), pageCatalogue(), pageDetails()__ and __showReviews()__ handle search, catalog, and product's detail webpage.
```
window.onload = () => {
   pageHeader();
   cart();

    // ---------- CALL FUNCTIONS ACCORDING TO WEBPAGE ----------
    const activePage = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get('search');

    if (search) {
         searchDetails();
   
   } else if (activePage.includes('catalogue.html')) {
      pageCatalogue();

   } else if (activePage.includes('details.html')) {
      const thisProduct = pageDetails();
      showReviews(thisProduct);
   }
 };
```
__window.onload__ works when the page loads, where it will automatically calls the corresponding functions. It finds the active page (catalogue.html, details.html, etc.) by checking the URL path and parameters:
- If there’s a search term (once submit the user will be redirect to catalogue.html), it runs searchDetails().
- If it’s the catalogue page (catalogue.html), it runs pageCatalogue().
- If it’s the product details page (details.html), it calls pageDetails() and showReviews().

## Product data: product.js
The __product.js__ is the central source where all of the product datas are saved.
```
    {
        "id": 1,
        "category": "over-ear",
        "name": "Sony WH-1000XM4",
        "price": 11990,
        "color": "ivory",
        "images": [".webp", ".webp", ".webp"],
        "features": ["noise-cancelling", "ambient-sound", "bluetooth"],
        "description-title": "--",
        "description-text": "--",
        "overall-rating": 3.3,
        "rating": [5, 4, 2],
        "reviewer": ["--"],
        "reviews": ["--"],
    },
```
The information are saved in an array of objects.

## HTML structure: webpage.html
All the __.html__ files has a structure of their own webpage type. For example, _catalogue.html_ would have a structure of text-content and product-content etc. while _details.html_ would have a structure of product-image-content and product-details-conent.
```
    <div id="header-container"></div>

    <!-- Main content -->
    <div class="container">
    </div>

    <footer>
    </footer>
```

## Script files
### header.js
- Loads the navigation bar (header) and cart into the page.
- Has an event listener in search form and redirect the user to __catalogue.html__ with the search query.
```
// Get and replace the HTML content
const headerContent = `
    <div id="header-content">
    </div>`;

document.getElementById('header-container').innerHTML = headerContent;
   ```
### cart.js
- Handles the shopping cart sidebar.
- Adds/removes items from the cart and updates the cart display and quantity.
- Use localStorage to save items on the user's browser which can then be loaded when the they revisit the page.
```
// Event listener
openSidebar.addEventListener('click', () => {
    body.classList.add('activeSidebar');
    overlay.classList.add('active');
});

// Each button has a data-id of the product=id
let productId = clickBtn.dataset.id;
<button class="btn-cart" data-id="${product.id}">ADD TO CART</button>I

// Create an element to insert into HTML and add that element as a child of an existing element
let newItem = document.createElement('div');
newItem.classList.add('item');
newItem.innerHTML = `<div class="image-bg">...</div>`;
cartList.appendChild(newItem);

// Check if an item is already in cart using findIndex(). The following will find out if the product_id in cart matches the product_id in products.js or not.
let position = cart.findIndex((value) => value.product_id == productId);

// It will return -1 if the item is not found. Use cart.push and cart.splice to add items or remove items
if (position < 0) {
    cart.push({ product_id: productId, quantity: quantity });
}
if (quantity === 0 && position >= 0) {
    cart.splice(position, 1);
}

// Use text.Content to change the text content within an element
cartSpan.textContent = totalQuantity;
```
### catalogue.js: pageCatalogue() and searchDetails()
Both functions update the page details (title, breadcrumbs) and display relevant products.
- pageCatalogue(): Filters products based on category (over-ear, on-ear, in-ear) and displays them on the catalog page.
- searchDetails(): Handles search queries, filtering products by name, and displays matching results.
```
// Repeat over arrays using forEach()
productsToDisplay.forEach(product => {
     let productItems = document.createElement('div');
     productItems.classList.add('item');
     productItems.dataset.id = product.id; 
     
     productItems.innerHTML = 
     `<div class="product-content">
     </div>`;
     
     productList.appendChild(productItems);
 });
```
### details.js (1): pageDetails(), showProductDetail() and showReviews()
- pageDetails(): Loads product details based on the id from the URL, sets the page title, and updates breadcrumbs.
- showProductDetail(): Retrieve and displays the product information.
- showReviews(): Display the reviews for a product with an event listener.
```
// Select a single HTML element
const previousPage = document.querySelector('.breadcrumb li:nth-last-child(2)');
```

### checkout.js: orderSummary()
- Get the cart data from localStorage, calculates the total price and quantity, and displays an order summary on the checkout page.
```
// Dinamically et the information from the array using embedded variables and template string
let productName = product.name;
let message = "The product is called " + productName;
   // Can be written as...
let message = `The product is called ${product.name}`;
```
