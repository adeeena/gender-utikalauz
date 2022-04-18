import { Component, OnInit } from '@angular/core';
import {Category} from "../../models/category";
import { Output, EventEmitter } from '@angular/core';
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() closing = new EventEmitter<string>();
  public categories: any[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    // this.categoryService.getCategories()
    //   .subscribe((data: Category[]) => {this.categories = data;});

    this.categories = [
      '💡 Bevezetés',
      '    Az alapvető tudnivalók',
      '    Transzidentitás, mi az?',
      '      Mi az a nem-binaritás?',
      '      Mi az interszex?',
      '      Lexikon',
      '      Szövetségesek és rokonok',
      '📚 Brosúrák',
      '    Szülőknek',
      '    Rokonok számára',
      '👩👩👦👦👦 Közösségek',
      '    A francia egyesületek térképe',
      '    Online közösségek',
      '🔍 Kérdések',
      '    Honnan tudom, hogy transz vagyok-e?',
      '      Transzneműnek és melegnek / leszbikusnak / homoszexuálisnak lenni',
      '    Félek, hogy nem lesz belépőm.',
      '      Félek attól, hogy túl fiatal / túl öreg leszek',
      '    Határátlépés',
      '🔊 Coming-out',
      '    Felkészülés a coming-outra',
      '    Minta coming-out levelek',
      '📊 Hormonális kezelések',
      '    Hormonkezelés megkezdése',
      '    Feminizáló HRT',
      '    A HRT maszkulinizálása',
      '    Orvos keresése',
      '    Kiskorúak',
      '    Pszichológus igazoló levele',
      '    Hormonérték-táblázatok',
      '    Finanszírozás és visszatérítés',
      '    Pénzügyi támogatás',
      '    Útmutató a visszatérítéshez',
      '    ALD',
      '    A CPAM általi ALD elutasítása esetén',
      '🏥 Orvosi',
      '    Termékenység',
      '    PMA',
      '    Különböző források',
      '🏛️ Adminisztratív',
      '    Az iskolában',
      '    Keresztnév',
      '    Gender',
      '    Társadalombiztosítási szám',
      '    Testvérek',
      '    Ajánlólevél',
      '👩🏼 Női átmenet',
      '    Női passzolás',
      '    Diszfória',
      '    Mellnagyobbítás',
      '    Orchidectomia',
      '    Ádámcsutkaműtét',
      '    Az arc feminizálása',
      '    Voice (folyamatban)',
      '👨🏽 Férfi átmenet',
      '    Férfi passzolás',
      '    Diszfória',
      '    Testépítés',
      '    Elrejtve a mellkasát',
      '    Lágyék púp',
      '    Mammectomia',
      '    Szexuális kockázatok',
      '🧑🏻 Nem-binaritás',
      '    Mi az a nem-binaritás?',
      '      Hogyan beszélsz egy nem bináris személyről?'
      ]
  }

  linkClicked(): void {
    if (this.closing) {
      this.closing.emit('');
    }
  }
}
