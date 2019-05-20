import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [EmployeeService]
})
export class LoginComponent {

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

    //FUNCIÓN PARA HACER LOGIN
    public onSubmit(){
      //Conseguir datos de usuario identificado
      this.employeeService.signup(this.employee).subscribe(
        response => {
          var myJSON = JSON.stringify(response);
          var iden = JSON.parse(myJSON);
          let identity = iden.employee;
          this.identity = identity;
  
          if(!this.identity._id){
            alert("El usuario no está correctamente identificado");
  
          } else {
            console.log(this.identity._id);
            // Crear elemento en el local storage para tener al usuario en sesion
            localStorage.setItem('identity', JSON.stringify(this.identity));
  
            //Conseguir token para enviarselo a cada petición
            this.employeeService.signup(this.employee, 'true').subscribe(
              response => {
                var myJSON2 = JSON.stringify(response);
                var iden2 = JSON.parse(myJSON2);
                let token = iden2.token;
                this.token = token;
  
                if(this.token.length <= 1){
                  alert("El token no se ha generado");
                } else {
                  // Crear elemento en el local storage para tener el token disponible
                  localStorage.setItem('token', token);
                  this.employee = new Employee('','','','','','','','ROLE_USER','');
                  console.log(this.employeeService.getIdentity());
                  console.log(this.employeeService.getToken());
                  location.reload();
                }
              },
              error => {
                var errorMessage = <any>error;
  
                if(errorMessage != null){
                  var body = JSON.parse(error._body);
                  this.errorMessage = body.message;
                  console.log(error);
                }
              }
            );
          }
        },
        error => {
          alert("El usuario no está correctamente identificado");
          console.log(error);
          /*
          var errorMessage = <any>error;
  
          if(errorMessage != null){
            var body = JSON.parse(error._body);
            this.errorMessage = body.message;
            console.log(error);
          }*/
      });
    }
}
