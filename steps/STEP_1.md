#### Quick Jump ####
* **Step 1 <-**
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_4.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8a](./STEP_8a.md)
* [Step 8b](./STEP_8b.md)

### [Demo](https://stackblitz.com/github/EladBezalel/ngconf-cdk-workshop/tree/step-1)

## Step 1 task:

Since we want to build this beautiful component

![image](https://user-images.githubusercontent.com/6004537/38517190-ccb9d906-3c41-11e8-8819-d7e1a6558d1a.png)

We first have to install the cdk
```bash
npm install @angular/cdk -S
```
> Note: `@angular/cdk` was already added to the `package.json` in order to save install time during the workshop

Afterwards we are going to build our simple website with header and a button

`app/app.component.html`
```html
<div class="header">
  <h2>Welcome to the CDK workshop</h2>
</div>
<div class="content">
  <button>click me</button>
</div>
```
add some styles for the header and the content wrapper

`app/app.component.css`
```css
.header {
  color: white;
  display: flex;
  align-content: center;
  padding: 0 8px;
  margin-bottom: 8px;
  background-color: #3F51B5;
}

.content {
  padding: 8px;
}
```

We're going to import our first module out of the CDK, the [`OverlayModule`](https://material.angular.io/cdk/overlay/overview)

`app/app.module.ts`
```ts
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  ...
  imports: [
    BrowserModule,
    OverlayModule
  ],
  ...
})
```

Last part of this step is to have some global styles

```css
@import url('https://fonts.googleapis.com/css?family=Roboto');
@import "~@angular/cdk/overlay-prebuilt.css";

html, body {
  margin: 0;
  background: #f3f3f3;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
}

* {
  box-sizing: border-box;
}
```
Notice that we are adding prebuilt styles of the overlay in order to support the overlay behaviors (backdrop, placing)
