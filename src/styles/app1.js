/* Основные стили */
body {
    font-family: Arial, sans-serif;
    background-color: #1e1e1e;
    color: #fff;
    margin: 0;
    padding: 0;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #333;
}

.back-button, .edit-button, .add-button {
    background: none;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
}

h1 {
    text-align: center;
    margin: 20px 0;
}

.car-list {
    padding: 10px;
}

.car-item {
    background-color: #444;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.car-item h3 {
    margin: 0;
}

.timers {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.timers span {
    font-size: 14px;
    color: #ccc;
}

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #333;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
}

input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
    margin: 10px 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    opacity: 0.8;
}

.close-button {
    background-color: #ff4444;
    color: #fff;
}