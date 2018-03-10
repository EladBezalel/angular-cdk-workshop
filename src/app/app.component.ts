import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ColorPickerComponent} from './color-picker/color-picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private _overlayRef: OverlayRef;

  @ViewChild('btn') button: ElementRef;

  constructor(public overlay: Overlay) {}

  ngAfterViewInit() {
    const overlayConfig: OverlayConfig = new OverlayConfig();

    overlayConfig.positionStrategy = this.overlay
      .position().connectedTo(this.button, {originX: 'start', originY: 'bottom'}, {overlayX: 'start', overlayY: 'top'});

    this._overlayRef = this.overlay.create(overlayConfig);
  }

  click() {
    this._overlayRef.detach();
    const picker = new ComponentPortal(ColorPickerComponent);
    this._overlayRef.attach(picker);
  }
}
