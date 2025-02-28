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
  selector: 'j-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent
  implements OnInit, ControlValueAccessor
{


  onChange: any = () => {};
  onTouched: any = () => {};
  value: any = '';
  inputControl!: FormControl;
  constructor(
    @Self() 
    
    @Optional()
    
    public ngControl: NgControl
    
    ) {
      if (this.ngControl) {
        this.ngControl.valueAccessor = this;
      }
  }

  ngOnInit(): void {
    this.inputControl = this.ngControl.control as FormControl;
  }
  placeholder: string = '';
  @Input('placeholder')
  set prop003(value: string) {
    this.placeholder = value;
  }

  cols: number = 25;
  @Input('cols')
  set prop004(value: number) {
    this.cols = value;
  }

  rows: number = 5;
  @Input('rows')
  set prop005(value: number) {
    this.rows = value;
  }

  writeValue(obj: any): void {}

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
