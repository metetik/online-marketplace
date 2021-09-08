package tr.com.obss.jss.jss_final_project.service.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.jss_final_project.model.Product;
import tr.com.obss.jss.jss_final_project.repository.ProductRepository;
import tr.com.obss.jss.jss_final_project.service.abstracts.ProductService;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
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
}
