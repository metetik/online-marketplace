package tr.com.obss.jss.jss_final_project.controller;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jss.jss_final_project.model.Product;
import tr.com.obss.jss.jss_final_project.security.UserDetailsImpl;
import tr.com.obss.jss.jss_final_project.service.abstracts.FavoriteListService;
import tr.com.obss.jss.jss_final_project.service.abstracts.UserService;
import tr.com.obss.jss.jss_final_project.payload.response.MessageResponse;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@RequestMapping("/api/favorite-list")
public class FavoriteListController {
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

        favoriteListService.addToFavoriteList(userDetails.getId(), productId);

        return ResponseEntity.ok(new MessageResponse("Product added to favorites"));
    }

    @GetMapping("/get-favorites")
    @PreAuthorize("hasRole('USER')")
    List<Product> getFavoriteList() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return favoriteListService.getProductsByUser(userDetails.getId());
    }

    @GetMapping("/remove")
    @PreAuthorize("hasRole('USER')")
    ResponseEntity<?> removeFromFavoriteList(@RequestParam("id") Integer productId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        favoriteListService.removeFromFavoriteList(userDetails.getId(), productId);

        return ResponseEntity.ok(new MessageResponse("Product removed from favorites"));
    }
}
