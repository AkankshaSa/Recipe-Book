import {  Injectable }  from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { shoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe-list/recipe.model';

@Injectable()
export class RecipeService{
    recipeChanged = new Subject<Recipe[]>()
   
   private recipes: Recipe[]=[
    new Recipe('Spicy Omelette','Just Awesome',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9EH1H4oGwsZFphr12c_O3fMCG2VJq8oYeiQ&usqp=CAU',
    [ new Ingredient('Egg',2),
      new Ingredient('veggies',5)
    ]),
    new Recipe('Veg Biryani','Super Tasty',
    'https://c.ndtvimg.com/2020-05/inr9r43o_curd-rice_625x300_29_May_20.jpg',
    [new Ingredient('Rice',1),
     new Ingredient('veggies',5)
    ])
];
    constructor(private slService:shoppingListService){}

getRecipes(){
    return this.recipes.slice();
}
getRecipe(id:number){
    return this.recipes[id];
}
addIngToShoppingList(ingredients:Ingredient[]){
    this.slService.addIng(ingredients);
}
addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
}
updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipeChanged.next(this.recipes.slice());
}
deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
}
setRecipes(recipes:Recipe[]){
     this.recipes = recipes;
     this.recipeChanged.next(this.recipes.slice());
}
}
