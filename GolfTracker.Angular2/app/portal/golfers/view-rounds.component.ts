import { Component, Input, Output, EventEmitter } from "@angular/core";

import { IGolfer, GolferService } from '../../golfers/golfer.service';

@Component({
    selector: "view-rounds",
    templateUrl: "app/portal/golfers/view-rounds.component.html"
})
export class ViewRoundsComponent {
    pageTitle: string = "View rounds";
    @Input() golfer: IGolfer;

    ///<author>
    /// KW - isVisible
    ///</author>
    ///<summary>
    /// We are allowing the host component to control the visibility of the view rounds panel 
    /// in the event that the view rounds panel is visible and the user then clicks the 
    /// Add Round button.  If the visibility of the view rounds panel wasn't controlled by 
    /// the host component (ManageGolfersComponent), then both panels would be visible at 
    /// the same time, and that's not desirable or a good user experience.
    ///</summary>
    @Input() isVisible: boolean;

    constructor(private _golferService: GolferService){}

    ///<author>
    /// KW - close output (EventEmitter)
    ///</author>
    ///<summary>
    /// This will be an event on the HTML directive in the manage-golfers.component.html for the view-rounds directive.
    /// It allows the host component to be signaled when the ViewRounds div closes, so the host component can
    /// set the shortTable variable.
    ///</summary>
    @Output() close = new EventEmitter();

    deleteRound(idx: number): void {
        if (confirm("Are you sure you want to delete this round?")) {
            this.golfer.Rounds.splice(idx, 1);
            this._golferService.updateGolfer(this.golfer)
                .subscribe(g => g);
        }
    }

    closeRoundsPanel(): void {
        // This will emit a boolean value to the event handler in the HTML directive of the host HTML
        // for the close event.  The actual value is irrelevant in this instance, since the host
        // event handler should always do what it needs to do, and in this case set the 
        // shortTable variable to false;
        this.close.emit(false);
        this.isVisible = false;
    }
}