package com.server.services;

import com.server.domain.entities.User;
import com.server.domain.entities.UserRole;
import com.server.domain.models.UserRegisterBindingModel;
import com.server.repositories.UserRepository;
import com.server.repositories.UserRoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final ModelMapper modelMapper;
    private final UserRoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder encoder, ModelMapper modelMapper, UserRoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.modelMapper = modelMapper;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return this.userRepository.getFirstByUsername(s);
    }


    @Override
    public boolean register(UserRegisterBindingModel model) {
        model.setPassword(encoder.encode(model.getPassword()));
        User user = this.modelMapper.map(model,User.class);
        UserRole role = this.roleRepository.getFirstByAuthority("USER");
        user.getAuthorities().add(role);

        User returnedUser = this.userRepository.saveAndFlush(user);

        return this.modelMapper.map(returnedUser,UserRegisterBindingModel.class) != null;
    }
}