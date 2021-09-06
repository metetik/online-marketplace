package tr.com.obss.jss.jss_final_project.controller;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tr.com.obss.jss.jss_final_project.service.abstracts.UserService;
import tr.com.obss.jss.jss_final_project.payload.response.MessageResponse;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/api/favorite-list")
@AllArgsConstructor
public class FavoriteListController {
    private UserService userService;

    @GetMapping
    MessageResponse favoriteListPage() {
        return new MessageResponse("Welcome to favorite list page");
    }
}
