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
      {
        title: '💡 Bevezetés',
        children: [
          { id: '/intro', title: 'A legalapvetőbb tudnivalók' },
          { id2: 'mit-jelent-a-transzidentitas', title: 'Mit jelent a transzidentitás?' },
          { id2: 'mit-jelent-nem-binarisnak-lenni', title: 'Mit jelent nem-binárisnak lenni?' },
          { id2: 'mit-jelent-interszexnek-lenni', title: 'Mit jelent az interszex?' },
          { id: '/lexikon', title: 'Lexikon' },
          { id: '/szovetsegesek', title: 'Szövetségesek és rokonok' }
        ]
      },
      {
        title: '📚 Brosúrák',
        children: [
          { id: '', title: 'Szülőknek' },
          { id: '', title: 'Rokonoknak' }
        ]
      },
      {
        title: '👩‍👩‍👦‍👦 Közösségek',
        children: [
          { id: '', title: 'Magyar egyesületek térképe' },
          { id: '', title: 'Online közösségek' }
        ]
      },
      {
        title: '🔍 Kérdések',
        children: [
          { id: '', title: 'Honnan tudom, hogy transz vagyok?' },
          { id: '', title: 'Transzneműnek és melegnek lenni' },
          { id: '', title: 'Félek, hogy sosem leszek passing' },
          { id: '', title: 'Félek, mert túl fiatal / öreg vagyok' },
          { id: '', title: 'Detranzicio' },
        ]
      },
      {
        title: '🔊 Kibujas',
        children: [
          { id: '', title: 'Felkészülés a kibujasra' },
          { id: '', title: 'Minta coming-out levelek' }
        ]
      },
      {
        title: '📊 Hormonális kezelések',
        children: [
          { id: '', title: 'Hormonkezelés megkezdése' },
          { id: '', title: 'Feminizáló HRT' },
          { id: '', title: 'Maszkulinizalo HRT' },
          { id: '', title: 'Megfelelo orvos keresese' },
          { id: '', title: 'Kiskoruak' },
          { id: '', title: 'Pszichologusi igazolo level' },
          { id: '', title: 'Hormonérték-táblázat' },
          { id: '', title: 'Finanszirozas' },
        ]
      },
      {
        title: '🏥 Egészségügy',
        children: [
          { id: '', title: 'Termékenység' },
          { id: '', title: 'Egyeb források' },
        ]
      },
      {
        title: '️🏛️ Adminisztratív',
        children: [
          { id: '', title: 'Iskola' },
          { id: '', title: 'Keresztnév' },
          { id: '', title: 'Gender' },
        ]
      },
      {
        title: '👩🏼 Női hormointerapia',
        children: [
          { id: '', title: 'Passing' },
          { id: '', title: 'Diszfória' },
          { id: '', title: 'Mellnagyobbítás' },
          { id: '', title: 'Orchidectomia' },
          { id: '', title: 'Ádámcsutkaműtét' },
          { id: '', title: 'Az arc feminizálása' },
          { id: '', title: 'Hanggyakorlatok (folyamatban)' },
        ]
      },
      {
        title: '👨🏽 Férfi hormonterapia',
        children: [
          { id: '', title: 'Passing' },
          { id: '', title: 'Diszfória' },
          { id: '', title: 'Testépítés' },
          { id: '', title: 'Mellkas elrejtese' },
          { id: '', title: 'Dudor a lagyeknal' },
          { id: '', title: 'Mammectomia' },
          { id: '', title: 'Szexuális kockázatok' },
        ]
      }
    ];
  }

  linkClicked(): void {
    if (this.closing) {
      this.closing.emit('');
    }
  }
}
