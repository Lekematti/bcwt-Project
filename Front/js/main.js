'use strict';
// Modal functionality
const modalSignUp = document.getElementById("myModalSignUp");
const btnSignUp = document.getElementById("signUpBtn");
const spanSignUp = document.getElementsByClassName("close1")[0];
// Show the sign up modal when clicked
btnSignUp.onclick = function() {
    modalSignUp.style.display = "block";
}
// Hide the sign up modal when close button is clicked
spanSignUp.onclick = function() {
    modalSignUp.style.display = "none";
}
const modalLogin = document.getElementById("myModalLogin");
const btnLogin = document.getElementById("login");
const spanLogin = document.getElementsByClassName("close2")[0];
// Show the login modal when clicked
btnLogin.onclick = function() {
    modalLogin.style.display = "block";
}
// Hide the login modal when close button is clicked
spanLogin.onclick = function() {
    modalLogin.style.display = "none";
}
// Hide the modals when clicked outside the modal
window.onclick = function(event) {
    if (event.target === modalSignUp) {
        modalSignUp.style.display = "none";
    } else if (event.target === modalLogin) {
        modalLogin.style.display = "none";
    }
}
// End of modal functionality

// Login/signup functionalities
const submitLogIn = document.getElementById("submitLogin");
// Check if the user has entered the correct information to login
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
// Check if the user has entered the correct information to sign up
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
