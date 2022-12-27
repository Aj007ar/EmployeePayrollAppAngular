import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/Services/employee/employee.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  UpdateForm!: FormGroup
  submitted = false
  empId:any;
  name:any;
  gender:any;
  salary:any;
  department:any;
  startDate:any;
  profile:any;
  Emp:any;
  depart:any;
  departmentList:any=[
    { name: 'HR' ,value:'HR',checked:false},
    { name: 'Finance',value:'Finance',checked:false},
    { name: 'Sales',value:'Sales',checked:false},
    { name: 'Engineer',value:'Engineer',checked:false},
    { name: 'Others',value:'Others',checked:false}
  ];
  checked = false;
  constructor(private emp:EmployeeService, private formBuilder: FormBuilder,public dialogRef: MatDialogRef<UpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
   
    this.empId=data.id
    this.name=data.name
    this.profile=data.profile
    this.gender=data.gender
    this.department=data.department
    this.salary=data.salary
    this.startDate=data.startDate
    console.log(this.data)
   }
   
   onNoClick(){
    this.dialogRef.close();
   }
  ngOnInit(){
    this.Emp = this.data.element;
    this.UpdateForm = this.formBuilder.group({
      // name: ['', Validators.required],
      // gender: ['',Validators.required],
      department:this.formBuilder.array([],[Validators.required]),
      // salary: ['', [Validators.required, Validators.required]],
      // startDate: ['', Validators.required],
      // profile: ['',Validators.required],
    });
   
    // department:this.Emp.array([])
  }
  onCheckboxChange(e:any) {
   const depart:FormArray=this.UpdateForm.get('department') as FormArray;
    if (e.target.checked) {
      depart.push(new FormControl(e.target.value));
    } else {
       const index = depart.controls.findIndex(x => x.value === e.target.value);
       depart.removeAt(index);
    }
    console.log(depart)
  }
  updateBook() {
    this.submitted = true
    let reqData = {
     name:this.name,
     profile:this.profile,
     gender:this.gender,
     department:this.UpdateForm.value.department,
     salary:this.salary,
     startDate:this.startDate
     
    }

    this.emp.updateEmp(this.empId,reqData).subscribe((res)=>{
      console.log(res)
    })
 
    this.dialogRef.close()
  } 

}
