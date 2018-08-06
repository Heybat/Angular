import { AbstractControl } from '@angular/forms';

export function validateCity(control: AbstractControl) {
    
    if(control.value == null){
    return {invalidCity: true};
    }
    else{
    return null;
    }
}