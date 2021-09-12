package tr.com.obss.jss.jss_final_project.service.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.jss_final_project.model.Seller;
import tr.com.obss.jss.jss_final_project.payload.request.AddSellerRequest;
import tr.com.obss.jss.jss_final_project.payload.response.MessageResponse;
import tr.com.obss.jss.jss_final_project.repository.SellerRepository;
import tr.com.obss.jss.jss_final_project.service.abstracts.SellerService;

import java.util.List;

@Service
public class SellerServiceImpl implements SellerService {
    private final SellerRepository sellerRepository;

    @Autowired
    public SellerServiceImpl(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    @Override
    public Seller getSellerById(Integer id) {
        return sellerRepository.getById(id);
    }

    @Override
    public Seller getByName(String name) {
        return sellerRepository.getByName(name);
    }

    @Override
    public List<Seller> findAll() {
        return sellerRepository.findAll();
    }

    @Override
    public Boolean existsByName(String name) {
        return sellerRepository.existsByName(name);
    }

    @Override
    public List<Seller> getBlackList(Integer userId) {
        return sellerRepository.getBlackList(userId);
    }

    @Override
    public void removeSellerFromBlackList(Integer userId, Integer sellerId) {
        sellerRepository.removeProductFromFavorites(userId, sellerId);
    }

    @Override
    public ResponseEntity<?> deleteById(Integer id) {
        sellerRepository.deleteById(id);

        return ResponseEntity.ok("Seller removed from system");
    }

    @Override
    public ResponseEntity<?> addSeller(AddSellerRequest addSellerRequest) {
        if (sellerRepository.existsByName(addSellerRequest.getName())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Seller name is already taken!"));
        }

        sellerRepository.save(new Seller(addSellerRequest.getName()));

        return ResponseEntity.ok("Seller added to system");
    }
}
