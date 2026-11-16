document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const status = document.getElementById('formStatus');
    const data = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            status.textContent = "Спасибо! Ваша заявка отправлена. Я свяжусь с вами скоро.";
            status.style.color = "green";
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.textContent = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.textContent = "Ой! Произошла ошибка при отправке.";
                }
                status.style.color = "red";
            });
        }
    }).catch(() => {
        status.textContent = "Ой! Произошла ошибка при отправке.";
        status.style.color = "red";
    });
});
