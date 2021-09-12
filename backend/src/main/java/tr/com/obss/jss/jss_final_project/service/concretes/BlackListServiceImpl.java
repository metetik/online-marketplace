package tr.com.obss.jss.jss_final_project.service.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.jss_final_project.model.Seller;
import tr.com.obss.jss.jss_final_project.model.User;
import tr.com.obss.jss.jss_final_project.payload.response.MessageResponse;
import tr.com.obss.jss.jss_final_project.security.UserDetailsImpl;
import tr.com.obss.jss.jss_final_project.service.abstracts.BlackListService;
import tr.com.obss.jss.jss_final_project.service.abstracts.SellerService;
import tr.com.obss.jss.jss_final_project.service.abstracts.UserService;

import java.util.List;

@Service
public class BlackListServiceImpl implements BlackListService {
    private final UserService userService;
    private final SellerService sellerService;

    @Autowired
    public BlackListServiceImpl(UserService userService, SellerService sellerService) {
        this.userService = userService;
        this.sellerService = sellerService;
    }

    @Override
    public ResponseEntity<?> addToBlackList(Integer sellerId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = userService.getById(userDetails.getId());

        Seller seller = sellerService.getSellerById(sellerId);

        if (!user.isBlackListContainsSeller(seller)) {
            user.addToBlackList(seller);

            userService.save(user);
        } else {
            throw new RuntimeException("seller is already in black list");
        }

        return ResponseEntity.ok(new MessageResponse("Product added to black list"));
    }

    @Override
    public List<Seller> getBlackList() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return sellerService.getBlackList(userDetails.getId());
    }

    @Override
    public ResponseEntity<?> removeFromBlackList(Integer sellerId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        sellerService.removeSellerFromBlackList(userDetails.getId(), sellerId);

        return ResponseEntity.ok(new MessageResponse("Seller removed from black list"));
    }
}
