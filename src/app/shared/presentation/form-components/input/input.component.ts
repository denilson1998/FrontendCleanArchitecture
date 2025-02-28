import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'j-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],

})
export class InputComponent
  implements OnInit, ControlValueAccessor
{


  onChange: any = () => {};
  onTouched: any = () => {};
  value: any = '';
  inputControl!: FormControl;
  constructor(
    @Self() 
    
    
    public ngControl: NgControl
    
    ) {
      this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.inputControl = this.ngControl.control as FormControl;
  }


  typeValue: InputType = 'text';
  @Input('type')
  set prop002(value: InputType) {
    this.typeValue = value;
  }

  placeholder: string = '';
  @Input('placeholder')
  set prop003(value: string) {
    this.placeholder = value;
  }

  readonly: boolean = false;
  @Input('readonly')
  set prop004(value: boolean) {
    this.readonly = value;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @Output() onBlur = new EventEmitter<string>();
  onBlurEvent(event: any) {
    this.onBlur.emit(event.target.value);
  }

  /*
   * Evento se emite cuando presiona una tecla input
   */
  @Output() onKeyUp = new EventEmitter<any>();
  onKeyUpEvent(event: any) {
    this.onKeyUp.emit(event.target.value);
  }
  
}

type InputType = 'text' | 'password' | 'email' | 'number';
