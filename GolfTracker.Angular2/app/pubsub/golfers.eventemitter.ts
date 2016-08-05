import { Subject } from 'rxjs/Subject';
import { IGolfer } from '../golfers/golfer.service';

export class GolfersEventEmitter extends Subject<IGolfer> {
    constructor() {
        super();
    }
    emit(value) { super.next(value); }
}