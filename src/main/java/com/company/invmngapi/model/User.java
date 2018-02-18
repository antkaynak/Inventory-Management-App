package com.company.invmngapi.model;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long ID;
    @Column(name = "email")
    @NotBlank
    @Email
    private String email;
    @Column(name = "password")
    @NotBlank
    private String password;
    @Column(name = "name")
    @NotBlank
    private String name;
    @Column(name = "state")
    private String state;

    public User() {
    }

    public User(String email, String password, String name, String state) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.state = state;
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "User{" +
                "ID=" + ID +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", state='" + state + '\'' +
                '}';
    }
}
