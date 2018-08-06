import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { validateCity } from '../../../validators/cityValidator';
import { CityService } from '../../../services/city.service';
import { Observable } from 'rxjs/Observable';
import { City } from '../../../models/city';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import * as firebase from 'firebase';
import { User } from './../../../models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{

  signUpForm: FormGroup;
  cities$: Observable<City[]>;
  errorCode:string;
  errorMessage:string;
  successMessage:string;

  constructor(private formBuilder: FormBuilder,
              private cityService: CityService,
              private userService: UserService,
              private authService: AuthService ) { 
    this.cities$ = this.cityService.getAll();
  }

  ngOnInit(){
    this.signUpForm = this.formBuilder.group(
      { 
        gender : [, [Validators.required]],
        firstName: [, [Validators.required]],
        lastName : [, [Validators.required]],
        city: [null,  [validateCity]],
        address: [, [Validators.required]],
        email: [,  [Validators.required]],
        password: [, [Validators.required]],
        password2: [, [Validators.required]] 
      });
  }

  isControlInvalid(controlName: string): boolean{
    const control = this.signUpForm.controls[controlName];
    const result = control.invalid && control.touched; 
    return result; 
  }

  onSubmit() {
    this.errorMessage = null;  
    const controls = this.signUpForm.controls;

    if(this.signUpForm.invalid){
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    if(controls['password'].value !== controls['password2'].value){
      console.log('password is not equal');
      return;
    }

    this.userService.createUserWithEmailAndPassword(controls['email'].value, controls['password'].value)
    .then(user => {
      this.authService.logout();
      this.authService.sendEmailVerifiction(user).then(()=>{
      this.successMessage = 'Verification email has been sent, please verify!'; 
      }).catch((error)=>{
        this.errorMessage = error.message; 
      });
      this.userService
      .saveUserData(user.uid, controls['gender'].value, controls['firstName'].value, controls['lastName'].value, controls['city'].value, controls['address'].value)    
    })
    .catch(error => { 
      this.errorCode = error.code;
      this.errorMessage = error.message;
    });
  }

}
