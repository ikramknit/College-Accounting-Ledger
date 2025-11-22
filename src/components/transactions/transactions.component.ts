import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Transaction } from '../../models';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent {
  dataService = inject(DataService);
  fb: FormBuilder = inject(FormBuilder);
  transactions = this.dataService.transactions;
  showAddForm = signal(false);

  transactionForm = this.fb.group({
    date: [this.getTodayDateString(), Validators.required],
    description: ['', Validators.required],
    type: ['income' as 'income' | 'expenditure', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    category: ['other' as 'fees' | 'salary' | 'utilities' | 'other', Validators.required]
  });

  toggleAddForm() {
    this.showAddForm.update(v => !v);
    if (!this.showAddForm()) {
      this.transactionForm.reset({
        date: this.getTodayDateString(),
        description: '',
        type: 'income',
        amount: 0,
        category: 'other'
      });
    }
  }

  onSubmit() {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }
    
    this.dataService.addTransaction(this.transactionForm.value as Omit<Transaction, 'id'>);
    this.transactionForm.reset({
      date: this.getTodayDateString(),
      description: '',
      type: 'income',
      amount: 0,
      category: 'other'
    });
    this.showAddForm.set(false);
  }

  private getTodayDateString(): string {
    return new Date().toISOString().split('T')[0];
  }
}