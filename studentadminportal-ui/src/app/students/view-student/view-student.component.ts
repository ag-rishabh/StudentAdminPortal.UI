import { Gender } from './../../models/ui-models/gender.model';
import { GenderService } from './../../services/gender.service';
import { StudentService } from './../student.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }

  genderList: Gender[] = [];

  constructor(private readonly studentService: StudentService,
     private readonly route: ActivatedRoute,
     private readonly genderService: GenderService,
     private readonly snackbar: MatSnackBar,
     private readonly router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');
        if(this.studentId) {
          this.studentService.getStudent(this.studentId)
            .subscribe(
              (successResponse) => {
                this.student = successResponse;
              }
            );

            this.genderService.getGenderList()
              .subscribe(
                (successResponse) => {
                  this.genderList = successResponse;
                }
              );
        }
      }
    )
  }

  onUpdate(): void {
    this.studentService.updateStudent(this.student.id, this.student).subscribe(
      (successResponse) => {
        this.snackbar.open('Student updated successfully', undefined, {
          duration: 2000
        });
      },
      (errorResponse) => {

      }
    )
  }

  onDelete() : void {
    this.studentService.deleteStudent(this.student.id)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Student deleted successfully', undefined, {
            duration: 2000
          });
          setTimeout(() => {
            this.router.navigateByUrl('students');
          }, 2000);
        },
        (errorResponse) => {
        }
      )
  }
}
