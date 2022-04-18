import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AppConfigService} from "./services/app-config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isOpened: boolean = false;

  constructor(private translate: TranslateService,
              private appConfigService: AppConfigService,
              private meta: Meta,
              private title: Title) {
    translate.setDefaultLang(appConfigService.getConfig().languageCode);
  }

  ngOnInit() {
    this.translate.get('generic.title').subscribe((translated: string) => {
      this.title.setTitle(translated);
    });


    this.translate.get('generic.seoDescription').subscribe((translated: string) => {
      this.meta.updateTag({
        name: 'description',
        content: translated
      });
    });
  }

  toggleSidenav() {
    this.isOpened = !this.isOpened;

    if (this.isOpened) {
      document.body.style.overflow = "hidden"; // ADD THIS LINE
      document.body.style.height = "100%"; // ADD THIS LINE
    } else {
      document.body.style.overflow = "auto"; // ADD THIS LINE
      document.body.style.height = "auto"; // ADD THIS LINE
    }
  }

  closeSidenav() {
    this.isOpened = false;
    document.body.style.overflow = "auto"; // ADD THIS LINE
    document.body.style.height = "auto"; // ADD THIS LINE
  }


}
