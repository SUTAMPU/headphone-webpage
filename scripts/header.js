const pageHeader = () => {
    const headerContent = `
    <div class="overlay"></div>
    
    <div id="header-content">
        <!-- Navigation bar -->
        <header>
            <!-- Left side -->
            <div class="left">
                <a href="home.html"><img class="logo-1" src="/assets/logo-1.png" alt="logo-1"></a>
            </div>

            <!-- Middle -->
            <div class="mid"> <!-- Link is ? due to generated HTML -->
                <a href="catalogue.html?category=over-ear">OVER-EAR</a>
                <a href="catalogue.html?category=on-ear">ON-EAR</a>
                <a href="catalogue.html?category=in-ear">IN-EAR</a>
            </div>

            <!-- Right side -->
            <div class="right">
                <div class="search">
                    <img class="search-icon" src="/assets/search.png" alt="search-icon">
                    <form id="searchForm">
                        <input id="search" class="search-input" name="search" type="search" placeholder="Search">
                    </form>
                </div>
                <div class="cart-icon">
                    <div class="cart-icon-filled">
                        <img src="/assets/cart.png" alt="cart-icon"></a>
                        <span>0</span>
                    </div>
                </div>
            </div>
        </header>
        
        <!-- Cart content -->
        <div class="sidebar">
            <div class="close-icon">
                <img class="close-icon-img" src="/assets/close.png" alt="close-icon"></a>
            </div>
            <div class="my-cart">
                <h2>My cart (<span>0</span>)</h2>
            </div>
            <hr>

            <div class="cart">
                <div class="cart-items">
                    <!-- Cart item -->
                </div>
            </div>
        </div>
    </div>`;
    
    document.getElementById('header-container').innerHTML = headerContent;

    // ---------------- EVENT LISTENER ----------------
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault() // Default would append current page URL

        const searchInput = document.getElementById('search').value;
        console.log(searchInput);

        if (searchInput) {
            window.location.href = `catalogue.html?search=${searchInput}`;
        } else {
            console.warn("Sorry, search cannot be empty!");
        }
    });
};
export default pageHeader;