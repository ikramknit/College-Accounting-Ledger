import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Student } from '../../models';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsComponent {
  dataService = inject(DataService);
  // FIX: Explicitly type `fb` as `FormBuilder` to fix type inference issue.
  fb: FormBuilder = inject(FormBuilder);
  students = this.dataService.students;

  showAddForm = signal(false);

  studentForm = this.fb.group({
    name: ['', Validators.required],
    course: ['', Validators.required],
    totalFees: [0, [Validators.required, Validators.min(1)]],
    paidFees: [0, [Validators.required, Validators.min(0)]]
  });

  toggleAddForm() {
    this.showAddForm.update(value => !value);
    if (!this.showAddForm()) {
      this.studentForm.reset({ name: '', course: '', totalFees: 0, paidFees: 0 });
    }
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const studentData = this.studentForm.value;
    this.dataService.addStudent({
      name: studentData.name!,
      course: studentData.course!,
      totalFees: studentData.totalFees!,
      paidFees: studentData.paidFees!
    });
    
    this.studentForm.reset({ name: '', course: '', totalFees: 0, paidFees: 0 });
    this.showAddForm.set(false);
  }

  getFeeStatusClass(student: Student): string {
    if (student.paidFees >= student.totalFees) {
      return 'bg-green-100 text-green-800';
    } else if (student.paidFees > 0) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  }

  calculateProgress(student: Student): number {
    if (student.totalFees === 0) return 0;
    return (student.paidFees / student.totalFees) * 100;
  }
}