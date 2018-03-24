import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {ColorPickerComponent} from './color-picker.component';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {take} from 'rxjs/operators/take';

@Directive({
  selector: '[color-picker-trigger]',
  host: {
    '(click)': 'click($event)'
  }
})
export class ColorPickerTriggerDirective {
  private _overlayRef: OverlayRef;

  @Input('color-picker-trigger') colorPicker: ColorPickerComponent;

  constructor(public overlay: Overlay, private elementRef: ElementRef, private viewContainerRef: ViewContainerRef) {}

  private init() {
    const overlayConfig: OverlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backgorund'
    });

    overlayConfig.positionStrategy = this.overlay
      .position()
      .connectedTo(this.elementRef, {
        originX: 'start',
        originY: 'bottom'
      }, {
        overlayX: 'start',
        overlayY: 'top'
      });

    this._overlayRef = this.overlay.create(overlayConfig);

    this._overlayRef.backdropClick()
      .subscribe(() => this._overlayRef.detach());
  }

  click() {
    if (!this._overlayRef) {
      this.init();
    }

    this.colorPicker.valueChange
      .pipe(take(1))
      .subscribe(() => this._overlayRef.detach());

    this._overlayRef.detach();
    const picker = new TemplatePortal(this.colorPicker.template, this.viewContainerRef);
    this._overlayRef.attach(picker);
  }
}
