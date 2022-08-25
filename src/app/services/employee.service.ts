import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firestore: AngularFirestore) {
    
  }

  addEmployee(employee:any): Promise<any> {
    return this.firestore.collection('employee').add(employee);
  }

  getEmployees(): Observable<any> {
    return this.firestore.collection('employee', ref => ref.orderBy('createdDate', 'asc')).snapshotChanges();
  }

  deleteEmployee(id:string): Promise<any>{
    return this.firestore.collection('employee').doc(id).delete();
  }

  getEmployee(id:string): Observable<any> {
    return this.firestore.collection('employee').doc(id).snapshotChanges();
  }

  updateEmployee(id: string, data: any): Promise<any> {
    return this.firestore.collection('employee').doc(id).update(data)
  }


}
