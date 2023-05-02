'use strict';
import {url} from '../conf.js';
//const url = 'http://localhost:3000';
(async () => {
    // check sessionStorage
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        location.href = 'index.html';
        return;
    }
    // check if token valid
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/user/token', fetchOptions);
        if (!response.ok) {
            location.href = 'userView.html';
        } else {
            const json = await response.json();
            sessionStorage.setItem('user', JSON.stringify(json.user));
        }
    } catch (e) {
        console.log(e.message);
    }
})();
