import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { PackingListComponent}    from '../../components/packing-list/packing-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'packing-list', component: PackingListComponent }
    ])],
    exports: [RouterModule]
})
export class PackingListRoutingModule {}
