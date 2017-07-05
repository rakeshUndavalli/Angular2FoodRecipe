import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from "app/recipes/recipe.model";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "app/recipes/recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor( private shoppingList:ShoppingListService,
               private recipeService:RecipeService,
               private route:ActivatedRoute,
               private router:Router) { }

  ngOnInit() {
    this.route.params
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
}
