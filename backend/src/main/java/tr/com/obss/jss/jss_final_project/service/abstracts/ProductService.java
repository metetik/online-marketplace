package tr.com.obss.jss.jss_final_project.service.abstracts;

import org.springframework.http.ResponseEntity;
import tr.com.obss.jss.jss_final_project.model.Product;
import tr.com.obss.jss.jss_final_project.payload.request.AddProductRequest;
import tr.com.obss.jss.jss_final_project.payload.response.MessageResponse;

import java.util.List;

public interface ProductService {
    List<Product> findAll();

    List<Product> findAll(int pageNo, int pageSize);

    Product getProductById(Integer id);

    // List<Product> getBySellerNotIn(List<Seller> sellers);

    List<Product> getAllByPageWithoutBlackList(int pageNo, int pageSize);

    List<Product> getFavoritesByUserId(Integer userId);

    void removeProductFromFavorites(Integer userId, Integer productId);

    ResponseEntity<?> addProduct(AddProductRequest addProductRequest);
}
