import { elements } from "./base"


// export const getInput = () => {elements.searchInput.value}
export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => {    
    elements.searchResultList.innerHTML = '';
    elements.searchResultPages.innerHTML = '';
}

export const activeLinkStyle = (id) => {
    const linkArr = [...document.querySelectorAll('.results__link')];
    linkArr.forEach(el => el.classList.remove('results__link--active'));

    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active')
}

export const recipesTitleModify = (title, limit = 17) => {
    const temp = new Array;

    if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                temp.push(cur)
            }
            return acc + cur.length;
        },0);
        return `${temp.join(' ')} ...`
    } else {
        return title
    }
    
}

const renderRecipe = (recipe) => {
    
    const markUp = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipesTitleModify(recipe.title)}</h4>
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
export const renderResult = (recipes, page = 1, resPerPage = 5) => {

    const start = (page -1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    renderButton(page, recipes.length, resPerPage);
}

