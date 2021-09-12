package tr.com.obss.jss.jss_final_project.service.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.jss_final_project.model.Product;
import tr.com.obss.jss.jss_final_project.model.Seller;
import tr.com.obss.jss.jss_final_project.payload.request.AddProductRequest;
import tr.com.obss.jss.jss_final_project.payload.response.MessageResponse;
import tr.com.obss.jss.jss_final_project.repository.ProductRepository;
import tr.com.obss.jss.jss_final_project.security.UserDetailsImpl;
import tr.com.obss.jss.jss_final_project.service.abstracts.BlackListService;
import tr.com.obss.jss.jss_final_project.service.abstracts.ProductService;
import tr.com.obss.jss.jss_final_project.service.abstracts.SellerService;
import tr.com.obss.jss.jss_final_project.service.abstracts.UserService;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final UserService userService;
    private final BlackListService blackListService;
    private final SellerService sellerService;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository,
                              UserService userService,
                              BlackListService blackListService,
                              SellerService sellerService) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.blackListService = blackListService;
        this.sellerService = sellerService;
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
    public List<Product> findAll(int pageNo, int pageSize, String queryWord) {
        Pageable pageable = PageRequest.of(pageNo-1, pageSize);

        return productRepository.findAllByNameContains(queryWord,pageable).getContent();
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
    public List<Product> getAllByPageWithoutBlackList(int pageNo, int pageSize, String queryWord) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Pageable pageable = PageRequest.of(pageNo-1, pageSize);

        List<Product> productsWithoutBlackList = productRepository.getProductsWithoutBlackList(userDetails.getId(), queryWord, pageable);

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

    @Override
    public ResponseEntity<?> addProduct(AddProductRequest addProductRequest) {
        if (!sellerService.existsByName(addProductRequest.getSellerName())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Seller not found"));
        }
        Seller seller = sellerService.getByName(addProductRequest.getSellerName());

        Product product = new Product(addProductRequest.getProductName(), seller);

        productRepository.save(product);

        return ResponseEntity.ok("Product added to system!");
    }

    @Override
    public ResponseEntity<?> removeProduct(Integer productId) {
        productRepository.deleteById(productId);

        return ResponseEntity.ok("Product removed from system!");
    }
}
