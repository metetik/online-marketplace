package tr.com.obss.jss.jss_final_project.service.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import tr.com.obss.jss.jss_final_project.model.EnumRole;
import tr.com.obss.jss.jss_final_project.model.Role;
import tr.com.obss.jss.jss_final_project.model.User;
import tr.com.obss.jss.jss_final_project.payload.request.LoginRequest;
import tr.com.obss.jss.jss_final_project.payload.request.SignupRequest;
import tr.com.obss.jss.jss_final_project.payload.response.JwtResponse;
import tr.com.obss.jss.jss_final_project.payload.response.MessageResponse;
import tr.com.obss.jss.jss_final_project.security.JwtUtils;
import tr.com.obss.jss.jss_final_project.security.UserDetailsImpl;
import tr.com.obss.jss.jss_final_project.service.abstracts.AuthService;
import tr.com.obss.jss.jss_final_project.service.abstracts.RoleService;
import tr.com.obss.jss.jss_final_project.service.abstracts.UserService;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {
	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;
	private final UserService userService;
	private final PasswordEncoder passwordEncoder;
	private final RoleService roleService;


	@Autowired
	public AuthServiceImpl(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserService userService, PasswordEncoder passwordEncoder, RoleService roleService) {
		this.authenticationManager = authenticationManager;
		this.jwtUtils = jwtUtils;
		this.userService = userService;
		this.passwordEncoder = passwordEncoder;
		this.roleService = roleService;
	}

	public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(token, userDetails.getId(), userDetails.getUsername(), roles));
	}

	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
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

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

}
