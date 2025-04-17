package com.example.MinTodoApp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;


@Configuration
public class SecurityConfig {

    private final CorsConfigurationSource corsConfigurationSource;

    public SecurityConfig(CorsConfigurationSource corsConfigurationSource) {
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/**").permitAll()
                .requestMatchers("/todo/**", "/user", "/user/register", "/user/login", "/create", "/userTodos/**", "/user/**", "/todo/create", "/todo/user/**","/todo/register", "/todo/login", "/h2-console/**").permitAll()
                .anyRequest().authenticated()
            )
            // Since we're using a custom RESTful login, disable default form login.
            .formLogin(form -> form.disable())
            .logout(logout -> logout
                .logoutUrl("/todo/logout")
                .logoutSuccessUrl("/todo/login")
                .permitAll()
            )
            .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))
            // Ensure that the SecurityContext is stored in the session.
            .securityContext(securityContext -> securityContext
                .securityContextRepository(new HttpSessionSecurityContextRepository())
            );
            return http.build();
    }
}
