package tr.com.obss.jss.jss_final_project.service.abstracts;

import tr.com.obss.jss.jss_final_project.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAll();

    Product getProductById(Integer id);
}
