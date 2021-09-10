package tr.com.obss.jss.jss_final_project.service.abstracts;

import tr.com.obss.jss.jss_final_project.model.Seller;
import tr.com.obss.jss.jss_final_project.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
   Optional<User> findByUsername(String username);

   User getById(Integer id);

   Boolean existsByUsername(String username);

   User save(User user);

   void deleteById(String id);

   List<User> findAll();
}
