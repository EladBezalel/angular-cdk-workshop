#### Quick Jump ####
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_5.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* **Step 8a <-**
* [Step 8b](./STEP_8b.md)

### [Demo](https://stackblitz.com/github/EladBezalel/ngconf-cdk-workshop/tree/step-8a)

## Step 8a task:

In this step we're going to start making the color picker component accessible to assistive
technology. To do that, we need to add the appropriate roles to the various components, manage focus
correctly and implement keyboard controls. We're going to start off by implementing very basic
left/right keyboard controls and then expand upon it in the next step. First of all, we need to
import the CDK `A11yModule` which will give us access to a lot of accessibility utilities.

###### File: `src/app/app.module.ts`

```ts
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OverlayModule,
    BidiModule,
    A11yModule
  ],
  ...
})
export class AppModule {}
```

Afterwards we need to split out the individual color cells into their own component. This will
clean up the color picker's template and will allow us to use the keyboard management utilities
from the CDK which require instances of a component that implements the `FocusableOption` interface.

###### Create a new file: `src/app/color-picker/color/color.component.ts`

```ts
import { Component, ElementRef, Input } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

@Component({
  selector: 'color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements FocusableOption {
  @Input() color: Object;
  @Input() isSelected = false;

  constructor(private elementRef: ElementRef) {}

  focus() {
    this.elementRef.nativeElement.focus();
  }
}
```

###### Create a new file: `src/app/color-picker/color/color.component.html`

```html
<div class="color" [ngStyle]="{backgroundColor: color.value}">
  <svg *ngIf="isSelected" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
  </svg>
</div>
```

###### Create a new file: `src/app/color-picker/color/color.component.css`

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

After we've created the component, we need to declare it in our module and we need to put it
into the color picker component.

###### File: `src/app/app.module.ts`

```ts
import { ColorComponent } from './color-picker/color/color.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorPickerComponent,
    ColorPickerTriggerDirective,
    ColorComponent
  ],
  ...
})
export class AppModule {}
```

###### File: `src/app/color-picker/color-picker.component.html`

```html
<ng-template>
  <div class="container" @picker (keydown)="onKeyDown($event)"
       [style.transformOrigin]="dir.value === 'ltr' ? 'left top' : 'right top'">
    <color *ngFor="let color of colors" (click)="select(color)"
           [isSelected]="color === value" [color]="color">
    </color>
  </div>
</ng-template>
```

Now that we've got the `color` in a separate component, we can set up a `FocusKeyManager` which
will keep track of which `color` cell is focused and will move focus to the next/previous cells
when the user presses the `left`/`right` arrow keys.

###### File: `src/app/color-picker/color-picker.component.ts`

```ts
import { FocusKeyManager } from '@angular/cdk/a11y';

export class ColorPickerComponent implements AfterViewInit {
  private keyManager: FocusKeyManager<ColorComponent>;
  @ViewChildren(ColorComponent) colorComponents: QueryList<ColorComponent>;

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager(this.colorComponents)
      .withHorizontalOrientation(this.dir.value)
      .withVerticalOrientation(false);

    this.setActiveItem(this.value);
  }

  setActiveItem(value: object) {
    if (value && this.keyManager) {
      this.keyManager.setActiveItem(this.colors.indexOf(value));
    }
  }

  onKeyDown(ev: KeyboardEvent) {
    this.keyManager.onKeydown(ev);
  }

  ...
}
```

The keyboard controls we have now work correctly, however if the user changes the value, closes
the panel and then reopens it, the focused item might be incorrect. To handle this case, we have
to add a `ngOnChanges` hook which will update the active index when the value changes.

```ts
export class ColorPickerComponent implements AfterViewInit, OnChanges {
  ngOnChanges() {
    this.setActiveItem(this.value);
  }

  ...
}
```

Afterwards we have to add a `tabindex` to each of the `color` components. This will ensure that
the tabs can be focused and that the selected `color` is first in the tab order.

###### File: `src/app/color-picker/color-picker.component.html`

```html
...
<color *ngFor="let color of colors"
        (click)="select(color)"
        [isSelected]="color === value"
        [color]="color"
        [attr.tabindex]="color === value ? 0 : -1">
</color>
...
```

Finally, we want to trap the user's focus inside the color picker, otherwise it can get behind the
panel if they press tab. To trap the user's focus we can use the `cdkTrapFocus` directive from the
CDK which will prevent focus from escaping an area. We also set the `cdkTrapFocusAutoCapture` which
will tell the focus trap to move focus into the trapped area as soon as it's initialized.

###### File: `src/app/color-picker/color-picker.component.html`

```html
<ng-template>
  <div class="container" @picker (keydown)="onKeyDown($event)"
       cdkTrapFocus cdkTrapFocusAutoCapture
       [style.transformOrigin]="dir.value === 'ltr' ? 'left top' : 'right top'">
    <color *ngFor="let color of colors"
        (click)="select(color)"
        [isSelected]="color === value"
        [color]="color"
        [attr.tabindex]="color === value ? 0 : -1">
    </color>
  </div>
</ng-template>
```
