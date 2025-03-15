let cars = JSON.parse(localStorage.getItem('cars')) || [];
let isEditing = false;

// Функция для отображения списка автомобилей
function renderCars() {
    const carList = document.getElementById('carList');
    carList.innerHTML = '';
    cars.forEach((car, index) => {
        const carItem = document.createElement('div');
        carItem.className = 'car-item';
        carItem.innerHTML = `
            <h3>${car.name}</h3>
            <div class="timers">
                <span>Страховка: ${calculateTimeLeft(car.insuranceEndDate)}</span>
                <span>ТО: ${calculateTimeLeft(car.maintenanceEndDate)}</span>
                <span>Масло: ${calculateKmLeft(car.lastOilChangeMileage, car.mileage)} км</span>
            </div>
            ${isEditing ? `<button class="delete-button" onclick="deleteCar(${index})">❌</button>` : ''}
        `;
        carItem.addEventListener('click', () => openViewModal(index));
        carList.appendChild(carItem);
    });
}

// Функция для открытия модального окна добавления/редактирования
function openModal(index = null) {
    const modal = document.getElementById('addEditModal');
    const title = document.getElementById('modalTitle');
    if (index !== null) {
        title.textContent = 'Редактировать авто';
        const car = cars[index];
        document.getElementById('carName').value = car.name;
        document.getElementById('carMileage').value = car.mileage;
        document.getElementById('carVin').value = car.vin;
        document.getElementById('carPlate').value = car.plate;
        document.getElementById('carPurchaseDate').value = car.purchaseDate;
        document.getElementById('lastOilChangeMileage').value = car.lastOilChangeMileage;
        document.getElementById('lastTimingBeltMileage').value = car.lastTimingBeltMileage;
        document.getElementById('insuranceEndDate').value = car.insuranceEndDate;
        document.getElementById('maintenanceEndDate').value = car.maintenanceEndDate;
        document.getElementById('usefulLink').value = car.usefulLink || '';
    } else {
        title.textContent = 'Добавить авто';
    }
    modal.style.display = 'flex';
}

// Функция для закрытия модального окна
function closeModal() {
    document.getElementById('addEditModal').style.display = 'none';
}

// Функция для сохранения автомобиля
function saveCar() {
    const car = {
        name: document.getElementById('carName').value,
        mileage: parseInt(document.getElementById('carMileage').value),
        vin: document.getElementById('carVin').value,
        plate: document.getElementById('carPlate').value,
        purchaseDate: document.getElementById('carPurchaseDate').value,
        lastOilChangeMileage: parseInt(document.getElementById('lastOilChangeMileage').value),
        lastTimingBeltMileage: parseInt(document.getElementById('lastTimingBeltMileage').value),
        insuranceEndDate: document.getElementById('insuranceEndDate').value,
        maintenanceEndDate: document.getElementById('maintenanceEndDate').value,
        usefulLink: document.getElementById('usefulLink').value
    };
    cars.push(car);
    localStorage.setItem('cars', JSON.stringify(cars));
    closeModal();
    renderCars();
}

// Функция для удаления автомобиля
function deleteCar(index) {
    if (confirm('Удалить этот автомобиль?')) {
        cars.splice(index, 1);
        localStorage.setItem('cars', JSON.stringify(cars));
        renderCars();
    }
}

// Функция для открытия модального окна просмотра
function openViewModal(index) {
    const modal = document.getElementById('viewModal');
    const car = cars[index];
    document.getElementById('viewCarName').textContent = car.name;
    document.getElementById('viewCarMileage').textContent = car.mileage;
    document.getElementById('viewCarVin').textContent = car.vin;
    document.getElementById('viewCarPlate').textContent = car.plate;
    document.getElementById('viewCarPurchaseDate').textContent = car.purchaseDate;
    document.getElementById('viewLastOilChangeMileage').textContent = car.lastOilChangeMileage;
    document.getElementById('viewLastTimingBeltMileage').textContent = car.lastTimingBeltMileage;
    document.getElementById('viewInsuranceEndDate').textContent = car.insuranceEndDate;
    document.getElementById('viewMaintenanceEndDate').textContent = car.maintenanceEndDate;
    document.getElementById('viewUsefulLink').href = car.usefulLink || '#';
    modal.style.display = 'flex';
}

// Функция для закрытия модального окна просмотра
function closeViewModal() {
    document.getElementById('viewModal').style.display = 'none';
}

// Вспомогательные функции для таймеров
function calculateTimeLeft(endDate) {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} дней` : 'Истекло';
}

function calculateKmLeft(lastChange, currentMileage) {
    const kmLeft = 10000 - (currentMileage - lastChange);
    return kmLeft > 0 ? kmLeft : 0;
}

// Инициализация
document.getElementById('add-button').addEventListener('click', () => openModal());
document.getElementById('saveCarButton').addEventListener('click', saveCar);
document.querySelector('.edit-button').addEventListener('click', () => {
    isEditing = !isEditing;
    renderCars();
});
renderCars();
