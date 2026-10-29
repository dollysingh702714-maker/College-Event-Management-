"use strict";

const loginForm = document.getElementById("loginForm");
const roleInput = document.getElementById("role");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const submitButton = loginForm.querySelector('button[type="submit"]');

const accountsByRole = {
    admin: {
        email: "dollysingh702714@gmail.com",
        password: "905088",
        dashboard: "admin-dashboard.html"
    },
    student: {
        email: "divyakaushik931@gmai.com",
        password: "922051",
        dashboard: "student-dashboard.html"
    },
    volunteer: {
        email: "rajbala82220@gmail.com",
        password: "822200",
        dashboard: "volunteer-dashboard.html"
    }
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
    const hasRole = Object.prototype.hasOwnProperty.call(accountsByRole, role);

    if (!hasRole) {
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

    const account = accountsByRole[role];
    if (email.toLowerCase() !== account.email.toLowerCase() || password !== account.password) {
        showMessage("Email or password is incorrect for the selected role.", "#b42318");
        passwordInput.focus();
        return;
    }

    showMessage("Opening your dashboard...", "#247a46");
    submitButton.disabled = true;
    window.location.assign(account.dashboard);
});
