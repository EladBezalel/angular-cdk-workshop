#### Quick Jump ####
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_5.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8a](./STEP_8a.md)
* **Step 8b <-**

### [Demo](https://stackblitz.com/github/EladBezalel/angular-cdk-workshop/tree/step-8b)

## Step 8b task:

In the previous step we added some very basic accessibility to the color picker component, however
it's not enough for the component to be usable with assistive technology. To do that we have to
include the proper ARIA roles, add the appropriate labelling, and implement more keyboard controls.

First of all, we need to add the `aria-label` to the color cells. This will ensure that screen
readers read out the color's label when the user moves focus to it.

###### File: `src/app/color-picker/color/color.component.html`

```html
<div class="color"
     [ngStyle]="{backgroundColor: color.value}"
     [attr.aria-label]="color.name">
  <svg *ngIf="isSelected" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
  </svg>
</div>
```

Afterwards we need to add the correct ARIA roles to the various color picker components. In our case
we have to use the `grid` role for the color picker itself, `gridcell` for the individual colors
and we need to wrap the cells in an element that has a role of `row`. To do so, we must first
reorganize the passed-in colors into a 2D array which will make it easier to output the color
cells into rows, rather than a flat list, when using `ngFor` in the template. Having the colors
be organized in rows will also make it a lot easier to implement the up arrow and down arrow
keyboard controls a little bit later.

###### File: `src/app/color-picker/color-picker.component.ts`

```ts
export class ColorPickerComponent implements OnChanges, AfterViewInit {
  @Input() rowSize = 4;
  private groupedColors: object[][];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.colors) {
      this.groupedColors =
        this.colors
          .map((_, i) => !(i % this.rowSize) ? this.colors.slice(i, i + this.rowSize) : null)
          .filter(Boolean);
    }

    this.setActiveItem(this.value);
  }

  ...
}
```

Now that we have our data in a convenient format, we can rework our `ngFor` to output the correct
structure and to add the appropriate ARIA roles.

###### File: `src/app/color-picker/color-picker.component.html`

```html
<ng-template>
  <div class="container" @picker
       role="grid"
       (keydown)="onKeyDown($event)"
       cdkTrapFocus cdkTrapFocusAutoCapture
       [style.transformOrigin]="dir.value === 'ltr' ? 'left top' : 'right top'">
    <div class="row" role="row" *ngFor="let group of groupedColors">
      <color *ngFor="let color of group" (click)="select(color)"
             role="cell" (keydown)="onGridCellKeyDown($event, color)"
             [attr.tabindex]="color === value ? 0 : -1"
             [isSelected]="color === value" [color]="color">
      </color>
    </div>
  </div>
</ng-template>
```

Because we've changed our HTML, we also need to update the color picker's CSS to reflect the new
structure.

###### File: `src/app/color-picker/color-picker.component.css`

```css
.container {
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.row {
  display: flex;
  flex-direction: row;
}
```

Once we have the correct markup and styling, we can move on to adding the remaining keyboard
controls. First we're going to add the ability for the user to select a color by pressing enter
or space keys. Note that we need to prevent the default enter and space actions, in order to avoid
the page scrolling down or forms being submitted accidentally.

###### File: `src/app/color-picker/color-picker.component.ts`

```ts
import {ENTER, SPACE} from '@angular/cdk/keycodes';

export class ColorPickerComponent implements OnChanges, AfterViewInit {
  onGridCellKeyDown(ev: KeyboardEvent, color: object) {
    if (ev.keyCode === ENTER || ev.keyCode === SPACE) {
      ev.preventDefault();
      this.select(color);
    }
  }

  ...
}
```

Finally, we have to add the ability for the user to go up and down a row by using the up arrow and
down arrow keys. We can do so inside the same `onGridCellKeyDown` method from earlier.

###### File: `src/app/color-picker/color-picker.component.ts`

```ts
import {DOWN_ARROW, ENTER, SPACE, UP_ARROW} from "@angular/cdk/keycodes";

export class ColorPickerComponent implements OnChanges, AfterViewInit {
  onGridCellKeyDown(ev: KeyboardEvent, color: object) {
    if (ev.keyCode === ENTER || ev.keyCode === SPACE) {
      ev.preventDefault();
      this.select(color);
    }

    if (ev.keyCode === UP_ARROW) {
      const index = this.keyManager.activeItemIndex - this.rowSize;
      this.keyManager.setActiveItem(index >= 0 ? index : this.keyManager.activeItemIndex);
    }

    if (ev.keyCode === DOWN_ARROW) {
      const index = this.keyManager.activeItemIndex + this.rowSize;
      this.keyManager.setActiveItem(index < this.colors.length ? index : this.keyManager.activeItemIndex);
    }
  }

  ...
}
```
