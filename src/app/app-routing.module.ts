import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponentComponent} from './home-component/home-component.component'
import {EmployeeInformationComponent} from './employee-information/employee-information.component'
import{DepartmentComponentComponent} from './department-component/department-component.component'

const routes: Routes = [
  {
    path:'employeInfo',
    component: EmployeeInformationComponent
 },
 {
    path:'home',
    component:HomeComponentComponent

 } ,
 {
  path:'Dept',
  component:DepartmentComponentComponent
 }   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
