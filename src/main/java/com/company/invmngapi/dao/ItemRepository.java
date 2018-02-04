package com.company.invmngapi.dao;

import com.company.invmngapi.model.Item;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {
    public List<Item> findByNameContains(String name);
}
