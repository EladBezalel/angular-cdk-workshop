import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { BidiModule } from '@angular/cdk/bidi';

import { AppComponent } from './app.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorPickerTriggerDirective } from './color-picker/color-picker-trigger.directive';

@NgModule({
  declarations: [
    AppComponent,
    ColorPickerComponent,
    ColorPickerTriggerDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OverlayModule,
    BidiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
