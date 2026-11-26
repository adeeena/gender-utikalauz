import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing';
import { AppComponent } from '@app/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '@components/home/home';
import { FooterComponent } from '@components/footer/footer';
import { SidebarComponent } from '@components/sidebar/sidebar';
import { HttpClient, provideHttpClient, withInterceptorsFromDi, withXhr } from "@angular/common/http";
import {PopupDialogComponent, SearchDialogComponent} from '@app/app';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {DialogElementsExampleDialog, EntryComponent} from '@components/entry/entry';
import {FormsModule} from "@angular/forms";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslationLoader} from "@i18n/translation-loader";
import {AppConfigService} from "@services/app-config";
import { HomeExplainComponent } from '@components/home-explain/home-explain';
import {Utf8EmojisToImagesModule} from "@lib/utf8-emojis-to-images-module";
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { IntroComponent } from '@components/intro/intro';
import { HeaderComponent } from '@components/header/header';
import { MarkdownModule } from 'ngx-markdown';
import { LexikonComponent } from '@components/lexikon/lexikon';
import { SzovetsegesekComponent } from '@components/szovetsegesek/szovetsegesek';
import { SearchService} from "@services/search";
import {SidenavService} from "@services/sidenav";
import { GaleryComponent } from '@components/galery/galery';
import { OsztrogenKalkulatorComponent } from '@components/osztrogen-kalkulator/osztrogen-kalkulator';
import { TesztoszteronKalkulatorComponent } from '@components/tesztoszteron-kalkulator/tesztoszteron-kalkulator';
import { ProgeszteronKalkulatorComponent } from '@components/progeszteron-kalkulator/progeszteron-kalkulator';
import { HighamHiszterektomiaVervesztesegKalkulatorComponent } from '@components/higham-hiszterektomia-verveszteseg-kalkulator/higham-hiszterektomia-verveszteseg-kalkulator';
import { IconComponent } from '@components/icon/icon';

export function HttpLoaderFactory(http: HttpClient): TranslationLoader {
  return new TranslationLoader(http);
}

export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        SidebarComponent,
        EntryComponent,
        DialogElementsExampleDialog,
        PopupDialogComponent,
        SearchDialogComponent,
        HomeExplainComponent,
        IntroComponent,
        HeaderComponent,
        IconComponent,
        LexikonComponent,
        SzovetsegesekComponent,
        GaleryComponent,
        OsztrogenKalkulatorComponent,
        TesztoszteronKalkulatorComponent,
        ProgeszteronKalkulatorComponent,
        HighamHiszterektomiaVervesztesegKalkulatorComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        CommonModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        FormsModule,
        PickerModule,
        Utf8EmojisToImagesModule,
        MarkdownModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })], providers: [provideAppInitializer(() => {
        const initializerFn = (initConfig)(inject(AppConfigService));
        return initializerFn();
      }), SidenavService, SearchService, provideHttpClient(withXhr(), withInterceptorsFromDi())] })
export class AppModule { }
