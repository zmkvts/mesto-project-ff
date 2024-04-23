import './pages/index.css';
// import { initialCards } from './cards.js';
import { createCard, deleteCard, clickLike } from './components/card.js';
import { closePopup, openPopup } from './components/modal.js';
import { enableValidation, clearValidation } from './scripts/validation';
import { getUserInfo, getInitialCards, patchUserInfo, addCard, likeCard, unLikeCard, updateAvatar } from './scripts/api';
import { validationConfig, renderLoading } from './utils/utils';


const cardContainer = document.querySelector('.places__list');


const popupEdit = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formEditElement = document.forms['edit-profile'];
const nameInput = formEditElement['name'];
const jobInput = formEditElement['description'];
const deleteButton = document.querySelector('.card__delete-button');


const popupNewCard = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const formNewCard = document.forms['new-place'];
const placeInput = formNewCard['place-name'];
const linkInput = formNewCard['link'];


const popupImage = document.querySelector('.popup_type_image');
const popupImageData = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

const popupAvatar = document.querySelector('.popup_type_avatar_edit');
const editAvatarButton = document.querySelector('.profile__avatar-button');
const formEditAvatar = document.forms['edit-avatar'];
const avatarInput = formEditAvatar['avatar'];

const popupConfirmDelete = document.querySelector('.popup_type_confirm_delete');
const formDeleteCard = document.forms['delete-card'];

const popups = document.querySelectorAll('.popup');
const closePopupButtons = document.querySelectorAll('.popup__close');

// @todo: Вывести карточки на страницу
// initialCards.forEach(function(card) {
//   cardContainer.append(createCard(card, { deleteCard, clickLike, handleImageClick }));
// });

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    const userId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescr.textContent = userData.about;
    profileImage.style = `background-image: url('${userData.avatar}')`;

    cards.forEach((card) => {
      cardContainer.append(createCard(card, { handleDeleteButton: handleDeleteButton, clickLike, handleImageClick }, userId));
    });
  })
  .catch((err) => {
    console.log(err);
  });

//открыть попап Edit и заполнить инпуты
editProfileButton.addEventListener('click', function() {
  openPopup(popupEdit);
  clearValidation(popupEdit, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescr.textContent;
});

//обработчик события формы Edit
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);

  patchUserInfo({
    name: nameInput.value,
    about: jobInput.value
  })
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescr.textContent = userData.about;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

//слушатель на submit формы Edit
formEditElement.addEventListener('submit', handleFormEditSubmit);

//открыть попап newCard
addCardButton.addEventListener('click', function() {
  openPopup(popupNewCard);
  formNewCard.reset();
  clearValidation(popupNewCard, validationConfig);
})

//обработчик события формы newCard
function addNewCard(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);

  addCard({
    name: placeInput.value,
    link: linkInput.value
  })
    .then((cardData) => {
      cardContainer.prepend(createCard(cardData, { handleDeleteButton: handleDeleteButton, clickLike, handleImageClick }, cardData.owner._id));
      formNewCard.reset();
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

//слушатель на submit формы newCard
formNewCard.addEventListener('submit', addNewCard);

const cardData = {};

const handleDeleteButton = (cardId, cardItem) => {
  openPopup(popupConfirmDelete);
  cardData._id = cardId;
  cardData.cardItem = cardItem;
}

formDeleteCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  deleteCard(cardData._id, cardData.cardItem)
});

//открыть попап avatar
editAvatarButton.addEventListener('click', function() {
  openPopup(popupAvatar);
  formEditAvatar.reset();
  clearValidation(popupAvatar, validationConfig);
});

formEditAvatar.addEventListener('submit', function(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  updateAvatar(avatarInput.value)
    .then((userData) => {
      profileImage.style = `background-image: url('${userData.avatar}')`;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    })
  });
  
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

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  })
})


enableValidation(validationConfig);


// fetch('https://nomoreparties.co/v1/wff-cohort-11/users/me', {
//   headers: {
//     authorization: '24ccd034-2994-4bf8-9434-157c73a87529'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });


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






