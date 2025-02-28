import { CommonModule } from '@angular/common';
import {
  ApplicationRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  DefaultValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

import { IconComponent } from '../icon/icon.component';
import { AtomModule } from '@sitec/sarao';

type InputType = 'text' | 'password' | 'email' | 'number' | 'decimal' | 'date';

@Component({
  selector: 'sarao-input2',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SaraoInputComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, AtomModule],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class SaraoInputComponent implements ControlValueAccessor, OnInit {
  @ViewChild(DefaultValueAccessor) valueAccessor?: DefaultValueAccessor;
  @ViewChild('input') inputRef!: ElementRef;

  @Input() type: InputType = 'text';
  @Input() label: string = 'Label';
  @Input() error: string = 'This field is required';
  @Input() errorminLength: string = 'Minimum characters required';
  @Input() errorEmail: string = 'Email format';
  @Input() placeholder: string = ' ';
  @Input() formControl?: FormControl;
  @Input() required = false;
  @Input() showRequired = true;
  @Input() icons: string = '';
  @Input() img: boolean = false;

  @Input() styleClass = '';

  @Input() iconSarao: string = 'default';
  @Input() iconColorSarao: string = 'red';

  @Input() disabled: boolean = false;
  @Input() decimals: number = 2;
  @Input() allowNegativeNumbers: boolean = true;

  decimalPointCharacter = ',';
  numberSeparatorCharacter = '.';

  control!: FormControl;

  errors: Array<any> = [];
  errorsOri: Array<any> = [];

  innerValue: any = '';

  delegatedMethodCalls = new ReplaySubject<(_: ControlValueAccessor) => void>();
  appRef?: ApplicationRef;

  lastKeyPressedIsControlKey = false;

  parsedInputType: string = 'text';

  constructor(appRef: ApplicationRef) {
    this.appRef = appRef;
    this.decimals = Math.abs(Math.trunc(this.decimals));
    this.parsedInputType = this.type;
    if (this.type === 'decimal') {
      this.parsedInputType = 'text';
    }
  }

  ngOnInit(): void {
    this.reloadErrors();
    if (this.formControl == null) {
      return;
    }

    this.required = this.formControl!.hasValidator(Validators.required);
    this.formControl?.valueChanges.subscribe(() => {
      if (
        this.formControl?.value == '' ||
        this.formControl?.value == null ||
        this.formControl?.value == undefined
      ) {
        this.innerValue = '';
        this.inputRef.nativeElement.value = '';
      }
      this.inputRef.nativeElement.value = this.formControl?.value;
    });
  }

  reloadErrors() {
    this.errors = [];
    this.errorsOri = [];
    for (var key in this.formControl?.errors) {
      this.errors.push(this.formControl?.errors[key]);
      if (this.formControl?.errors.hasOwnProperty(key)) {
        if (key === 'required') {
          this.errorsOri.push(this.error);
        }
        if (key === 'email') {
          this.errorsOri.push(this.errorEmail);
        }
        if (key === 'minlength') {
          let data = '';
          this.errors.forEach(function (objeto) {
            let valorObjeto = objeto.requiredLength;
            data = `La cantidad de caracteres requeridos son: ${valorObjeto.toString()}`;
          });
          this.errorsOri.push(data);
        }
        if (key === 'pattern') {
          this.errorsOri.push('Error en el formato fecha, dd/mm/yyyy');
        }
      }
    }
  }

  onKeyDown(event: any) {
    if (['number', 'decimal'].includes(this.type)) {
      const controlKeyPressed = event.ctrlKey || event.metaKey;

      if (event.key === this.decimalPointCharacter) {
        if (this.decimals === 0 || event.target.value.includes(this.decimalPointCharacter)) {
        event.preventDefault();
          return;
        }
      }
      if (!this.allowNegativeNumbers) {
        if (event.key === '-') {
          event.preventDefault();
          return;
        }
      }

      const allowedKeys = [
        'ArrowLeft',
        'ArrowUp',
        'ArrowDown',
        'ArrowRight',
        'End',
        'Home',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '-',
        this.decimalPointCharacter,
        this.numberSeparatorCharacter,
        'Delete',
        'Enter',
        'Backspace',
      ]
      if (!allowedKeys.includes(event.key) && !controlKeyPressed) {
        event.preventDefault()
        console.log('preventDefault')
        return;
      }

      if (event.key === '-') {
        if (event.target.selectionStart !== 0 || event.target.value.includes('-')) {
          event.preventDefault()
          return;
        }
      }

      //check max decimal numbers
      const value = event.target.value
      let decimalsNumbers = 0;
      const decimalPointIndex = value.indexOf(this.decimalPointCharacter);
      if (decimalPointIndex !== -1 && decimalPointIndex !== (value.length -1)) {
        decimalsNumbers = value.substring(decimalPointIndex+1, value.length).length;
      }
      const isEditingDecimalPart = decimalPointIndex !== -1 && event.target.selectionStart > decimalPointIndex;
      if (isEditingDecimalPart && decimalsNumbers >= this.decimals && Number.isNaN(Number(event.key)) === false) {
        event.preventDefault()
        return;
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    let pastedData = event.clipboardData?.getData('text') ?? '';
    let value = this.inputRef.nativeElement.value;
    event.preventDefault();
    event.stopPropagation();
    const selectionStart = this.inputRef.nativeElement.selectionStart;
    const selectionEnd = this.inputRef.nativeElement.selectionEnd;
    value = value.substring(0, selectionStart) + pastedData + value.substring(selectionEnd, value.length);
    if (!['number', 'decimal'].includes(this.type)) {
      this.onKeyUp(event, value);
    }
    console.log('onPaste', value)
    if (value.length === 0) {
      this.onKeyUp(event, value);
    }
    if (this.allowNegativeNumbers && value[0] === '-') {
      value = '-' + value.substring(1, value.length).replaceAll('-', '')
    } else {
      value = value.replaceAll('-', '')
    }

    if (this.decimals === 0) {
      value = value.replaceAll(this.decimalPointCharacter, '')
    } else {
      const indexOfDecimalPoint = value.indexOf(this.decimalPointCharacter)
      if (indexOfDecimalPoint !== -1) {
        value = value.substring(0, indexOfDecimalPoint+1) + value.substring(indexOfDecimalPoint + 1, value.length).replaceAll(this.decimalPointCharacter, '')
      }
    }
    this.onKeyUp(event, value);
  }

  onKeyUp(event: any, value: any) {
    console.log('onKeyUp', value)
    if (['number', 'decimal'].includes(this.type)) {

      const isStartingANegativeNumber = value === '-';
      if (isStartingANegativeNumber) {
        return;
      }
      let isWritingADecimal = false;
      if (value.length >= 2) {
        isWritingADecimal = value[value.length - 2] === this.decimalPointCharacter && value[value.length - 1] === '0';
        if (isWritingADecimal) {
          return;
        }
      }
      if (value.length >= 1) {
        const lastDigitIsDecimalPoint = value[value.length - 1] === this.decimalPointCharacter;
        if (lastDigitIsDecimalPoint) {
          return;
        }
      }

      if (this.decimals > 0) {
        const splitted = value.split(this.decimalPointCharacter);
        if (splitted.length > 1) {
          const onlyZeros = splitted[1].split('').every((x: string) => x === '0');
          if (onlyZeros) {
            if (splitted[1].length > this.decimals) {
              value = splitted[0] + this.decimalPointCharacter + splitted[1].substring(0, this.decimals);
              this.inputRef.nativeElement.value = value
            }
            return;
          }

        }

        let parsedValue = value.toString().replace(/[^0-9,.+\-]/g,"");
        parsedValue = this.commaToDotted(parsedValue)
        parsedValue = Number(parsedValue);
        if (Number.isNaN(parsedValue)) {
          parsedValue = 0;
        }
        parsedValue = Math.round((parsedValue + Number.EPSILON) * 10**this.decimals) / 10**this.decimals;
        this.inputRef.nativeElement.value = parsedValue.toLocaleString('de-DE')
      }
    }
  }

  onChange(e: Event, value: any) {
    this.formControl?.markAsTouched();
    this.innerValue = this.commaToDotted(value);
    this.propagateChange(this.innerValue);
    this.reloadErrors();
  }

  commaToDotted(value: string) {
    value = value.replaceAll('.', '');
    return value.replaceAll(',', '.');
  }

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  propagateChange = (_: any) => {};

  writeValue(value: any) {
    this.innerValue = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {}
}
