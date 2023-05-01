'use strict';
//Modal

const modalSignUp = document.getElementById("myModalSignUp");
const btnSignUp = document.getElementById("signUpBtn");
const spanSignUp = document.getElementsByClassName("close1")[0];

btnSignUp.onclick = function() {
    modalSignUp.style.display = "block";
}

spanSignUp.onclick = function() {
    modalSignUp.style.display = "none";
}

const modalLogin = document.getElementById("myModalLogin");
const btnLogin = document.getElementById("login");
const spanLogin = document.getElementsByClassName("close2")[0];

btnLogin.onclick = function() {
    modalLogin.style.display = "block";
}

spanLogin.onclick = function() {
    modalLogin.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modalSignUp) {
        modalSignUp.style.display = "none";
    } else if (event.target === modalLogin) {
        modalLogin.style.display = "none";
    }
}
//Modal end
//login/signup functionalities

const submitLogIn = document.getElementById("submitLogin");

submitLogIn.addEventListener("click", function (event) {
    const userName = document.getElementById("userNameIn").value;
    const password = document.getElementById("passwordIn").value;

    if (!userName || !password) {
        alert("Fill in correct information!")
        event.preventDefault();
    }else{
        window.location.href = "index.html";
    }
});
const submitSignUp = document.getElementById("submitSignup");

submitSignUp.addEventListener("click", function (event) {
    const username = document.getElementById("userNameUp").value;
    const email = document.getElementById("emailUp").value;
    const password = document.getElementById("passwordUp").value;

    if ( !email || !username || !password) {
        alert("Fill in correct information!")
        event.preventDefault();
    }else{
        window.location.href = "userView.html";
    }
});