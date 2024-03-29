
export function openPopup(item) {
    item.classList.add('popup_is-opened');
    item.classList.add('popup_is-animated');
    document.addEventListener('keydown', closeByEscape);
}

export function closePopup(item) {
    item.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
   const item = document.querySelector('.popup_is-opened');
   if (evt.key === 'Escape') {
       closePopup(item);
   }
 };

