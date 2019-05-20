import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { EmployeeService } from './services/employee.service';
import { Employee } from './models/employee';


declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EmployeeService]
})

export class AppComponent implements OnInit {
  title = 'DeAcero';
  public employee: Employee;
  public employee_register: Employee;
  public identity: Employee;
  public token;
  public errorMessage;
  public alertRegister;
  public login: boolean = false;

  constructor(
    private employeeService:EmployeeService
  ){
    this.employee = new Employee('','','','','','','','ROLE_EMPLOYEE','');
    this.employee_register = new Employee('','','','','','','','ROLE_EMPLOYEE','');
  };

  //MANTENER LA SESIÓN ABIERTA
  ngOnInit(){
    this.identity = this.employeeService.getIdentity();
    this.token = this.employeeService.getToken();
  }
}
