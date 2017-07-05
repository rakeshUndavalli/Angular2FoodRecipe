import { Ingredient } from "app/shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs/Subject";


export class ShoppingListService {
    // ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    ingredients : Ingredient[] = [
    new Ingredient('Apples', 4),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients(){
    //   this.checkout.savedIngredients.subscribe(
    //       (ingredients:Ingredient[])=>{
    //           this.ingredients = ingredients;
    //           console.log("At save", this.ingredients)
    //       }
    //   );
      return this.ingredients.slice();
  }
  getIngredient(index:number){
      return this.ingredients[index];
  }
  addIngredient(ingredient:Ingredient){  
    console.log(this.ingredients);    
    this.ingredients.push(ingredient);
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
    
  }
  addIngredients(ingredients:Ingredient[]){
      for(let ingredient of ingredients){
          this.addIngredient(ingredient);
      }
    //   this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }
 
 updateIngredient(index : number, ingredient: Ingredient ){
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
    console.log(this.ingredients);
    console.log(ingredient)
 }

 deleteIngredient(index:number){
     this.ingredients.splice(index, 1);
     this.ingredientsChanged.next(this.ingredients.slice());
 }

  
}