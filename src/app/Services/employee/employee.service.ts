import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
//  url="http://localhost:3000/employee"
  constructor(private http:HttpClient) { }
  getList(){
    return this.http.get("http://localhost:3000/employee");
  }
  addEmployee(data:any){
    return this.http.post("http://localhost:3000/employee",data)
  }
  deleteEmployee(data:any){
    return this.http.delete("http://localhost:3000/employee/"+data)
  }
  updateEmp(id:any,data:any){
    return this.http.put("http://localhost:3000/employee/"+id,data)
  }
}
