import {Component, OnInit} from '@angular/core';
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({ anchor: 'enter1', duration: 1000, delay: 100, translate: '30px' }),
    fadeInUpOnEnterAnimation({ anchor: 'enter2', duration: 1000, delay: 300, translate: '30px' }),
    fadeInUpOnEnterAnimation({ anchor: 'enter3', duration: 1000, delay: 500, translate: '30px' }),
    fadeInUpOnEnterAnimation({ anchor: 'enter4', duration: 1000, delay: 900, translate: '30px' }),
    fadeInUpOnEnterAnimation({ anchor: 'enter5', duration: 1000, delay: 1500, translate: '30px' }),
  ]
})
export class HomeComponent implements OnInit {
  private searchText: string = '';
  private _router: Router;

  constructor(_router: Router, private titleService: Title) {
    this._router = _router;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Interaktív Mikroagresszió Mini-Enciklopédia');
  }

  searchClicked(): void {
    if (this.searchText) {
      this._router.navigate(['search'],{
        queryParams: {
          query: this.searchText
        }
      });
    }
  }

  searchUpdated($event: Event) {
    if (($event as any).target) {
      this.searchText = ($event as any).target.value;
    }
  }
}
