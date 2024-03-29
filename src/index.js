import './pages/index.css';
import { initialCards } from './cards.js';
import { createCard } from './components/card.js';
import { closePopup, openPopup } from './components/modal.js';


const cardContainer = document.querySelector('.places__list');


const popupEdit = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupEdit = popupEdit.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const formEditElement = document.forms['edit-profile'];
const nameInput = formEditElement['name'];
const jobInput = formEditElement['description'];


const popupNewCard = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const closePopupNewCard = popupNewCard.querySelector('.popup__close');
const formNewCard = document.forms['new-place'];
const placeInput = formNewCard['place-name'];
const linkInput = formNewCard['link'];

const popupImage = document.querySelector('.popup_type_image');
const closePopupImage = popupImage.querySelector('.popup__close');


// @todo: Вывести карточки на страницу
initialCards.forEach(function(card) {
  cardContainer.append(createCard(card));
});

//открыть попап Edit и заполнить инпуты
editProfileButton.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescr.textContent;
});

// закрыть попап Edit кликом на крестик или Esc
closePopupEdit.addEventListener('click', function() {
  closePopup(popupEdit);
});

// закрыть попап Edit кликом на оверлей
popupEdit.addEventListener ('click', function(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupEdit);
  }
});

//обработчик события формы Edit
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescr.textContent = jobInput.value;
  closePopup(popupEdit);
}

//слушатель на submit формы Edit
formEditElement.addEventListener('submit', handleFormEditSubmit);

//открыть попап newCard
addCardButton.addEventListener('click', function() {
  openPopup(popupNewCard);
})

// закрыть попап Add кликом на крестик или Esc
closePopupNewCard.addEventListener('click', function() {
  closePopup(popupNewCard);
});


// закрыть попап newCard кликом на оверлей
popupNewCard.addEventListener ('click', function(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupNewCard);
  }
});
  
//обработчик события формы newCard
function handleFormNewCardSubmit(evt) {
    evt.preventDefault();
    const newCard = {
      name: placeInput.value,
      link: linkInput.value
    };
    cardContainer.prepend(createCard(newCard));
    formNewCard.reset();
    closePopup(popupNewCard);
}
  
//слушатель на submit формы newCard
formNewCard.addEventListener('submit', handleFormNewCardSubmit);

//закрыть попап Image
closePopupImage.addEventListener('click', function() {
  closePopup(popupImage);
});






