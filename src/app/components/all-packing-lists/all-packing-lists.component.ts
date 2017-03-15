import { Component,ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/.';
import {PackingList} from "../../store/packing-list/packing-list.model";
import {AddPackingListAction, DeletePackingListAction, EditPackingListAction} from "../../store/packing-list/packing-list.actions";
import {PackingListService} from "../../store/packing-list/packing-list.service";

@Component({
    templateUrl: './all-packing-lists.component.html',
    styleUrls: ['./all-packing-lists.component.scss']
})
export class AllPackingListsComponent {
    @ViewChild('newPL') newPL: ElementRef;
    packingLists : PackingList[] = [];
    packingList:PackingList = undefined;
    selectedPackingList:boolean = false;
    edit:boolean = false;
    constructor(private store: Store<fromRoot.State>, packingListService: PackingListService) {
        store.select(fromRoot.getPackingLists).subscribe(packingLists => {
            this.packingLists = packingLists;
            console.log(this.packingLists);
        });
    }
    selectPackingList(packingList:PackingList) {
        this.selectedPackingList = !this.selectedPackingList;
    }
    addNew(packingList: string) {
        this.store.dispatch(new AddPackingListAction(packingList));
        this.newPL.nativeElement.value = '';
    }
    editPackingList() {
        this.edit = !this.edit;
    }
    makeChanges(packingListName:string) {
        this.store.dispatch(new EditPackingListAction({newName:packingListName, oldPackingList:this.packingList}));
    }
    // deletePackingList(packingList:PackingList) {
    //     this.store.dispatch(new DeletePackingListAction(packingList));
    // }

}