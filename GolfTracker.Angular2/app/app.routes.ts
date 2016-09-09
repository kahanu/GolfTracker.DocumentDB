import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { IndexComponent } from './portal/index.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { golfersRoutes } from './golfers/golfers.routes';
import { golfclubsRoutes } from './golfclubs/golfclubs.routes';
import { portalRoutes } from './portal/portal.routes';


const routes: Routes = [
    { path: '', component: HomeComponent },
    ...golfclubsRoutes,
    ...golfersRoutes,
    ...portalRoutes,
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: PageNotFoundComponent }

];

export const appRouterProviders = RouterModule.forRoot(routes);