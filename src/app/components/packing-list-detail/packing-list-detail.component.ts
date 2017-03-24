import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/.';
import { PackingList } from '../../store/packing-list/packing-list.model';
import { PackingListService } from '../../store/packing-list/packing-list.service';
import { AddItemAction } from '../../store/packing-list/packing-list.actions';

@Component({
    templateUrl: './packing-list-detail.component.html',
    styleUrls: ['./packing-list-detail.component.scss']
})
export class PackingListDetailComponent implements OnInit {
    @ViewChild('newitem') newItem: ElementRef;
    packingList: PackingList;
    constructor(
        private store: Store<fromRoot.State>,
        private route: ActivatedRoute,
        private router: Router,
        private service: PackingListService
    ) {}

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.service.getPackingList(params.id))
            .subscribe((packingList: PackingList) => this.packingList = packingList);

        console.log(this.packingList);
    }

    gotoAllLists() {
        this.router.navigate(['/']);
    }

    addNew(itemName: string) {
        this.store.dispatch(new AddItemAction({name: itemName, packingList: this.packingList}));
        this.newItem.nativeElement.value = '';
    }
}
