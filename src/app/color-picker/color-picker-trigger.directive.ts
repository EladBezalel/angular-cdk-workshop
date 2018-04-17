import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';

import {first} from 'rxjs/operators/first';

import {ColorPickerComponent} from './color-picker.component';

@Directive({
  selector: '[color-picker-trigger]',
  host: {
    '(click)': 'click($event)'
  }
})
export class ColorPickerTriggerDirective {
  private _overlayRef: OverlayRef;

  @Input('color-picker-trigger') colorPicker: ColorPickerComponent;

  constructor(public overlay: Overlay,
              private elementRef: ElementRef,
              private viewContainerRef: ViewContainerRef) {}

  private init() {
    const positionStrategy =
      this.overlay
        .position()
        .connectedTo(this.elementRef, {originX: 'start', originY: 'bottom'}, {overlayX: 'start', overlayY: 'top'});

    const overlayConfig: OverlayConfig = new OverlayConfig(<OverlayConfig>{
      maxWidth: 250,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy
    });

    this._overlayRef = this.overlay.create(overlayConfig);

    this._overlayRef
      .backdropClick()
      .subscribe(() => this._overlayRef.detach());
  }

  click() {
    if (!this._overlayRef) {
      this.init();
    }

    this.colorPicker.valueChange
      .pipe(first())
      .subscribe(() => this._overlayRef.detach());

    this._overlayRef.detach();
    const picker = new TemplatePortal(this.colorPicker.template, this.viewContainerRef);
    this._overlayRef.attach(picker);
  }
}
