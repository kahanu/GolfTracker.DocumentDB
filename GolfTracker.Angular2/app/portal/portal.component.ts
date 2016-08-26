import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";

@Component({
    selector: "portal-root",
    templateUrl: "app/portal/portal.component.html",
    directives: [ROUTER_DIRECTIVES]
})
export class PortalComponent {
}