package com.react.loginpage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactAppController {
    
    @GetMapping(value = {"/", "/login", "/dashboard", "/register"})
    public String index() {
        return "forward:/index.html";
    }
}


