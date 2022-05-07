import axios from "axios";

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults(){
        try {
            const responce = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`)
            this.result = responce.data.recipes; 
        } catch (error) {
            alert(`${this.query} can't be found`)
        }
      
    }
}