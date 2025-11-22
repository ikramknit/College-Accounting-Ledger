
import { Component, ChangeDetectionStrategy, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Transaction } from '../../models';

@Component({
  selector: 'app-day-book',
  templateUrl: './day-book.component.html',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayBookComponent {
  dataService = inject(DataService);
  
  // Use a signal for the selected date
  selectedDate = signal<string>(this.getTodayDateString());

  // Computed signal to filter transactions based on the selected date
  dailyTransactions = computed(() => {
    const date = this.selectedDate();
    return this.dataService.transactions().filter(t => t.date === date);
  });

  dailyIncome = computed(() => this.dailyTransactions().filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0));
  dailyExpenditure = computed(() => this.dailyTransactions().filter(t => t.type === 'expenditure').reduce((sum, t) => sum + t.amount, 0));
  closingBalance = computed(() => this.dailyIncome() - this.dailyExpenditure());
  
  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate.set(input.value);
  }
  
  private getTodayDateString(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}
