import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { PackingListComponent } from './packing-list.component';
import { PackingListDetailComponent } from '../packing-list-detail/packing-list-detail.component';
import { PackingListRoutingModule } from './packing-list-routing.module';
import { PackingListService } from '../../store/packing-list/packing-list.service';
import { Item } from '../../store/item/item.model';
import { ItemComponent } from '../item/item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PackingListRoutingModule
    ],
    declarations: [
        PackingListDetailComponent,
        ItemComponent

    ],
    providers: [ PackingListService ]
})
export class PackingListModule {}
