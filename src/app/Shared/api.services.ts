import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

   //post data

   postEmployes(data:any ){
    console.log("********** POST API *******");
    
    console.log(data)
    return this.http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }))

  }
  //get data

   getEmployee() {
    return this.http.get<any>("http://localhost:3000/posts/").pipe(map((res:any)=>
    {
      console.log(res);
       return res;
    }))
   }

   

   //delete data

   deteteEmployee(id:any) {
    return this.http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>
    {
      console.log(id)
       return res;
    }))
   }



//update data

updateEmployee(data:any) {
  return this.http.put<any>("http://localhost:3000/posts/"+data.id,data).pipe(map((res:any)=>
  {
    
     return res;
  }))
 }


}