import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeInformationComponent } from './employee-information/employee-information.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DepartmentComponentComponent } from './department-component/department-component.component';
import {
  ModalModule} from "ngx-bootstrap/modal";
import { LoginPageComponent } from './login-page/login-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeInformationComponent,
    HomeComponentComponent,
    DepartmentComponentComponent,
    LoginPageComponent,
    SignInPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImageCropperModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
