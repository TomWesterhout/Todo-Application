import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {

  constructor(private session: SessionService) { }

  // Returns the boolean value of session's accessToken.
  public isSignedIn() {
    return !!this.session.accessToken;
  }

  // Calls session's destroy method.
  public doSignOut() {
    this.session.destroy();
  }

  // Returns if either accessToken or name are false.
  // Sets the accessToken and name property if both are true.
  public doSignIn(accessToken: string, name: string) {
    if ((!accessToken) || (!name)) {
      return;
    }
    this.session.accessToken = accessToken;
    this.session.name = name;
  }
  
}
