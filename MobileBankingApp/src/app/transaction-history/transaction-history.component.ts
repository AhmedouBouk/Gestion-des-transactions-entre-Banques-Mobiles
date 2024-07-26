import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../shared/transaction.service';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  transactions: any[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getApprovedTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }
}
