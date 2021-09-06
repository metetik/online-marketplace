package tr.com.obss.jss.jss_final_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.jss_final_project.model.EnumRole;
import tr.com.obss.jss.jss_final_project.model.Role;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(EnumRole name);
}
