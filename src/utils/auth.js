/* eslint-disable prefer-promise-reject-errors */
export const BASE_URL = 'https://auth.nomoreparties.co';

function resFetch(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then(resFetch);
}

export function login(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then(resFetch);
}

export function tokenValid(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then(resFetch);
  // .then((res) => res.json())
  // .catch((err) => {
  //   console.log(err);
  // });
}
