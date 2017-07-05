import { Injectable } from '@angular/core';
import { Ingredient } from "app/shared/ingredient.model";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";
import { Http, Response } from '@angular/http';
import { DataStorageService } from "app/shared/data-storage.service";

@Injectable()
export class CheckoutService {
  ingredients : Ingredient[];
  itemsAdded = false;
  savedIngredients = new Subject<Ingredient[]>();
  constructor(private slService:ShoppingListService) { }

  getIngredients(){
    this.savedIngredients.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients;
      }
    );
    if(this.ingredients!==null){
      console.log("this is executed@2",this.ingredients)
      return this.slService.getIngredients();
    } else{
      return this.ingredients;
    }
    
  }

  setIngredients(ingredients:Ingredient[]){
    this.ingredients = ingredients;
    this.savedIngredients.next(this.ingredients.slice());
  }

  clearCart(){
    this.ingredients = [];
    this.savedIngredients.next(this.ingredients.slice());
  }

  // getSavedIngredients(){
  //   this.dataStorageService.getCartItems()
  //       .subscribe(
  //         (ingredients:Ingredient[])=>{
  //           this.ingredients = ingredients;
  //           // console.log(response);
             
  //         }

  //       );
  //       this.savedIngredients.next(this.ingredients.slice());
       
                            
  // }

}
