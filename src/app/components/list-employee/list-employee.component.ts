import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs/internal/Observable';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  employees: any[] = [];
  

  constructor(
    private employeeService: EmployeeService,
    public notifierService: NotifierService
  ) { 
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = [];
      data.forEach((element:any) => {
        this.employees.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).then(()=> {
      this.notifierService.notify('success','Employee deleted successfully!')
    }).catch(error => {
    })
  }

}
