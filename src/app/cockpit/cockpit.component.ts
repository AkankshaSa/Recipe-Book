import { Component, OnInit, Output, ViewChild ,ElementRef} from '@angular/core';
import {EventEmitter} from '@angular/core'

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {
 @Output() serverCreated = new EventEmitter<{serverName:string,serverContent:string}>();
  @Output('blue') blueprintCreated = new EventEmitter<{serverName:string,serverContent:string}>();
  // newServerName ='';
  // newServerContent ='';
  @ViewChild ('serverContentInput') serverContentInput:ElementRef;
  constructor() { }


  ngOnInit(): void {
  }
    onAddServer(nameInput:HTMLInputElement){
      console.log(nameInput.value);
      this.serverCreated.emit({serverName: nameInput.value,
        serverContent: this.serverContentInput.nativeElement.value});
    }
      onAddBlueprint(nameInput:HTMLInputElement){
        this.blueprintCreated.emit({serverName: nameInput.value,
          serverContent: this.serverContentInput.nativeElement.value});
      }

}
