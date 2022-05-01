import { Meta, Title } from '@angular/platform-browser';
import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AppConfigService} from "./services/app-config.service";
import {SidenavService} from "./services/sidenav-service.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isOpened: boolean = false;
  // @ts-ignore
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private translate: TranslateService,
              private appConfigService: AppConfigService,
              private meta: Meta,
              private title: Title,
              private sidenavService: SidenavService) {
    translate.setDefaultLang(appConfigService.getConfig().languageCode);
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
