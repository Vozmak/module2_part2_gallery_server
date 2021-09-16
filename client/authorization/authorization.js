"use strict";
if (localStorage.timestamp < Date.now()) {
    localStorage.removeItem("token");
    localStorage.removeItem("timestamp");
}
const form = document.getElementById("authorization");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = form.elements.namedItem('email');
    const password = form.elements.namedItem('password');
    const user = {
        email: email.value,
        password: password.value
    };
    let result = await authorizationUser(user);
    if ('errorMessage' in result && result.errorMessage) {
        email.value = "";
        password.value = "";
        const incorrect = document.querySelector(".incorrect");
        incorrect.textContent = 'Некоректный ввод. Проверьте привильность email и пароля.';
        setTimeout(() => {
            incorrect.textContent = '';
        }, 7000);
        return alert(result.errorMessage);
    }
    const { token } = result;
    if (!localStorage.token) {
        localStorage.setItem("token", token);
        localStorage.setItem("timestamp", `${Date.now() + 6e5}`);
        window.location.href = `gallery/gallery.html?page=${localStorage.page || 1}`;
    }
});
async function authorizationUser(user) {
    let response = await fetch('http://127.0.0.1:2000/authorization', {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(user)
    });
    return await response.json();
}
//# sourceMappingURL=authorization.js.map