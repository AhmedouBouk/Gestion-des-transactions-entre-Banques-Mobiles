import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../shared/transaction.service';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TransactionHistoryComponent],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {
  showTransactionForm: boolean = true;
  transaction: any = {};

  constructor(private transactionService: TransactionService) {}

  toggleView() {
    this.showTransactionForm = !this.showTransactionForm;
  }

  onSubmit() {
    this.transactionService.createTransaction(this.transaction).subscribe(response => {
      console.log('Transaction submitted successfully');
      // Reset form after submission
      this.transaction = {};
    });
  }

  onAmountChange() {
    // Update transaction fees based on the amount
    const amount = this.transaction.amount;
    if (amount < 1000) {
      this.transaction.fees = 10;
    } else if (amount < 10000) {
      this.transaction.fees = 100;
    } else {
      this.transaction.fees = 1000;
    }
  }
}
