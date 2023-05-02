'use strict';
import {url} from '../conf.js';

// select existing html elements
const modUserForm = document.querySelector('#userSettings');
// submit add user form
modUserForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(modUserForm);
    // remove empty properties
    for (const [prop, value] of Object.entries(data)) {
        if (value === '') {
            delete data[prop];
        }
    }
    const fetchOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    };
    const response = await fetch(url + '/user', fetchOptions);
    const json = await response.json();
    if (json.error) {
        alert(json.error.message);
    } else {
        alert(json.message);
    }
    location.href = 'index.html';
});