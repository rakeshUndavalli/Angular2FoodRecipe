import { Recipe } from "app/recipes/recipe.model";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "app/shared/ingredient.model";
import { Subject } from "rxjs/Subject";

export class RecipeService {
 //recipeSelected = new EventEmitter<Recipe>();
    private recipes : Recipe[] = [
        new Recipe('Test recipe', 'This is a test Recipe', 'https://static01.nyt.com/images/2015/08/14/dining/14ROASTEDSALMON/14ROASTEDSALMON-articleLarge.jpg',
        [new Ingredient('tilapia', 1), new Ingredient('bread', 2)]),
        new Recipe('Lo mein', 'This is a Lo Mein Recipe', 'http://assets.epicurious.com/photos/57bf01e984c001120f616509/6:4/w_620%2Ch_413/lo-mein-22-minute-meal-recipe-25082016.jpg',
        [new Ingredient('Lo Mein', 1), new Ingredient('spices', 2)])
     ]
    recipeChanged = new Subject<Recipe[]>();
    changeRecipe = false;

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }
    getRecipes(){
        this.recipeChanged.subscribe(
            (recipes:Recipe[])=>{
                this.recipes = recipes;
            }
        );
        return this.recipes.slice();
     }

    getRecipe(index:number){
          return this.recipes.slice()[index];
    }

    addRecipe(recipe: Recipe){
          this.recipes.push(recipe);
          this.recipeChanged.next(this.recipes.slice());
          
        //console.log(this.recipes);
    }

    updateRecipe(index:number, recipe:Recipe){
          this.recipes[index] = recipe;
          this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }

} 