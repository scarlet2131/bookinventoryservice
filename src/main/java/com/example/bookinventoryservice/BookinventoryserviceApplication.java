package com.example.bookinventoryservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
@Configuration
public class BookinventoryserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookinventoryserviceApplication.class, args);
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000"); // Allow requests from localhost:3000
        config.addAllowedMethod("*");                     // Allow all HTTP methods (GET, POST, etc.)
        config.addAllowedHeader("*");                     // Allow all headers
        config.setAllowCredentials(true);                 // Allow credentials (optional, use only if needed)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Apply CORS settings to all paths
        return new CorsFilter(source);
    }

}
