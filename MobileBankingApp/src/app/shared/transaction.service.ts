import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8081/api/transactions';

  constructor(private http: HttpClient) {}

  createTransaction(transaction: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, transaction);
  }

  getApprovedTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/approved`);
  }

  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  updateTransactionStatus(transactionId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${transactionId}/status`, { status });
  }
}
