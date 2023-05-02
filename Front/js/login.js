'use strict';

// Importing url from conf.js file
import {url} from '../conf.js';

// Selecting existing HTML elements
const loginForm = document.querySelector('#loginForm');
const addUserForm = document.querySelector('#signUpForm');

// Event listener for login form submission
loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    // Serializing the form data into JSON format
    const data = serializeJson(loginForm);

// Creating fetch options to be passed to the fetch function
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

// Making a POST request to the server to log in the user
    const response = await fetch(url + '/auth/login', fetchOptions);
    const json = await response.json();
    console.log('login response', json);

// If login is unsuccessful, display an alert message
    if (!json.user) {
        alert(json.message);
    } else {
        // Save token and user data in session storage
        sessionStorage.setItem('token', json.token);
        sessionStorage.setItem('user', JSON.stringify(json.user));

        // Redirect to userView.html page
        location.href = 'userView.html';
    }
});
