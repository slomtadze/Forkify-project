import { elements } from "./base"


// export const getInput = () => {elements.searchInput.value}
export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => {    
    elements.searchResultList.innerHTML = '';
    elements.searchResultPages.innerHTML = '';
}

const renderRecipe = (recipe) => {
    
    const markUp = `
        <li>
            <a class="results__link results__link" href="${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;    
    elements.searchResultList.insertAdjacentHTML('beforeend',markUp)
}

const createButton = (page, type) => {
    return `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
    `
}

const renderButton = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if(page ===1 && pages > 1){
        button = createButton(page, 'next');
    }else if(page < pages){
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }else if(page === pages && page > 1){
        button = createButton(page, 'prev')
    }
    elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
}
export const renderResult = (recipes, page = 6, resPerPage = 5) => {

    const start = (page -1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    renderButton(page, recipes.length, resPerPage);
}
