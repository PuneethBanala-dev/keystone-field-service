package com.zidio.keystone.keystone_backend.controller;

import com.zidio.keystone.keystone_backend.dto.AuthResponse;
import com.zidio.keystone.keystone_backend.dto.LoginRequest;
import com.zidio.keystone.keystone_backend.dto.RegisterRequest;
import com.zidio.keystone.keystone_backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}