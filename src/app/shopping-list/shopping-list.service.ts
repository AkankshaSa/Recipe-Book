import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model'
export class shoppingListService {
 ingredientsChanged = new Subject<Ingredient[]>(); 
 startedEditing = new Subject<number>();
   
    private ingredients: Ingredient[] = [
        new Ingredient('Apple',50),
        new Ingredient('Tomatoes',20)
      ];
 getIngredient(){
     return this.ingredients.slice();
 }  
 gettingIngredient(index:number){
     return this.ingredients[index];

 }
 addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice())
    }
 addIng(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice())
}
updateIngredient(index:number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this. ingredientsChanged.next(this.ingredients.slice());
}
deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice())
}
}
