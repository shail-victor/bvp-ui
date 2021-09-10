import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../shared/api-service.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  isSpinner: boolean = false;
  isDownloadDisabled: boolean = true;
  selectedYear;
  selectedUser;
  userList;
  yearList;
  collegeName;
  selectedUserId;
  constructor(private router: Router, private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.getAllUserList();
  }

  getAllUserList() {
    this.apiService.getAllUsers().subscribe( resp => {
      this.userList = resp;
    });
  }

  getYearList(userId) {
    this.apiService.getYearList(userId).subscribe( resp => {
      this.yearList = resp;
    });
  }


  logout() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

  onUserValueChange(event) {
    console.log(event.target.value);
    let co_ordinator = event.target.value;
    let selectedUserData = this.userList.filter(element => { return element.co_ordinator === co_ordinator})[0];
    this.selectedUserId = selectedUserData['user_id'];
    this.selectedUser = selectedUserData['name'];
    this.collegeName = selectedUserData['co_ordinator'].split(',')[0];
    this.getYearList(this.selectedUserId.toString());
  }

  onYearValueChange(event) {
    this.selectedYear = event.target.value;
    if(this.selectedYear != '' && this.selectedYear != null && this.selectedYear != undefined) {
      this.isDownloadDisabled = false;
    } else {
      this.isDownloadDisabled = true;
    }
  }

  downloadReport() {
    this.isSpinner = true;
    let data = {
      user_id: this.selectedUserId.toString(),
      college_name: this.collegeName,
      year: this.selectedYear
    }
    this.apiService.downloadReport(data).subscribe( resp => {
      console.log(resp);
      // console.log(resp);
      var downloadURL = window.URL.createObjectURL(resp);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.collegeName + '_' + this.selectedYear + '.xlsx';
      link.click();
      this.isSpinner = false;
    }, error => {
      this.isSpinner = false;
    });
  }
}
