import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})

export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public passwordPattern: string = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})";


  public cantBeStrider = ( control: FormControl ) : ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if ( value === 'strider') {
      return {
        noStrider: true,
      }
    }

    return null;
  }

  // Para poder validar hay que mandarle qué formulario y qué campo se refieren
  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched
  }

  public isCompleteName(field: string) {
    return ( formGroup: FormGroup ): ValidationErrors | null => {
      const fieldErrors = formGroup.get(field)?.errors;
      const fieldValue = formGroup.get(field)?.value;

      if ( fieldValue == '' ) {
        formGroup.get(field)?.setErrors({ required: true });
          return {
            required: true,
          }
      }

      if ( fieldErrors ) {
        formGroup.get(field)?.setErrors( { namePattern: true });
        return {
          namePattern: true,
        };
      }
      return null;
    }
  }


  isFiledOneEqualFieldTwo(field1: string, field2: string) {

    return ( formGroup: FormGroup ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
       formGroup.get(field2)?.setErrors({ notEquals: true});
        return {
          notEquals: true,
        }
      }

      if (fieldValue2 == '') {
        formGroup.get(field2)?.setErrors({ required: true });
        return {
          required: true,
        }
      }
      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }


  isRealPassword(field: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {

      const fieldErrors = formGroup.get(field)?.errors;
      const fieldValue = formGroup.get(field)?.value;

      if (!fieldErrors) {
        formGroup.get(field)?.setErrors({ required: true });
        return {
          required: true,
        }
      }

      formGroup.get(field)?.setErrors(null);
      return null;
    }
  }
}
