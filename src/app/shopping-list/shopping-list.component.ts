import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { Subscription } from "rxjs/Subscription";
import { CheckoutService } from "app/checkout/checkout.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[];
  subscription:Subscription;
  
  constructor(private shoppingList: ShoppingListService,
              private checkout: CheckoutService,
              private router:Router,
              private route:ActivatedRoute) { }

  
  ngOnInit() {
    this.ingredients = this.shoppingList.getIngredients();
    this.subscription = this.shoppingList.ingredientsChanged
      .subscribe(
        (ingredients:Ingredient[])=>{
          this.ingredients = ingredients;
        }
      );
  }
   onEditItem(index:number){
      this.shoppingList.startedEditing.next(index);
  }
  onAddToCart(){
    //this.checkout.cartItems.next(true);
    this.checkout.itemsAdded = true;
    this.router.navigate(['\checkout']);

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
