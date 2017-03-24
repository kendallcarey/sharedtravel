import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { TripComponent}    from '../trip/trip.component';
// import { PackingListService }      from '../../store/packing-list/packing-list.service';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'trip/:id', component: TripComponent }
    ])],
    exports: [RouterModule]
})
export class TripRoutingModule {}
