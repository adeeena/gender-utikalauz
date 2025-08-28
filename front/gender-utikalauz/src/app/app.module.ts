import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatIconModule} from "@angular/material/icon";
import { MatButtonModule} from "@angular/material/button";
import { AppRoutingModule } from './app-routing.module';
import {MatSidenavModule} from "@angular/material/sidenav";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {PopupDialogComponent, SearchDialogComponent} from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {DialogElementsExampleDialog, EntryComponent} from './components/entry/entry.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslationLoader} from "./i18n/TranslationLoader";
import {AppConfigService} from "./services/app-config.service";
import { HomeExplainComponent } from './components/home-explain/home-explain.component';
import {Utf8EmojisToImagesModule} from "./lib/utf8-emojis-to-images.module";
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { IntroComponent } from './components/intro/intro.component';
import { HeaderComponent } from './components/header/header.component';
import { MarkdownModule } from 'ngx-markdown';
import { LexikonComponent } from './components/lexikon/lexikon.component';
import { SzovetsegesekComponent } from './components/szovetsegesek/szovetsegesek.component';
import { SearchService} from "./services/search.service";
import {SidenavService} from "./services/sidenav-service.service";
import { GaleryComponent } from './components/galery/galery.component';
import { OsztrogenKalkulatorComponent } from './components/osztrogen-kalkulator/osztrogen-kalkulator.component';
import { TesztoszteronKalkulatorComponent } from './components/tesztoszteron-kalkulator/tesztoszteron-kalkulator.component';
import { ProgeszteronKalkulatorComponent } from './components/progeszteron-kalkulator/progeszteron-kalkulator.component';
import { HighamHiszterektomiaVervesztesegKalkulatorComponent } from './components/higham-hiszterektomia-verveszteseg-kalkulator/higham-hiszterektomia-verveszteseg-kalkulator.component';

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
        })], providers: [{
            provide: APP_INITIALIZER,
            useFactory: initConfig,
            deps: [AppConfigService],
            multi: true,
        }, SidenavService, SearchService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
