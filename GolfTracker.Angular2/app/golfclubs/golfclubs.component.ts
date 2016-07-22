import { Component } from "@angular/core";
import { RouteConfig, ROUTER_DIRECTIVES } from "@angular/router-deprecated";

import { GolfClubListComponent } from './golfclub-list.component';


@Component({
    selector: "golfclubs-root",
    template: "<router-outlet></router-outlet>"
})
@RouteConfig([
    { path: 'golfclubs/', name: "GolfClubList", component: GolfClubListComponent, useAsDefault: true}
])
export class GolfClubsComponent {
}