package tr.com.obss.jss.jss_final_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jss.jss_final_project.model.EnumRole;
import tr.com.obss.jss.jss_final_project.model.Product;
import tr.com.obss.jss.jss_final_project.model.Role;
import tr.com.obss.jss.jss_final_project.model.User;
import tr.com.obss.jss.jss_final_project.payload.request.SignupRequest;
import tr.com.obss.jss.jss_final_project.service.abstracts.RoleService;
import tr.com.obss.jss.jss_final_project.service.abstracts.UserService;
import tr.com.obss.jss.jss_final_project.payload.response.MessageResponse;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UsersController {
    private final UserService userService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsersController(UserService userService, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/get-all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/remove")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> remove(@RequestParam("user-id") Integer id) {
        userService.deleteById(id);

        return ResponseEntity.ok("User removed from system");
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> add(@Valid @RequestBody SignupRequest signupRequest) {
        //TODO: Bunu ve auth controller'dakini user service'e al
        if (userService.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // Create new user's account
        User user = new User(signupRequest.getUsername(),
                passwordEncoder.encode(signupRequest.getPassword()));

        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleService.findByName(EnumRole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }
        else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "ADMIN":
                        Role adminRole = roleService.findByName(EnumRole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "USER":
                        Role userRole = roleService.findByName(EnumRole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);

                        break;
                }
            });
        }

        user.setRoles(roles);
        userService.save(user);

        return ResponseEntity.ok("User added to system");
    }
}
