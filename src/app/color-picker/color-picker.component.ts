import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  exportAs: 'colorPicker'
})
export class ColorPickerComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
