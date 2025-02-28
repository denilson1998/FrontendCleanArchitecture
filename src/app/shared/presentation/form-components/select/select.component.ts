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
import { ControlBasic } from '../../helpers/base/control-basic.class';


@Component({
  selector: 'j-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent
  extends ControlBasic 
  implements OnInit, ControlValueAccessor
{
  onChange: any = () => {};
  onTouched: any = () => {};
  constructor(
    @Self() 
    public ngControl: NgControl

    ) 
    {
    super();
  
      
      
    }   
  ngOnInit(): void {
  this.inputControl = this.ngControl.control as FormControl;
  }

  placeholder: string = '';
  @Input('placeholder')
  set prop003(value: string) {
    this.placeholder = value;
  }

  items: any[] = [];
  @Input('items')
  set prop004(value: any[]) {
    this.items = value;
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
