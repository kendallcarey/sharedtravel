import { Component,ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/.';
import {PackingList} from "../../store/packing-list/packing-list.model";
import {AddPackingListAction, DeletePackingListAction} from "../../store/packing-list/packing-list.actions";

@Component({
    selector: 'all-packing-lists',
    templateUrl: './all-packing-lists.component.html',
    styleUrls: ['./all-packing-lists.component.scss']
})
export class AllPackingListsComponent {
    // @ViewChild('newPackingList') newPackingList: ElementRef;
    packingLists : PackingList[] = undefined;
    // edit:boolean = false;
    constructor(private store: Store<fromRoot.State>) {
        store.select(fromRoot.getPackingLists).subscribe(packingLists => {
            this.packingLists = packingLists;
        });
        // this.item = store.select(fromRoot.getPackingList);
    }

    // editPackingList() {
    //     this.edit = !this.edit;
    // }
    // makeChanges(packingList:string) {
    //     this.store.dispatch(new UpdatePackingListAction({newName:packingList, oldPackingList:this.packingList}));
    // }
    // deletePackingList(packingList:PackingList) {
    //     this.store.dispatch(new DeletePackingListAction(packingList));
    // }

}