import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from "app/shared/ingredient.model";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm : NgForm;
  subscription:Subscription;
  editMode = false;
  editItemIndex : number;
  editedIngredient : Ingredient;
  // @ViewChild('nameInput') nameInputRef : ElementRef; 
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  constructor(private shoppingList:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingList.startedEditing
          .subscribe(
            (index:number)=>{
              this.editItemIndex = index;
              this.editMode = true;
              this.editedIngredient = this.shoppingList.getIngredient(index);
              this.slForm.setValue({
                name:this.editedIngredient.name,
                amount:this.editedIngredient.amount
              });

            }
          );
  }
  onAddItem(){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    if(!this.editMode){
    const newIngredient = new Ingredient(this.slForm.value.name, this.slForm.value.amount);
    this.shoppingList.addIngredient(newIngredient);
  } else{
     const updatedIngredient = new Ingredient(this.slForm.value.name,this.slForm.value.amount);
     this.shoppingList.updateIngredient(this.editItemIndex, updatedIngredient);
     console.log("Else mode", this.editItemIndex);
    }
    this.editMode = false;
    this.clearForm();
  }

  clearForm(){
    this.slForm.reset();
    this.editMode = false;
  }

  deleteItem(){
    this.shoppingList.deleteIngredient(this.editItemIndex);
    this.editMode = false;
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
