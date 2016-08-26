import { RouterConfig } from '@angular/router';

import { GolfersComponent } from './golfers.component';
import { GolferListComponent } from './golfer-list.component';
// import { ManageGolfersComponent } from './manage-golfers.component';

export const golfersRoutes: RouterConfig = [
    {
        path: 'golfers', component: GolfersComponent, children: [
            { path: '', component: GolferListComponent }
        ]
    }
];