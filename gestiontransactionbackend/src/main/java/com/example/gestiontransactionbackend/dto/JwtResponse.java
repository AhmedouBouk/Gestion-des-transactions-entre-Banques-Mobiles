package com.example.gestiontransactionbackend.dto;
import java.util.Objects;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String username;

    public JwtResponse(String accessToken, String username) {
        this.token = accessToken;
        this.username = username;
    }


    public JwtResponse() {
    }

    public JwtResponse(String token, String type, String username) {
        this.token = token;
        this.type = type;
        this.username = username;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public JwtResponse token(String token) {
        setToken(token);
        return this;
    }

    public JwtResponse type(String type) {
        setType(type);
        return this;
    }

    public JwtResponse username(String username) {
        setUsername(username);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof JwtResponse)) {
            return false;
        }
        JwtResponse jwtResponse = (JwtResponse) o;
        return Objects.equals(token, jwtResponse.token) && Objects.equals(type, jwtResponse.type) && Objects.equals(username, jwtResponse.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(token, type, username);
    }

    @Override
    public String toString() {
        return "{" +
            " token='" + getToken() + "'" +
            ", type='" + getType() + "'" +
            ", username='" + getUsername() + "'" +
            "}";
    }
    
}