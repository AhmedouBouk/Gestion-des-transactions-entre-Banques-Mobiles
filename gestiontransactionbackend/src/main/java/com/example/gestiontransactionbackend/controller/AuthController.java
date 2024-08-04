package com.example.gestiontransactionbackend.controller;

import com.example.gestiontransactionbackend.dto.JwtResponse;
import com.example.gestiontransactionbackend.dto.LoginRequest;
import com.example.gestiontransactionbackend.dto.SignupRequest;
import com.example.gestiontransactionbackend.model.User;
import com.example.gestiontransactionbackend.repository.UserRepository;
import com.example.gestiontransactionbackend.security.JwtTokenProvider;
import com.example.gestiontransactionbackend.service.userservice;




import org.springframework.security.core.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    userservice userService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        System.out.println("hellow world ##################33");
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            System.out.println("hello world  **************************");
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtTokenProvider.generateToken(authentication);

            JwtResponse jwtResponse = new JwtResponse(jwt, loginRequest.getUsername());
            System.out.println("hell meaw ^^^^^^^^^^^^^^^^^^^^");
            return ResponseEntity.ok(jwtResponse);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid username or password");
        }
    }



    @PostMapping("/signup")
public ResponseEntity<ApiResponse> registerUser(@RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
        return ResponseEntity
            .badRequest()
            .body(new ApiResponse("Error: Username is already taken!", null));
    }

    User user = new User(signUpRequest.getUsername(), encoder.encode(signUpRequest.getPassword()));
    userRepository.save(user);
    return ResponseEntity.ok(new ApiResponse("User registered successfully!", user));
}




}
