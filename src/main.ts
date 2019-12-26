import 'hammerjs';
import './polyfills';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@start/app.module';
import { environment } from '@env/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  const ngRef = 'ngRef';
  if (window[ngRef]) {
    window[ngRef].destroy();
  }
  window[ngRef] = ref;
})
  .catch(err => console.error(err));
