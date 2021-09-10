package tr.com.obss.jss.jss_final_project.service.abstracts;

import tr.com.obss.jss.jss_final_project.model.Seller;

import java.util.List;

public interface SellerService {
    List<Seller> findAll();

    Seller getSellerById(Integer id);

    List<Seller> getBlackList(Integer userId);

    void removeSellerFromBlackList(Integer userId, Integer sellerId);
}
