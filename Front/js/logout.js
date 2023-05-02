'use strict';

// importing url from conf.js file
import {url} from '../conf.js';

// Immediately Invoked Function Expression (IIFE)
// to execute the code as soon as it is defined
(async () => {
    try {
// calling API endpoint for logout
        const response = await fetch(url + '/auth/logout');
        // converting the response into json format
        const json = await response.json();
        console.log(json);

        // removing token and user from session storage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');

        // displaying logout message and redirecting to login page
        alert('You have logged out');
        location.href = 'login.html';
    } catch (e) {
        console.log(e.message);
    }
})();