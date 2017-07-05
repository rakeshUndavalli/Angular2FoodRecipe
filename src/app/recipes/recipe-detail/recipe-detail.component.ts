import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from "app/recipes/recipe.model";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "app/recipes/recipe.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  
  recipe: Recipe;
  id: number;
  subscription: Subscription;
  constructor( private shoppingList:ShoppingListService,
               private recipeService:RecipeService,
               private route:ActivatedRoute,
               private router:Router) { }

  ngOnInit() {
    this.subscription = this.route.params
        .subscribe(
          (params:Params)=>{
            this.id = +params['id'];
            this.recipe = this.recipeService.getRecipe(this.id);
          }
        );
  }
  addToShoppingList(){
    this.shoppingList.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe(){
    //this.router.navigate(['edit'],{relativeTo:this.route});
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../', {relativeTo: this.route}]);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
