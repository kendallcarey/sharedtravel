import { Component,ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/.';
import {PackingList} from "../../store/packing-list/packing-list.model";
import { PackingListService } from '../../store/packing-list/packing-list.service'
import {EditPackingListAction} from "../../store/packing-list/packing-list.actions";

@Component({
    selector: 'packing-list',
    templateUrl: './packing-list.component.html',
    styleUrls: ['./packing-list.component.scss']
})
export class PackingListComponent {
    @Input()
    packingList:PackingList;
    private selectedId: number;
    edit:boolean = false;
    constructor(
        private store: Store<fromRoot.State>,
        private service: PackingListService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    onSelect(packingList:PackingList) {
        this.router.navigate(['/packing-list', packingList.$key]);
    }

    editPL() {
        this.edit = !this.edit;
    }

    makeChanges(pl:string) {
        this.store.dispatch(new EditPackingListAction({newName:pl, oldPackingList:this.packingList}));
    }

    // deletePackingList(packingList:PackingList) {
    //     this.store.dispatch(new DeletePackingListAction(packingList));
    // }
}