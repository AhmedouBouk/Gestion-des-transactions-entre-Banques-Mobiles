// src/main/java/com/example/gestiontransactionbackend/service/UserService.java
package com.example.gestiontransactionbackend.service;

import com.example.gestiontransactionbackend.model.User;
import com.example.gestiontransactionbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
