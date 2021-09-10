package tr.com.obss.jss.jss_final_project.service.abstracts;

import tr.com.obss.jss.jss_final_project.model.Seller;

import java.util.List;

public interface BlackListService {
    void addToBlackList(Integer userId, Integer productId);

    List<Seller> getBlackList(Integer userId);

    void removeFromBlackList(Integer userId, Integer sellerId);
}
