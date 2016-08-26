import { Component, Input, Output, EventEmitter } from "@angular/core";

import { GolfClubService, GolfClub } from '../../golfclubs/golfclub.service';
import { PubSubService } from '../../pubsub/pubsub.service';

@Component({
    selector: "manage-golfclub",
    templateUrl: "app/portal/golfclubs/manage-golfclub.component.html"
})
export class ManageGolfClubComponent {
    pageTitle: string = "Manage golfclub";

    @Input() golfclub: GolfClub;
    @Input() dialogTitle: string;
    @Input() isVisible: boolean;
    @Output() close = new EventEmitter();

    errorMessage: string;

    constructor(private _golfClubService: GolfClubService, private _pubsub: PubSubService) { }

    ///<author>
    /// KW - Edit Golf Club
    ///</author>
    ///<summary>
    /// This will handle either the Insert or Update function.
    ///</summary>
    saveGolfClub(golfClub: GolfClub): void {
        // quick validation
        if (golfClub.Name === undefined) {
            this.errorMessage = "Golf Club Name is required.";
            return;
        }

        // Since there's no Id on the incoming model, add.
        if (golfClub.id === undefined) {
            this._golfClubService.addGolfClub(golfClub)
                .subscribe(gc => {

                    // Add the golf club to the PubSub subscription
                    // Check golfclub-list.component.ts for consuming this subscription.
                    this._pubsub.AddGolfClub(gc);
                    this.golfclub = <GolfClub>{};
                });
        } else {
            // Update the model
            this._golfClubService.updateGolfClub(golfClub)
                .subscribe(gc => {
                    this.golfclub = <GolfClub>{};
                });
        }

        this.isVisible = false;
        this.close.emit(false);
    }

    ///<author>
    /// KW - Close the Golf Club
    ///</author>
    ///<summary>
    /// First remove the "required" attribute to the input field so the validation doesn't fire
    /// when you hide the form.
    ///</summary>
    closeGolfClubForm(): void {
        var el = document.getElementById("golfClubName");
        el.removeAttribute("required");

        this.golfclub = <GolfClub>{};
        this.isVisible = false;
        this.close.emit(false);
    }

}