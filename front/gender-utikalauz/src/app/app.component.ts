import { Meta, Title } from '@angular/platform-browser';
import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { Router, NavigationEnd } from '@angular/router';
import {AppConfigService} from "./services/app-config.service";
import { filter } from 'rxjs/operators';
import {SidenavService} from "./services/sidenav-service.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isOpened: boolean = false;
  public isHeaderVisible: boolean = false;
  // @ts-ignore
  @ViewChild('sidenav') public sidenav: MatSidenav;

  @ViewChild("mainContent")
  private mainContentDiv!: any;

  constructor(private translate: TranslateService,
              private appConfigService: AppConfigService,
              private meta: Meta,
              private title: Title,
              private router: Router,
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
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  closeSidenav() {
    this.sidenavService.close();
  }
}
