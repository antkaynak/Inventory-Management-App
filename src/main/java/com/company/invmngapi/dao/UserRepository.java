package com.company.invmngapi.dao;

import com.company.invmngapi.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    public User findByEmail(String email);
}
