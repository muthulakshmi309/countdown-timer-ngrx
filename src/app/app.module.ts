import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { countdownReducer } from './countdown.reducer'

@NgModule({
  imports:      [ BrowserModule, FormsModule,
    StoreModule.forRoot({ countdownTimer: countdownReducer }) ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
