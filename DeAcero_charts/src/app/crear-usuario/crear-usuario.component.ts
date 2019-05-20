import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

declare var M: any;

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  providers: [EmployeeService]
})
export class CrearUsuarioComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  selectedRole: string = '';

  ngOnInit() {
    this.selectedRole = "False";
  }

  addEmployee(form: NgForm) {
    if(!form.value.username || !form.value.name || !form.value.surname || !form.value.email || !form.value.password){
      this.resetForm(form);
      alert("El empleado no está creado correctamente");
    } else{
      if(this.selectedRole == "True")
      {
        form.value.role = "ROLE_ADMIN";
        form.value.status = "ACTIVE_ADMIN";
      }
      else
      {
        form.value.role = "ROLE_EMPLOYEE";
        form.value.status = "ACTIVE_EMPLOYEE";
      }
      this.employeeService.postEmployee(form.value).subscribe(res => {
        this.resetForm(form);
        alert("Empleado Agregado");
      }, err => {
        this.resetForm(form);
        alert("El empleado no está creado correctamente");
      });
    }
  }

  resetForm(form?: NgForm) {
    if(form){
      form.reset();
      this.employeeService.selectedEmployee = new Employee;
    }
  }

  //event handler for the select role for the employee
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedRole = event.target.value;
  }

}
