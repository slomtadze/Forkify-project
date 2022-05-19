import { elements } from "./base";
import { recipesTitleModify } from "./searchView";

export const toggleLikeBtn = (isLiked) => {
    const string = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${string}`);
}

export const renderItem = (like) => {
    const markUp = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${recipesTitleModify(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markUp)
}

export const deleteItem = (id) => {
    const item = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    if(item) item.parentElement.removeChild(item)
}