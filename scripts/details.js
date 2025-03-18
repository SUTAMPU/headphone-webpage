import products from "../products.js";

export const pageDetails = () => {
    let productId = new URLSearchParams(window.location.search).get('id');
    let thisProduct = products.find(value => value.id == productId); // Check object with the same product id
    
    // ---------------- EDIT DETAILS PAGE ----------------
    // Change document title, breadcrumbs path, and headphone type
    const previousPage = document.querySelector('.breadcrumb li:nth-last-child(2)');
    const currentPage = document.querySelector('.breadcrumb li:last-child');

    // Over-ear category
    if (thisProduct.category === "over-ear") {
        document.title = `${thisProduct.name} | stompsound`;
        previousPage.innerHTML = `<a href="catalogue.html?category=over-ear">Over-ear</a>`;
        currentPage.textContent = `${thisProduct.name}`;
    
    // On-ear category
    } else if (thisProduct.category === "on-ear") {
        document.title = `${thisProduct.name} | stompsound`;
        previousPage.innerHTML = `<a href="catalogue.html?category=on-ear">On-ear</a>`;
        currentPage.textContent = `${thisProduct.name}`;
    // In-ear category
    } else {
        document.title = `${thisProduct.name} | stompsound`;
        previousPage.innerHTML = `<a href="catalogue.html?category=in-ear">In-ear</a>`;
        currentPage.textContent = `${thisProduct.name}`;
    }

    showProductDetail(thisProduct);  // Display product details page
    return thisProduct;
};

// ---------------- DETAILS: DISPLAY CONTENT ----------------
const showProductDetail = (thisProduct) => {
    let getProductDetail = document.querySelector('.product-detail');
    let productDetail = document.createElement('div');
    
    // Match category to current product's category
    let categoryText = '';
    if (thisProduct.category === "over-ear") {
        categoryText = "Over-Ear Headphones";
    } else if (thisProduct.category === "on-ear") {
        categoryText = "On-Ear Headphones";
    } else {
        categoryText = "In-Ear Headphones";
    }

    // Turn overall rating into coloured stars
    let overallRating = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= thisProduct['overall-rating']) {
            overallRating += `<p><span class="highlight">★</span></p>`;
        } else {
            overallRating += `<p>★</p>`;
        }
    }

    productDetail.innerHTML = 
    `<!-- Detail: Image -->
        <div class="main-container">
        <div class="detail">
            <div class="image">
                <div class="main-image">
                    <div class="main-image-bg">
                        <img id="main-img" src="${thisProduct.images[0]}" alt="main-image">
                    </div>
                </div>
                <div class="sub-images">
                    <div class="sub-image-1-bg">
                        <img id="img-0" src="${thisProduct.images[0]}" onclick="document.getElementById('main-img').src='${thisProduct.images[0]}'" alt="sub-image-0">
                    </div>
                    <div class="sub-image-2-bg">
                        <img id="img-1" src="${thisProduct.images[1]}" onclick="document.getElementById('main-img').src='${thisProduct.images[1]}'" alt="sub-image-1">
                    </div>
                    <div class="sub-image-3-bg">
                        <img id="img-2" src="${thisProduct.images[2]}" onclick="document.getElementById('main-img').src='${thisProduct.images[2]}'" alt="sub-image-2">
                    </div>
                </div>
            </div>
            
            <!-- Detail: Text -->
            <div class="text">
                <div class="detail-text">
                    <div class="category">${categoryText}</div>
                    <div class="name">${thisProduct.name}</div>
                    <hr>
                    <div class="price">${thisProduct.price.toLocaleString('en')}.-</div>
                    <div class="review-container">
                        <div class = "rating-star">
                            ${overallRating}
                        </div>
                        <div class="rating">${thisProduct['overall-rating']}</div>
                        <div class="separator">|</div>
                        <div class="review-btn">
                            <button id="reviews">See reviews</button>
                        </div>
                    </div>
                    <h4 class="description-title">${thisProduct["description-title"]}</h4>
                    <p class="description-text">${thisProduct["description-text"]}</p>
                    <div class="cart-btn">
                        <button class="btn-cart" data-id="${thisProduct.id}">ADD TO CART</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>`;
    // Swap image by using onclick function:
    // onclick="document.getElementById('main-img').src='${thisProduct.images[0]
    
    getProductDetail.appendChild(productDetail);
}
// ---------------- REVIEWS ----------------
export const showReviews = (thisProduct) => {
    // ---------------- EVENT LISTENERS ----------------
    let openReviewSidebar = document.querySelector('.review-container .review-btn');
    let closeReviewSidebar = document.querySelector('.review-sidebar .close-icon-2');
    let overlay = document.querySelector('.overlay');
    let body = document.querySelector('body');

    openReviewSidebar.addEventListener('click', () => {
        body.classList.add('activeReviewSidebar');
        overlay.classList.add('active');
    })
    closeReviewSidebar.addEventListener('click', () => {
        body.classList.remove('activeReviewSidebar');
        overlay.classList.remove('active');
    })

    // ---------------- DISPLAY CONTENT ----------------
    const reviewContent = () => {
        const reviewerList = document.querySelector('.reviewer-list');
        reviewerList.innerHTML = ''; // Clear previous reviewers
    
        for (let j = 0; j < thisProduct.reviewer.length; j++) {
            let reviewPerson = document.createElement('div');
            reviewPerson.classList.add('person');

            // Turn individual rating into coloured stars
            let rating = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= thisProduct.rating[j]) {
                    rating += `<p><span class="highlight">★</span></p>`;
                } else {
                    rating += `<p>★</p>`;
                }
            }
            
            // Choose the emotion image according to ratings (and TNI friends :D)
            let emotion = '';
            if (thisProduct.reviewer[j] == ("TNI Classmates")) {
                emotion = "assets/friends.png"
            } else if (thisProduct.rating[j] == 5) {
                emotion = "assets/happy.png"
            } else if (thisProduct.rating[j] == 4) {
                emotion = "assets/happy-2.png"
            } else if (thisProduct.rating[j] == 3) {
                emotion = "assets/neutral.png"
            } else if (thisProduct.rating[j] == 2) {
                emotion = "assets/sad-2.png"
            } else {
                emotion = "assets/sad.png"
            }
        
            reviewPerson.innerHTML = 
            `<div class = "rating-star">
                ${rating}
            </div>
            <div class="reviewer">
                <div class="emotion"><img src="${emotion}" alt="emotion"></div>
                <div class="reviewer-name">${thisProduct.reviewer[j]}</div>
            </div>
            <div class="comment">${thisProduct.reviews[j]}</div>`;
            
            reviewerList.appendChild(reviewPerson)
        }
    }
    reviewContent();
};