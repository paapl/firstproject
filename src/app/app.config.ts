import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as UsersEffects from './components/users-list/+state/users.effects'
import * as UsersFeature from './components/users-list/+state/users.reducers'
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { API_URL } from './services/api-url.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore({
        ['users']: UsersFeature.usersFeature.reducer
    }),
    provideEffects(UsersEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    { provide: API_URL, useValue: 'https://jsonplaceholder.typicode.com' }
]
};
