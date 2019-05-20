import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { identity } from 'rxjs';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
  providers: [EmployeeService]
})
export class MainScreenComponent implements OnInit{

  public identity: Employee;
  public token;

  constructor(
    private employeeService:EmployeeService
  ){}

  

  show: number = 2;
  isAdmin: boolean = false;
  showGlobal: boolean = true;
  showArea: boolean = false;
  showHome: boolean= false;
  showPred: boolean = false;
  showCrear: boolean = false;
  showEditar: boolean = false;
  showVer: boolean = false;
  showBorrar: boolean = false;

  ngOnInit(){
    this.identity = this.employeeService.getIdentity();
    //console.log(this.employeeService.getIdentity());
    if (this.identity.role == 'ROLE_ADMIN')
      this.isAdmin = true;
    else
      this.isAdmin = false;
  }

  inUse(using: number){
    console.log("clicked")

    this.show = using;
    
    if (this.show == 1) //Producción
    {
      this.showGlobal = true;
      this.showArea = false;
      this.showHome = false;
      this.showPred = false;
      this.showCrear = false;
      this.showEditar = false;
      this.showVer = false;
      this.showBorrar = false;
    }
    if (this.show == 2) //Merma
    {
      this.showGlobal = false;
      this.showArea = true;
      this.showHome = false;
      this.showPred = false;
      this.showCrear = false;
      this.showEditar = false;
      this.showVer = false;
      this.showBorrar = false;
    }

    if (this.show == 3) //Home
    {
      this.showGlobal = false;
      this.showArea = false;
      this.showHome = true;
      this.showPred = false;
      this.showCrear = false;
      this.showEditar = false;
      this.showVer = false;
      this.showBorrar = false;
    }

    if (this.show == 4) //predicciones
    {
      this.showGlobal = false;
      this.showArea = false;
      this.showHome = false;
      this.showPred = true;
      this.showCrear = false;
      this.showEditar = false;
      this.showVer = false;
      this.showBorrar = false;
    }
    if (this.show == 5) //crear usuario
    {
      this.showGlobal = false;
      this.showArea = false;
      this.showHome = false;
      this.showPred = false;
      this.showCrear = true;
      this.showEditar = false;
      this.showVer = false;
      this.showBorrar = false;
    }
    if (this.show == 6) //Editar usuario
    {
      this.showGlobal = false;
      this.showArea = false;
      this.showPred = false;
      this.showCrear = false;
      this.showEditar = true;
      this.showVer = false;
      this.showBorrar = false;
    }
    /*if (this.show == 99) //Ver usuario
    {
      this.showGlobal = false;
      this.showArea = false;
      this.showHome = false;
      this.showPred = false;
      this.showCrear = false;
      this.showEditar = false;
      this.showVer = true;
      this.showBorrar = false;
    }*/
   /* if (this.show == 7) //borrar usuario
    {
      this.showGlobal = false;
      this.showArea = false;
      this.showPred = false;
      this.showCrear = false;
      this.showEditar = false;
      this.showVer = false;
      this.showBorrar = true;
    }*/
  }

  public logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    location.reload();
  }

}
