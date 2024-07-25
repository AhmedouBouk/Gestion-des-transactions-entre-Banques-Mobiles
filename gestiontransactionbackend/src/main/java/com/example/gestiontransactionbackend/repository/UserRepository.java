// src/main/java/com/example/gestiontransactionbackend/repository/UserRepository.java
package com.example.gestiontransactionbackend.repository;

import com.example.gestiontransactionbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
