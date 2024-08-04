package com.example.gestiontransactionbackend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.gestiontransactionbackend.model.User;
import com.example.gestiontransactionbackend.repository.UserRepository;
@Service
public class userservice {
    @Autowired
        private PasswordEncoder passwordEncoder;
        @Autowired
        private UserRepository UserRepository;

    public Optional<User> authenticateuser(String username, String password) {
        Optional<User> admin = UserRepository.findByUsername(username);
        if (admin.isPresent() && passwordEncoder.matches(password, admin.get().getPassword())) {
            return admin;
        }
        return Optional.empty();
    }

    // Création des Administrateurs
    public void createUser(User administrator) {
        administrator.setPassword(passwordEncoder.encode(administrator.getPassword()));
        UserRepository.save(administrator);
    }
     public Optional<User> getCurrentUser() {
        String username = null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername(); // Or getMatricule() if your UserDetails implementation has it
        } else {
            username = principal.toString();
        }
        System.out.println("Retrieved matricule: " + username); // Debugging line
        return UserRepository.findByUsername(username);
    }

    
}
