import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "@components/home/home";
import {IntroComponent} from "@components/intro/intro";
import {GaleryComponent} from "@components/galery/galery";
import {EntryComponent} from "@components/entry/entry";
import {LexikonComponent} from "@components/lexikon/lexikon";
import {SzovetsegesekComponent} from "@components/szovetsegesek/szovetsegesek";
import {OsztrogenKalkulatorComponent} from "@components/osztrogen-kalkulator/osztrogen-kalkulator";
import {ProgeszteronKalkulatorComponent} from "@components/progeszteron-kalkulator/progeszteron-kalkulator";
import {TesztoszteronKalkulatorComponent} from "@components/tesztoszteron-kalkulator/tesztoszteron-kalkulator";
import {HighamHiszterektomiaVervesztesegKalkulatorComponent} from "@components/higham-hiszterektomia-verveszteseg-kalkulator/higham-hiszterektomia-verveszteseg-kalkulator";

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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
