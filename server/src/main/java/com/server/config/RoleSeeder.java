package com.server.config;

import com.server.domain.entities.UserRole;
import com.server.domain.enums.UserRolesEnum;
import com.server.services.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class RoleSeeder implements ApplicationListener<ApplicationReadyEvent> {

    /**
     * This event is executed as late as conceivably possible to indicate that
     * the application is ready to service requests.
     */

    private final UserRoleService roleService;

    @Autowired
    public RoleSeeder(UserRoleService roleService) {
        this.roleService = roleService;
    }

    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        seedData();
    }

    private void seedData() {
        if(this.roleService.findAll().isEmpty()){

            for (UserRolesEnum role : UserRolesEnum.values()){
                UserRole userRole = new UserRole();
                userRole.setAuthority(role.name());
                this.roleService.saveRole(userRole);
            }
        }
    }
}