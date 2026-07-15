// ==============================
// Ganzon's Smart POS Login
// ==============================

// Show / Hide Password

const showPassword = document.getElementById("showPassword");
const password = document.getElementById("password");

showPassword.addEventListener("change", function () {

    if (this.checked) {

        password.type = "text";

    } else {

        password.type = "password";

    }

});

// Login

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const username = document
        .getElementById("username")
        .value
        .trim();

    const pass = document
        .getElementById("password")
        .value
        .trim();

    // Demo Accounts

    if (username === "admin" && pass === "123456") {

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", "Admin");

        alert("Welcome Admin!");

        window.location.href = "dashboard.html";

    }

    else if (username === "cashier" && pass === "123456") {

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", "Cashier");

        alert("Welcome Cashier!");

        window.location.href = "dashboard.html";

    }

    else {

        alert("Incorrect username or password.");

    }

});