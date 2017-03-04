import { Component,ViewChild, ElementRef } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as log from '../actions/log';
import * as fromRoot from '../reducers';
import {PackingList} from "../models/packing-list";
import {AddItemAction} from "../actions/packing-list";

@Component({
    selector: 'create-packing-list',
    templateUrl: './create-packing-list.component.html',
    styleUrls: ['./create-packing-list.component.scss']
})
export class CreatePackingListComponent {
    // @ViewChild('newitem') newItem: ElementRef;
    packingList$ : Observable<PackingList>;
    constructor(private store: Store<fromRoot.State>) {
        this.packingList$ = store.select(fromRoot.getPackingList);
    }
    addNew(packingList: string) {
        this.store.dispatch(new AddPackingListAction(packingList));
    }

}