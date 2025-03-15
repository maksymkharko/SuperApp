document.addEventListener('DOMContentLoaded', () => {
  const carList = document.getElementById('car-list');
  const carModal = document.getElementById('car-modal');
  const viewModal = document.getElementById('view-modal');
  const addButton = document.getElementById('add-button');
  const editButton = document.getElementById('edit-button');
  const backButton = document.getElementById('back-button');
  const carForm = document.getElementById('car-form');
  const closeButton = document.querySelector('.close-button');
  const closeViewButton = document.querySelector('.close-view-button');
  const viewName = document.getElementById('view-name');
  const viewMileage = document.getElementById('view-mileage');
  const viewVin = document.getElementById('view-vin');
  const viewPlate = document.getElementById('view-plate');
  const viewPurchaseDate = document.getElementById('view-purchaseDate');
  const viewLastOilChangeMileage = document.getElementById('view-lastOilChangeMileage');
  const viewLastTimingBeltMileage = document.getElementById('view-lastTimingBeltMileage');
  const viewInsuranceEndDate = document.getElementById('view-insuranceEndDate');
  const viewMaintenanceEndDate = document.getElementById('view-maintenanceEndDate');
  const viewUsefulLink = document.getElementById('view-usefulLink');

  let cars = JSON.parse(localStorage.getItem('cars')) || [];
  let editingMode = false;
  let editingCarId = null;

  function renderCars() {
    carList.innerHTML = '';
    cars.forEach(car => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${car.name}</span>
        <div>
          <span>Страховка: ${formatDate(car.insuranceEndDate)}</span>
          <span>ТО: ${formatDate(car.maintenanceEndDate)}</span>
          <span>Масло: ${calculateOilChange(car)}</span>
        </div>
      `;
      li.dataset.id = car.id;

      if (editingMode) {
        li.classList.add('editing');
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '×';
        deleteButton.addEventListener('click', (event) => {
          event.stopPropagation();
          if (confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
            deleteCar(car.id);
          }
        });
        li.appendChild(deleteButton);
      }

      li.addEventListener('click', () => {
        if (!editingMode) {
          openViewModal(car);
        }
      });

      carList.appendChild(li);
    });
  }

  function calculateOilChange(car) {
    const oilMileage = car.mileage - car.lastOilChangeMileage;
    return `${oilMileage} км`;
  }

  function formatDate(dateString) {
    if (!dateString) return 'Не указано';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  function openModal(car = {}) {
    carModal.style.display = 'block';
    document.getElementById('car-id').value = car.id || '';
    document.getElementById('name').value = car.name || '';
    document.getElementById('mileage').value = car.mileage || '';
    document.getElementById('vin').value = car.vin || '';
    document.getElementById('plate').value = car.plate || '';
    document.getElementById('purchaseDate').value = car.purchaseDate || '';
    document.getElementById('lastOilChangeMileage').value = car.lastOilChangeMileage || '';
    document.getElementById('lastTimingBeltMileage').value = car.lastTimingBeltMileage || '';
    document.getElementById('insuranceEndDate').value = car.insuranceEndDate || '';
    document.getElementById('maintenanceEndDate').value = car.maintenanceEndDate || '';
    document.getElementById('usefulLink').value = car.usefulLink || '';
  }

  function closeModal() {
    carModal.style.display = 'none';
    editingCarId = null;
  }

  function openViewModal(car) {
    viewName.textContent = car.name;
    viewMileage.textContent = car.mileage;
    viewVin.textContent = car.vin;
    viewPlate.textContent = car.plate;
    viewPurchaseDate.textContent = formatDate(car.purchaseDate);
    viewLastOilChangeMileage.textContent = car.lastOilChangeMileage;
    viewLastTimingBeltMileage.textContent = car.lastTimingBeltMileage;
    viewInsuranceEndDate.textContent = formatDate(car.insuranceEndDate);
    viewMaintenanceEndDate.textContent = formatDate(car.maintenanceEndDate);
    viewUsefulLink.textContent = car.usefulLink;
    viewUsefulLink.href = car.usefulLink;
    viewModal.style.display = 'block';
  }

  function closeViewModal() {
    viewModal.style.display = 'none';
  }

  function saveCar(event) {
    event.preventDefault();
    const id = document.getElementById('car-id').value;
    const car = {
      id: id || Date.now(),
      name: document.getElementById('name').value,
      mileage: parseInt(document.getElementById('mileage').value),
      vin: document.getElementById('vin').value,
      plate: document.getElementById('plate').value,
      purchaseDate: document.getElementById('purchaseDate').value,
      lastOilChangeMileage: parseInt(document.getElementById('lastOilChangeMileage').value),
      lastTimingBeltMileage: parseInt(document.getElementById('lastTimingBeltMileage').value),
      insuranceEndDate: document.getElementById('insuranceEndDate').value,
      maintenanceEndDate: document.getElementById('maintenanceEndDate').value,
      usefulLink: document.getElementById('usefulLink').value,
    };

    if (id) {
      const index = cars.findIndex(c => c.id === parseInt(id));
      if (index !== -1) {
        cars[index] = car;
      }
    } else {
      cars.push(car);
    }

    localStorage.setItem('cars', JSON.stringify(cars));
    renderCars();
    closeModal();
  }

  function deleteCar(id) {
    cars = cars.filter(car => car.id !== id);
    localStorage.setItem('cars', JSON.stringify(cars));
    renderCars();
  }

  addButton.addEventListener('click', () => {
    openModal();
  });

  editButton.addEventListener('click', () => {
    editingMode = !editingMode;
    renderCars();
  });

  closeButton.addEventListener('click', closeModal);
  closeViewButton.addEventListener('click', closeViewModal);

  carForm.addEventListener('submit', saveCar);

  viewMileage.addEventListener('click', () => {
    const newMileage = prompt('Введите новый пробег:');
    if (newMileage) {
      const id = parseInt(viewModal.querySelector('h2').dataset.id);
      const car = cars.find(c => c.id === id);
      if (car) {
        car.mileage = parseInt(newMileage);
        localStorage.setItem('cars', JSON.stringify(cars));
        openViewModal(car);
        renderCars();
      }
    }
  });

  backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  renderCars();
});

