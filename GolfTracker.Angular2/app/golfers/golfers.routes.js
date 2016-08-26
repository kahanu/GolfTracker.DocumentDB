"use strict";
var golfers_component_1 = require('./golfers.component');
var golfer_list_component_1 = require('./golfer-list.component');
// import { ManageGolfersComponent } from './manage-golfers.component';
exports.golfersRoutes = [
    {
        path: 'golfers', component: golfers_component_1.GolfersComponent, children: [
            { path: '', component: golfer_list_component_1.GolferListComponent }
        ]
    }
];
//# sourceMappingURL=golfers.routes.js.map