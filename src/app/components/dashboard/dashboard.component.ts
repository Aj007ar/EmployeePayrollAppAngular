import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/Services/employee/employee.service';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  employee:any=[];

  constructor(private http:HttpClient, private emp:EmployeeService,public dialog:MatDialog) { 

  }
  
  ngOnInit(): void {
    this.getAllEmp()
  }
  getAllEmp(){
    this.emp.getList().subscribe((res)=>{
      console.log(res);
      this.employee=res;
    })
  }

  deleteEmp(data:any){
    this.emp.deleteEmployee(data).subscribe((res)=>{
      console.log(res)
    })
  }

  updateDialog(note:any){
    const dialogRef=this.dialog.open(UpdateComponent,{
      data:note,

    });
    dialogRef.afterClosed().subscribe(response=>{
      
      
      console.log('The dialog was closed',response);
    })
  }
}
