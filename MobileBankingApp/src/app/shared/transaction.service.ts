import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8081/api/transactions';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createTransaction(transaction: any, username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}?username=${username}`, transaction, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Transaction creation failed:', error);
          return throwError(error);
        })
      );
  }

  getTransactions(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Failed to fetch transactions:', error);
          return throwError(error);
        })
      );
  }

  approveTransaction(transactionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve`, { transactionId }, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Transaction approval failed:', error);
          return throwError(error);
        })
      );
  }

  rejectTransaction(transactionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reject`, { transactionId }, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Transaction rejection failed:', error);
          return throwError(error);
        })
      );
  }
  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Failed to fetch all transactions:', error);
          return throwError(error);
        })
      );
  }
  
}
