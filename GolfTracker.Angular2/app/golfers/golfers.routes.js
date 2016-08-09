"use strict";
var golfers_component_1 = require('./golfers.component');
var golfer_list_component_1 = require('./golfer-list.component');
var manage_golfers_component_1 = require('./manage-golfers.component');
exports.golfersRoutes = [
    {
        path: 'golfers', component: golfers_component_1.GolfersComponent, children: [
            { path: '', component: golfer_list_component_1.GolferListComponent },
            { path: 'managegolfers', component: manage_golfers_component_1.ManageGolfersComponent }
        ]
    }
];
//# sourceMappingURL=golfers.routes.js.map