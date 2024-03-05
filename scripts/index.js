const cardContainer = document.querySelector('.places__list');

function createCard(cardName, cardLink) {
  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  
  // @todo: DOM узлы
  cardItem.querySelector('.card__title').textContent = cardName;
  cardItem.querySelector('.card__image').src = cardLink;
  
  const deleteButton = cardItem.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    deleteCard(cardItem);
  });
  // @todo: Функция создания карточки
  return cardItem; 
}

// @todo: Функция удаления карточки
function deleteCard(cardItem) {
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(card) {
  cardContainer.append(createCard(card.name, card.link));
});