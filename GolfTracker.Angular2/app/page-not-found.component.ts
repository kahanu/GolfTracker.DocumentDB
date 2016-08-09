import { Component } from "@angular/core";

@Component({
    selector: "page-not-found",
    template: `<h1>{{ pageTitle }}</h1>
    <p>This isn't the content you are looking for, move along.</p>
    `
})
export class PageNotFoundComponent {
    pageTitle: string = "(Hand wave)";
}