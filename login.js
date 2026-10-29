"use strict";

const loginForm = document.getElementById("loginForm");
const roleInput = document.getElementById("role");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const submitButton = loginForm.querySelector('button[type="submit"]');

const dashboardByRole = {
    admin: "admin-dashboard.html",
    student: "student-dashboard.html",
    volunteer: "volunteer-dashboard.html"
};

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

function clearMessage() {
    message.textContent = "";
    message.style.color = "";
}

loginForm.addEventListener("input", clearMessage);

emailInput.addEventListener("blur", function () {
    emailInput.value = emailInput.value.trim();
});

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearMessage();

    const role = roleInput.value;
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const dashboard = dashboardByRole[role];

    if (!dashboard) {
        showMessage("Please select a valid role.", "#b42318");
        roleInput.focus();
        return;
    }

    if (!email || !emailInput.validity.valid) {
        showMessage("Please enter a valid email address.", "#b42318");
        emailInput.focus();
        return;
    }

    if (!password) {
        showMessage("Please enter your password.", "#b42318");
        passwordInput.focus();
        return;
    }

    showMessage("Opening your dashboard...", "#247a46");
    submitButton.disabled = true;
    window.location.assign(dashboard);
});
