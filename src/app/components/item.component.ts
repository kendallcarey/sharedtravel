import { Component, Input,ViewChild, ElementRef } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as log from '../actions/log';
import * as fromRoot from '../reducers';
import {PackingList} from "../models/packing-list";
import {AddItemAction, ItemCompletedAction, EditItemAction, DeleteItemAction} from "../actions/packing-list";
import {Item} from "../models/item";

@Component({
    selector: 'item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent {
    @Input()
    item:Item;
    @ViewChild('itemCheckbox') itemCheckbox: ElementRef;
    edit:boolean = false;

    constructor(private store: Store<fromRoot.State>) {
        // this.item = store.select(fromRoot.getPackingList);
    }

    statusComplete(item: Item) {
        this.store.dispatch(new ItemCompletedAction(item));
    }

    editItem() {
        this.edit = !this.edit;
    }
    makeChanges(item:string) {
        this.store.dispatch(new EditItemAction({newName:item, oldItem:this.item}));
    }
    deleteItem(item:Item) {
        this.store.dispatch(new DeleteItemAction(item));
    }
}