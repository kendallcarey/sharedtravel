import { Component,ViewChild, ElementRef, Input } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/.';
import {PackingList} from "../../store/packing-list/packing-list.model";
import { PackingListService } from '../../store/packing-list/packing-list.service'
import {AddItemAction} from "../../store/packing-list/packing-list.actions";

@Component({
    selector: 'packing-list',
    templateUrl: './packing-list.component.html',
    styleUrls: ['./packing-list.component.scss']
})
export class PackingListComponent {
    @ViewChild('newitem') newItem: ElementRef;
    @Input()
    packingList:PackingList;
    constructor(private store: Store<fromRoot.State>) {
        // this.packingList$ = store.select(fromRoot.getPackingLists);
    }
    addNew(item: string) {
        this.store.dispatch(new AddItemAction(item));
        this.newItem.nativeElement.value = '';
    }

}