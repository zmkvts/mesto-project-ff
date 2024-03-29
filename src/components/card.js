import { openPopup } from "./modal";

export function createCard(cardData) {
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const likeButton = cardItem.querySelector('.card__like-button');
    const cardImage = cardItem.querySelector('.card__image');


    
    // @todo: DOM узлы
    cardItem.querySelector('.card__title').textContent = cardData.name;
    cardItem.querySelector('.card__image').src = cardData.link;
    
    const deleteButton = cardItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
      deleteCard(cardItem);
    });

    likeButton.addEventListener('click', handlerCardLike);
    cardImage.addEventListener('click', () => handlerImageClick(cardData));

    
    
    // @todo: Функция создания карточки
    return cardItem; 
  }
  
  // @todo: Функция удаления карточки
  export function deleteCard(cardItem) {
    cardItem.remove();
  }

  //обработчик лайка
  function handlerCardLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }

  //увеличить картинку
 export function handlerImageClick(cardData) {
    const popupCardImage = document.querySelector('.popup_type_image');
    popupImageSrc(cardData);
    openPopup(popupCardImage)
  }

  export function popupImageSrc(cardData) {
    const popupCardImage = document.querySelector('.popup_type_image');
    popupCardImage.querySelector('.popup__image').src = cardData.link;
    popupCardImage.querySelector('.popup__caption').textContent = cardData.name;
  }