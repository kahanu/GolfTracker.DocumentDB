import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';

import { golfersRoutes } from './golfers/golfers.routes';
import { golfclubsRoutes } from './golfclubs/golfclubs.routes';

const routes: Routes = [
    { path: '', component: HomeComponent },
    ...golfclubsRoutes,
    ...golfersRoutes,
    { path: '**', component: PageNotFoundComponent }

];

export const appRouterProviders = RouterModule.forRoot(routes);