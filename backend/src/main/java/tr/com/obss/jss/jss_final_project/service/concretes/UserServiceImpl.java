package tr.com.obss.jss.jss_final_project.service.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.jss_final_project.model.User;
import tr.com.obss.jss.jss_final_project.repository.UserRepository;
import tr.com.obss.jss.jss_final_project.service.abstracts.UserService;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public  Boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteById(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
