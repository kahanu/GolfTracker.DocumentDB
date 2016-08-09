"use strict";
var golfclubs_component_1 = require('./golfclubs.component');
var golfclub_list_component_1 = require('./golfclub-list.component');
exports.golfclubsRoutes = [
    {
        path: 'golfclubs', component: golfclubs_component_1.GolfClubsComponent, children: [
            { path: '', component: golfclub_list_component_1.GolfClubListComponent }
        ]
    }
];
//# sourceMappingURL=golfclubs.routes.js.map