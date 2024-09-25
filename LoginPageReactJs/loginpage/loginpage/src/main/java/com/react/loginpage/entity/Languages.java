package com.react.loginpage.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Languages {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@Column(nullable = false)
	String language;
	
	private Boolean speak;
	
	private Boolean write;
	
	private Boolean listen;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}
	
	public Boolean getSpeak() {
		return speak;
	}

	public void setSpeak(Boolean speak) {
		this.speak = speak;
	}

	public Boolean getWrite() {
		return write;
	}

	public void setWrite(Boolean write) {
		this.write = write;
	}

	public Boolean getListen() {
		return listen;
	}

	public void setListen(Boolean listen) {
		this.listen = listen;
	}

	public Languages() {	
	}

	public Languages(@JsonProperty("language") String language, @JsonProperty("speak") Boolean speak, 
			@JsonProperty("write") Boolean write, @JsonProperty("listen") Boolean listen) {
		this.language = language;
		this.speak = speak;
		this.write = write;
		this.listen = listen;
	}
	
	

	
}
