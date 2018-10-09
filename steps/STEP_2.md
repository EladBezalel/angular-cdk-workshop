#### Quick Jump ####
* [Step 1](./STEP_1.md)
* **Step 2 <-**
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_4.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8a](./STEP_8a.md)
* [Step 8b](./STEP_8b.md)

### [Demo](https://stackblitz.com/github/EladBezalel/angular-cdk-workshop/tree/step-2)

## Step 2 task:

In this step we are going to create our color picker component that will get a list of colors and show them one next to each other.

This component will become an overlay that gets opened when clicking the button trigger.
###### Create a new file: `src/app/color-picker/color-picker.component.ts`
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {
  @Input() colors: object[];
}
```

###### Create a new file: `src/app/color-picker/color-picker.component.html`
```html
<div class="container">
  <div *ngFor="let color of colors"
       class="color" [ngStyle]="{backgroundColor: color.value}">
  </div>
</div>
```

###### Create a new file: `src/app/color-picker/color-picker.component.css`
```css
.container {
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
  padding: 8px;
  display: flex;
  flex-direction: row;
}

.color {
  height: 50px;
  width: 50px;
  margin: 4px;
  border-radius: 3px;
}
```

Don't forget to add the new component to the application module.
###### File: `src/app/app.module.ts`
```typescript
import { ColorPickerComponent } from './color-picker/color-picker.component';

 @NgModule({
   declarations: [
    AppComponent,
    ColorPickerComponent
   ],
   ...
})
```

Now that we have our component ready, let's use it!

Add pre-made color list to our app component in order to pass it down to the color picker.
##### File: `src/app/app.component.ts`
```typescript
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

And use it in the HTML

##### File: `src/app/app.component.html`
```html
<div class="content">
   <button>click me</button>
 </div>
<color-picker [colors]="colors"></color-picker>
```
