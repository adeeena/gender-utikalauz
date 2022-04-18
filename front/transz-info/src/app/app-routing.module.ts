import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CategoryComponent} from "./components/category/category.component";
import {EntryComponent} from "./components/entry/entry.component";
import {SearchComponent} from "./components/search/search.component";

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'category' , component: CategoryComponent},
  {path: 'entry' , component: EntryComponent},
  {path: 'search' , component: SearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
