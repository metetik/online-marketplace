package tr.com.obss.jss.jss_final_project.service.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.jss_final_project.model.EnumRole;
import tr.com.obss.jss.jss_final_project.model.Role;
import tr.com.obss.jss.jss_final_project.repository.RoleRepository;
import tr.com.obss.jss.jss_final_project.service.abstracts.RoleService;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {
    private RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Optional<Role> findByName(EnumRole role) {
        return this.roleRepository.findByName(role);
    }
}
