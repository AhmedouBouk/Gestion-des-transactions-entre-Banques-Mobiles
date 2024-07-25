// src/main/java/com/example/gestiontransactionbackend/controller/UserController.java
package com.example.gestiontransactionbackend.controller;

import com.example.gestiontransactionbackend.model.User;
import com.example.gestiontransactionbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.findByUsername(username);
    }
}
