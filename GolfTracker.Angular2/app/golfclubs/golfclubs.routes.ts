import { RouterConfig } from '@angular/router';

import { GolfClubsComponent } from './golfclubs.component';
import { GolfClubListComponent } from './golfclub-list.component';

export const golfclubsRoutes: RouterConfig = [
    {
        path: 'golfclubs', component: GolfClubsComponent, children: [
            { path: '', component: GolfClubListComponent }
        ]
    }
];