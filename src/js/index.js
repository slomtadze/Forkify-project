// Global app controllers

import Recipe from "./models/recipe";
import Search from "./models/search";
import { clearLoaders, elements, renderLoader } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";


 
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
        searchView.activeLinkStyle(id)

        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();
        } catch (error) {
            alert(`controlRecipe error`)
        }
        

        clearLoaders();
        recipeView.renderRecipe(state.recipe);
    }
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

