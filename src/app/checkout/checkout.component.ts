import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Ingredient } from "app/shared/ingredient.model";
import { CheckoutService } from "app/checkout/checkout.service";
import { DataStorageService } from "app/shared/data-storage.service";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  ingredients:Ingredient[];
  savedIngredients:Ingredient[];
  constructor(private checkout: CheckoutService,
              private dataStorageService:DataStorageService) { }

  ngOnInit() {
    if(this.checkout.itemsAdded){
      this.getIngredientsList();
    }
    this.checkout.savedIngredients.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients;
      }
    );
  }
  getIngredientsList(){
    this.ingredients = this.checkout.getIngredients();
  }

  getSavedItems(){
    this.checkout.getSaved = false;
    this.dataStorageService.getCartItems();
  }
  // getSavedItems(){
  //   this.checkout.getSavedIngredients();
  //   this.checkout.savedIngredients.subscribe(
  //     (ingredients:Ingredient[])=>{
  //       this.savedIngredients = ingredients;
  //     }
  //   );
  //   console.log(this.savedIngredients);
  // }

  saveCartItems(){
    this.dataStorageService.storeCartItems()
      .subscribe(
        (response:Response)=>{console.log(response)}
      );
  }

  onSaveCurrent(){
    this.checkout.saveCurrent();
  }

  onClearCart(){
    this.checkout.clearCart();
  }

}
