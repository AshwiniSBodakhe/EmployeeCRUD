import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms'
import { ApiService } from '../Shared/api.services'
import {EmployeModel} from '../employee-information/employee-information.componenet.model'
 import { read, utils, writeFile } from 'xlsx';
 import * as XLSX from 'xlsx';
 import {ImageCroppedEvent,ImageCropperComponent,CropperPosition} from "ngx-image-cropper";
 import {
  ModalDirective} from "ngx-bootstrap/modal";
  import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html'
  ,
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {
  modalobj : EmployeModel =new EmployeModel();
  formvalue !:FormGroup;
  employeedata :any;
  Actions: any[] =[];
  UploadFile:any
  convettoJson:any;
  converttobase64:string='';
  //*********Image variables*********//
 
  url:any;
  imgChangeEvt: any = '';
  cropImgPreview: any = '';
  imageChangedEvent: any = '';
  croppedImage: string = '';
  showCropper = false;

  lastCropperPosition: CropperPosition;
  lastCroppedImage: any;
  cropper = {
    x1: 100,
    y1: 100,
    x2: 200,
    y2: 200
  }
  @ViewChild("logoModal") public logoModal: ModalDirective;
  img:string;
  base64ToImage:any;
  imageVar=false;
  isValid = true;
  
  //**********************//
  constructor(private api :ApiService,private formBuilder :FormBuilder, private domSanitizer: DomSanitizer){}
  ngOnInit():void{
   this.formvalue=this.formBuilder.group({
     id:[''],
    
     firstName:['',[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]],
     lastName :['',[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]],
     emailId:['',[Validators.email,Validators.required]],
     phoneno:['',[,Validators.required,Validators.minLength(10),Validators.maxLength(10)]]})
     newimg:['']
     this.getEmployeeDetails();
     
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

  //post method
 postEmployeDetails(){
  this.modalobj.firstName = this.formvalue.value.firstName;
  this.modalobj.lastName = this.formvalue.value.lastName;
  this.modalobj.emailId = this.formvalue.value.emailId;
  this.modalobj.phoneno = this.formvalue.value.phoneno;
  this.modalobj.newimg = this.converttobase64
 
  

  this.api.postEmployes(this.modalobj).subscribe(res=>{
    console.log(res);
    alert("Employee added successfuly");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formvalue.reset();
   
  },
  err=>{
    alert(err.message);
    
  })
}
  

  //get employee Details
  getEmployeeDetails(){
   this.api.getEmployee().subscribe(res=>{
     this.employeedata=res;
     console.log(this.employeedata);
   })
  }
  //delete employee
  deleteEmployeDetails(row:any){
    this.api.deteteEmployee(row.id).subscribe(res=>{
     
     alert("Employee is deleted");
     this.getEmployeeDetails();
    })
  }

  OnEdit(row:any){
    
    this.imageVar= true;
   this.modalobj.id=row.id;
   this.formvalue.controls['firstName'].setValue(row.firstName);
   this.formvalue.controls['lastName'].setValue(row.lastName);
   this.formvalue.controls['emailId'].setValue(row.emailId);
   this.formvalue.controls['phoneno'].setValue(row.phoneno);
   console.log(row)
   this.base64ToImage = row.newimg
   
 
  }

  updateEmployeeDetails()
  {
   
   this.modalobj.firstName = this.formvalue.value.firstName;
   this.modalobj.lastName = this.formvalue.value.lastName;
   this.modalobj.emailId = this.formvalue.value.emailId;
   this.modalobj.phoneno = this.formvalue.value.phoneno;
  
   
   this.api.updateEmployee(this.modalobj).subscribe(res=>{
     alert("update successfuly")
     let ref = document.getElementById('cancel')
     ref?.click();
     this.formvalue.reset();
     this.getEmployeeDetails();
   })
  }


  //Export Excel

  handleExport(){
    
    const headings = [[
      'Id',
      'First Name',
      'Last Name',
      'EmailID',
      'Phone No'
  ]];
  const wb = utils.book_new();
  const ws: any = utils.json_to_sheet([this.modalobj]);
  utils.sheet_add_aoa(ws, headings);
  utils.sheet_add_json(ws,this.employeedata,{ origin: 'A2', skipHeader: true });
  utils.book_append_sheet(wb, ws, 'Sheet1');
  writeFile(wb, 'Employe_Details_Excel.xlsx');
  }


  //Import File
  SelectFile(Event:any)
  {
    let file = Event.target.files[0];
    
    let fileReader =new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e)=>{
      var workBook = XLSX.read(fileReader.result,{type:'binary'});
      var Sheet1 = workBook.SheetNames;
    
      this.employeedata= XLSX.utils.sheet_to_json(workBook.Sheets[Sheet1[0]])
    }
  }
   saveFile()
   {
     this.employeedata.map((data:any)=>{
     this.modalobj.id = data.id
     this.modalobj.firstName = data.firstName
     this.modalobj.lastName = data.lastName
     this.modalobj.emailId = data.emailId 
     this.modalobj.phoneno = data.phoneno 
     })

   

     this.api.postEmployes(this.modalobj).subscribe(res=>{
      console.log("*************")
            console.log(res);
      console.log("*************")      

              alert("Upload successfuly");
            this.getEmployeeDetails();
           })
    

  }  
//***********************//
ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  this.logoModal.config = { backdrop: "static", keyboard: false };

}

onFileChange(event:any) {
  this.imgChangeEvt= event;
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event:any) => { // called once readAsDataURL is completed
      this.url = event.target.result;
      this.imgChangeEvt=this.url;
    }
  }

}
cropImg(e: ImageCroppedEvent) {
  this.imageVar=false;
  this.cropImgPreview = e.base64;
  this.converttobase64 =this.cropImgPreview;
  console.log(this.cropImgPreview);
  
}
imgLoad() {
  this.logoModal.show();
  setTimeout(() => {
    this.cropper = {
      x1: 100,
      y1: 100,
      x2: 300,
      y2: 200
    }
  });
}
initCropper() {
  // init cropper
}

imgFailed() {
  // error msg
}
//Delete the upload Image
public delete(){
  this.croppedImage = null;
  this.imageVar =false;
  this.logoModal.hide();
}
public crop(){
 this.croppedImage=this.cropImgPreview;
 this.imageVar=false;
 this.logoModal.hide();
}




  
}










