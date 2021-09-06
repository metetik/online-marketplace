package tr.com.obss.jss.jss_final_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tr.com.obss.jss.jss_final_project.service.abstracts.UserService;
import tr.com.obss.jss.jss_final_project.payload.response.MessageResponse;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    private UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    MessageResponse usersPage() {
        return new MessageResponse("Welcome to users page");
    }
}
