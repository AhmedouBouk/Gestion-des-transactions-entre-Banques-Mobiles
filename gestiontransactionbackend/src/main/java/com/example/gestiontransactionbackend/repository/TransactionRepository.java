// src/main/java/com/example/gestiontransactionbackend/repository/TransactionRepository.java
package com.example.gestiontransactionbackend.repository;

import com.example.gestiontransactionbackend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
