import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ScoreboardAnimationsService {
    private pointsSubject = new Subject<number>();
    constructor() {
    }

    public updatePoints(points: number) {
        this.pointsSubject.next(points);
    }

    public getPointsListner(): Observable<number> {
        return this.pointsSubject.asObservable();
    }

}
