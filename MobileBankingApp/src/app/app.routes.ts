import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'transaction', component: TransactionFormComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];
