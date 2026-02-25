// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand(); // Разворачиваем на весь экран
tg.enableClosingConfirmation(); // Подтверждение закрытия

let currentBalance = 1000; // Начальный баланс

// Получение данных пользователя из Telegram
const user = tg.initDataUnsafe?.user;
if (user) {
    console.log('Пользователь:', user);
}

// Обновление отображения баланса
function updateBalanceDisplay() {
    document.getElementById('balanceAmount').textContent = currentBalance;
}

// Добавление монет
function addBalance(amount) {
    currentBalance += amount;
    updateBalanceDisplay();
}

// Отправка обновленного баланса в бота
function updateBalanceInBot() {
    if (tg) {
        tg.sendData(`update_balance:${currentBalance}`);
        tg.showAlert(`Баланс обновлен: ${currentBalance} монет`);
    }
}

// Переключение бокового меню
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.overlay') || createOverlay();
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Создание оверлея
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.onclick = toggleSidebar;
    document.body.appendChild(overlay);
    return overlay;
}

// Показ разных страниц в меню
function showPage(page) {
    toggleSidebar(); // Закрываем меню
    tg.showAlert(`Открыта страница: ${page}`);
    
    // Здесь можно добавить логику для разных страниц
    switch(page) {
        case 'profile':
            tg.showAlert('👤 Профиль пользователя');
            break;
        case 'settings':
            tg.showAlert('⚙️ Настройки приложения');
            break;
        case 'about':
            tg.showAlert('ℹ️ О нас - Версия 1.0.0');
            break;
        case 'contact':
            tg.showAlert('📞 Поддержка: @your_bot');
            break;
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateBalanceDisplay();
    
    // Добавляем обработчик для кнопки меню
    document.getElementById('menuButton').addEventListener('click', toggleSidebar);
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('sidebar');
        const menuButton = document.getElementById('menuButton');
        
        if (!sidebar.contains(e.target) && !menuButton.contains(e.target) && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
    
    // Настройка главной кнопки Telegram
    tg.MainButton.setText('Главная кнопка');
    tg.MainButton.show();
});

// Обработка закрытия приложения
tg.onEvent('mainButtonClicked', function() {
    tg.sendData('main_button_clicked');
    tg.showAlert('Главная кнопка нажата!');
});

// Обработка ошибок
window.onerror = function(msg, url, line, col, error) {
    tg.showAlert(`Ошибка: ${msg}`);
    return false;
};
