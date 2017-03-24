import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/.';
import { Trip } from '../../store/trip/trip.model';

@Component({
    selector: 'trip',
    templateUrl: './trip.component.html',
    styleUrls: ['./trip.component.scss']
})
export class TripComponent {
    constructor(private store: Store<fromRoot.State>) {
        // this.item = store.select(fromRoot.getPackingList);
    }

}
