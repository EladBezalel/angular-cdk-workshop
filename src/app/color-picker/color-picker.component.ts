import {Component, Input, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  exportAs: 'colorPicker'
})
export class ColorPickerComponent {
  @Input() colors: object[];

  @ViewChild(TemplateRef) template: TemplateRef<any>;
}
