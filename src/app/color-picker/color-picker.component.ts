import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output, QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild, ViewChildren
} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ColorDirective} from './color.directive';
import {FocusKeyManager} from "@angular/cdk/a11y";

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
  private keyManager: FocusKeyManager<ColorDirective>;
  @ViewChild(TemplateRef) template: TemplateRef<any>;
  @ViewChildren(ColorDirective) gridCells: QueryList<ColorDirective>;

  @Input() colors: string[];

  @Input() value: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  private groupedColors: string[][];

  select(color) {
    this.valueChange.emit(color);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.colors) {
      const chunkSize = 4;
      this.groupedColors =
        this.colors.map((_, i) => !(i % chunkSize) ? this.colors.slice(i, i + chunkSize) : null)
          .filter(Boolean);
    }
  }

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager(this.gridCells)
      .withHorizontalOrientation('ltr')
      .withVerticalOrientation(false);

    if (this.value) {
      this.keyManager.setActiveItem(this.colors.indexOf(this.value));
    }
  }

  onKeyDown(ev: KeyboardEvent) {
    this.keyManager.onKeydown(ev);
  }
}
