import {Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy} from '@angular/core';
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {SidenavService} from "@services/sidenav";
import {EntryService} from "@services/entry";
import type {RecentEntry} from "@types";

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
  public recentEntries: RecentEntry[] = [];
  public recentEntriesLoading = true;
  public recentEntriesError = false;

  constructor(_router: Router,
              private titleService: Title,
              private sidenav: SidenavService,
              private entryService: EntryService) {
    this._router = _router;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Gender útikalauz');
    this.entryService.getRecentlyModified().subscribe({
      next: (entries) => {
        this.recentEntries = entries;
        this.recentEntriesLoading = false;
      },
      error: (error) => {
        console.error('Nem sikerült betölteni a friss cikkeket.', error);
        this.recentEntriesError = true;
        this.recentEntriesLoading = false;
      }
    });
  }

  formatDate(value: string): string {
    return new Intl.DateTimeFormat('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(`${value}T00:00:00Z`));
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
