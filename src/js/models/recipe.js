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
    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15
    }
    calcServings(){
        this.servings = 4;
    }
    updateServings(condition){
        condition === 'dec' ? this.servings -=1 : this.servings +=1
    }
       
    parseIngredients(){

        const newIngredients = this.ingredients.map(el => {
            let ingredient = el.replace(/\([\s\S]+\)./,'')

            const ingArr = [];

            //get count

            const regex = /\d.+\d|\d/g; 
            if(regex.test(ingredient) == true){
                const count = ingredient.match(regex)[0];
                    if(count.length > 3){
                            ingArr.push(+eval(`${count.match(/\d/)[0]} + ${count.match(/\d\/\d/)[0]}`).toFixed(1));
                        }else if(count.length == 1){
                            ingArr.push(+eval(count));
                        }else{
                            ingArr.push(+eval(count).toFixed(1));
                        }
            }else{
                ingArr.push(1); 
            };
            // get unit small

            if(/tablespoons?/gi.test(ingredient) == true){
                ingArr.push('Tbsp');
            }else if(/teaspoons?/gi.test(ingredient) == true){
                ingArr.push('Tsp');
            }else if(/ounces?/gi.test(ingredient) == true){
                ingArr.push('Oz');
            }else if(/cups?/gi.test(ingredient) == true){
                ingArr.push('Cup');
            } else{
                ingArr.push('');
            }
        
            // get ingredient 

            const arr = [/\d.+\d.|\d./,/tablespoons?./i,/teaspoons?./i,/ounces?./i,/cups?./i]
                arr.forEach(el => {
                ingredient = ingredient.replace(el,'')    
            })
            ingArr.push(ingredient)
            
            const [count,unit,ing] = ingArr;
            
            const objIng = {
                count,
                unit,
                ing,
            }
            return objIng
        })
        
        this.ingredients = newIngredients;
    }



}


