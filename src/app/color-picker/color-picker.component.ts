import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  exportAs: 'colorPicker',
  animations: [
    trigger('picker', [
      state('void', style({
        transform: 'scale(0)',
        opacity: 0
      })),
      transition('void <=> *', [
        style({
          opacity: 1
        }),
        animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ])
    ])
  ]
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
