package tr.com.obss.jss.jss_final_project.service.abstracts;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import tr.com.obss.jss.jss_final_project.model.Seller;
import tr.com.obss.jss.jss_final_project.model.User;
import tr.com.obss.jss.jss_final_project.payload.request.SignupRequest;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

public interface UserService {
   Optional<User> findByUsername(String username);

   User getById(Integer id);

   Boolean existsByUsername(String username);

   User save(User user);

   void deleteById(Integer id);

   List<User> findAll();

   ResponseEntity<?> add(SignupRequest signupRequest);
}
