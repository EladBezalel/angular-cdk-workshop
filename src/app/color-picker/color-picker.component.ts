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
  @ViewChild(TemplateRef) template: TemplateRef<any>;

  @Input() colors: string[];

  @Input() value: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  select(color) {
    this.valueChange.emit(color);
  }
}
