const passwordInput = document.getElementById('password-input');
const buttons = document.querySelectorAll('.buttons button');
const clearBtn = document.getElementById('clear-btn');
const submitBtn = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-message');
const correctPassword = '4376';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.id !== 'clear-btn') {
            if (passwordInput.value.length < 4) {
                passwordInput.value += button.getAttribute('data-value');
            }
        }
    });
});

clearBtn.addEventListener('click', () => {
    passwordInput.value = '';
    errorMessage.style.display = 'none';
    submitBtn.classList.add('hidden');
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length === 4) {
        if (passwordInput.value === correctPassword) {
            submitBtn.classList.remove('hidden');
            errorMessage.style.display = 'none';
        } else {
            errorMessage.textContent = 'Неверный пароль';
            errorMessage.style.display = 'block';
            submitBtn.classList.add('hidden');
        }
    } else {
        submitBtn.classList.add('hidden');
        errorMessage.style.display = 'none';
    }
});

submitBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});