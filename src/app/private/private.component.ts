import { Component, OnInit } from '@angular/core';

import { UserService } from '../core/services/auth/user.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.sass']
})
export class PrivateComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
