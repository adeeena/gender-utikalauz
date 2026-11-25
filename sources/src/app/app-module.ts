import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatIconModule} from "@angular/material/icon";
import { MatButtonModule} from "@angular/material/button";
import { AppRoutingModule } from '@app/app-routing';
import {MatSidenavModule} from "@angular/material/sidenav";
import { AppComponent } from '@app/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '@components/home/home';
import { FooterComponent } from '@components/footer/footer';
import { SidebarComponent } from '@components/sidebar/sidebar';
import { HttpClient, provideHttpClient, withInterceptorsFromDi, withXhr } from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {PopupDialogComponent, SearchDialogComponent} from '@app/app';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {DialogElementsExampleDialog, EntryComponent} from '@components/entry/entry';
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
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
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        FontAwesomeModule,
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
        MatExpansionModule,
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
