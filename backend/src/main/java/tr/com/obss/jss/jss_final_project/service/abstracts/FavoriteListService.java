package tr.com.obss.jss.jss_final_project.service.abstracts;

import org.springframework.stereotype.Service;

public interface FavoriteListService {
    void addToFavoriteList(Integer userId, Integer productId);
}
