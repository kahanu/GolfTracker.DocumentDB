import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';

import { golfersRoutes } from './golfers/golfers.routes';
import { golfclubsRoutes } from './golfclubs/golfclubs.routes';

const routes: RouterConfig = [
    { path: '', component: HomeComponent },
    ...golfclubsRoutes,
    ...golfersRoutes,
    { path: '**', component: PageNotFoundComponent }

];

export const appRouterProviders = [
    provideRouter(routes)
];