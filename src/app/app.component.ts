import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private authService:AuthService){}
  ngOnInit(){
    this.authService.autoLogin();
  }
  }








  // serverElements=[{type:'server',name:'Testserver',content:'Just a test!'}];

  // onServerAdded(serverData:{serverName:string,serverContent:string}){
  //   this.serverElements.push({
  //     type:'server',
  //     name: serverData.serverName,
  //     content: serverData.serverContent
  //   });
  // }
  //   onBlueprintAdded(blueprintData:{serverName:string,serverContent:string}){
  //     this.serverElements.push({
  //       type:'server',
  //       name: blueprintData.serverName,
  //       content: blueprintData.serverContent
  //     });
  //   }



