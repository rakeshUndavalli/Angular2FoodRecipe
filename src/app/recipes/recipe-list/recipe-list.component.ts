import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from "app/recipes/recipe.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
 
})
export class RecipeListComponent implements OnInit{
  recipes:Recipe[];
  constructor(private recipeService:RecipeService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    //This makes sure to refresh changes on the template
     this.recipeService.recipeChanged.subscribe(
                (recipes:Recipe[])=>{
                    this.recipes = recipes;
                    console.log("Recipe List", this.recipes);
                }
            );
    // This line gets executed only once, i.e. at onInit        
    this.recipes = this.recipeService.getRecipes();
    //console.log("Recipe List", this.recipes);
  }

  loadEditRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }

}
