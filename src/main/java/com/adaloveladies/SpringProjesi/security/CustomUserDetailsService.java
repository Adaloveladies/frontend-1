package com.adaloveladies.SpringProjesi.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final KullaniciRepository kullaniciRepository;

    public CustomUserDetailsService(KullaniciRepository kullaniciRepository) {
        this.kullaniciRepository = kullaniciRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String normalized = username.trim().toLowerCase();
        Kullanici kullanici = kullaniciRepository.findByUsername(normalized)
                .orElseGet(() -> kullaniciRepository.findByEmail(normalized)
                        .orElseThrow(() -> new UsernameNotFoundException("Kullanıcı bulunamadı: " + username)));

        List<SimpleGrantedAuthority> authorities = kullanici.getRoller().stream()
                .map(rol -> new SimpleGrantedAuthority(rol.getAd()))
                .collect(Collectors.toList());

        return User.builder()
                .username(kullanici.getUsername())
                .password(kullanici.getPassword())
                .authorities(authorities)
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(!kullanici.isActive())
                .build();
    }
} 