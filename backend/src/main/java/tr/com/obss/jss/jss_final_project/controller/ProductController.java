package tr.com.obss.jss.jss_final_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jss.jss_final_project.model.Product;
import tr.com.obss.jss.jss_final_project.model.Seller;
import tr.com.obss.jss.jss_final_project.payload.request.AddProductRequest;
import tr.com.obss.jss.jss_final_project.security.UserDetailsImpl;
import tr.com.obss.jss.jss_final_project.service.abstracts.BlackListService;
import tr.com.obss.jss.jss_final_project.service.abstracts.ProductService;
import tr.com.obss.jss.jss_final_project.service.abstracts.SellerService;
import tr.com.obss.jss.jss_final_project.service.abstracts.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/get-all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Product> findAll() {
        return productService.findAll();
    }

    @GetMapping("/get-all-by-page")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Product> findAll(@RequestParam("page-no") int pageNo,@RequestParam("page-size") int pageSize) {
        return productService.findAll(pageNo, pageSize);
    }
    @GetMapping("/get-all-by-page-contains")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Product> findAll(@RequestParam("page-no") int pageNo,
                                 @RequestParam("page-size") int pageSize,
                                 @RequestParam("query-word") String queryWord) {
        return productService.findAll(pageNo, pageSize, queryWord);
    }

    @GetMapping("/get")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Product getProductById(@RequestParam("id") Integer id) {
        return productService.getProductById(id);
    }

    @GetMapping("/get-all-by-page-without-blacklist")
    @PreAuthorize("hasRole('USER')")
    public List<Product> getAllByPageWithoutBlackList(@RequestParam("page-no") int pageNo, @RequestParam("page-size") int pageSize) {
        return productService.getAllByPageWithoutBlackList(pageNo,pageSize);
    }

    @GetMapping("/get-all-by-page-without-blacklist-contains")
    @PreAuthorize("hasRole('USER')")
    public List<Product> getAllByPageWithoutBlackList(@RequestParam("page-no") int pageNo,
                                                      @RequestParam("page-size") int pageSize,
                                                      @RequestParam("query-word") String queryWord) {
        return productService.getAllByPageWithoutBlackList(pageNo,pageSize,queryWord);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addProduct(@RequestBody AddProductRequest addProductRequest) {
        return productService.addProduct(addProductRequest);
    }

    @GetMapping("/remove")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> removeProduct(@RequestParam("id") Integer productId) {
        return productService.removeProduct(productId);
    }
}
