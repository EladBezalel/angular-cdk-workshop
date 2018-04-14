## Step 5 task:

In this step we're going to add the ability to select a color using a
two-way binding, as well as displaying the currently-selected color.

First of all, we need to define the property on the model that will
hold the selected value:

###### File: `src/app/app.component.html`

```ts
export class AppComponent {
  selectedColor = {name: 'Indigo', value: '#3F51B5'};

  colors = [
    {name: 'Red', value: '#F44336'},
    {name: 'Pink', value: '#E91E63'},
    {name: 'Purple', value: '#9C27B0'},
    {name: 'Deep Purple', value: '#673AB7'},
    this.selectedColor,
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
}
```

Afterwards we need to add a `value` `@Input` through which we can pass in the
selected color. We can also use the selected color to change the background of
the header.

###### File: `src/app/color-picker/color-picker.component.ts`

```ts
export class ColorPickerComponent {
  @Input() value: object;
  @ViewChild(TemplateRef) template: TemplateRef<any>;

  @Input() colors: object[];
}
```

###### File: `src/app/app.component.html`

```html
<div class="header" [ngStyle]="{backgroundColor: selectedColor.value}">
  <h2>Welcome to the CDK workshop</h2>
</div>
<div class="content">
  <span>{{selectedColor.value}}</span>
  <button [color-picker-trigger]="picker">click me</button>
</div>
<color-picker [colors]="colors" [value]="selectedColor" #picker></color-picker>
```

Next we need to add the two-way binding and the selection logic that will propagate
the selected value back to the model:

###### File: `src/app/color-picker/color-picker.component.ts`

```ts
export class ColorPickerComponent {
  @Input() colors: object[];
  @ViewChild(TemplateRef) template: TemplateRef<any>;

  @Input() value: object;
  @Output() valueChange: EventEmitter<object> = new EventEmitter();

  select(color) {
    this.valueChange.emit(color);
  }
}
```

###### File: `src/app/color-picker/color-picker.component.html`

```html
<ng-template>
  <div class="container">
    <div *ngFor="let color of colors" (click)="select(color)"
         class="color" [ngStyle]="{backgroundColor: color.value}"></div>
  </div>
</ng-template>
```

###### File: `src/app/app.component.html`

```html
...
<color-picker [colors]="colors" [(value)]="selectedColor" #picker></color-picker>
```

Now that we can change the selected value, we need to add some indication to
show which color has been selected:

###### File: `src/app/color-picker/color-picker.component.html`

```html
<ng-template>
  <div class="container">
    <div *ngFor="let color of colors" (click)="select(color)"
         class="color" [ngStyle]="{backgroundColor: color.value}">
      <svg *ngIf="color === value" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
      </svg>
    </div>
  </div>
</ng-template>
```

![Selected value checkmark example](https://i.imgur.com/NSW6Fz7.png)

###### File: `src/app/color-picker/color-picker.component.css`

```css
.color {
  height: 50px;
  width: 50px;
  margin: 4px;
  border-radius: 3px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.color svg {
  fill: white;
}
```

Once a color is selected, we can make the overlay close so the user doesn't have to click again

###### File: `src/app/color-picker/color-picker-trigger.directive.ts`

```ts
import { first } from 'rxjs/operators/first';

export class ColorPickerTriggerDirective {
  private _overlayRef: OverlayRef;

  ...

  click() {
    if (!this._overlayRef) {
      this.init();
    }

    // Close the overlay when a value is selected
    this.colorPicker.valueChange
      .pipe(first())
      .subscribe(() => this._overlayRef.detach());

    this._overlayRef.detach();
    const picker = new TemplatePortal(this.colorPicker.template, this.viewContainerRef);
    this._overlayRef.attach(picker);
  }
}
```


Finally, we can add a transition to the header to make it smoother when we switch between colors.

###### File: `src/app/app.component.css`

```css
.header {
  color: white;
  display: flex;
  align-content: center;
  padding: 0 8px;
  margin-bottom: 8px;
  transition: background-color .2s cubic-bezier(0.25, 0.8, 0.25, 1);
}
```
