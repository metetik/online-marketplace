package tr.com.obss.jss.jss_final_project.service.abstracts;

import tr.com.obss.jss.jss_final_project.model.EnumRole;
import tr.com.obss.jss.jss_final_project.model.Role;
import java.util.Optional;

public interface RoleService {
    Optional<Role> findByName(EnumRole role);
}
