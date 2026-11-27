import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app-module';
import { environment } from '@environments/environment';

if (environment.production) {
  enableProdMode();
}

// A korábbi, #-os hivatkozások (pl. /#/entry?id=slug) átirányítása a tiszta útvonalra
if (location.hash.startsWith('#/')) {
  history.replaceState(null, '', location.hash.slice(1));
}

platformBrowserDynamic().bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()], })
  .catch(err => console.error(err));
