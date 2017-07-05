import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropDownDirective } from "app/shared/dropdown.directive";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { AppRoutingModule } from "app/app-routing.module";
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from "app/recipes/recipe-edit/recipe-edit.component";
import { RecipeService } from "app/recipes/recipe.service";
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutService } from "app/checkout/checkout.service";
import { DataStorageService } from "app/shared/data-storage.service";
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from "app/auth/auth.service";
import { AuthGuard } from "app/auth/authguard.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropDownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    CheckoutComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    
  ],
  providers: [ShoppingListService, RecipeService, CheckoutService, DataStorageService, AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
