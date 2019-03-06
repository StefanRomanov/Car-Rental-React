package com.server.services;

import com.server.domain.entities.UserRole;
import com.server.repositories.UserRoleRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserRoleServiceImpl implements UserRoleService {

    private final UserRoleRepository userRoleRepository;

    public UserRoleServiceImpl(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    @Override
    public List<UserRole> findAll() {
        return this.userRoleRepository.findAll();
    }

    @Override
    public void saveRole(UserRole role) {
        this.userRoleRepository.saveAndFlush(role);
    }

    @Override
    public UserRole findOneByAuthority(String name) {
        return this.userRoleRepository.getFirstByAuthority(name);
    }
}
