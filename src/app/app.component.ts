import {AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {ColorPickerComponent} from './color-picker/color-picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private _overlayRef: OverlayRef;

  colors = [
    {name: 'Red', value: '#F44336'},
    {name: 'Pink', value: '#E91E63'},
    {name: 'Purple', value: '#9C27B0'},
    {name: 'Deep Purple', value: '#673AB7'},
    {name: 'Indigo', value: '#3F51B5'},
    {name: 'Blue', value: '#2196F3'},
    {name: 'Light Blue', value: '#03A9F4'},
    {name: 'Cyan', value: '#00BCD4'},
    {name: 'Teal', value: '#009688'},
    {name: 'Green', value: '#4CAF50'},
    {name: 'Light Green', value: '#8BC34A'},
    {name: 'Lime', value: '#CDDC39'},
    {name: 'Yellow', value: '#FFEB3B'},
    {name: 'Amber', value: '#FFC107'},
    {name: 'Orange', value: '#FF9800'},
    {name: 'Deep Orange', value: '#FF5722'},
    {name: 'Brown', value: '#795548'},
    {name: 'Grey', value: '#9E9E9E'},
    {name: 'Blue Grey', value: '#607D8B'}
  ];

  @ViewChild('btn') button: ElementRef;
  @ViewChild(ColorPickerComponent) picker: ColorPickerComponent;

  constructor(public overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

  ngAfterViewInit() {
    const positionStrategy =
      this.overlay
      .position()
      .connectedTo(this.button, {originX: 'start', originY: 'bottom'}, {overlayX: 'start', overlayY: 'top'});

    const overlayConfig: OverlayConfig = new OverlayConfig(<OverlayConfig>{
      positionStrategy
    });

    this._overlayRef = this.overlay.create(overlayConfig);
  }

  click() {
    this._overlayRef.detach();
    const picker = new TemplatePortal(this.picker.template, this.viewContainerRef);
    this._overlayRef.attach(picker);
  }
}
