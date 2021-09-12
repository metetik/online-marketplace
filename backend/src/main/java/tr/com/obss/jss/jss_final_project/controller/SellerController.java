package tr.com.obss.jss.jss_final_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jss.jss_final_project.model.Seller;
import tr.com.obss.jss.jss_final_project.payload.request.AddSellerRequest;
import tr.com.obss.jss.jss_final_project.service.abstracts.SellerService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET})
@RestController
@RequestMapping("/api/seller")
public class SellerController {
    private SellerService sellerService;

    @Autowired
    public SellerController(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @GetMapping("/get-all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Seller> findAll() {
        return sellerService.findAll();
    }

    @GetMapping("/remove")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> remove(@RequestParam("seller-id") Integer id) {
        return sellerService.deleteById(id);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> add(@RequestBody AddSellerRequest addSellerRequest) {
        return sellerService.addSeller(addSellerRequest);
    }
}
