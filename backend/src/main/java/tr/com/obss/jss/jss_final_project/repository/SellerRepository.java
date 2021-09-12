package tr.com.obss.jss.jss_final_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.jss_final_project.model.Seller;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Integer> {
    @Query(value = "select * from seller where id in (select black_list_id from user_black_list where user_id = :user_id)"
            , nativeQuery = true)
    List<Seller> getBlackList(@Param("user_id") Integer userId);

    @Transactional
    @Modifying
    @Query(value = "delete from user_black_list where user_id = :user_id and black_list_id = :seller_id", nativeQuery = true)
    void removeProductFromFavorites(@Param ("user_id") Integer userId, @Param("seller_id") Integer sellerId);

    void deleteById(Integer id);

    Boolean existsByName(String name);

    Seller getByName(String name);

    @Override
    Seller save(Seller seller);
}
