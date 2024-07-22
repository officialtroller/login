document.addEventListener('DOMContentLoaded', () => {
    const mailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    const mailelm = document.getElementsByClassName("email");
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const passwordelm = document.getElementsByClassName("password");
    function updateStyles(element, isValid) {
        if (isValid) {
            element.style.boxShadow = "0 0 10px aqua";
            element.style.outline = "1px solid aqua";
        } else {
            element.style.boxShadow = "0 0 10px red";
            element.style.outline = "1px solid red";
        }
    }

    Array.from(mailelm).forEach(element => {
        function validateEmail() {
            if (mailRegExp.test(element.value)) {
                updateStyles(element, true);
            } else {
                updateStyles(element, false);
            }
        }
        element.addEventListener('focus', () => {
            validateEmail();
        });
        element.addEventListener('input', () => {
            validateEmail();
        });
        element.addEventListener('blur', () => {
            if (!element.value) {
                element.style.boxShadow = "none";
                element.style.outline = "none";
            } else {
                validateEmail();
            }
        });
    });

    Array.from(passwordelm).forEach(element => {
        function validatePassword() {
            if (passwordRegExp.test(element.value)) {
                updateStyles(element, true);
            } else {
                updateStyles(element, false);
            }
        }
        element.addEventListener('focus', () => {
            validatePassword();
        });
        element.addEventListener('input', () => {
            validatePassword();
        });
        element.addEventListener('blur', () => {
            if (!element.value) {
                element.style.boxShadow = "none";
                element.style.outline = "none";
            } else {
                validatePassword();
            }
        });
    });
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const deleteAccountForm = document.getElementById('deleteAccountForm');
    const Header = document.querySelector(".header header");
    Header !== null && (console.log("Header found"))

    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const deleteAccountButton = document.getElementById('deleteAccountButton');

    // Routing function
    function handleRoute() {
        const hash = window.location.hash;
        loginForm.classList.add('hidden');
        registerForm.classList.add('hidden');
        deleteAccountForm.classList.add('hidden');

        if (hash === '#/register') {
            registerForm.classList.remove('hidden');
            Header.innerText = "Register";
        } else if (hash === '#/delete-account') {
            deleteAccountForm.classList.remove('hidden');
            Header.innerText = "Delete Account";
        } else {
            loginForm.classList.remove('hidden');
            Header.innerText = "Login";
        }
    }

    // Initial route handling
    handleRoute();

    // Listen for hash changes
    window.addEventListener('hashchange', handleRoute);

    loginButton.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    registerButton.addEventListener('click', async () => {
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Registration successful
                window.location.hash = ''; // Redirect to login page
            } else {
                alert(data.message); // Show error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    deleteAccountButton.addEventListener('click', async () => {
        const email = document.getElementById('deleteEmail').value;
        const password = document.getElementById('deletePassword').value;

        try {
            const response = await fetch('http://localhost:3000/api/delete-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Account deletion successful
                window.location.hash = ''; // Redirect to login page
            } else {
                alert(data.message); // Show error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
    const togglePassword = (passwordField, eyeIcon) => {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        eyeIcon.classList.toggle('fa-eye-slash');
    };

    document.querySelectorAll('.inputs').forEach(field => {
        const passwordInput = field.querySelector('input[type=password]');
        const eyeIcon = field.querySelector('.fa-eye');
        eyeIcon.addEventListener('click', () => togglePassword(passwordInput, eyeIcon));
    });
});
