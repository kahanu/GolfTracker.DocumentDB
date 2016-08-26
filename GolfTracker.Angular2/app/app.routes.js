"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var page_not_found_component_1 = require('./page-not-found.component');
var login_component_1 = require('./login.component');
var golfers_routes_1 = require('./golfers/golfers.routes');
var golfclubs_routes_1 = require('./golfclubs/golfclubs.routes');
var portal_routes_1 = require('./portal/portal.routes');
var routes = [
    { path: '', component: home_component_1.HomeComponent }
].concat(golfclubs_routes_1.golfclubsRoutes, golfers_routes_1.golfersRoutes, portal_routes_1.portalRoutes, [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
]);
exports.appRouterProviders = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map