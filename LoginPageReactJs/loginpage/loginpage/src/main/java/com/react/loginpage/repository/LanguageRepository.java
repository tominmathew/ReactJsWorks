package com.react.loginpage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.react.loginpage.entity.AllLanguages;

public interface LanguageRepository extends JpaRepository<AllLanguages, Integer> {

}
