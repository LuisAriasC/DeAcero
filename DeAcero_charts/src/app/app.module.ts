import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EmployeesComponent } from './components/employees/employees.component';

import { LoginComponent } from './login/login.component';
import { GlobalComponent } from './global/global.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AreaComponent } from './area/area.component';
import { PrediccionesComponent } from './predicciones/predicciones.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { VerUsuarioComponent } from './ver-usuario/ver-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { BorrarUsuarioComponent } from './borrar-usuario/borrar-usuario.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    LoginComponent,
    GlobalComponent,
    SidebarComponent,
    TopbarComponent,
    AreaComponent,
    PrediccionesComponent,
    CrearUsuarioComponent,
    VerUsuarioComponent,
    EditarUsuarioComponent,
    BorrarUsuarioComponent,
    ForgotPasswordComponent,
    MainScreenComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

    ChartModule // add ChartModule to your imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
