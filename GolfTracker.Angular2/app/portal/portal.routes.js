"use strict";
var portal_component_1 = require('./portal.component');
var golfclub_list_component_1 = require('./golfclubs/golfclub-list.component');
var manage_golfers_component_1 = require('./golfers/manage-golfers.component');
var logged_in_guard_1 = require('../guards/logged-in.guard');
var index_component_1 = require('./index.component');
exports.portalRoutes = [
    {
        path: 'portal', component: portal_component_1.PortalComponent, children: [
            { path: '', component: index_component_1.IndexComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
            { path: 'golfclubs', component: golfclub_list_component_1.PortalGolfClubListComponent },
            { path: 'golfers', component: manage_golfers_component_1.PortalManageGolfersComponent }
        ]
    }
];
//# sourceMappingURL=portal.routes.js.map