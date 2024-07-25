// src/main/java/com/example/gestiontransactionbackend/controller/TransactionController.java
package com.example.gestiontransactionbackend.controller;

import com.example.gestiontransactionbackend.model.Transaction;
import com.example.gestiontransactionbackend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionService.saveTransaction(transaction);
    }
}
