package tr.com.obss.jss.jss_final_project.service.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.jss_final_project.model.Seller;
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
    public List<Seller> findAll() {
        return sellerRepository.findAll();
    }

    @Override
    public List<Seller> getBlackList(Integer userId) {
        return sellerRepository.getBlackList(userId);
    }

    @Override
    public void removeSellerFromBlackList(Integer userId, Integer sellerId) {
        sellerRepository.removeProductFromFavorites(userId, sellerId);
    }
}
