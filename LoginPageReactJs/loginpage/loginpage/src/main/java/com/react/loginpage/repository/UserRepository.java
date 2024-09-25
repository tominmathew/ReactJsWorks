package com.react.loginpage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.react.loginpage.entity.Users;

public interface UserRepository extends JpaRepository<Users, Long> {

	Users findByUsernameAndPassword(String username, String password);
	
	Users findByUsername(String username);
	
	boolean existsByUsername(String username);
}
