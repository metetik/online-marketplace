package tr.com.obss.jss.jss_final_project.service.abstracts;

import tr.com.obss.jss.jss_final_project.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAll();

    List<Product> findAll(int pageNo, int pageSize);

    Product getProductById(Integer id);
}
