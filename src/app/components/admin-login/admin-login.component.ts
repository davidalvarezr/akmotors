import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  // Show notification is true
  error: boolean;
  success: boolean;

  focus;
  focus1;
  credentials: any = {};

  constructor(private auth: AuthService) {}

  ngOnInit() {
    const navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    navbar.classList.remove('navbar-transparent');

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
  }

  ngOnDestroy() {
    const navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    navbar.classList.add('navbar-transparent');

    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }

  private setSuccess(): void {
    this.success = true; this.error = false;
  }

  private setError(): void {
    this.success = false; this.error = true;
  }

  onSubmit($event) {
    $event.preventDefault(); // Do not reload page
    this.auth.login(this.credentials).subscribe(
      _ => {
        this.setSuccess();
        // TODO: go to admin control panel
      },
      _ => { this.setError(); }
    )
  }

}


