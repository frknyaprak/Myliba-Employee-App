import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  createEmployee: FormGroup;
  loading= false;
  id: string | null;
  header : string;
  addButton: string;
  message:any;

  constructor(
    private fb: FormBuilder,
    public notifierService: NotifierService,
    private employeeService: EmployeeService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private translateService:TranslateService
  ) { 
    this.header = 'Add Employee';
    this.addButton = 'Add';
    this.createEmployee = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.translateService.get('successMessage').subscribe((data)=> {
       this.message= data;
    })
  }

  ngOnInit(): void {
    this.editedEmployee();
  }

  addAndEditEmployee() {
    if(!this.createEmployee.get('name')?.value ||
       !this.createEmployee.get('surname')?.value ||
       !this.createEmployee.get('email')?.value ||
       !this.createEmployee.get('salary')?.value ||
       !this.createEmployee.get('name')?.valid ||
       !this.createEmployee.get('surname')?.valid ||
       !this.createEmployee.get('email')?.valid ||
       !this.createEmployee.get('salary')?.valid
       ){
      this.notifierService.notify('warning', 'Please fill in all the required fields!');
    }else {
      if(this.id === null) {
        this.addEmployee();
      }else {
        this.editEmployee(this.id);
      }
    }

    
  }

  addEmployee() {
    const employee:any = {
      name: this.createEmployee.value.name,
      surname: this.createEmployee.value.surname,
      email: this.createEmployee.value.email,
      salary: this.createEmployee.value.salary,
      createdDate: new Date(),
      updatedDate: new Date()
    }
    
    this.loading = true;

    this.employeeService.addEmployee(employee).then(()=> {
      this.notifierService.notify('success','Employee added successfully');
      this.loading=false;
      this.router.navigate(['/list-employee']);
    }).catch(error => {
      this.loading = false;
    })
  }

  editEmployee(id: string) {
    const employee:any = {
      name: this.createEmployee.value.name,
      surname: this.createEmployee.value.surname,
      email: this.createEmployee.value.email,
      salary: this.createEmployee.value.salary,
      updatedDate: new Date()
    }
    this.loading = true;
    this.employeeService.updateEmployee(id, employee).then(()=> {
      this.loading = false;
      
      this.notifierService.notify('success', this.message);
      this.router.navigate(['/list-employee']);
    })
  }

  editedEmployee() {
    if(this.id !== null) {
      this.header = 'Edit Employee';
      this.addButton = 'Update';
      this.loading = true;
      this.employeeService.getEmployee(this.id).subscribe(data => {
        this.loading = false;
        this.createEmployee.setValue({
          name: data.payload.data()['name'],
          surname: data.payload.data()['surname'],
          email: data.payload.data()['email'],
          salary: data.payload.data()['salary'],
        })
      })
    }
  }

  get email() {return this.createEmployee.get('email')}

  get name() {return this.createEmployee.get('name');}

  get surname() {return this.createEmployee.get('surname');} 
}
