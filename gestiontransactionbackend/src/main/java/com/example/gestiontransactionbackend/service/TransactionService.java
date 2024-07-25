// src/main/java/com/example/gestiontransactionbackend/service/TransactionService.java
package com.example.gestiontransactionbackend.service;

import com.example.gestiontransactionbackend.model.Transaction;
import com.example.gestiontransactionbackend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}
