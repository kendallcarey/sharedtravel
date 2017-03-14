import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { PackingListComponent}    from './packing-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'packing-list', component: PackingListComponent }
    ])],
    exports: [RouterModule]
})
export class PackingListRoutingModule {}
