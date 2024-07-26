import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'transaction', component: TransactionFormComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];
