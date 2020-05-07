import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
 
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class UserListComponent implements OnInit {
 
  users: User[];
 
  constructor(private userService: UserService) {
  }
 
  ngOnInit() {
    console.log(new Date() + ": " + JSON.stringify("msg"));
    this.userService.findAll().subscribe(data => {
      this.users = data;
      console.log(new Date() + ": " + JSON.stringify(data));
    });

    this.users = this.userService.getUsersSample();
  }

  clickMessage = '';

  onUserAdd(user: User) {
    this.clickMessage = 'onUserAdd ' + user.userName;
  }

  onUserUpdate(user: User) {
    this.clickMessage = 'onUserUpdate ' + user.userName;
  }

  onUserDelete(user: User) {
    this.clickMessage = 'onUserDelete ' + user.userName;
  }

  onRowSelected(user: User) {
    this.clickMessage = 'onRowSelected ' + user.userName;
  }

}
