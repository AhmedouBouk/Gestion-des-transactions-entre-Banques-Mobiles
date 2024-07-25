import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'transaction', component: TransactionFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
