#### Quick Jump ####
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* **Step 4 <-**
* [Step 5](./STEP_5.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8a](./STEP_8a.md)
* [Step 8b](./STEP_8b.md)

### [Demo](https://stackblitz.com/github/EladBezalel/angular-cdk-workshop/tree/step-4)

## Step 4 task:

Since we want to make the Overlay functionality reuseable let's create a directive that encapsulates it for us.

All we have to do is to move the functionality from our `app.component` into our new `color-picker-trigger.directive` with few modifications

##### Create a new file: `src/app/color-picker/color-picker-trigger.directive.ts`

```typescript
import { Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { ColorPickerComponent } from './color-picker.component';

@Directive({
  selector: '[color-picker-trigger]',
  host: {
    '(click)': 'click($event)'
  }
})
export class ColorPickerTriggerDirective {
  private _overlayRef: OverlayRef;

  @Input('color-picker-trigger') colorPicker: ColorPickerComponent;

  constructor(public overlay: Overlay,
              private elementRef: ElementRef,
              private viewContainerRef: ViewContainerRef) {}

  private init() {
    const positionStrategy =
      this.overlay
        .position()
        .connectedTo(this.elementRef, {originX: 'start', originY: 'bottom'}, {overlayX: 'start', overlayY: 'top'});

    const overlayConfig = new OverlayConfig({
      positionStrategy
    });

    this._overlayRef = this.overlay.create(overlayConfig);
  }

  click() {
    if (!this._overlayRef) {
      this.init();
    }

    this._overlayRef.detach();
    const picker = new TemplatePortal(this.colorPicker.template, this.viewContainerRef);
    this._overlayRef.attach(picker);
  }
}
```

You should notice few changes here -

* Use `host` bindings to bind the click event to our click function
* Use the `Input` decorator with the directive name - this enables us to input through the directive an instance of the `ColorPickerComponent`
* Use the constructor DI to get the directive `ElementRef` so we can bind the `Overlay` position to it.

Import the directive into the module

##### File: `src/app/app.module.ts`
```typescript
import { ColorPickerTriggerDirective } from './color-picker/color-picker-trigger.directive';

@NgModule({
  declarations: [
    AppComponent,
    ColorPickerComponent,
    ColorPickerTriggerDirective
  ],
  ...`
})
```

Now we need to remove the old functionality from our `app.component`
##### File: `src/app/app.component.ts`
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  colors = [
    {name: 'Red', value: '#F44336'},
    {name: 'Pink', value: '#E91E63'},
    {name: 'Purple', value: '#9C27B0'},
    {name: 'Deep Purple', value: '#673AB7'},
    {name: 'Indigo', value: '#3F51B5'},
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

Now, instead of naming our button, we name the picker and pass it to the directive
##### File: `src/app/app.component.html`
```html
<div class="content">
  <button [color-picker-trigger]="picker">click me</button>
</div>
<color-picker [colors]="colors" #picker></color-picker>
```

At this point we have a sweet working `Overlay`, but we want to prevent the user from clicking outside, so let's add a backdrop.

In the `overlayConfig` we can specify that this overlay has a backdrop

##### File: `src/app/color-picker/color-picker-trigger.directive.ts`
```typescript
private init() {
  ...

  const overlayConfig = new OverlayConfig({
    maxWidth: 250,
    hasBackdrop: true,
    backdropClass: 'cdk-overlay-transparent-backdrop',
    positionStrategy
  });

  this._overlayRef = this.overlay.create(overlayConfig);

  this._overlayRef
    .backdropClick()
    .subscribe(() => this._overlayRef.detach());
}
```
Notice how we use the `backdropClass` - `cdk-overlay-transparent-backdrop`, that's a precompiled style that overrides the default opaque black background of the backdrop,
we also add `maxWidth` to the overlay so it will look a bit better.
> If you don't like the magic number, don't worry we take care of it later.

Last thing will be to add `flex-wrap` to the color picker container in order to have the color cells wrap into the next line rather then staying on the same line.
##### File: `src/app/color-picker/color-picker.component.css`
```css
.container {
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
  padding: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
```
