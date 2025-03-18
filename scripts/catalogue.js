import products from "../products.js";

let allProducts = []; // Store products by category or by search

// ---------- IS IT FULL CATEGOSIED CATALOGUE? IS IT SEARCHED CATALOGUE? ----------
export const searchDetails = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get('search');  // Get the search parameter from URL

    if (search) {
        allProducts = products.filter(product => 
            product.name.toLowerCase().includes(search.toLowerCase()));
        
        updateSearchPageDetails(search);
        displayProducts(allProducts); 
        filterButtons();
    }
};

export const pageCatalogue = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const category = searchParams.get('category');

    if (category) {
        allProducts = products.filter(product => product.category === category);
        
        updateCategoryPageDetails(category);
        displayProducts(allProducts); // Display products according to the category or search
        filterButtons(); // Filter products FROM categorised products (Nothing to do with search)
    }
};

// --------------------------- PAGE DETAILS -------------------------------
// Change page title, breadcrumbs path and other things within the page

// ----- CATAGORY --------
const updateCategoryPageDetails = (category) => {
    const catalogueTitle = document.querySelector('.catalogue-title h1');
    const currentPage = document.querySelector('.breadcrumb li:last-child');
    const productCount = document.querySelector('.catalogue-count p');

    const allProductCount = allProducts.length; // Count products
    productCount.textContent = `${allProductCount} Products`;

    // Over-ear category
    if (category === "over-ear") {
        document.title = `Over-Ear | stompsound`;
        catalogueTitle.textContent = "Over-Ear Headphones";
        currentPage.textContent = "Over-Ear";
    // On-ear category
    } else if (category === "on-ear") {
        document.title = "On-Ear | stompsound";
        catalogueTitle.textContent = "On-Ear Headphones";
        currentPage.textContent = "On-Ear";
    // In-ear category
    } else {
        document.title = "In-Ear | stompsound";
        catalogueTitle.textContent = "In-Ear Headphones";
        currentPage.textContent = "In-Ear";
    }
};

// ----- SEARCH --------
const updateSearchPageDetails = (search) => {
    const currentPage = document.querySelector('.breadcrumb li:last-child');
    const searchTitle = document.querySelector('.catalogue-title h1');
    const searchCount = document.querySelector('.catalogue-count p');
    
    document.title = `Search: ${search} | stompsound`;
    currentPage.textContent = `Search: "${search}"`;
    searchTitle.textContent = 'Search Results'

    // Change content shown when search is not found
    let filterContainer = document.querySelector('.product-filter');
    let getContainer = document.querySelector('.search-list');
    getContainer.innerHTML = '';

    if (allProducts.length > 0) {
        searchCount.innerHTML = `${allProducts.length} Results found for <span class="highlight">"${search}"</span>`;
        filterContainer.style.display = 'block';
    } else {
        searchCount.innerHTML = `No results found for <span class="highlight">"${search}"</span>`;
        filterContainer.style.display = 'none';
        
        let searchContent = document.createElement('div');

        searchContent.innerHTML = 
        `<div class="search-not-found">
            <h1>OOPS...</h1>
            <div class="not-found-icon">
                <img src="assets/not-found.png" alt="not-found-icon">
            </div>
            <h4>We couldn't find any results for <span class="highlight">"${search}"</span></h4>
            <div class="main-btn">
                <div class="main-btn-2">
                    <a href="home.html"><button class="btn-2">BACK TO HOMEPAGE</button></a>
                </div>
            </div>
        </div>`;

        getContainer.appendChild(searchContent);
    }
};

// ---------------- CATAGORY & SEARH: DISPLAY CONTENT ----------------
const displayProducts = (productsToDisplay) => { // Display only specific products (for filtering)
    const productList = document.querySelector('.product-list');
    productList.innerHTML = ''; // Clear previous products

    productsToDisplay.forEach(product => {
        let productItems = document.createElement('div');
        productItems.classList.add('item');
        productItems.dataset.id = product.id;  // Add data-id for each item added
        
        // Turn overall rating into coloured stars
        let overallRating = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= product['overall-rating']) {
                overallRating += `<p><span class="highlight">★</span></p>`;
            } else {
                overallRating += `<p>★</p>`;
            }
        }

        productItems.innerHTML = 
        `<div class="product-content">
            <div class="product-bg">
                <div class="product-image">
                    <a href="/details.html?id=${product.id}">
                    <img class="product-img" src="${product.images[0]}" alt="product-image"></a>
                </div>
                <div class="product-btn">
                    <img class="btn-cart" src="/assets/cart.png" alt="cart-icon" data-id="${product.id}">
                </div>
            </div>
            <div class="product-text">
                <div class="product-name">
                    <h6><a href="/details.html?id=${product.id}">${product.name}</a></h6>
                </div>
                <div class="product-price">
                    <h6><span class="highlight">${product.price.toLocaleString('en')}.-</span></h6>
                </div>
                <div class="rating">
                    ${overallRating}
                </div>
            </div>
        </div>`;
        
        productList.appendChild(productItems);
    })
};
// ---------------- FILTERING: EVENT LISTENER ----------------
const filterButtons = () => {
    const filterBtn = document.querySelectorAll('.filter');

    filterBtn.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.dataset.filter; // Get value from each filter data-filter
            filterProducts(filterValue)
        })
    })
};

// ---------------- FILTERING: DISPLAY CONTENT ----------------
function filterProducts(filterValue) {
    const filteredProducts = allProducts.filter(product => {
        if (filterValue === 'clear') {
            return true;  // Show all products
        } else if (filterValue === 'black' || filterValue === 'ivory' || filterValue === 'white') {
            return product.color.includes(filterValue);  // Filter by color
        } else {
            return product.features.includes(filterValue);  // Filter by feature
        }
    })
    displayProducts(filteredProducts);  // Display filtered products
};