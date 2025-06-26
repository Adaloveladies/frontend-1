package com.adaloveladies.SpringProjesi.config;

import com.adaloveladies.SpringProjesi.model.Rol;
import com.adaloveladies.SpringProjesi.repository.RolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final RolRepository rolRepository;

    @Override
    public void run(String... args) {
        if (!rolRepository.findByAd("ROLE_USER").isPresent()) {
            Rol userRole = Rol.builder()
                    .ad("ROLE_USER")
                    .aciklama("Standart kullanıcı rolü")
                    .build();
            rolRepository.save(userRole);
        }
        if (!rolRepository.findByAd("ROLE_ADMIN").isPresent()) {
            Rol adminRole = Rol.builder()
                    .ad("ROLE_ADMIN")
                    .aciklama("Yönetici rolü")
                    .build();
            rolRepository.save(adminRole);
        }
    }
} 