import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProgressBarService {

   private showLogin = new BehaviorSubject<boolean>(true);
   showLogin$ = this.showLogin.asObservable();
   showProgressSpinner = new BehaviorSubject<boolean>(false);
   showProgressSpinner$ = this.showProgressSpinner.asObservable();


  constructor() { }

  setProgressSpinner(){
    this.showLogin.next(false);
    this.showProgressSpinner.next(true);
  }

}
