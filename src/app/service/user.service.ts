import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponseModel, ITask, Task } from "../model/task";
// import { ApiResponseModel, Task } from "../model/task";

@Injectable({
   providedIn:'root'
})

export class UserService{

  apiUrl:string = 'https://freeapi.gerasim.in/api/JWT/'

   constructor(private http:HttpClient){}

   getAllUser() : Observable<ApiResponseModel>{
      return this.http.get<ApiResponseModel>(this.apiUrl + 'GetAllTaskList')
   }

   createNewTask(obj:ITask):Observable<ApiResponseModel>{
     return this.http.post<ApiResponseModel>(this.apiUrl + 'CreateNewTask', obj)
  }

  updateTask(obj:ITask):Observable<ApiResponseModel>{
      return this.http.put<ApiResponseModel>(this.apiUrl+ 'UpdateTask', obj)
  }

  deleteTask(id:number):Observable<ApiResponseModel>{
      return this.http.delete<ApiResponseModel>(this.apiUrl + 'DeleteTask?itemId=' + id)
  }


}
