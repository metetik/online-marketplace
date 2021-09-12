package tr.com.obss.jss.jss_final_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.jss_final_project.model.Product;
import tr.com.obss.jss.jss_final_project.model.Seller;
import tr.com.obss.jss.jss_final_project.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    User save(User user);

    void deleteById(Integer id);

    List<User> findAll();
}
