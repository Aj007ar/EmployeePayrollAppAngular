import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Services/employee/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  employee:any=[];

  constructor(private http:HttpClient, private emp:EmployeeService) { 

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
}
