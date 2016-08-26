import { Component, Input, Output, EventEmitter } from "@angular/core";

import { IGolfer, GolferService } from '../../golfers/golfer.service';
import { PubSubService } from '../../pubsub/pubsub.service';

@Component({
    selector: "manage-golfer",
    templateUrl: "app/portal/golfers/manage-golfer.component.html"
})
export class ManageGolferComponent {
    pageTitle: string = "Manage golfer";

    @Input() golfer: IGolfer;
    @Input() dialogTitle: string = "Add";
    @Input() isVisible: boolean;
    @Output() close = new EventEmitter();
    golfers: IGolfer[];

    constructor(private _golferService: GolferService, private _pubsub: PubSubService) { }

    ///<author>
    /// KW - saveGolfer
    ///</author>
    ///<summary>
    /// Save or update the golfer.
    ///</summary>
    saveGolfer(isValid: boolean, golfer: IGolfer): void {

        if (golfer.id === undefined) {
            this._golferService.addGolfer(golfer)
                .subscribe(golfer => {
                    // this.golfers.push(golfer);

                    // I'm using a pubsub service to publish the golfer to the service
                    // and allow anyone listening to subscribe to the pubsub service 
                    // and collect this golfer.  This is an easy way to update the 
                    // golfers[] collection in the ManageGolfersComponent without
                    // having direct access to it's - this.golfers = [] array.
                    this._pubsub.AddGolfer(golfer);
                    this.golfer = <IGolfer>{};
                });
        } else {
            // Updating golfer
            this._golferService.updateGolfer(golfer)
                .subscribe(res => {
                    this.golfer = golfer;
                });
        }

        this.isVisible = false;
        this.close.emit(false);
    }

    ///<author>
    /// KW - cancelGolferForm
    ///</author>
    ///<summary>
    /// Close the golfer form.
    ///</summary>
    cancelGolferForm(): void {
        this.isVisible = false;
        this.close.emit(false);
    }

}