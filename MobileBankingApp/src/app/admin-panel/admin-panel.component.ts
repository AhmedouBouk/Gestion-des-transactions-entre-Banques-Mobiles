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

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getAllTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  updateStatus(transactionId: number, status: string) {
    this.transactionService.updateTransactionStatus(transactionId, status).subscribe(() => {
      this.transactions = this.transactions.filter(t => t.id !== transactionId);
    });
  }
}
