package tr.com.obss.jss.jss_final_project.service.abstracts;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import tr.com.obss.jss.jss_final_project.payload.request.LoginRequest;
import tr.com.obss.jss.jss_final_project.payload.request.SignupRequest;

import javax.validation.Valid;

public interface AuthService {
	ResponseEntity<?> authenticateUser(LoginRequest loginRequest);

	ResponseEntity<?> registerUser(SignupRequest signupRequest);
}
