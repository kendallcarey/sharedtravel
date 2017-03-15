import { Component,ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
    @Input()
    packingList:PackingList;
    private selectedId: number;
    constructor(
        private store: Store<fromRoot.State>,
        private service: PackingListService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    onSelect(packingList:PackingList) {
        this.router.navigate(['/packing-list', packingList.$key]);
    }
}