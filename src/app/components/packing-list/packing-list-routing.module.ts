import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { PackingListDetailComponent}    from '../packing-list-detail/packing-list-detail.component';
import { PackingListService }      from '../../store/packing-list/packing-list.service';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'packing-list/:id', component: PackingListDetailComponent }
    ])],
    exports: [RouterModule]
})
export class PackingListRoutingModule {}
