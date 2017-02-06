import { Component } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as log from '../actions/log';
import * as fromRoot from '../reducers';
import {PackingList} from "../models/packing-list";
import {AddItemAction} from "../actions/packing-list";
import {Item} from "../models/item";

@Component({
    selector: 'item',
    template: require('./item.component.html'),
    styles: [require('./item.component.scss')]
})
export class ItemComponent {
    item$ : Observable<Item>;
    // constructor(private store: Store<fromRoot.State>) {
    //     this.item = store.select(fromRoot.getPackingList);
    // }
}