package com.react.loginpage.service;

import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.react.loginpage.entity.Languages;
import com.react.loginpage.entity.Skills;
import com.react.loginpage.entity.Users;
import com.react.loginpage.repository.SkillsRepository;
import com.react.loginpage.repository.UserRepository;
import com.react.loginpage.request.RegistrationRequest;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	SkillsRepository skillsRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	public Boolean login(String username, String password) {
		Users user = userRepository.findByUsername(username);
		if (user != null) {
			return passwordEncoder.matches(password, user.getPassword());
		}
		return false;
	}

	public Users userData(String username) {
		Users user = userRepository.findByUsername(username);
		if (user != null) {
			return user;
		} else {
			return null;
		}
	}

	public Boolean existsByUsername(String username) {
		return userRepository.existsByUsername(username);
	}

	public Users registerUser(RegistrationRequest registrationRequest) {
		Users user = new Users();
		user.setFirstName(registrationRequest.getFirstName());
		user.setMiddleName(registrationRequest.getMiddleName());
		user.setLastName(registrationRequest.getLastName());
		user.setUsername(registrationRequest.getUsername());
		user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
		user.setEmailId(registrationRequest.getEmailId());
		user.setAddress(registrationRequest.getAddress());
		user.setGender(registrationRequest.getGender());
		user.setExperience(registrationRequest.getExperience());
		user.setSignature(registrationRequest.getSignature());

		if (registrationRequest.getSkills() != null) {
			Set<Skills> skills = registrationRequest.getSkills().stream()
					.map(skillId -> skillsRepository.findById(skillId).orElse(null)).filter(Objects::nonNull)
					.collect(Collectors.toSet());
			user.setSkills(skills);
		}

		if (registrationRequest.getLanguages() != null) {
			Set<Languages> languages = registrationRequest.getLanguages();
			user.setLanguages(languages);
		}

		return userRepository.save(user);

	}

	public Users updateUser(RegistrationRequest registrationRequest) {
		Users user = userRepository.findByUsername(registrationRequest.getUsername());
		
		String password = registrationRequest.getPassword();
		
		if (passwordEncoder.matches(password, user.getPassword())) {
			user.setFirstName(registrationRequest.getFirstName());
			user.setMiddleName(registrationRequest.getMiddleName());
			user.setLastName(registrationRequest.getLastName());
			user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
			user.setEmailId(registrationRequest.getEmailId());
			user.setAddress(registrationRequest.getAddress());
			user.setGender(registrationRequest.getGender());
			user.setExperience(registrationRequest.getExperience());
			user.setSignature(registrationRequest.getSignature());
			if (registrationRequest.getSkills() != null) {
				Set<Skills> skills = registrationRequest.getSkills().stream()
						.map(skillId -> skillsRepository.findById(skillId).orElse(null)).filter(Objects::nonNull)
						.collect(Collectors.toSet());
				user.setSkills(skills);
			}

			if (registrationRequest.getLanguages() != null) {
				Set<Languages> languages = registrationRequest.getLanguages();
				user.setLanguages(languages);
			}

			return userRepository.save(user);

		} else {
			return null;
		}
	}

	public void deleteUser(String username) {
		Users user = userRepository.findByUsername(username);
		userRepository.deleteById(user.getId());
	}
}