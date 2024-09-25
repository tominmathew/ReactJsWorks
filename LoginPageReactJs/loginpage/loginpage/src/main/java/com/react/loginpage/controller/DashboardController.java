package com.react.loginpage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.react.loginpage.entity.Users;
import com.react.loginpage.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
	
	@Autowired
	UserService userService;

	@GetMapping("/userdata")
	public ResponseEntity<Users> getUserData(@Valid @RequestParam String username){
		Users user = userService.userData(username);
		return ResponseEntity.ok(user);
	}
	
}
