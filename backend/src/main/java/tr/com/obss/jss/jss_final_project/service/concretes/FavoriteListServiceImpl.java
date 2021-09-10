package tr.com.obss.jss.jss_final_project.service.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.jss_final_project.model.Product;
import tr.com.obss.jss.jss_final_project.model.User;
import tr.com.obss.jss.jss_final_project.service.abstracts.FavoriteListService;
import tr.com.obss.jss.jss_final_project.service.abstracts.ProductService;
import tr.com.obss.jss.jss_final_project.service.abstracts.UserService;

import java.util.List;

@Service
public class FavoriteListServiceImpl implements FavoriteListService {
    private final UserService userService;
    private final ProductService productService;

    @Autowired
    public FavoriteListServiceImpl(UserService userService, ProductService productService) {
        this.userService = userService;
        this.productService = productService;
    }

    @Override
    public void addToFavoriteList(Integer userId, Integer productId) {
        User user = userService.getById(userId);

        Product product = productService.getProductById(productId);

        if (!user.isFavoriteListContainsProduct(product)) {
            user.addToFavoriteList(product);

            userService.save(user);
        } else {
            throw new RuntimeException("seller is already in black list");
        }
    }

    @Override
    public List<Product> getProductsByUser(Integer userId) {
        return productService.getFavoritesByUserId(userId);
    }

    @Override
    public void removeFromFavoriteList(Integer userId, Integer productId) {
        productService.removeProductFromFavorites(userId, productId);
    }
}
