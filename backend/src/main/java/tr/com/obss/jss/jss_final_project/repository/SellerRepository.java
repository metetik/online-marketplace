package tr.com.obss.jss.jss_final_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.jss_final_project.model.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Integer> {

}
