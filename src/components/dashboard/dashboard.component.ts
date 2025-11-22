
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  dataService = inject(DataService);

  totalIncome = this.dataService.totalIncome;
  totalExpenditure = this.dataService.totalExpenditure;
  netBalance = this.dataService.netBalance;
  totalOutstandingFees = this.dataService.totalOutstandingFees;
}
