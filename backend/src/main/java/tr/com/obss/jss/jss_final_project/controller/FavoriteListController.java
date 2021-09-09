package tr.com.obss.jss.jss_final_project.controller;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jss.jss_final_project.security.UserDetailsImpl;
import tr.com.obss.jss.jss_final_project.service.abstracts.FavoriteListService;
import tr.com.obss.jss.jss_final_project.service.abstracts.UserService;
import tr.com.obss.jss.jss_final_project.payload.response.MessageResponse;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/api/favorite-list")
public class FavoriteListController {
    // private UserService userService;
    private FavoriteListService favoriteListService;

    @Autowired
    public FavoriteListController(FavoriteListService favoriteListService) {
        this.favoriteListService = favoriteListService;
    }

    @GetMapping("/add")
    @PreAuthorize("hasRole('USER')")
    ResponseEntity<?> addToFavoriteList(@RequestParam("id") Integer productId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        System.out.println("User: " + userDetails.getId());

        favoriteListService.addToFavoriteList(userDetails.getId(), productId);

        return ResponseEntity.ok(new MessageResponse("Product added to favorites"));
    }
}
