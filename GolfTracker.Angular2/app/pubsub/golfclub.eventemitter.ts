import { Subject } from 'rxjs/Subject';
import { GolfClub } from '../golfclubs/golfclub.service';

export class GolfClubEventEmitter extends Subject<GolfClub> {
    constructor() {
        super();
    }

    emit(value) { super.next(value); }
}