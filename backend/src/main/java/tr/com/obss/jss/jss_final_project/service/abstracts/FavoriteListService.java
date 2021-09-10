package tr.com.obss.jss.jss_final_project.service.abstracts;

import tr.com.obss.jss.jss_final_project.model.Product;

import java.util.List;

public interface FavoriteListService {
    void addToFavoriteList(Integer userId, Integer productId);

    List<Product> getProductsByUser(Integer userId);

    void removeFromFavoriteList(Integer userId, Integer productId);
}
