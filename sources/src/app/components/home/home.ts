import {Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy} from '@angular/core';
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {SidenavService} from "@services/sidenav";

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrl: './home.scss',
    animations: [
        fadeInUpOnEnterAnimation({ anchor: 'enter1', duration: 1000, delay: 100, translate: '30px' })
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HomeComponent implements OnInit {
  private searchText: string = '';
  private _router: Router;

  constructor(_router: Router, private titleService: Title, private sidenav: SidenavService) {
    this._router = _router;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Gender útikalauz');
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
