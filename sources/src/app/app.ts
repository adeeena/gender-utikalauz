import { Meta, Title } from '@angular/platform-browser';
import {Component, OnInit, HostListener, Inject, ViewChild, ChangeDetectionStrategy, ElementRef} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { Router, NavigationEnd } from '@angular/router';
import {AppConfigService} from "@services/app-config";
import { filter } from 'rxjs/operators';
import {SidenavService} from "@services/sidenav";
import {DIALOG_DATA, DialogRef, DialogService} from "@services/dialog";
import {SearchService} from "@services/search";

export interface CookieDialogData {
  message: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent implements OnInit {
  public isOpened: boolean = false;
  public isHeaderVisible: boolean = false;
  escapeKeyPressCount: number = 0;
  lastKeyPressTime: number = Date.now();

  @ViewChild('mainContent', {read: ElementRef})
  private mainContentDiv!: ElementRef<HTMLElement>;

  constructor(private translate: TranslateService,
              private appConfigService: AppConfigService,
              private meta: Meta,
              private title: Title,
              private router: Router,
              private dialog: DialogService,
              private sidenavService: SidenavService) {
    translate.setDefaultLang(appConfigService.getConfig().languageCode);

    this.sidenavService.isOpen$.subscribe((isOpen) => {
      this.isOpened = isOpen;
    });

    this.router.events.pipe(filter((event: any) => {
        return event instanceof NavigationEnd;
      })).subscribe((event: any) => {
        this.isHeaderVisible = event.urlAfterRedirects !== '/';
        this.resetPagePosition();
        this.trackPageView(event.urlAfterRedirects || this.router.url);
      });
  }

  private resetPagePosition(): void {
    requestAnimationFrame(() => {
      const mainContent = this.mainContentDiv?.nativeElement;
      mainContent?.scrollTo({top: 0, left: 0});
      window.scrollTo({top: 0, left: 0});
    });
  }

  private trackPageView(path: string): void {
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title
      });
    }
  }

  ngOnInit() {
    this.translate.get('general.title').subscribe((translated: string) => {
      this.title.setTitle(translated);
    });


    this.translate.get('general.seoDescription').subscribe((translated: string) => {
      this.meta.updateTag({
        name: 'description',
        content: translated
      });
    });

    // Check if cookie exists
    const cookieExists = this.getCookie('QuickCloseConfirmed');

    if (!cookieExists) {
      // Determine if device is touch-enabled
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Display appropriate message based on device type
      const message = isTouchDevice
        ? 'Az oldalunk gyors elhagyásához háromszor koppints bárhová a képernyőn.'
        : 'Az oldalunk gyors elhagyásához nyomd meg háromszor az ESC billentyűt.';
      this.showPopup(message);
    } else {
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
  }

  showPopup(message: string) {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
      
      this.setCookie('QuickCloseConfirmed', 'yes', 15);
    });
  }

  // Function to get cookie value by name
  getCookie(name: string): string {
    const cookieName = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return '';
  }

  // Function to set cookie with name, value, and expiration time
  setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
  }

  @HostListener('document:touchstart', ['$event'])
  handleTouchStart(event: TouchEvent) {
    if (!this.lastKeyPressTime || Date.now() - this.lastKeyPressTime > 400) {
      // If more than 1 seconds have passed since the last tap, reset the count
      this.escapeKeyPressCount = 0;
    }
    this.lastKeyPressTime = Date.now();
    this.escapeKeyPressCount++;

    if (this.escapeKeyPressCount >= 3) {
      window.location.assign("https://www.google.hu");
      //window.location.href = 'https://www.google.hu';
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (!this.lastKeyPressTime || Date.now() - this.lastKeyPressTime > 2000) {
        // If more than 10 seconds have passed since the last key press, reset the count
        this.escapeKeyPressCount = 0;
      }
      this.lastKeyPressTime = Date.now();
      this.escapeKeyPressCount++;

      if (this.escapeKeyPressCount >= 3) {
        setTimeout(function() {
          window.location.assign("https://www.google.hu");
        }, 400); // bloody firefox
      }
    }
  }

  toggleSearch() {
    this.dialog.open(SearchDialogComponent, {
      panelClass: 'search-dialog-panel',
      autoFocus: '.search-input'
    });
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  focusMainContent(event: Event): void {
    event.preventDefault();
    document.getElementById('main-content')?.focus();
  }

  closeSidenav() {
    this.sidenavService.close();
  }
}

@Component({
    selector: 'search-dialog',
    templateUrl: './search-dialog.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SearchDialogComponent implements OnInit {
  private searchText: string = '';
  public searchResults: any = [];
  public searching = false;
  public searchError = false;
  public searchAttempted = false;
  private requestId = 0;

  constructor(public dialogRef: DialogRef,
              @Inject(DIALOG_DATA) public data: any,
              private searchService: SearchService
  ) {}

  ngOnInit() {
    this.searchResults = [];
  }

  onClick(): void {
    this.dialogRef.close();
  }

  searchUpdated($event: Event) {
    if (($event as any).target) {
      this.searchText = ($event as any).target.value.trim();
      this.searchError = false;

      if (this.searchText.length < 3) {
        this.searchResults = [];
        this.searching = false;
        this.searchAttempted = false;
        this.requestId++;
        return;
      }

      const requestId = ++this.requestId;
      this.searchAttempted = true;
      this.searching = true;
      this.searchService.search(this.searchText, 'hu').subscribe({
        next: (results) => {
          if (requestId !== this.requestId) return;
          this.searchResults = results;
          this.searching = false;
        },
        error: (error) => {
          if (requestId !== this.requestId) return;
          console.error('Error fetching search results:', error);
          this.searchResults = [];
          this.searching = false;
          this.searchError = true;
        }
      });
    }
  }
}

@Component({
    selector: 'popup-dialog',
    template: `
    <div class="dialog-panel">
      <h2>Gyors Bezárás</h2>
      <p>{{ data.message }}</p>
      <div class="dialog-actions">
        <button class="btn btn-primary" type="button" (click)="onClick()">OK</button>
      </div>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PopupDialogComponent {
  constructor(public dialogRef: DialogRef,
              @Inject(DIALOG_DATA) public data: CookieDialogData,

  ) {}

  onClick(): void {
    this.dialogRef.close();
  }
}