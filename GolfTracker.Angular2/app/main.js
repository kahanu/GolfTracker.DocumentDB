"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var forms_1 = require('@angular/forms');
// Our main component
var app_component_1 = require('./app.component');
var platform_browser_1 = require('@angular/platform-browser');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    platform_browser_1.Title,
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms()
]);
//# sourceMappingURL=main.js.map