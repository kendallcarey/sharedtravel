import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/.';
import {PackingList} from '../../store/packing-list/packing-list.model';
import {AddPackingListAction} from '../../store/packing-list/packing-list.actions';
import {PackingListService} from '../../store/packing-list/packing-list.service';

@Component({
    templateUrl: './all-packing-lists.component.html',
    styleUrls: ['./all-packing-lists.component.scss']
})
export class AllPackingListsComponent {
    @ViewChild('newPL') newPL: ElementRef;
    packingLists: PackingList[] = [];
    packingList: PackingList = undefined;
    edit: boolean = false;
    constructor(private store: Store<fromRoot.State>, packingListService: PackingListService) {
        store.select(fromRoot.getPackingLists).subscribe(packingLists => {
            this.packingLists = packingLists;
            console.log(this.packingLists);
        });
    }
    addNew(packingList: string) {
        this.store.dispatch(new AddPackingListAction(packingList));
        this.newPL.nativeElement.value = '';
    }

}
