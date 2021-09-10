if (localStorage.timestamp < Date.now()) {
  localStorage.removeItem("token");
  localStorage.removeItem("timestamp");
}

interface User {
  'email': string;
  'password': string;
}

interface ErrorMsg {
  'errorMessage': string;
}

const form = document.getElementById("authorization") as HTMLFormElement;

form.addEventListener("submit", async event => {
  event.preventDefault()

  const email = form.elements.namedItem('email') as HTMLInputElement;
  const password = form.elements.namedItem('password') as HTMLInputElement;
  const user: User = {
    "email": email.value,
    "password": password.value
  };

  let result: ErrorMsg | any = await authorizationUser(user);

  if ('errorMessage' in result && result.errorMessage) {
    email.value = "";
    password.value = "";
    return alert(result.errorMessage)
  }

  const {token} = result;

  if (!localStorage.token) {
    localStorage.setItem("token", token);
    localStorage.setItem("timestamp", `${Date.now() + 6e5}`);

    window.location.href = `gallery/gallery.html?page=${localStorage.page || 1}`;
  }
});

async function authorizationUser(user: User): Promise<ErrorMsg | any>  {
  if (!userValidation(user)) {
    const incorrect = document.querySelector(".incorrect") as HTMLElement;
    incorrect.textContent = 'Некоректный ввод. Проверьте привильность email и пароля.';

    setTimeout( () => {
      incorrect.textContent = '';
    }, 7000);

    return {
      "errorMessage": "Некоректный ввод. Проверьте привильность email и пароля."
    };
  }

  let response: Response = await fetch('https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/login', {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(user)
  });

  return await response.json()
}

function userValidation({email, password}: User): boolean {
  const emailRegExp: RegExp = /^[a-z\d]+@[a-z]+\.[a-z]+$/i;
  const passRegExp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z\d]{8}$/;

  return emailRegExp.test(email) ? passRegExp.test(password) : false;
}
