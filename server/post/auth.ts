interface UsersAssecc {
  [email: string]: string;
}

type LoginResponse = {
  'errorMessage': string;
} | {
  'token': string
}

interface User {
  "email": string;
  "password": string;
}

const usersAccess: UsersAssecc = {
  "asergeev@flo.team": "jgF5tn4F",
  "vkotikov@flo.team": "po3FGas8",
  "tpupkin@flo.team":"tpupkin@flo.team",
}

function login(body: string): LoginResponse {
  const user: User = JSON.parse(body)

  if (!userValidation(user)) {
    return {
      "errorMessage": "Некорректный ввод email или пароль"
    }
  }

  if (!usersAccess.hasOwnProperty(user.email) || user.password !== usersAccess[user.email]) {
    return {
      "errorMessage": "Неверный логин или пароль"
    }
  }

  return {
    "token": "token"
  }
}

function userValidation({email, password}: User): boolean {
  const emailRegExp: RegExp = /^[a-z\d]+@[a-z]+\.[a-z]+$/i;
  const passRegExp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z\d]{8}$/;

  return emailRegExp.test(email) ? passRegExp.test(password) : false;
}

module.exports.login = login;
