import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  exportAs: 'colorPicker'
})
export class ColorPickerComponent {
  @ViewChild(TemplateRef) template: TemplateRef<any>;

  @Input() colors: string[];

  @Input() value: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  select(color) {
    this.valueChange.emit(color);
  }
}
