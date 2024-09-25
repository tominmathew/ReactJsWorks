package com.react.loginpage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.react.loginpage.request.LoginRequest;
import com.react.loginpage.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/login")
public class LoginController {

	@Autowired
	UserService userService;

	@PostMapping
	public ResponseEntity<String> logingIn(@Valid @RequestBody LoginRequest loginRequest) {
		if (userService.login(loginRequest.getUsername(), loginRequest.getPassword())) {
			return ResponseEntity.ok("Login successful");
		} else {
			return ResponseEntity.status(401).body("Invalid username or password");
		}
	}
}
