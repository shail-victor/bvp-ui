import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../shared/api-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  Registrationform: FormGroup;
  loading = false;
  submitted = false;  
  errorMsg: string;
  isSpinner: boolean = false;
  message;
  header;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceService,
    private modalService: NgbModal,
    private userService: UserService
  ) { }


  ngOnInit() {
    this.Registrationform = this.formBuilder.group({
        name: ['', Validators.required],
        college_name: ['', Validators.required],
        director_name: ['', Validators.required],
        director_contact_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        director_email_id: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        contact_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        role: ['', Validators.required],
        email_id: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
}

// convenience getter for easy access to form fields
get f() { return this.Registrationform.controls; }

onSubmit() {
    this.submitted = true;
    this.Registrationform.value.password = btoa(this.Registrationform.value.password);
    this.Registrationform.value.confirmPassword = btoa(this.Registrationform.value.confirmPassword);
    if(this.Registrationform.status === 'VALID') {
      this.isSpinner = true;
      this.apiService.registrationService(this.Registrationform.value).subscribe( resp => {
        console.log(resp);
        this.isSpinner = false;
        if(resp['status'] === 'Success') {
          this.open();
          // this.userService.setSuccess(true, 'Registered Successfully');
        } else if (resp['status'] === 'Failure') {
          // this.userService.setSuccess(false, resp['reason'])
          this.errorMsg = resp['reason'];
        }
      }, error => {
        this.isSpinner = false;
        console.log(error);
      });
    }
    // stop here if form is invalid
    if (this.Registrationform.invalid) {
        return;
    }
}

open() {
  const modalRef = this.modalService.open(NgbdModalContent, {size: 'sm', centered: true, backdrop : 'static',
  keyboard : false});
  // modalRef.componentInstance.name = this.popupData;
}

}

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Success</h4>
      <button type="button" class="close" aria-label="Close" (click)="close()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div class="modal-data">User Registered Successfully!!</div>
    </div>
    <div class="modal-footer">
      <button type="button" ngbAutofocus class="btn btn-primary" (click)="close()">OK</button>
    </div>
  `
})
export class NgbdModalContent {
;
  constructor(public activeModal: NgbActiveModal, private router: Router,
    private modalService: NgbModal,
    ) {
  }

  close() {
    this.modalService.dismissAll();
    this.router.navigateByUrl('/login');
  }
  // getHeaderMessage() {
  //   if(this.userService.getSuccess[0]===true) {
  //     return 'Success';
  //   } else {
  //     return 'Failure';
  //   }
  // }
}
