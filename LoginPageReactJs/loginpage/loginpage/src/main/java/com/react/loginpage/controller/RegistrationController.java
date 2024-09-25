package com.react.loginpage.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.react.loginpage.entity.AllLanguages;
import com.react.loginpage.entity.Skills;
import com.react.loginpage.request.RegistrationRequest;
import com.react.loginpage.service.LanguageService;
import com.react.loginpage.service.SkillsService;
import com.react.loginpage.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/register")
public class RegistrationController {

	@Autowired
	UserService userService;

	@Autowired
	SkillsService skillsService;

	@Autowired
	LanguageService languageService;

	@PostMapping("/save")
	public ResponseEntity<String> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {

		if (userService.existsByUsername(registrationRequest.getUsername())) {
			return new ResponseEntity<>("Error: Username is already taken!", HttpStatus.BAD_REQUEST);
		}

		userService.registerUser(registrationRequest);
		return new ResponseEntity<>("Registration Success", HttpStatus.CREATED);
	}

	@GetMapping("/skills")
	public ResponseEntity<List<Skills>> getAllSkills() {
		List<Skills> skills = skillsService.getAllSkills();
		return ResponseEntity.ok(skills);
	}

	@GetMapping("/languages")
	public ResponseEntity<List<AllLanguages>> getAllLanguages() {
		List<AllLanguages> language = languageService.getAllSkills();
		return ResponseEntity.ok(language);
	}

	@PutMapping("/update")
	public ResponseEntity<String> updateUser(@Valid @RequestBody RegistrationRequest registrationRequest) {

		if (userService.updateUser(registrationRequest) != null) {
			return new ResponseEntity<>("Update Success", HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>("Error: Password is incorrect", HttpStatus.BAD_REQUEST);
		}

	}

	@PutMapping("/delete")
	public ResponseEntity<String> deleteUser(@RequestBody Map<String, String> requestBody) {
		String username = requestBody.get("username");
		if (userService.existsByUsername(username)) {
			userService.deleteUser(username);
			return new ResponseEntity<>("Deletion Success", HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>("Error: No user found", HttpStatus.BAD_REQUEST);
		}
	}

}
