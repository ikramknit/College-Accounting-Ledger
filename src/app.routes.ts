
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  {
    path: 'students',
    loadComponent: () => import('./components/students/students.component').then(c => c.StudentsComponent)
  },
  {
    path: 'day-book',
    loadComponent: () => import('./components/day-book/day-book.component').then(c => c.DayBookComponent)
  },
  {
    path: 'transactions',
    loadComponent: () => import('./components/transactions/transactions.component').then(c => c.TransactionsComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
