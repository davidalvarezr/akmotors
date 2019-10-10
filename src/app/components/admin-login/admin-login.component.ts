import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  credentials: any = {};

  ngOnInit() {
    const navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    navbar.classList.remove('navbar-transparent');

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
  }

  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.credentials));
  }

}
