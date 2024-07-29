package com.example.gestiontransactionbackend.dto;
import java.util.Objects;

public class SignupRequest {
    private String username;
    private String password;
    private String confirmPassword;


    public SignupRequest() {
    }

    public SignupRequest(String username, String password, String confirmPassword) {
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
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

    public String getConfirmPassword() {
        return this.confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public SignupRequest username(String username) {
        setUsername(username);
        return this;
    }

    public SignupRequest password(String password) {
        setPassword(password);
        return this;
    }

    public SignupRequest confirmPassword(String confirmPassword) {
        setConfirmPassword(confirmPassword);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof SignupRequest)) {
            return false;
        }
        SignupRequest signupRequest = (SignupRequest) o;
        return Objects.equals(username, signupRequest.username) && Objects.equals(password, signupRequest.password) && Objects.equals(confirmPassword, signupRequest.confirmPassword);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, password, confirmPassword);
    }

    @Override
    public String toString() {
        return "{" +
            " username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            ", confirmPassword='" + getConfirmPassword() + "'" +
            "}";
    }
    
}