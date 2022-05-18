import { elements } from "./base";

export const clearShoppingList = ()=>{
    elements.shopping.innerHTML = '';
}


export const rednderItem = item => {
    const markup = `
    <li class="shopping__item" data-itemid="${item.id}">
        <div class="shopping__count">
            <input class="shopping__count__input" type="number" value="${item.count}" step="${item.count}">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend', markup)
}

export const deleteItem = (id) => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
}