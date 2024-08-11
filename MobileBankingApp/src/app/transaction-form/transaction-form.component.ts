import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../shared/transaction.service';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TransactionHistoryComponent],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  showTransactionForm = true;
  transaction: any = {
    senderPhone: '',
    recipientPhone: '',
    senderBank: '',
    recipientBank: '',
    amount: 0,
    note: '',
    fees: 0
  };
  transactions: any[] = [];
  errorMessage: string = '';

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTransactions();
  }

  toggleView() {
    this.showTransactionForm = !this.showTransactionForm;
  }

  onSubmit() {
    console.log('Submitting transaction:', this.transaction);

    if (!this.authService.isAuthenticated()) {
      this.errorMessage = 'You are not logged in. Please log in to create a transaction.';
      this.router.navigate(['/login']);
      return;
    }

    if (!this.isFormValid()) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    const username = localStorage.getItem('username');
    if (!username) {
      this.errorMessage = 'User is not identified. Please log in again.';
      this.router.navigate(['/login']);
      return;
    }

    this.authService.refreshToken().pipe(
      switchMap(() => this.transactionService.createTransaction(this.transaction, username)),
      catchError(error => {
        console.error('Error creating transaction:', error);
        if (error.status === 403) {
          this.errorMessage = 'You are not authorized to perform this action. Please log in again.';
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = `Transaction failed: ${error.message || 'Please try again.'}`;
        }
        return of(null);
      })
    ).subscribe((response: any) => {
      if (response) {
        console.log('Transaction created successfully:', response);
        this.resetForm();
        this.loadTransactions();
      }
    });
  }

  onAmountChange() {
    const amount = this.transaction.amount;
    if (amount < 1000) {
      this.transaction.fees = 10;
    } else if (amount < 10000) {
      this.transaction.fees = 100;
    } else {
      this.transaction.fees = 1000;
    }
  }

  loadTransactions() {
    const username = localStorage.getItem('username');
    if (!username) {
      this.errorMessage = 'User is not identified. Please log in again.';
      this.router.navigate(['/login']);
      return;
    }

    this.transactionService.getTransactions(username).pipe(
      catchError(error => {
        console.error('Error loading transactions:', error);
        this.errorMessage = 'Failed to load transactions. Please try again.';
        return of([]);
      })
    ).subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleView();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      console.log("hellO");
    }
  }

  private resetForm() {
    this.transaction = {
      senderPhone: '',
      recipientPhone: '',
      senderBank: '',
      recipientBank: '',
      amount: 0,
      note: '',
      fees: 0
    };
    this.errorMessage = '';
  }

  private isFormValid(): boolean {
    return this.transaction.senderPhone && 
           this.transaction.recipientPhone && 
           this.transaction.senderBank && 
           this.transaction.recipientBank && 
           this.transaction.amount > 0;
  }
}
