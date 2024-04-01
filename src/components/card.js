import { openPopup } from "./modal";

export function createCard(cardData, {deleteCard, likeCard, handleImageClick } ) {
  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__title');
  const likeButton = cardItem.querySelector('.card__like-button');
  const cardImage = cardItem.querySelector('.card__image');
  const deleteButton = cardItem.querySelector('.card__delete-button');

  // @todo: DOM узлы
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
    
  deleteButton.addEventListener('click', function() {
    deleteCard(cardItem);
  });

  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => handleImageClick(cardData));

    
  // @todo: Функция создания карточки
  return cardItem; 
}
  
// @todo: Функция удаления карточки
export function deleteCard(cardItem) {
  cardItem.remove();
}

//обработчик лайка
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

