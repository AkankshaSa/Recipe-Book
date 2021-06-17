import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub:Subscription;
  isAunticaticated=false;
    constructor( private dataStorageService:DataStorageService,private authservice:AuthService){}
  
    ngOnInit(){
      this.userSub=this. authservice.user.subscribe(
        user=>{this.isAunticaticated=!user?false:true}
      )
    }
    onSaveData(){
    this.dataStorageService.storeRecipes();
    
  }
    onFetchData(){
    this.dataStorageService.fetchRecipes();
    }

    onLogOut(){
      this.authservice.LogOut();
    }
    ngOnDestroy(){
      this.userSub.unsubscribe();
    }

}
