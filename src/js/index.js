document.addEventListener('DOMContentLoaded', () => {
    const mailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    const mailelm = document.getElementById("email");
    const maailnamei = document.getElementById("emailname");
    const passwordRegExp = /^(?=.*[a-z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const passwordelm = document.getElementById("password");
    const passwordnamei = document.getElementById("passwordname");

    mailelm.addEventListener('blur', () => {
        if (!mailRegExp.test(mailelm.value)) {
            mailelm.style.boxShadow = "0 0 10px red";
            maailnamei.innerText = "Mail type is incorrect";
        } else {
            mailelm.style.boxShadow = "0 0 10px aqua";
            maailnamei.innerText = "E-Mail";
        }
    });
    passwordelm.addEventListener('blur', () => {
        if (!passwordRegExp.test(passwordelm.value)) {
            passwordelm.style.boxShadow = "0 0 10px red";
            passwordnamei.innerText = "Password must include a uppercase a lowercase letter, a number and has to be 8 letters long."
        } else {
            passwordelm.style.boxShadow = "0 0 10px aqua";
            passwordnamei.innerText = "Password"
        }
    });
    document.querySelector('.password-toggle').addEventListener('click', function () {
        const passwordInput = document.querySelector('#password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });
});
