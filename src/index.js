import './pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { closePopup, openPopup } from './components/modal.js';


const cardContainer = document.querySelector('.places__list');


const popupEdit = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const formEditElement = document.forms['edit-profile'];
const nameInput = formEditElement['name'];
const jobInput = formEditElement['description'];


const popupNewCard = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const formNewCard = document.forms['new-place'];
const placeInput = formNewCard['place-name'];
const linkInput = formNewCard['link'];


const popupImage = document.querySelector('.popup_type_image');
const popupImageData = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

const popups = document.querySelectorAll('.popup');


// @todo: Вывести карточки на страницу
initialCards.forEach(function(card) {
  cardContainer.append(createCard(card, { deleteCard, likeCard, handleImageClick }));
});

//открыть попап Edit и заполнить инпуты
editProfileButton.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescr.textContent;
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

//обработчик события формы newCard
function addNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeInput.value,
    link: linkInput.value
  };
  cardContainer.prepend(createCard(newCard, { deleteCard, likeCard, handleImageClick }));
  formNewCard.reset();
  closePopup(popupNewCard);
}

//слушатель на submit формы newCard
formNewCard.addEventListener('submit', addNewCard);

//увеличить картинку
function handleImageClick(cardData) {
  setImageData(cardData);
  openPopup(popupImage)
}

//присвоить картинке название и данные от карточки  
function setImageData(cardData) {
  popupImageData.src = cardData.link;
  popupImageData.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
}

// Закрытие попапов

// Геннадий, большое спасибо за комментарий про закрытие попапов, головой я понимал, 
// что общие классы как раз для этого и нужны, но перевести понимание в код не сумел))

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  })
})

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

    setEventListeners(formElement);
});
}

const hasInvalidInput = (inputList) => {
  return inputList.some( inputElement => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
}

enableValidation();


//const closePopupEdit = popupEdit.querySelector('.popup__close');
// закрыть попап Edit кликом на крестик или Esc
// closePopupEdit.addEventListener('click', function() {
//   closePopup(popupEdit);
// });

// // закрыть попап Edit кликом на оверлей
// popupEdit.addEventListener ('click', function(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup(popupEdit);
//   }
// });


//const closePopupNewCard = popupNewCard.querySelector('.popup__close');
// // закрыть попап Add кликом на крестик или Esc
// closePopupNewCard.addEventListener('click', function() {
//   closePopup(popupNewCard);
// });


// // закрыть попап newCard кликом на оверлей
// popupNewCard.addEventListener ('click', function(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup(popupNewCard);
//   }
// });
  

//const closePopupImage = popupImage.querySelector('.popup__close');
// //закрыть попап Image
// closePopupImage.addEventListener('click', function() {
//   closePopup(popupImage);
// });






