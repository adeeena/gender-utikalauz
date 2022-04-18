import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { CategoryComponent } from './components/category/category.component';
import {MatCardModule} from "@angular/material/card";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {DialogElementsExampleDialog, EntryComponent} from './components/entry/entry.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import { SearchComponent } from './components/search/search.component';
import { EntryPreviewItemComponent } from './components/entry-preview-item/entry-preview-item.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslationLoader} from "./i18n/TranslationLoader";
import { AddNewEntryComponent } from './components/add-new-entry/add-new-entry.component';
import {AppConfigService} from "./services/app-config.service";
import { HomeExplainComponent } from './components/home-explain/home-explain.component';
import {Utf8EmojisToImagesModule} from "./lib/utf8-emojis-to-images.module";
import { PickerModule } from '@ctrl/ngx-emoji-mart';

export function HttpLoaderFactory(http: HttpClient): TranslationLoader {
  return new TranslationLoader(http);
}

export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    SidebarComponent,
    CategoryComponent,
    EntryComponent,
    DialogElementsExampleDialog,
    SearchComponent,
    EntryPreviewItemComponent,
    AddNewEntryComponent,
    HomeExplainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initConfig,
    deps: [AppConfigService],
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
