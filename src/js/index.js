// Global app controllers

import Search from "./models/search";
import { clearLoaders, elements, renderLoader } from "./views/base";
import * as searchView from "./views/searchView";


 
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
        
})

