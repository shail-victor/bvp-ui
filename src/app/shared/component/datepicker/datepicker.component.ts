import { Component, OnInit } from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements ICellRendererAngularComp {
  constructor(private calendar: NgbCalendar) { }
  public params: any;
  selectedDate: NgbDateStruct;
  
  agInit(params: any): void {
    this.params = params;
    if(params.value) {
      this.selectedDate = {
        day: Number(params.value.split('/')[0]),
        month: Number(params.value.split('/')[1]),
        year: Number(params.value.split('/')[2])
      }
    } else {
      this.selectedDate = null
    }
  }

  refresh(): boolean {
    return false;
  }

  isPopup() {
    return true;
  }

  getValue() {
    if (this.selectedDate) {
      return this.selectedDate.day + '/' + this.selectedDate.month + '/' + this.selectedDate.year;
    } else return null;
  }

  onDateSelect(date: NgbDate) {
    this.selectedDate = date;
    this.params.api.stopEditing();
  }
}
