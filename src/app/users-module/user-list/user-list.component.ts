import { Component, OnInit } from '@angular/core';
import {trigger} from '@angular/animations';
import {fadeIn} from '@shared/utils/animation/fade-animation';

import {queryState, UsersService, AsyncItem} from '@user/.';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})
export class UserListComponent implements OnInit {

  public state = queryState;                   // access to determine async state
  public userslist = this.service.loadUsers();

  constructor(private service: UsersService) { }

  ngOnInit() {
  }

}
