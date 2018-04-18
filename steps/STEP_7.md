#### Quick Jump ####
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_5.md)
* [Step 6](./STEP_6.md)
* **Step 7 <-**
* [Step 8a](./STEP_8a.md)
* [Step 8b](./STEP_8b.md)

### [Demo](https://stackblitz.com/github/EladBezalel/ngconf-cdk-workshop/tree/step-7)

## Step 7 task:

In this step we're going to cover how you can make your color picker support both left-to-right and
right-to-left layouts, which is important when build internationalization-friendly components.

First of all, we have to add the `BidiModule` to the module imports. This module includes a
handful of utilities that make it easy to figure out the layout direction that the component is in:

###### File: `src/app/app.module.ts`

```ts
import { BidiModule } from '@angular/cdk/bidi';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OverlayModule,
    BidiModule
  ],
  ...
})
export class AppModule {}
```

Now that we've imported the directionality utilities, we have to consume them in our components.
By passing it in to the position strategy of the color picker, we can have the CDK invert the
`start` and `end` positions automatically for us, when the component is in RTL.


###### File: `src/app/color-picker/color-picker-trigger.directive.ts`

```ts
import { Directionality } from '@angular/cdk/bidi';

export class ColorPickerTriggerDirective {
  constructor(public overlay: Overlay,
              private elementRef: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private dir: Directionality) {}

  private init() {
    const overlayConfig: OverlayConfig = new OverlayConfig(<OverlayConfig>{
      hasBackdrop: true,
      direction: this.dir.value,
      backdropClass: 'cdk-overlay-transparent-backgorund'
    });

    overlayConfig.positionStrategy = this.overlay
      .position()
      .connectedTo(this.elementRef, {
        originX: 'start',
        originY: 'bottom'
      }, {
        overlayX: 'start',
        overlayY: 'top'
      })
      .withDirection(this.dir.value);

    ...
  }
}
```

Finally, we also have to invert the panel's `transform-origin` to ensure that that the
animations start off from the top right in RTL.

> Note: remember to remove the `transform-origin` property from the component CSS in `src/app/color-picker/color-picker.component.css`.

###### File: `src/app/color-picker/color-picker-trigger.directive.ts`

```ts
import { Directionality } from '@angular/cdk/bidi';

export class ColorPickerComponent {
  constructor(public dir: Directionality) {}
}
```

###### File: `src/app/color-picker/color-picker.component.html`

```html
<ng-template>
  <div class="container" @picker
       [style.transformOrigin]="dir.value === 'ltr' ? 'left top' : 'right top'">
    ...
  </div>
</ng-template>
```
