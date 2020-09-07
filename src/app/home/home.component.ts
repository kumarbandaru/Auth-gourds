import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import {  AuthenticationService } from '../authentication.service';
import { UserService} from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = false;
  currentUser: User;
  userFromApi: User;
  public role;

  constructor(
      private userService: UserService,
      private authenticationService: AuthenticationService
  ) {
      this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
      this.loading = true;
      console.log("current user object",this.currentUser)
      this.role = this.currentUser.role;
      this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
          this.loading = false;
          this.userFromApi = user;
      });
  }

}
