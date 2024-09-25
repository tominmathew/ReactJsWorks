package com.react.loginpage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.react.loginpage.entity.AllLanguages;
import com.react.loginpage.repository.LanguageRepository;

@Service
public class LanguageService {
	
	@Autowired
	LanguageRepository languageRepository;

	public List<AllLanguages> getAllSkills() {
		// TODO Auto-generated method stub
		return languageRepository.findAll();
	}

}
