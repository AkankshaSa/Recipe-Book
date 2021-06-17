import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService,AuthResponseData } from './auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode= true;
  isLoading =false;
  error:string =null;
  
  constructor(private authService: AuthService, private router:Router){}
  
  onSwitchMode(){
      this.isLoginMode = !this.isLoginMode;
    }
    
  onSubmit(form :NgForm){
  
    const email = form.value.email;
      const password = form.value.password;

      let authSer: Observable<AuthResponseData>

      this.isLoading=true;
      if(this.isLoginMode){
       authSer =this.authService.login(email,password)
      }
      else{
       authSer=this.authService.signup(email,password)
      }
      authSer.subscribe(
        resData =>{
          console.log(resData);
          this.isLoading=false;
          this.router.navigate(['/recipes']);
        },
        errorMessage =>{
          console.log(errorMessage);
          this.error=errorMessage;
          this.isLoading=false;
        }
      );
    
    form.reset();
    }
 }


