import { Component } from '@angular/core';
import { ImageCroppedEvent} from 'ngx-image-cropper';
import {FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms';
import{ ApiService } from '../Shared/api.services';
import { Observable,Subscriber } from 'rxjs';
import {EmployeModel} from './employee-information.componenet.model'
import 'hammerjs'; import { HammerModule } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.css']
})
export class EmployeeInformationComponent {
  imgChangeEvt: any = '';
  cropImgPreview: any='';
   base64textString:String="";
   myimage!: Observable<any>;
   base64code!: any


  formValue !:FormGroup;
  employemodelobj : EmployeModel = new EmployeModel();

   constructor(private formBuilder :FormBuilder,private api :ApiService){}

   ngOnInit():void{
    this.formValue=this.formBuilder.group({
      id:[''],
      firstName:['',[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]],
      lastName :['',[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]],
      emailId:['',[Validators.email,Validators.required]],
      phoneno:['',[,Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
    })
      
   }

  //validations for Create employee form
  get FirstName() : FormControl{
     return this.formValue.get("firstName") as FormControl
   }
  get LastName() : FormControl{
    return this.formValue.get("lastName") as FormControl
  }
  get EmailId() : FormControl{
    return this.formValue.get("emailId") as FormControl
  }
  get PhoneNo() : FormControl{
    return this.formValue.get("phoneno") as FormControl
  }
   
   
   //Crop image
  onFileChange(event:any): void {
     this.imgChangeEvt = event;
    
      
  }
  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
    //console.log(this.cropImgPreview);
    this.base64code=this.cropImgPreview;
    console.log(this.base64code);
  }
  imgLoad() {
      // display cropper tool
  }
  initCropper() {
      // init cropper
  }
  
  imgFailed() {
      // error msg
  }

//post method
 postEmployeDetails(){
  this.employemodelobj.firstName = this.formValue.value.firstName;
  this.employemodelobj.lastName = this.formValue.value.lastName;
  this.employemodelobj.emailId = this.formValue.value.emailId;
  this.employemodelobj.phoneno = this.formValue.value.phoneno;
  //this.employemodelobj.newimg = this.cropImgPreview
 
  

  this.api.postEmployes(this.employemodelobj).subscribe(res=>{
    console.log(res);
    alert("Employee added successfuly");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
   
  },
  err=>{
    alert(err.message);
    
  })
}
}
