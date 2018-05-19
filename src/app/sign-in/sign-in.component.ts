import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public frm: FormGroup;

  public isBusy = false;
  public hasFailed = false;
  public showInputErrors = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.frm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  // Method that enables sign-in by calling the api service's signIn method.
  // Calls the doSignIn method of the authentication service by using the observable's response values.
  public doSignIn() {
    // Returns if the given form values are considered invalid.
    if (this.frm.invalid) {
      this.showInputErrors = true;
      return;
    }

    // Reset status.
    this.isBusy = true;
    this.hasFailed = false;

    // Sets the given form values to corresponding constant variables.
    const username = this.frm.get('username').value;
    const password = this.frm.get('password').value;

    // Sends a POST request to the API.
    this.api.signIn(username, password)
      .subscribe((response) => {
        this.auth.doSignIn(response.token, response.name);
        this.router.navigate(['todos']);
      },
      (error) => {
        this.isBusy = false;
        this.hasFailed = true;
      });
  }

}
