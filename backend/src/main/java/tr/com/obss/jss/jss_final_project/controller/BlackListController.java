package tr.com.obss.jss.jss_final_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tr.com.obss.jss.jss_final_project.model.Seller;
import tr.com.obss.jss.jss_final_project.payload.response.MessageResponse;
import tr.com.obss.jss.jss_final_project.security.UserDetailsImpl;
import tr.com.obss.jss.jss_final_project.service.abstracts.BlackListService;

import java.util.List;

@RestController
@RequestMapping("/api/black-list")
public class BlackListController {
    private final BlackListService blackListService;

    @Autowired
    public BlackListController(BlackListService blackListService) {
        this.blackListService = blackListService;
    }

    @GetMapping("/add")
    @PreAuthorize("hasRole('USER')")
    ResponseEntity<?> addToBlacklist(@RequestParam("id") Integer sellerId) {
        return blackListService.addToBlackList(sellerId);
    }

    @GetMapping("/get")
    @PreAuthorize("hasRole('USER')")
    List<Seller> getBlackList() {

        return blackListService.getBlackList();
    }

    @GetMapping("/remove")
    @PreAuthorize("hasRole('USER')")
    ResponseEntity<?> removeFromBlackList(@RequestParam("id") Integer sellerId) {
        return blackListService.removeFromBlackList(sellerId);
    }
}
