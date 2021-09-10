import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../shared/api-service.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorMsg: string;
  isSpinner: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private apiService: ApiServiceService,
    private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email_id: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.value);
    this.loginForm.value.password = btoa(this.loginForm.value.password);
    if(this.loginForm.status === 'VALID') {
      this.isSpinner = true;
      this.apiService.loginService(this.loginForm.value).subscribe( resp => {
        this.isSpinner = false;
      if(resp['status'] === 'Success') {
        localStorage.setItem("user_id", resp['user_id']);
        localStorage.setItem('isUserLoggedIn', 'true');
        localStorage.setItem('firstTimeLogin', 'true');
        this.userService.isUserLoggedIn = true;
        if(resp['role'] === 'Director') {
          this.router.navigateByUrl('/report')
        } else {
            this.router.navigateByUrl('/landing/3_1_1');
        }
      } else if (resp['status'] === 'Failure') {
        this.errorMsg = resp['reason'];
      }
    }, error => {
      this.isSpinner = false;
      console.log(error);
    });
  }
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
}

}