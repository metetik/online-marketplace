package tr.com.obss.jss.jss_final_project.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.jss_final_project.model.Product;
import tr.com.obss.jss.jss_final_project.model.Seller;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Override
    List<Product> findAll();

    @Override
    Optional<Product> findById(Integer id);

    @Override
    Product getById(Integer id);

    @Override
    Product save(Product product);

    @Query(value = "select * from product where seller_id not in (select black_list_id from user_black_list where user_id = :user_id)",
            countQuery = "select count(*) from product where seller_id not in (select black_list_id from user_black_list where user_id = :user_id)",
            nativeQuery = true)
    List<Product> getProductsWithoutBlackList(@Param("user_id") Integer userId, Pageable pageable);

    @Query(value = "select * from product where id in (select favorite_list_id from user_favorite_list where user_id = :user_id)", nativeQuery = true)
    List<Product> getFavoritesByUserId(@Param("user_id") Integer userId);

    @Transactional
    @Modifying
    @Query(value = "delete from user_favorite_list where user_id = :user_id and favorite_list_id = :product_id", nativeQuery = true)
    void removeProductFromFavorites(@Param ("user_id") Integer userId, @Param("product_id") Integer productId);
}