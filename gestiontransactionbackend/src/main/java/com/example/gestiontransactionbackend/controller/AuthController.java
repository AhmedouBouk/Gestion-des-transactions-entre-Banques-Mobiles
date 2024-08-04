package com.example.gestiontransactionbackend.controller;

import com.example.gestiontransactionbackend.dto.LoginRequest;
import com.example.gestiontransactionbackend.model.User;
import com.example.gestiontransactionbackend.service.userservice;

import jakarta.servlet.http.HttpSession;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class AuthController {

    @Autowired


    private userservice userservice;

   @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest, HttpSession session) {
        Optional<User> user = userservice.authenticateuser(loginRequest.getUsername(), loginRequest.getPassword());
        if (user.isPresent()) {
            session.setAttribute("loggedInUser", user.get());
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        userservice.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

}