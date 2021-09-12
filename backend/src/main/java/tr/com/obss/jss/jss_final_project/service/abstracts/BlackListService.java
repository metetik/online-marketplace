package tr.com.obss.jss.jss_final_project.service.abstracts;

import org.springframework.http.ResponseEntity;
import tr.com.obss.jss.jss_final_project.model.Seller;

import java.util.List;

public interface BlackListService {
    ResponseEntity<?> addToBlackList(Integer sellerId);

    List<Seller> getBlackList();

    ResponseEntity<?> removeFromBlackList(Integer sellerId);
}
