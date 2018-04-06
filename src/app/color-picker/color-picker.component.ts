import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Directionality} from '@angular/cdk/bidi';
import {FocusKeyManager} from '@angular/cdk/a11y';

import {ColorComponent} from './color/color.component';

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
export class ColorPickerComponent implements OnChanges, AfterViewInit {
  private keyManager: FocusKeyManager<ColorComponent>;

  @Input() colors: object[];
  @Input() value: object;

  @Output() valueChange: EventEmitter<object> = new EventEmitter();

  @ViewChild(TemplateRef) template: TemplateRef<any>;
  @ViewChildren(ColorComponent) colorComponents: QueryList<ColorComponent>;

  constructor(public dir: Directionality) {
  }

  select(color) {
    this.valueChange.emit(color);
  }

  ngOnChanges() {
    this.setActiveItem(this.value);
  }

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager(this.colorComponents)
      .withHorizontalOrientation(this.dir.value)
      .withVerticalOrientation(false);

    this.setActiveItem(this.value);
  }

  setActiveItem(value) {
    if (value && this.keyManager) {
      this.keyManager.setActiveItem(this.colors.indexOf(value));
    }
  }

  onKeyDown(ev: KeyboardEvent) {
    this.keyManager.onKeydown(ev);
  }
}
