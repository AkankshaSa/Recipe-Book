import { Component, OnDestroy, OnInit,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient} from '../../shared/ingredient.model';
import { shoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f')slForm:NgForm
  subscription:Subscription;
  editMode=false;
  editedItemIndex :number;
  editedItem :Ingredient;
  
  constructor( private slsService:shoppingListService) { }

  ngOnInit(){
    this.slsService.startedEditing.subscribe(
      (index:number)=>{ 
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slsService.gettingIngredient(index);
        this.slForm.setValue({
            name: this.editedItem.name,
            amount:this.editedItem.amount         
        })
      }
    );
  }
  onAddItem(form :NgForm){
    const value = form.value;
  
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slsService.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
    this.slsService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
  }
  OnClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  OnDelete(){
    this.slsService.deleteIngredient(this.editedItemIndex);
    this.OnClear();
  }
//  ngOnDestroy(){
//    this.subscription.unsubscribe();
//   }
}
