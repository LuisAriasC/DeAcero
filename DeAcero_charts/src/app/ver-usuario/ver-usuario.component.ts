import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css'],
  providers: [EmployeeService]
})
export class VerUsuarioComponent implements OnInit {

  constructor(public employeeService: EmployeeService, public employeeService2: EmployeeService) { }

  editUser: boolean;
  passUser: string;

  ngOnInit() {
    this.getEmployees();
    this.editUser = false;
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(
        response => {
        this.employeeService.employees = response as Employee[];
        console.log(response);
      } , error => {
        console.log(error);
      });
  }

  activateEdit(employee: Employee){
    //this.employeeService.selectedEmployee = employee;
    this.getEmployees();
    this.employeeService2.selectedEmployee = employee;
    this.passUser = '';
    this.editUser = true;
  }

  editEmployee(form: NgForm){
    if(!form.value.username || !form.value.name || !form.value.surname || !form.value.email){
      alert("El empleado no se puede editar, llene todos los campos (Menos password si no desea cambiarlo)");
    }
    else{
      if(this.employeeService.selectedEmployee._id)
      {
        if(form.value.password)
          this.employeeService2.selectedEmployee.password = form.value.password;
        
        this.employeeService.putEmployee(this.employeeService2.selectedEmployee).subscribe(res => {
          alert("Usuario Editado");
          this.getEmployees();
          this.resetForm(form);
          this.editUser = false;
          }, err => {
            alert("El empleado no se puede editar correctamente");
            this.getEmployees();
            this.resetForm(form);
            this.editUser = false;
        });
      }
      else{
        alert("No se puede editar empleado");
        this.getEmployees();
        this.resetForm(form);
      }
    }
  }

  deleteEmployee(_id: string){
    if(confirm('Are you sure you want to delete it?')){
      console.log(_id);
      this.employeeService.deleteEmployee(_id)
        .subscribe(res => {
          alert("Empleado eliminado");
          this.getEmployees();
          this.editUser = false;
        });
    }
    this.editUser = false;
  }

  resetForm(form?: NgForm) {
    if(form){
      form.reset();
      this.employeeService2.selectedEmployee = new Employee;
    }
  }

}
