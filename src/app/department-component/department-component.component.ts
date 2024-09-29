import { Component } from '@angular/core';
import {DepartmentModel} from './department.model'
import { Observable,Subscriber } from 'rxjs';
import {FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms';
import {DeptApiService} from '../Depaerment-Services/Department.services'

@Component({
  selector: 'app-department-component',
  templateUrl: './department-component.component.html',
  styleUrls: ['./department-component.component.css']
})
export class DepartmentComponentComponent 
{
    studentdata:any;
    formvalue !:FormGroup;
    Deptmodel : DepartmentModel = new DepartmentModel();
    constructor(private api :DeptApiService ,private formBuilder :FormBuilder){}
    ngOnInit():void{
      this.formvalue=this.formBuilder.group({
        id:[''],
        firstName:['',[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]],
        lastName :['',[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]],
        emailId:['',[Validators.email,Validators.required]],
        phoneno:['',[,Validators.required,Validators.minLength(10),Validators.maxLength(10)]]})
        this.getDeptDetails();
        
     }
     get FirstName() : FormControl{
      return this.formvalue.get("firstName") as FormControl
    }
    get LastName() : FormControl{
     return this.formvalue.get("lastName") as FormControl
    }
    get EmailId() : FormControl{
      return this.formvalue.get("emailId") as FormControl
    }
    get PhoneNo() : FormControl{
    return this.formvalue.get("phoneno") as FormControl
    }
   

    postDeptDetails()
    {
      this.Deptmodel.firstName = this.formvalue.value.firstName;
      this.Deptmodel.lastName = this.formvalue.value.lastName;
      this.Deptmodel.emailId = this.formvalue.value.emailId;
      this.Deptmodel.phoneno = this.formvalue.value.phoneno;

      this.api.postDept(this.Deptmodel).subscribe(res=>{
        console.log(res);
        alert("Student id added successfuly");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formvalue.reset();
       
      },
      err=>{
        alert(err.message);
        
      })
    }
    
    getDeptDetails(){
      this.api.getDept().subscribe(res=>{
        this.studentdata=res;
        console.log(this.studentdata);
      })
    }
    OnEditStudentData(SData:any) {
      this.Deptmodel.id=SData.id;
      this.formvalue.controls['firstName'].setValue(SData.firstName);
      this.formvalue.controls['lastName'].setValue(SData.lastName);
      this.formvalue.controls['emailId'].setValue(SData.emailId);
      this.formvalue.controls['phoneno'].setValue(SData.phoneno);
    
    }
    updateDeptDetails()
    {
      this.Deptmodel.firstName = this.formvalue.value.firstName;
      this.Deptmodel.lastName = this.formvalue.value.lastName;
      this.Deptmodel.emailId = this.formvalue.value.emailId;
      this.Deptmodel.phoneno = this.formvalue.value.phoneno;
      this.api.updateDept(this.Deptmodel).subscribe(res=>{
        alert("update successfuly")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formvalue.reset();
        this.getDeptDetails();
      })
    }
    deleteDeptDetails(rownum:any){
      this.api.deteteDept(rownum.id).subscribe(res=>{
     
        alert("Department is deleted");
        this.getDeptDetails;
       })
    }
    handleExport(){}
    SelectFile(event:any)
    {


    }
}
