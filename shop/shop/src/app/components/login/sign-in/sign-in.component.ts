import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../models/user';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string = null;
  showRestorePassword: boolean = false;
  
 

  constructor(private authService: AuthService, 
              private formBuilder: FormBuilder,
              private angularFireAuth: AngularFireAuth,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private http: HttpClient ) { 
  }

  ngOnInit(){
   this.signInForm = this.formBuilder.group({
    email: [, [Validators.required]],
    password: [, [Validators.required]],
    isRememberMe: []
   });
  }


  login(value: string){
    this.errorMessage = null;
    let user: User;
    let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';

    if(value === 'emailAndPwd'){
      const controls = this.signInForm.controls;
      const email:string = controls['email'].value;
      const password = controls['password'].value;
      
      if(this.signInForm.invalid){
        if(!email){
          console.log('email is invalid');
          controls['email'].markAsDirty();
        }

        if(!password){
          console.log('password is invalid');
          controls['password'].markAsDirty();
        }
       return;
      }

      let obj  = {"email": email};

      this.http.post('https://us-central1-shop-8339f.cloudfunctions.net/getEmailStatus', obj)
      .take(1).subscribe((response) => {
        if(response['isEmailVerified']){
          this.authService.login(value, controls['email'].value, controls['password'].value, controls['isRememberMe'].value)
          .catch(error => this.errorMessage = error.message); 
        }
        else{
           console.log(response['errorMessage']);
           this.errorMessage =  response['errorMessage'];
        }
      }, 
    error => {
      console.log(error['errorMessage']);
           this.errorMessage =  error['errorMessage'];
    });
    }
    else {
      this.authService.login(value).catch(error => this.errorMessage = error.message);  
    }
    localStorage.setItem('returnUrl', returnUrl);
  }

  
  isControlInvalid(controlName: string): boolean{
    const control = this.signInForm.controls[controlName];
    const result = control.invalid && control.dirty; 
    return result; 
  }

  restorePassword(email: string){
    console.log(email);
    this.authService.restorePassword(email)
    .then(()=>console.log('restoring success'))
    .catch((error)=>console.log(error.message));
  }

}
