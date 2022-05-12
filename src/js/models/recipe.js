import axios from "axios";



export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.img = result.data.recipe.image_url;
            this.url = result.data.recipe.publisher_url;
            this.ingredients = result.data.recipe.ingredients; 
        } catch (error) {
            alert(`class ${error}`)
        }
        
    }
}