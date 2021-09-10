package tr.com.obss.jss.jss_final_project.service.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.jss_final_project.model.Seller;
import tr.com.obss.jss.jss_final_project.model.User;
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
    public void addToBlackList(Integer userId, Integer sellerId) {
        User user = userService.getById(userId);

        Seller seller = sellerService.getSellerById(sellerId);

        if (!user.isBlackListContainsSeller(seller)) {
            user.addToBlackList(seller);

            userService.save(user);
        } else {
            throw new RuntimeException("seller is already in black list");
        }
    }

    @Override
    public List<Seller> getBlackList(Integer userId) {
        return sellerService.getBlackList(userId);
    }

    @Override
    public void removeFromBlackList(Integer userId, Integer sellerId) {
        sellerService.removeSellerFromBlackList(userId, sellerId);
    }
}
