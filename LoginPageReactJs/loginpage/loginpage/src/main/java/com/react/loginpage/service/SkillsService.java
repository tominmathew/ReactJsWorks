package com.react.loginpage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.react.loginpage.entity.Skills;
import com.react.loginpage.repository.SkillsRepository;

@Service
public class SkillsService {

	@Autowired
	SkillsRepository skillsRepository;
	
	public List<Skills> getAllSkills() {
		// TODO Auto-generated method stub
		return skillsRepository.findAll();
	}
}
