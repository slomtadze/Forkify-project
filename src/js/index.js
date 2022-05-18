// Global app controllers

import Recipe from "./models/recipe";
import Search from "./models/search";
import List from "./models/list";
import { Like } from "./models/like";
import { clearLoaders, elements, renderLoader } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listview from "./views/listview";




 
const state = {};
window.state = state;

const controlSearch = async () => {
    
    const query = elements.searchInput.value;
    
    if(query){
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResultList);

        state.search = new Search(query);
        await state.search.getResults()

        clearLoaders();

        searchView.renderResult(state.search.result);

    } 
}


const controlRecipe = async () => {
    const id = window.location.hash.replace('#','');
    
    if(id){
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        state.search && searchView.activeLinkStyle(id)

        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();
        } catch (error) {
            alert(`controlRecipe error`)
        }
        
        state.recipe.parseIngredients();
        state.recipe.calcTime();
        state.recipe.calcServings();       
        clearLoaders();
        recipeView.renderRecipe(state.recipe);
        
    }
}

const controlLike = () => {
    if(!state.like) state.like = new Like();

    if(state.like.isNotLiked(state.recipe.id)){
        state.like.addItem(
            state.recipe.id,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
            );
    }else{
        state.like.deleteItem(state.recipe.id)
    }
}

const controlList = () => {
    if(!state.list) state.list = new List();

    listview.clearShoppingList();

    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItems(el.count, el.unit, el.ing)
        listview.rednderItem(item);

    })
}

elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controlSearch();
})

elements.searchResultPages.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = +btn.dataset.goto;
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage);
    }
        
});

window.addEventListener('hashchange', () => {
    controlRecipe();
})
window.addEventListener('load', () => {
    controlRecipe()
})

elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-tiny-decrease, .btn-tiny-decrease *')){
        if(state.recipe.servings > 1) {
            state.recipe.updateServingIngredients('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    };
    if(e.target.matches('.btn-tiny-increase, .btn-tiny-increase *')){
        state.recipe.updateServingIngredients('inc');
        recipeView.updateServingsIngredients(state.recipe);
    };
    if(e.target.matches('.recipe__btn__add, .recipe__btn__add *')){
        controlList();
    };
    if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
})

elements.shopping.addEventListener('click', e => {

    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id);
        listview.deleteItem(id);
    };
    if(e.target.matches('.shopping__count__input')){
        const newValue = +e.target.value;
        state.list.updateItem(id, newValue);
    }
})

