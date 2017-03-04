import { Component,ViewChild, ElementRef } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as log from '../actions/log';
import * as fromRoot from '../reducers';
import {PackingList} from "../models/packing-list";
import { PackingListService } from '../services/packing-list.service'
import {AddItemAction} from "../actions/packing-list";

@Component({
    selector: 'packing-list',
    templateUrl: './packing-list.component.html',
    styleUrls: ['./packing-list.component.scss']
})
export class PackingListComponent {
    @ViewChild('newitem') newItem: ElementRef;
    packingList$ : Observable<PackingList>;
    constructor(private store: Store<fromRoot.State>, private packingList: PackingListService) {
        this.packingList$ = store.select(fromRoot.getPackingList);
    }
    addNew(item: string) {
        this.store.dispatch(new AddItemAction(item));
        this.newItem.nativeElement.value = '';
    }

}