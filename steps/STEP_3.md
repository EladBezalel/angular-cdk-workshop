#### Quick Jump ####
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* **Step 3 <-**
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_4.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8a](./STEP_8a.md)
* [Step 8b](./STEP_8b.md)

### [Demo](https://stackblitz.com/github/EladBezalel/ngconf-cdk-workshop/tree/step-3)

## Step 3 task:

In this step we're going to create an Overlay out of our latest build, the `color-picker` component.
That means that this component can be opened on screen in a specific position (also known as modal or panel)

First thing, before attaching the open functionality to the button, we'd like to turn the content into an `ng-template`.
We're going to create a `TemplatePortal` out of the `ng-template`, which will be used as a template whenever the overlay is attached,
this step is crucial since a new instance of the component will be created on every button click.

All we have to do is to wrap the current HTML with `ng-template`

##### File: `src/app/color-picker/color-picker.component.html`

```html
<ng-template>
  <div class="container">
    <div *ngFor="let color of colors"
         class="color" [ngStyle]="{backgroundColor: color.value}">
    </div>
  </div>
</ng-template>
```

Next thing to do is to export the component and expose the template in order to be able to use it from outside

##### File: `src/app/color-picker/color-picker.component.ts`
```typescript
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

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
```

Since we want to open the picker _**from**_ the button we have to name the button so we can get access to it from the code

##### File: `src/app/app.component.html`

```html
<button #btn>click me</button>
```

Now, in the `app.component` we implement the overlay initialization in consideration of the location where we want to display our picker.

##### File: `src/app/app.component.ts`
```typescript
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private _overlayRef: OverlayRef;

  @ViewChild('btn') button: ElementRef;

  constructor(public overlay: Overlay) {}

  ngAfterViewInit() {
    const positionStrategy =
      this.overlay
      .position()
      .connectedTo(this.button, {originX: 'start', originY: 'bottom'}, {overlayX: 'start', overlayY: 'top'});

    const overlayConfig = new OverlayConfig({
      positionStrategy
    });

    this._overlayRef = this.overlay.create(overlayConfig);
  }
}
```

We created the `positionStrategy` in order to tell the color picker to be attached to the trigger button and where to open referencing the button location.
Now that we have a reference to the overlay, we can use it to tell the overlay to open and close.

Let's add the click functionality.
##### File: `src/app/app.component.ts`
```typescript
import { AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ColorPickerComponent } from './color-picker/color-picker.component';

export class AppComponent implements AfterViewInit {
  @ViewChild(ColorPickerComponent) picker: ColorPickerComponent;

  constructor(public overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

  click() {
    this._overlayRef.detach();
    const picker = new TemplatePortal(this.picker.template, this.viewContainerRef);
    this._overlayRef.attach(picker);
  }
}
```

And bind it to the button in the HTML
##### File: ``
```html
<button (click)="click()" #btn>click me</button>
```
