document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const birthdate = document.getElementById('birthdate').value;
    const code = document.getElementById('code').value;
    
    if (birthdate.length !== 8 || code.length !== 4) {
        alert('Пожалуйста, введите корректную дату рождения (ГГГГММДД) и проверочный код (4 цифры).');
        return;
    }
    
    // Сохраняем данные в localStorage
    localStorage.setItem('birthdate', birthdate);
    localStorage.setItem('code', code);
    
    let password = '';
    for (let i = 0; i < code.length; i++) {
        const index = parseInt(code[i]) - 1;
        if (index >= 0 && index < birthdate.length) {
            password += birthdate[index];
        }
    }
    
    document.getElementById('result').innerText = 'Сгенерированный пароль: ' + password;
});

// Загружаем сохраненные данные при загрузке страницы
window.addEventListener('load', function() {
    const savedBirthdate = localStorage.getItem('birthdate');
    const savedCode = localStorage.getItem('code');
    
    if (savedBirthdate) {
        document.getElementById('birthdate').value = savedBirthdate;
    }
    if (savedCode) {
        document.getElementById('code').value = savedCode;
    }
});
