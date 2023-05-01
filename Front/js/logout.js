'use strict';
const url = 'https://bcwt-server1.westeurope.cloudapp.azure.com'; // change url when uploading to server

(async () => {
    try {
        const response = await fetch(url + '/auth/logout');
        const json = await response.json();
        console.log(json);
        // remove token
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        alert('You have logged out');
        location.href = 'login.html';
    } catch (e) {
        console.log(e.message);
    }
})();