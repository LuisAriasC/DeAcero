import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [EmployeeService]
})
export class SidebarComponent implements OnInit {

  public identity: Employee;

  constructor(
    private employeeService:EmployeeService
    ) { }

    isAdmin: boolean = false;

  ngOnInit() {
    this.identity = this.employeeService.getIdentity();
    if (this.identity.role == 'ROLE_ADMIN')
      this.isAdmin = true;
    else
      this.isAdmin = false;
  }

  @Output() display = new EventEmitter<number>();

  changeTo(selection: number){
    this.display.emit(selection);
    console.log("clicked child")
  }

}
