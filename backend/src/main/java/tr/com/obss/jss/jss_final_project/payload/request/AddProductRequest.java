package tr.com.obss.jss.jss_final_project.payload.request;

import lombok.Data;

@Data
public class AddProductRequest {
	private String productName;
	private String sellerName;
}
