package com.server.services;

import com.server.domain.models.UserRegisterBindingModel;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    boolean register(UserRegisterBindingModel model);
}
