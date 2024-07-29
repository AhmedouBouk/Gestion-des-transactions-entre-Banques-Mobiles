package com.example.gestiontransactionbackend.service;

import com.example.gestiontransactionbackend.dto.SigninRequest;
import com.example.gestiontransactionbackend.dto.SignupRequest;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<String> registerUser(SignupRequest signUpRequest);
    ResponseEntity<String> authenticateUser(SigninRequest loginRequest);
}