'use strict';

//Modal

//signUp
const modalSignUp = document.getElementById("myModalSignUp");

const btnSignUp = document.getElementById("signUp");

const spanSignUp = document.getElementsByClassName("close")[0];

btnSignUp.onclick = function() {
    modalSignUp.style.display = "block";
}

spanSignUp.onclick = function() {
    modalSignUp.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalSignUp) {
        modalSignUp.style.display = "none";
    }
}
//signUp end


//login
const modalLogin = document.getElementById("myModalLogin");

const btnLogin = document.getElementById("login");

const spanLogin = document.getElementsByClassName("close")[0];

btnLogin.onclick = function() {
    modalLogin.style.display = "block";
}

spanLogin.onclick = function() {
    modalLogin.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalLogin) {
        modalLogin.style.display = "none";
    }
}
//login end

//Modal end