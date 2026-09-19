document.addEventListener("DOMContentLoaded", () => {
    // Элементы Модального Окна
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const paymentModal = document.getElementById("paymentModal");

    // Инпуты формы и текстовые проекции на 3D карте
    const creditCard = document.getElementById("creditCard");
    const inputNumber = document.getElementById("inputNumber");
    const viewNumber = document.getElementById("viewNumber");
    
    const inputName = document.getElementById("inputName");
    const viewName = document.getElementById("viewName");
    
    const inputExpiry = document.getElementById("inputExpiry");
    const viewExpiry = document.getElementById("viewExpiry");
    
    const inputCVV = document.getElementById("inputCVV");
    const viewCVV = document.getElementById("viewCVV");
    const cardType = document.getElementById("cardType");

    // --- Логика открытия/закрытия модального окна ---
    openModalBtn.addEventListener("click", () => paymentModal.classList.add("active"));
    closeModalBtn.addEventListener("click", () => paymentModal.classList.remove("active"));
    
    // Закрытие при клике на оверлей вне формы
    paymentModal.addEventListener("click", (e) => {
        if (e.target === paymentModal) paymentModal.classList.remove("active");
    });

    // --- Микроинтерракции и маски ввода ---

    // 1. Форматирование номера карты + Определение типа (Visa/MC)
    inputNumber.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Только цифры
        
        // Автоматическое распознавание типа карты
        if (value.startsWith("4")) {
            cardType.textContent = "VISA";
        } else if (value.startsWith("5")) {
            cardType.textContent = "MC";
        } else {
            cardType.textContent = "CARD";
        }

        // Разбиваем пробелами по 4 цифры
        let formatted = value.match(/.{1,4}/g);
        e.target.value = formatted ? formatted.join(" ") : "";
        
        viewNumber.textContent = e.target.value || "•••• •••• •••• ••••";
    });

    // 2. Имя держателя (блокировка ввода цифр)
    inputName.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
        viewName.textContent = e.target.value.toUpperCase() || "FULL NAME";
    });

    // 3. Срок действия (Маска ММ/ГГ)
    inputExpiry.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 2) {
            value = value.slice(0, 2) + "/" + value.slice(2, 4);
        }
        e.target.value = value;
        viewExpiry.textContent = value || "MM/YY";
    });

    // 4. Разворот карты при фокусе на CVV
    inputCVV.addEventListener("focus", () => {
        creditCard.classList.add("flipped"); // Поворачиваем рубашкой
    });

    inputCVV.addEventListener("blur", () => {
        creditCard.classList.remove("flipped"); // Возвращаем лицевую сторону
    });

    inputCVV.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        e.target.value = value;
        viewCVV.textContent = "•".repeat(value.length) || "•••";
    });
});
