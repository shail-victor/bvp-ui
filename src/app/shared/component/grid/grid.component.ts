import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {

  gridApi;
  gridColumnApi;
  @Input() columnDefs;
  @Input() rowData;
  @Input() defaultRow;
  @Input() tableHeading;
  @Input() tableType;
  previousRowData;
  lastSavedRowData;
  index: number;
  constructor(private userService: UserService) { 
  }

  ngOnInit(): void {
    console.log(this);
    // this.gridApi.setColumnDefs(this.columnDefs);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.tableType);
    this.previousRowData = [...this.rowData];
    if(this.rowData['secondData'] === true) {
      this.userService.setSecondData(this.rowData);
    } else {
      this.userService.setData(this.rowData);
    }
    console.log('changes>>>>');
    this.index = this.rowData.length + 1;
    if(changes.rowData) {
      this.addInitialRow();
    }
    if(changes.defaultRow) {
      this.addInitialRow();
    }
    // this.gridOptions.api.sizeColumnsToFit();
    // this.gridApi.sizeColumnsToFit();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
    this.addInitialRow();
  }

  addInitialRow() {
    if(this.defaultRow && this.rowData && this.gridApi) {
      if(this.rowData.length === 0) {
        this.addRow();
      }
    }
  }

  addRow() {
    let tempdata = JSON.parse(JSON.stringify(this.defaultRow));
    tempdata['serial_number'] = this.index;
    this.rowData.push(tempdata);
    this.index++;
    this.gridApi.setRowData(this.rowData);
    if(this.rowData['secondData'] === true) {
    this.userService.setSecondData(this.rowData);
    } else {
      this.userService.setData(this.rowData);
    }
  }

  clear() {
    let secondTable = this.rowData['secondData']
    let tempArray = [...this.rowData];
    this.rowData = [];
    tempArray.forEach( (element, index) => {
      if(Object.values(element).includes(null || undefined || "")) {
        // console.log(element);
      } else {
        this.rowData.push(element);
      }
    });
    this.rowData['secondData'] = secondTable;
    // console.log(this.rowData);
    // this.rowData = [...this.previousRowData];
    this.index = this.rowData.length + 1;
    if(this.rowData['secondData'] === true) {
      this.userService.setSecondData(this.rowData);
      this.gridApi.setRowData(this.rowData);
      } else {
        this.userService.setData(this.rowData);
        this.gridApi.setRowData(this.rowData);
      }
  }
}
