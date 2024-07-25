import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../transaction.service';

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

  constructor(private transactionService: TransactionService) {}

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
    this.transactionService.createTransaction(this.transaction).subscribe({
      next: response => {
        console.log('Transaction créée avec succès', response);
        alert('Transaction créée avec succès');
      },
      error: error => {
        console.error('Échec de la création de la transaction', error);
        alert('Échec de la création de la transaction : ' + error.message);
      }
    });
  }
}
