import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  {path:'', redirectTo:'/recipes',pathMatch:'full'},
  {path:'recipes',component:RecipesComponent ,
  canActivate:[AuthGuard],
  children:[
    {path:'',component:RecipeStartComponent},
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailsComponent, resolve: [RecipeResolverService]},
    {path:':id/edit',component:RecipeEditComponent, resolve: [RecipeResolverService]},
    {path:'recipe-list',component:RecipeListComponent, children:[
    {path:'recipe-item',component:RecipeItemComponent}]
    }
  ]},
  {path:'shopping-list',component:ShoppingListComponent},
  {path:'auth',component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
