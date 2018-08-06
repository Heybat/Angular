import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';





@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  appUser: User;

  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser); 
  }

  logout() {
    this.auth.logout();
  }

}
