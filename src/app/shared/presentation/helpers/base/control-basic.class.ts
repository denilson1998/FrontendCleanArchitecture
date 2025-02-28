import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({ template: '' })
export class ControlBasic {
  idTextInput = String('input' + Math.floor(Math.random() * (99999 - 1)) + 1);
  inputControl!: FormControl;
}
