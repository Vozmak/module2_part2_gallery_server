"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
if (localStorage.timestamp < Date.now()) {
    localStorage.removeItem("token");
    localStorage.removeItem("timestamp");
}
const form = document.getElementById("authorization");
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const email = form.elements.namedItem('email');
    const password = form.elements.namedItem('password');
    const user = {
        "email": email.value,
        "password": password.value
    };
    let result = yield authorizationUser(user);
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
}));
function authorizationUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('http://127.0.0.1:2000/authorization', {
            method: "POST",
            headers: {
                "Content-type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(user)
        });
        return yield response.json();
    });
}
//# sourceMappingURL=authorization.js.map