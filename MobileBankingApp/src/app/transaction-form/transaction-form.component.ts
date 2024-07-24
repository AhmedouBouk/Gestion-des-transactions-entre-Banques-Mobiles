// src/app/transaction-form/transaction-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {
  transaction = {
    senderPhone: '',
    recipientPhone: '',
    senderBank: '',
    recipientBank: '',
    amount: 0,
    note: '',
    fees: 0
  };

  calculateFees(): void {
    if (this.transaction.amount < 1000) {
      this.transaction.fees = 10;
    } else if (this.transaction.amount < 10000) {
      this.transaction.fees = 100;
    } else {
      this.transaction.fees = 200; // Exemple pour des montants plus élevés, continuez le schéma
    }
  }

  onAmountChange(): void {
    this.calculateFees();
  }

  onSubmit(): void {
    console.log('Transaction soumise', this.transaction);
  }
}
