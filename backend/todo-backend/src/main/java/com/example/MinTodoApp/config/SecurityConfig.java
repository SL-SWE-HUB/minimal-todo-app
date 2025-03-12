package com.example.MinTodoApp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())// Disable CSRF using the new lanbda
        .authorizeHttpRequests(authorize -> authorize // Configuring request authorization with requestMatchers()
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow all OPTIONS requests
            .requestMatchers(HttpMethod.GET, "/todo/**").permitAll() // Allow public GET requests
            .requestMatchers(HttpMethod.DELETE, "/todo/**").permitAll()
            .requestMatchers(HttpMethod.PUT, "/todo/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/todo/**", "/todo/register", "/todo/login").permitAll() // Allow public access to POST auth endpoints 
            .anyRequest().authenticated()
        )
        .httpBasic(httpBasic -> {}); // Empty httpBasic lambda to enable http basic authentication 
        return http.build();
    }
}
