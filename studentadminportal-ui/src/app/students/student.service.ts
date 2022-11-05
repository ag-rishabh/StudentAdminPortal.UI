import { UpdateStudentRequest } from './../models/api-models/update-student-request.model';
import { Student } from './../models/ui-models/student.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:44361'

  constructor(private httpClient: HttpClient) { }

  getStudents() : Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students');
  }

  getStudent(studentId: string):  Observable<Student>{
     return this.httpClient.get<Student>(this.baseApiUrl + '/students/' + studentId);
  }

  updateStudent(studentId: string, StudentRequest: Student) : Observable<Student> {
    const updateStudentRequest : UpdateStudentRequest = {
      firstName: StudentRequest.firstName,
      lastName: StudentRequest.lastName,
      dateOfBirth: StudentRequest.dateOfBirth,
      email: StudentRequest.email,
      mobile: StudentRequest.mobile,
      genderId: StudentRequest.genderId,
      physicalAddress: StudentRequest.address.physicalAddress,
      postalAddress: StudentRequest.address.postalAddress
    }

    return this.httpClient.put<Student>(this.baseApiUrl +  '/students/' + studentId, updateStudentRequest);
  }

}
