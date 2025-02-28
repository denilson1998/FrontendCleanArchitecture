import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export default class passwordValidators {
    static match(controlName: string, matchControlName: string): ValidatorFn {
      return (controls: AbstractControl) => {
        const control = controls.get(controlName);
        const matchControl = controls.get(matchControlName);
      
        if (!matchControl?.errors && control?.value !== matchControl?.value) {
          
          matchControl?.setErrors({
            matching: 'Las contraseñas no coinciden'
          });

          return { matching: true };
        }
        return null;
      };
    }
    static policyStrength(){
        return  (control: AbstractControl) =>{
            const password = control.value;

            if(!password){
                return null;
            }

            const hasUpperCase = /[A-Z]+/.test(password);

            const hasLowerCase = /[a-z]+/.test(password);
    
            const hasNumeric = /[0-9]+/.test(password);
            
            const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

            const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
        
            return !passwordValid ? {
                  hasUpperCase: hasUpperCase ? null :  "La contraseña requiere al menos 1 letra mayúscula",
                  hasLowerCase: hasLowerCase ? null :  "La contraseña requiere al menos 1 letra minúscula",
                  hasNumeric: hasNumeric ? null :  "La contraseña requiere al menos 1 número",
                  hasSpecialChar: hasSpecialChar ? hasSpecialChar :  "La contraseña requiere al menos 1 carácter especial"
            }: null;
        }
    }
  }