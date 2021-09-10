package tr.com.obss.jss.jss_final_project.service.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.jss_final_project.model.Product;
import tr.com.obss.jss.jss_final_project.model.Seller;
import tr.com.obss.jss.jss_final_project.model.User;
import tr.com.obss.jss.jss_final_project.repository.ProductRepository;
import tr.com.obss.jss.jss_final_project.security.UserDetailsImpl;
import tr.com.obss.jss.jss_final_project.service.abstracts.BlackListService;
import tr.com.obss.jss.jss_final_project.service.abstracts.ProductService;
import tr.com.obss.jss.jss_final_project.service.abstracts.UserService;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final UserService userService;
    private final BlackListService blackListService;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, UserService userService, BlackListService blackListService) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.blackListService = blackListService;
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> findAll(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo-1, pageSize);

        return productRepository.findAll(pageable).getContent();
    }

    @Override
    public Product getProductById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Product is not found."));
    }

    @Override
    public List<Product> getAllByPageWithoutBlackList(int pageNo, int pageSize) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Pageable pageable = PageRequest.of(pageNo-1, pageSize);

        List<Product> productsWithoutBlackList = productRepository.getProductsWithoutBlackList(userDetails.getId(), pageable);

        return productsWithoutBlackList;
    }

    @Override
    public List<Product> getFavoritesByUserId(Integer userId) {
        return productRepository.getFavoritesByUserId(userId);
    }

    @Override
    public void removeProductFromFavorites(Integer userId, Integer productId) {
        productRepository.removeProductFromFavorites(userId, productId);
    }
}
