import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  exportAs: 'colorPicker'
})
export class ColorPickerComponent {
  @Input() colors: object[];
  @Input() value: object;

  @Output() valueChange: EventEmitter<object> = new EventEmitter();

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  select(color) {
    this.valueChange.emit(color);
  }
}
