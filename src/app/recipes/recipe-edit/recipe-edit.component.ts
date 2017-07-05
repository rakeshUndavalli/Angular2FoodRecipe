import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { RecipeService } from "app/recipes/recipe.service";
import { Recipe } from "app/recipes/recipe.model";

@Component({
    selector:'app-recipe-edit',
    templateUrl:'./recipe-edit.component.html',
    styleUrls:['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
    id:number;
    editMode = false;
    recipeForm:FormGroup;
    recipe:Recipe;
    constructor(private route:ActivatedRoute,
                private recipeService:RecipeService,
                private router: Router
                ){}

    ngOnInit(){
        this.route.params
            .subscribe(
                (params:Params)=>{
                    this.id = +params['id'];
                    console.log(this.id);
                    this.editMode = params['id'] != null;
                    this.initForm();
                }
            );
    }

    onSubmit(){
        // const newRecipe = new Recipe(this.recipeForm.value['name'],
        //        this.recipeForm.value['imagePath'],
        //        this.recipeForm.value['description'],
        //        this.recipeForm.value['ingredients'] );
        if(this.editMode){
            this.recipeService.updateRecipe(this.id, this.recipeForm.value);
            console.log("On edit old recipe", this.recipeForm.value['ingredients']);
            

        }else{
            this.recipeService.addRecipe(this.recipeForm.value);
            console.log("On add new recipe", this.recipeForm.value['ingredients']);
        }
        //this.router.navigate(['../', 'recipes',this.id]);
        //this.recipeService.addReceipe();
        this.navigateToHome();
    }

    navigateToHome(){
        this.router.navigate(['../'], {relativeTo:this.route});
    }

    onAddIngredient(){
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(),
                'amount': new FormControl()
            })
        );
    }
    onDeleteIngredient(index:number){
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    private initForm(){
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        if(this.editMode){
            this.recipe = this.recipeService.getRecipe(this.id);
            recipeName = this.recipe.name;
            recipeImagePath = this.recipe.imagePath;
            recipeDescription = this.recipe.description;
            if(this.recipe['ingredients']){
                for(let ingredient of this.recipe.ingredients){
                    recipeIngredients.push(
                        new FormGroup({
                            'name' : new FormControl(ingredient.name, Validators.required),
                            'amount' : new FormControl(ingredient.amount,
                                        [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
                        })
                    );
                }
            }
        }
        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients' : recipeIngredients
        });
    }
}