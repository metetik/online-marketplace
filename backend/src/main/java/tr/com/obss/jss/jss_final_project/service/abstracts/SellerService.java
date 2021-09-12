package tr.com.obss.jss.jss_final_project.service.abstracts;

import org.springframework.http.ResponseEntity;
import tr.com.obss.jss.jss_final_project.model.Seller;
import tr.com.obss.jss.jss_final_project.payload.request.AddSellerRequest;

import java.util.List;

public interface SellerService {
    List<Seller> findAll();

    Boolean existsByName(String name);

    Seller getByName(String name);

    Seller getSellerById(Integer id);

    List<Seller> getBlackList(Integer userId);

    void removeSellerFromBlackList(Integer userId, Integer sellerId);

    ResponseEntity<?> deleteById(Integer id);

    ResponseEntity<?> addSeller(AddSellerRequest addSellerRequest);
}
