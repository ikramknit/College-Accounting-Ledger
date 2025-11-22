
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Transaction } from '../../models';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent {
  dataService = inject(DataService);
  transactions = this.dataService.transactions;
  showAddForm = signal(false);

  newTransaction = signal<Omit<Transaction, 'id'>>({
    date: this.getTodayDateString(),
    description: '',
    type: 'income',
    amount: 0,
    category: 'other'
  });

  toggleAddForm() {
    this.showAddForm.update(v => !v);
  }

  onSubmit() {
    const trans = this.newTransaction();
    if (trans.description && trans.amount > 0) {
      this.dataService.addTransaction(trans);
      this.newTransaction.set({
        date: this.getTodayDateString(),
        description: '',
        type: 'income',
        amount: 0,
        category: 'other'
      });
      this.showAddForm.set(false);
    }
  }

  private getTodayDateString(): string {
    return new Date().toISOString().split('T')[0];
  }
}
