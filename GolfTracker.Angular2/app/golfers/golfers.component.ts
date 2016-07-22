import { Component } from "@angular/core";
import { RouteConfig, ROUTER_DIRECTIVES } from "@angular/router-deprecated";

import { GolferListComponent } from './golfer-list.component';
import { ManageGolfersComponent } from './manage-golfers.component';

@Component({
    selector: "golfers-root",
    template: "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: 'golfers/', name: "Golfers", component: GolferListComponent, useAsDefault: true },
    { path: 'golfers/managegolfers/', name: "ManageGolfers", component: ManageGolfersComponent }
])
export class GolfersComponent {}