
import { Injectable, signal, computed } from '@angular/core';
import { Student, Transaction } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _students = signal<Student[]>([
    { id: 1, name: 'John Doe', course: 'Computer Science', totalFees: 5000, paidFees: 2500 },
    { id: 2, name: 'Jane Smith', course: 'Business Administration', totalFees: 4500, paidFees: 4500 },
    { id: 3, name: 'Peter Jones', course: 'Mechanical Engineering', totalFees: 5500, paidFees: 3000 },
    { id: 4, name: 'Mary Johnson', course: 'Arts & Humanities', totalFees: 4000, paidFees: 1000 },
  ]);

  private _transactions = signal<Transaction[]>([
    { id: 1, date: this.formatDate(new Date('2024-07-20')), description: 'Tuition Fee from John Doe', type: 'income', amount: 2500, category: 'fees' },
    { id: 2, date: this.formatDate(new Date('2024-07-20')), description: 'Staff Salary - July', type: 'expenditure', amount: 15000, category: 'salary' },
    { id: 3, date: this.formatDate(new Date('2024-07-21')), description: 'Tuition Fee from Jane Smith', type: 'income', amount: 4500, category: 'fees' },
    { id: 4, date: this.formatDate(new Date()), description: 'Electricity Bill', type: 'expenditure', amount: 800, category: 'utilities' },
    { id: 5, date: this.formatDate(new Date()), description: 'Tuition Fee from Peter Jones', type: 'income', amount: 3000, category: 'fees' },
  ]);

  students = this._students.asReadonly();
  transactions = this._transactions.asReadonly();

  totalIncome = computed(() => this.transactions().filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0));
  totalExpenditure = computed(() => this.transactions().filter(t => t.type === 'expenditure').reduce((sum, t) => sum + t.amount, 0));
  netBalance = computed(() => this.totalIncome() - this.totalExpenditure());
  totalOutstandingFees = computed(() => this.students().reduce((sum, s) => sum + (s.totalFees - s.paidFees), 0));

  constructor() {}

  addStudent(student: Omit<Student, 'id'>) {
    this._students.update(students => [
      ...students,
      { ...student, id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1 }
    ]);
  }

  addTransaction(transaction: Omit<Transaction, 'id'>) {
    this._transactions.update(transactions => [
      ...transactions,
      { ...transaction, id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1 }
    ]);
  }
  
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
