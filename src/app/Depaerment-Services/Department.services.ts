import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DeptApiService {

  constructor(private http: HttpClient) { }

   //post data

   postDept(data:any ){
    return this.http.post<any>("http://localhost:3000/StudentDB",data).pipe(map((res:any)=>{
      console.log(res);
      return res;
    }))

  }
  //get data

   getDept() {
    return this.http.get<any>("http://localhost:3000/StudentDB/").pipe(map((res:any)=>
    {
      console.log(res);
       return res;
    }))
   }

   

   //delete data

   deteteDept(id:any) {
    return this.http.delete<any>("http://localhost:3000/StudentDB/"+id).pipe(map((res:any)=>
    {
      console.log(id)
       return res;
    }))
   }



//update data

updateDept(data:any) {
  return this.http.put<any>("http://localhost:3000/StudentDB/"+data.id,data).pipe(map((res:any)=>
  {
    
     return res;
  }))
 }


}