import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  ApplicationRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  DefaultValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Component({
  selector: 'jichi-select',
  templateUrl: './jichi-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JichiSelectComponent),
      multi: true,
    },
  ],
  styleUrls: ['./jichi-select.component.scss'],
})
export class JichiSelectComponent {
  innerValue: any = '';
  @Input() label: string = '';
  @Input() formControl!: FormControl;
  required = false;
  @Input() showRequired = true;
  @Input() options: { viewValue: string; value: any }[] = [];

  errors: Array<any> = [];
  @ViewChild(DefaultValueAccessor) valueAccessor?: DefaultValueAccessor;
  @ViewChild('input') inputRef!: ElementRef;

  delegatedMethodCalls = new ReplaySubject<(_: ControlValueAccessor) => void>();
  appRef?: ApplicationRef;
  constructor(appRef: ApplicationRef) {
    this.appRef = appRef;
  }
  ngOnInit(): void {
    this.reloadErrors();
  }

  ngAfterViewInit() {
    if (this.formControl == null) {
      throw new Error('missing form control on JichiTextComponent');
    }
    this.required = this.formControl.hasValidator(Validators.required);
    this.formControl.valueChanges.subscribe(() => {
      // check condition if the form control is RESET
      if (
        this.formControl.value == '' ||
        this.formControl.value == null ||
        this.formControl.value == undefined
      ) {
        this.innerValue = '';
        this.inputRef.nativeElement.value = '';
      }
      this.inputRef.nativeElement.value = this.formControl.value;
    });
  }
  ngAfterViewChecked() {
  }
  inputIsNotEmpty() {
    return (
      this.inputRef?.nativeElement.value.length > 0 ||
      this.formControl.value?.length > 0
    );
  }

  reloadErrors() {
    this.errors = [];
    //setting, resetting error messages into an array (to loop) and adding the validation messages to show below the field area
    for (var key in this.formControl.errors) {
      if (this.formControl.errors.hasOwnProperty(key)) {
        if (key === 'required') {
          this.errors.push('Este campo es requerido');
        } else {
          this.errors.push(this.formControl.errors[key]);
        }
      }
    }
  }

  onChange(e: Event, value: any) {
    //set changed value
    this.formControl.markAsTouched();
    this.innerValue = value;
    // propagate value into form control using control value accessor interface
    this.propagateChange(this.innerValue);

    //reset errors
    this.reloadErrors();
  }

  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  //propagate changes into the custom form control
  propagateChange = (_: any) => {};

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this.innerValue = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {}
}
