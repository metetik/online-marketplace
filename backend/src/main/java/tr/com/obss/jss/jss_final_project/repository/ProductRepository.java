package tr.com.obss.jss.jss_final_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.jss_final_project.model.Product;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Override
    List<Product> findAll();

    @Override
    Optional<Product> findById(Integer id);

    @Override
    Product save(Product product);
}