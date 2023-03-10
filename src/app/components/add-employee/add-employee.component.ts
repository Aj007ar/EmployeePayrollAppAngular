import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators, FormArray } from '@angular/forms';
import { EmployeeService } from 'src/app/Services/employee/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  selectedDepartment:any=[]
  departmentList:any=[
    { name: 'HR' ,value:'HR',checked:false},
    { name: 'Finance',value:'Finance',checked:false},
    { name: 'Sales',value:'Sales',checked:false},
    { name: 'Engineer',value:'Engineer',checked:false},
    { name: 'Others',value:'Others',checked:false}
  ];
  
  salary = 0;
  constructor(private formBuilder: FormBuilder,private emp:EmployeeService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['',Validators.required],
      department:this.formBuilder.array([],[Validators.required]),
      salary: ['', [Validators.required, Validators.required]],
      startDate: ['', Validators.required],
      profile: ['',Validators.required],
    });
  }

  onCheckboxChange(e:any){
    const depart: FormArray = this.registerForm.get('department') as FormArray;

    if (e.target.checked){
    depart.push(new FormControl(e.target.value))
    }else {
           const index = depart.controls.findIndex(x => x.value === e.target.value);
           depart.removeAt(index);
        }
  }
  get f() { return this.registerForm.controls; }
  saveEmp() {
    this.submitted = true;
    
    if (this.registerForm.valid) {
      console.log("employee added successfully");
      let addEmployee={
        name: this.registerForm.value.name,
        gender:this.registerForm.value.gender,
        salary:this.registerForm.value.salary,
        department:this.registerForm.value.department,
        startDate:this.registerForm.value.startDate,
        profile:this.registerForm.value.profile
      }
      this.emp.addEmployee(addEmployee).subscribe((result:any)=>{
        console.log(result)
      })
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

}
