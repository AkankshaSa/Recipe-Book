import { HttpClient,HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, BehaviorSubject } from "rxjs";
import { catchError,tap } from "rxjs/operators";
import { User } from './user.model';
import { Router } from '@angular/router';




 export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
}

@Injectable({providedIn:'root'})
export class AuthService{
    user=new BehaviorSubject<User>(null);
    //token:string=null;
    private tokenExpiration:any;
    constructor(private http : HttpClient, private router:Router){}

signup(email:string,password:String){
  return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1feQuDHY5GTCxlelTwgTOfm_h0tuMwzw',
    {
        email: email,
        password: password,
        returnSecureToken: true
    }
  ).pipe(catchError(this.handleError),tap(resData=>{
        this.handleAuthenticaton(resData.email,resData.localId,resData.idToken, +resData.expiresIn)
  }));    
}

login (email:string,password:String){
    return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1feQuDHY5GTCxlelTwgTOfm_h0tuMwzw',
      {
          email: email,
          password: password,
          returnSecureToken: true
      }
    ).pipe(catchError(this.handleError),tap(resData=>{
        this.handleAuthenticaton(resData.email,resData.localId,resData.idToken, +resData.expiresIn)
  }));
}
    
    private handleAuthenticaton(email:string,userId:string ,token:string,expiresIn:number){
        const expirationDate = new Date(new Date().getTime()+ +expiresIn*1000)
         const user = new User(email,userId,token,expirationDate);
         this.user.next(user);
         this.autoLogOut(expiresIn*1000);
         localStorage.setItem('userData',JSON.stringify(user));
    }
      
    private handleError(errorRes: HttpErrorResponse)
      {
            let errormeassage="An error occurred!";
            if(!errorRes.error || !errorRes.error.error){
               return throwError(errormeassage) ;
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errormeassage ='This email already exists!';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errormeassage='This email does not exists!';
                    break;
                case 'INVALID_PASSWORD':
                    errormeassage='The password is invalid.'
                    break;
                case 'USER_DISABLED':
                    errormeassage='The user account has been disabled by an administrator.'
                    break;
            }
            return throwError(errormeassage);                              
      }

    LogOut(){
        this.user.next(null);
        this.router.navigate(['./auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpiration){
            clearTimeout(this.tokenExpiration)
        }
        this.tokenExpiration=null;
    }

    autoLogOut(expirationDuration:number){
        this.tokenExpiration=setTimeout(()=>{
            this.LogOut();
        }, expirationDuration);
    }

    autoLogin(){
    const userData:{email:string,id:string,_token:string,
    _tokenexpiratinDate: string} = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
        return
    }
    const loadedUser =new User(userData.email,userData.id,userData._token,new Date(userData._tokenexpiratinDate));
    if(loadedUser.token){
       this.user.next(loadedUser);
       const expirationDuration=new Date (userData._tokenexpiratinDate).getTime()-new Date().getTime();
       this.autoLogOut(expirationDuration);
    }

}


}
