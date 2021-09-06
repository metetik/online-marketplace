package tr.com.obss.jss.jss_final_project.payload.response;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String token;
    private String tokenType = "Bearer";
    private Integer id;
    private String username;
    private List<String> roles;

    public JwtResponse(String accessToken, Integer id, String username, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.roles = roles;
    }
}
