
import { Component } from "@angular/core";
import { DataStorageService } from "app/shared/data-storage.service";
import { Http, Response } from '@angular/http';
import { AuthService } from "app/auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent{
    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService,
                private router: Router){}
    onSaveData(){
        this.dataStorageService.storeRecipes()
            .subscribe(
                (response:Response)=>{
                    console.log(response);
                }
            );
    }
    onLogout(){
        this.authService.logoutUser();
        this.router.navigate(['/signin']);
    }
    checkAuthentication(){
        if(this.authService.isAuthenticated()){
            this.router.navigate(['/checkout']);
        } else{
            
        }
    }
    onFetchData(){
        this.dataStorageService.getRecipes();
    }
} 