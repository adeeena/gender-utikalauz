import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {SidenavService} from "../../services/sidenav-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({ anchor: 'enter1', duration: 1000, delay: 100, translate: '30px' })
  ]
})
export class HomeComponent implements OnInit {
  private searchText: string = '';
  private _router: Router;

  constructor(_router: Router, private titleService: Title, private sidenav: SidenavService) {
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

  sidenavToggle() {
    this.sidenav.toggle();
  }
}
