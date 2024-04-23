import { checkResponse } from "../utils/utils";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
    headers: {
      authorization: '24ccd034-2994-4bf8-9434-157c73a87529',
      'Content-Type': 'application/json'
    }
  }

  function request(endpoint, options) {
    const url = `${config.baseUrl}${endpoint}`;
    return fetch(url, options).then(checkResponse);
  }

export const getUserInfo = () => {
    return request('/users/me', {
      headers: config.headers
    })
  }
  
  
  export const getInitialCards = () => {
    return request('/cards', {
      headers: config.headers
    })
  }


export const patchUserInfo = ({name, about}) => {
  return request('/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
}

export const addCard = ({name, link}) => {
  return request('/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
}


export const deleteOwnerCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const likeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
}

export const unLikeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const updateAvatar = (avatar) => {
  return request(`/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
}