import { Component, Input,ViewChild, ElementRef } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/.';
import {PackingList} from "../../store/packing-list/packing-list.model";
import {AddItemAction} from "../../store/packing-list/packing-list.actions";

@Component({
    selector: 'create-packing-list',
    templateUrl: './create-packing-list.component.html',
    styleUrls: ['./create-packing-list.component.scss']
})
export class CreatePackingListComponent {
    // @Input()
    // packingList:PackingList;
    // constructor(private store: Store<fromRoot.State>) {
    //     this.packingList$ = store.select(fromRoot.getPackingList);
    // }
    // addNew(packingList: string) {
    //     this.store.dispatch(new AddPackingListAction(packingList));
    // }

}