import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './service/user.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResponseModel, ITask, Task } from './model/task';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Todo';
  taskList:Task[] = []
  taskObj:ITask = new ITask()
  service:UserService = inject(UserService)

  ngOnInit(){
      this.loadAllTask()
  }

  loadAllTask(){
     this.service.getAllUser().subscribe((res:ApiResponseModel) => {
         this.taskList = res.data

     })
  }

  addTask(){
     this.service.createNewTask(this.taskObj).subscribe((res:ApiResponseModel) => {
        if(res.result){
            alert('Task created success')
            this.loadAllTask()
            this.taskObj = new ITask()
        }
     }, error => {
        alert('API Call Error')
     })
  }


  onEdit(item:ITask){
     this.taskObj = item
     setTimeout(() => {
        const date = new Date(this.taskObj.createdOn)
        const day = ('0' + date.getDate()).slice(-2)
        const month = ('0' + date.getMonth() + 1).slice(-2)
        const Today = date.getFullYear() +  '-' +  (month) + '-' + (day);

        (<HTMLInputElement>document.getElementById('textDate')).value = Today
     })
  }

  updateTask(){
     this.service.updateTask(this.taskObj).subscribe((res:ApiResponseModel) => {
         if(res.result){
            alert('task is updated')
            this.loadAllTask()
            this.taskObj = new ITask()
         }
     }, error => {
        alert('API call Error')
     })
  }

  deleteTask(id:number){
     const isConfirm = confirm('Are you sure want to delete Task')
     if(isConfirm){
              this.service.deleteTask(id).subscribe((res:ApiResponseModel) => {
          if(res.result){
             alert('The Task is deleted.')
             this.loadAllTask()
          }
      }, error => {
          alert('API Call Error.')
      })
     }

  }


}
