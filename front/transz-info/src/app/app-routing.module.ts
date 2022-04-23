import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {IntroComponent} from "./components/intro/intro.component";
import {EntryComponent} from "./components/entry/entry.component";
import {LexikonComponent} from "./components/lexikon/lexikon.component";
import {SzovetsegesekComponent} from "./components/szovetsegesek/szovetsegesek.component";

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'intro' , component: IntroComponent},
  {path: 'entry' , component: EntryComponent},
  {path: 'lexikon' , component: LexikonComponent},
  {path: 'szovetsegesek' , component: SzovetsegesekComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
