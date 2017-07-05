import * as firebase from 'firebase';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
@Injectable()
export class AuthService{
    token : string;
    constructor(private router: Router){}
    signupUser(email:string, password:string){
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .catch(
                error=>console.log(error)
            );
    }

    signInUser(email:string, password:string){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response=>{
                firebase.auth().currentUser.getIdToken()
                    .then(
                        (token:string)=> this.token = token
                    )
                this.router.navigate(['/']);    
            }
        )
        .catch(
            error=>console.log(error)
        );
    }

    logoutUser(){
        firebase.auth().signOut();
        this.token = null;
    }

    getToken(){
        firebase.auth().currentUser.getIdToken()
            .then(
                (token:string)=>{
                    this.token = token
                }
            );
            console.log(this.token);
            return this.token;
    }

    isAuthenticated(){
        return this.token!=null;
    }
}