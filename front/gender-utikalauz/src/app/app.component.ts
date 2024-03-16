import { Meta, Title } from '@angular/platform-browser';
import {Component, OnInit, HostListener, Inject, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { Router, NavigationEnd } from '@angular/router';
import {AppConfigService} from "./services/app-config.service";
import { filter } from 'rxjs/operators';
import {SidenavService} from "./services/sidenav-service.service";
import {MatSidenav} from "@angular/material/sidenav";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface CookieDialogData {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isOpened: boolean = false;
  public isHeaderVisible: boolean = false;
  escapeKeyPressCount: number = 0;
  lastKeyPressTime: number = Date.now();
  private innerWidth: number = 0;

  // @ts-ignore
  @ViewChild('sidenav') public sidenav: MatSidenav;

  @ViewChild("mainContent")
  private mainContentDiv!: any;

  constructor(private translate: TranslateService,
              private appConfigService: AppConfigService,
              private meta: Meta,
              private title: Title,
              private router: Router,
              private dialog: MatDialog,
              private sidenavService: SidenavService) {
    translate.setDefaultLang(appConfigService.getConfig().languageCode);

    this.router.events.pipe(filter((event: any) => {
        return event instanceof NavigationEnd;
      })).subscribe((event: any) => {
        this.isHeaderVisible = this.router.url !== '/';
        if (this.mainContentDiv) {
          (this.mainContentDiv.elementRef!.nativeElement as HTMLElement).scrollTop = 0;
        }
      });
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
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
    }
  }

  showPopup(message: string) {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      width: this.innerWidth <= 600 ? '90vw' : '50vw',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
      
      this.setCookie('QuickCloseConfirmed', '', 15);
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

    if (this.escapeKeyPressCount === 3) {
      window.location.href = 'https://www.google.hu';
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

      if (this.escapeKeyPressCount === 3) {
        window.location.href = 'https://www.google.hu';
      }
    }
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  closeSidenav() {
    this.sidenavService.close();
  }
}

@Component({
  selector: 'popup-dialog',
  template: `
    <h1 mat-dialog-title>Gyors Bezárás</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div align="end" mat-dialog-actions>
      <button class="main-button" mat-button (click)="onClick()">OK</button>
    </div>
  `,
})
export class PopupDialogComponent {
  constructor(public dialogRef: MatDialogRef<PopupDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CookieDialogData,
  ) {}

  onClick(): void {
    this.dialogRef.close();
  }
}