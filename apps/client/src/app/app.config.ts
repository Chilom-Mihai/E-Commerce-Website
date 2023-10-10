import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';
import { cartReducer } from './cart.reducer';
import { metaReducers } from './local-storage-sync.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    importProvidersFrom(
      StoreModule.forRoot({ cart: cartReducer }, { metaReducers }),
    ),
    importProvidersFrom(StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    })),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: 'dev-l5vnut5vj4hqj3ar.us.auth0.com',
        clientId: 'FdsqcHmtOjBrIEXsPUhXrQXzG97aIQuz',
        authorizationParams: {
          redirect_uri: window.location.origin,
          // audience: "https://dev-l5vnut5vj4hqj3ar.us.auth0.com/api/v2/"
        }
      }))
  ],
};
