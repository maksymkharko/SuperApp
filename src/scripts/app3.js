document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const birthdate = document.getElementById('birthdate').value;
    const code = document.getElementById('code').value;
    
    // Проверка длины даты и кода
    if (birthdate.length !== 8 || code.length !== 4) {
        alert('Пожалуйста, введите корректную дату рождения (ГГГГММДД) и код верификации (4 цифры).');
        return;
    }
    
    // Генерация пароля
    let password = '';
    for (let i = 0; i < code.length; i++) {
        const index = parseInt(code[i]) - 1; // Получаем индекс (позицию) в дате
        if (index >= 0 && index < birthdate.length) {
            password += birthdate[index]; // Добавляем символ из даты
        }
    }
    
    // Вывод результата
    document.getElementById('result').innerText = 'Ваш пароль: ' + password;
    
    // Сохранение данных в localStorage
    localStorage.setItem('birthdate', birthdate);
    localStorage.setItem('code', code);
});

// Загрузка сохраненных данных при загрузке страницы
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