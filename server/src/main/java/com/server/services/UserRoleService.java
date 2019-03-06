package com.server.services;

import com.server.domain.entities.UserRole;

import java.util.List;

public interface UserRoleService {
    List<UserRole> findAll ();
    void saveRole(UserRole role);
    UserRole findOneByAuthority(String name);
}
