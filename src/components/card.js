import { closePopup, openPopup } from "./modal";
import { deleteOwnerCard, likeCard, unLikeCard } from "../scripts/api";

const popupConfirmDelete = document.querySelector('.popup_type_confirm_delete');
const formDeleteCard = document.forms['delete-card'];

export function createCard(cardData, { handleDeleteButton, clickLike, handleImageClick }, userId) {
  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__title');
  const likeButton = cardItem.querySelector('.card__like-button');
  const cardImage = cardItem.querySelector('.card__image');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeCounter = cardItem.querySelector('.card__like-counter');

  // @todo: DOM узлы
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;
  

  if (cardData.owner._id !== userId) {
    deleteButton.disabled = true;
    deleteButton.classList.add('visually-hidden');
  }
    else {  
        deleteButton.addEventListener('click', function() {
            handleDeleteButton(cardData._id, cardItem);
        })
    }

  if (cardData.likes.some((user) => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

//   formDeleteCard.addEventListener('submit', function(evt) {
//   evt.preventDefault();
//   deleteCard(cardData._id, cardItem)
// });



  likeButton.addEventListener('click', (evt) => {
    if (likeButton.classList.contains('card__like-button_is-active')) {
        unLikeCard(cardData._id)
        .then((res) => {
          clickLike(evt);
          cardLikeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
        likeCard(cardData._id)
        .then((res) => {
          clickLike(evt);
          cardLikeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  cardImage.addEventListener('click', () => handleImageClick(cardData));

    
  // @todo: Функция создания карточки
  return cardItem; 
}
  
// @todo: Функция удаления карточки
export function deleteCard(cardId, cardItem) {
  deleteOwnerCard(cardId)
    .then(() => {
        cardItem.remove();
        closePopup(popupConfirmDelete);
    })
    .catch((err) => {
      console.log(err);
    });
}



//обработчик лайка
export function clickLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}



