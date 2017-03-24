import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllPackingListsComponent} from './components/all-packing-lists/all-packing-lists.component';

export const routes: Routes = [
  { path: '', component: AllPackingListsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
