import { Component, Input,ViewChild, ElementRef } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/.';
import {PackingList} from "../../store/packing-list/packing-list.model";
import {AddItemAction, ItemCompletedAction, EditItemAction, DeleteItemAction} from "../../store/packing-list/packing-list.actions";
import {Item} from "../../store/item/item.model";

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
    @Input()
    packingList:PackingList;
    constructor(private store: Store<fromRoot.State>) {
        // this.item = store.select(fromRoot.getPackingList);
    }

    statusComplete(item: Item) {
        this.store.dispatch(new ItemCompletedAction({item:item, packingList:this.packingList}));
    }

    editItem() {
        this.edit = !this.edit;
    }
    makeChanges(item:string) {
        this.store.dispatch(new EditItemAction({newName:item, oldItem:this.item, packingList:this.packingList}));
    }
    deleteItem(item:Item) {
        this.store.dispatch(new DeleteItemAction({item:item, packingList:this.packingList}));
    }
}