import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {IntroComponent} from "./components/intro/intro.component";
import {GaleryComponent} from "./components/galery/galery.component";
import {EntryComponent} from "./components/entry/entry.component";
import {LexikonComponent} from "./components/lexikon/lexikon.component";
import {SzovetsegesekComponent} from "./components/szovetsegesek/szovetsegesek.component";
import {OsztrogenKalkulatorComponent} from "./components/osztrogen-kalkulator/osztrogen-kalkulator.component";
import {ProgeszteronKalkulatorComponent} from "./components/progeszteron-kalkulator/progeszteron-kalkulator.component";
import {TesztoszteronKalkulatorComponent} from "./components/tesztoszteron-kalkulator/tesztoszteron-kalkulator.component";
import {HighamHiszterektomiaVervesztesegKalkulatorComponent} from "./components/higham-hiszterektomia-verveszteseg-kalkulator/higham-hiszterektomia-verveszteseg-kalkulator.component";

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'intro' , component: IntroComponent},
  {path: 'entry' , component: EntryComponent},
  {path: 'lexikon' , component: LexikonComponent},
  {path: 'galery' , component: GaleryComponent},
  {path: 'szovetsegesek' , component: SzovetsegesekComponent},
  {path: 'osztrogen-kalkulator' , component: OsztrogenKalkulatorComponent},
  {path: 'tesztoszteron-kalkulator' , component: TesztoszteronKalkulatorComponent},
  {path: 'progeszteron-kalkulator' , component: ProgeszteronKalkulatorComponent},
  {path: 'higham-hiszterektomia-verveszteseg-kalkulator' , component: HighamHiszterektomiaVervesztesegKalkulatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
