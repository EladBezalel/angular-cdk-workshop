#### Quick Jump ####
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_5.md)
* **Step 6 <-**
* [Step 7](./STEP_7.md)
* [Step 8a](./STEP_8a.md)
* [Step 8b](./STEP_8b.md)

### [Demo](https://stackblitz.com/github/EladBezalel/angular-cdk-workshop/tree/step-6)

## Step 6 task:

In this step we're going to add a cool animation to the color picker to make it "fold out"
when it's opened and closed. The first thing we need to get started is to add the `BrowserAnimationsModule`.

###### File: `src/app/app.module.ts`

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OverlayModule
  ],
  ...
})
export class AppModule {}
```

Now that we've imported the animations module, we can use it to define an
animation on the color picker. The following animation will expand, contract,
and fade in depending on whether the datepicker is open or closed.

###### File: `src/app/color-picker/color-picker.component.ts`

```ts
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  ...
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
export class ColorPickerComponent {}
```

After the animation is defined, we have to use the `picker` trigger
in the color picker template.

###### File: `src/app/color-picker/color-picker.component.html`

```html
<ng-template>
  <div class="container" @picker>
  ...
  </div>
</ng-template>
```

Finally, we have to add a transform origin to the animation. This will ensure
that the animation starts from the top left edge of the color picker, rather
than from its center.

###### File: `src/app/color-picker/color-picker.component.css`

```css
.container {
  ...
  transform-origin: left top;
}
```
