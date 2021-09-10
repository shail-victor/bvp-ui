import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {};

  canActivate() {
    console.log("OnlyLoggedInUsers");
    if (this.userService.isLoggedIn()) { 
      return true;
    } else {
      window.alert("You don't have permission to view this page");
      this.router.navigateByUrl('login');
      return false;
    }
  }
}