import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { shoppingListService } from './shopping-list.service'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[];
  private igChangeSub: Subscription;
  constructor( private slservice:shoppingListService ) { }

  ngOnInit() {
    this.ingredients=this.slservice.getIngredient();
    this.igChangeSub=this.slservice.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients;
      }
    );
  }
  onEditItem(index: number){
    this.slservice.startedEditing.next(index)

  }
  OnDistroy(){
    this.igChangeSub.unsubscribe();
  }
 
}
