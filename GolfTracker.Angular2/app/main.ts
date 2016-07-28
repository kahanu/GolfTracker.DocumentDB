import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

// Our main component
import { AppComponent } from './app.component';
import { Title } from '@angular/platform-browser';

bootstrap(AppComponent, [
    Title,
    disableDeprecatedForms(),
    provideForms()
]); 