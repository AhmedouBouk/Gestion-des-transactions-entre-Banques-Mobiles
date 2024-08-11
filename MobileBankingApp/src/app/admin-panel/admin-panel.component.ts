import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../shared/transaction.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  transactions: any[] = [];
  errorMessage: string = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadAllTransactions();
  }

  loadAllTransactions() {
    this.transactionService.getAllTransactions().subscribe(
      (transactions) => this.transactions = transactions,
      (error) => this.errorMessage = 'Failed to load transactions. Please try again.'
    );
  }

  approveTransaction(transactionId: string) {
    this.transactionService.approveTransaction(transactionId).subscribe(
      () => this.loadAllTransactions(),
      (error) => this.errorMessage = 'Failed to approve transaction. Please try again.'
    );
  }

  declineTransaction(transactionId: string) {
    this.transactionService.rejectTransaction(transactionId).subscribe(
      () => this.loadAllTransactions(),
      (error) => this.errorMessage = 'Failed to decline transaction. Please try again.'
    );
  }
}
