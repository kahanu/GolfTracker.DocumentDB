import { RouterConfig } from '@angular/router';

import { PortalComponent } from './portal.component';
import { PortalGolfClubListComponent } from './golfclubs/golfclub-list.component';

import { PortalManageGolfersComponent } from './golfers/manage-golfers.component';
import { LoggedInGuard } from '../guards/logged-in.guard';

import { IndexComponent } from './index.component';

export const portalRoutes: RouterConfig = [
    {
        path: 'portal', component: PortalComponent, children: [
            { path: '', component: IndexComponent, canActivate: [LoggedInGuard] },
            { path: 'golfclubs', component: PortalGolfClubListComponent },
            { path: 'golfers', component: PortalManageGolfersComponent }
        ]
    }
];