package com.example.gestiontransactionbackend.dto;
import java.util.Objects;

public class SigninRequest {
    private String username;
    private String password;


    public SigninRequest() {
    }

    public SigninRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public SigninRequest username(String username) {
        setUsername(username);
        return this;
    }

    public SigninRequest password(String password) {
        setPassword(password);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof SigninRequest)) {
            return false;
        }
        SigninRequest signinRequest = (SigninRequest) o;
        return Objects.equals(username, signinRequest.username) && Objects.equals(password, signinRequest.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, password);
    }

    @Override
    public String toString() {
        return "{" +
            " username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }
    
}