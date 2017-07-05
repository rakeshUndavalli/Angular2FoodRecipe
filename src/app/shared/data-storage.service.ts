import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "app/recipes/recipe.service";
import 'rxjs/Rx';
import { Recipe } from "app/recipes/recipe.model";
import { AuthService } from "app/auth/auth.service";
import { CheckoutService } from "app/checkout/checkout.service";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { Ingredient } from "app/shared/ingredient.model";

@Injectable()
export class DataStorageService{
    constructor(private http: Http,
                private recipeService: RecipeService,
                private authService:AuthService,
                private slService: ShoppingListService,
                private checkout:CheckoutService
                ){

    }

    storeRecipes(){
       const token = this.authService.getToken(); 
    //    return this.http.put('https://ng-recipe-book-fcc85.firebaseio.com/recipe.json?auth=',+token, this.recipeService.getRecipes());
       return this.http.put('https://ng-recipe-book-fcc85.firebaseio.com/recipe.json', this.recipeService.getRecipes());
    }

    storeCartItems(){
        return this.http.put('https://ng-recipe-book-fcc85.firebaseio.com/cart.json',this.checkout.getIngredients());
    }

    getCartItems(){
        return this.http.get('https://ng-recipe-book-fcc85.firebaseio.com/cart.json')
                   .map(
                       (response:Response)=>{
                           const ingredients : Ingredient[] = response.json();
                           return ingredients
                       }
                       
                   )
                   .subscribe(
                       (ingredients:Ingredient[])=>{
                           this.checkout.setIngredients(ingredients)
                       }
                   );
    }

    getRecipes(){
        const token : string = this.authService.getToken();
        this.http.get('https://ng-recipe-book-fcc85.firebaseio.com/recipe.json')
            .map(
                (response:Response)=>{
                    const recipes : Recipe[] = response.json();
                    for(let recipe of recipes){
                        if(!recipe['ingredients']){
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes
                }
            )
            .subscribe(
                (recipes:Recipe[])=>{
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}