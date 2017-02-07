import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { getPackingList } from './reducers';
import { compose } from '@ngrx/core/compose';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { AppComponent } from './app.component';
import { reducer } from './reducers';
import {PackingListComponent} from "./components/packing-list.component";
import {ItemComponent} from "./components/item.component";

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.provideStore(
        reducer
    ),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  declarations: [
    AppComponent,
    PackingListComponent,
    ItemComponent
  ],
  bootstrap: [AppComponent],
  providers: [LOG_LOGGER_PROVIDERS]
})
export class AppModule { }
