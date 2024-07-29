package com.example.gestiontransactionbackend.controller;

import com.example.gestiontransactionbackend.dto.SigninRequest;
import com.example.gestiontransactionbackend.dto.SignupRequest;
import com.example.gestiontransactionbackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody SignupRequest signUpRequest) {
        return authService.registerUser(signUpRequest);
    }

    @PostMapping("/signin")
    public ResponseEntity<String> authenticateUser(@RequestBody SigninRequest loginRequest) {
        return authService.authenticateUser(loginRequest);
    }
}