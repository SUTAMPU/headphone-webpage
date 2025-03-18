import pageHeader from './scripts/header.js';
import cart from './scripts/cart.js';

import { searchDetails, pageCatalogue } from './scripts/catalogue.js';
import { pageDetails, showReviews } from './scripts/details.js';

// ---------- CALL FUNCTIONS ON EVERY PAGE ----------
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