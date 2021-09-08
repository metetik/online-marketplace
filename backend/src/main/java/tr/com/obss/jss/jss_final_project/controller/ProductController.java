package tr.com.obss.jss.jss_final_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tr.com.obss.jss.jss_final_project.model.Product;
import tr.com.obss.jss.jss_final_project.service.abstracts.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    private ProductService productService;

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

    @GetMapping("/get")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Product getProductById(@RequestParam("id") Integer id) {
        Product p = productService.getProductById(id);

        return p;
    }
}
