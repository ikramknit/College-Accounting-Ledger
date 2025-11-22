
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsComponent {
  dataService = inject(DataService);
  students = this.dataService.students;

  showAddForm = signal(false);

  newStudent = signal({
    name: '',
    course: '',
    totalFees: 0,
    paidFees: 0
  });

  toggleAddForm() {
    this.showAddForm.update(value => !value);
  }

  onSubmit() {
    const studentData = this.newStudent();
    if (studentData.name && studentData.course && studentData.totalFees > 0) {
      this.dataService.addStudent(studentData);
      this.newStudent.set({ name: '', course: '', totalFees: 0, paidFees: 0 });
      this.showAddForm.set(false);
    }
  }

  getFeeStatusClass(student: { totalFees: number, paidFees: number }): string {
    if (student.paidFees >= student.totalFees) {
      return 'bg-green-100 text-green-800';
    } else if (student.paidFees > 0) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  }

  calculateProgress(student: { totalFees: number, paidFees: number }): number {
    if (student.totalFees === 0) return 0;
    return (student.paidFees / student.totalFees) * 100;
  }
}
