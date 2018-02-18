package com.company.invmngapi.dao;

import com.company.invmngapi.model.Item;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {
    public List<Item> findByCategoryContains(String category, Pageable pageRequest);

    public List<Item> findByNameContains(String name, Pageable pageRequest);

    public List<Item> findByDescriptionContains(String description, Pageable pageRequest);

    public List<Item> findByStockLessThanEqualOrderByStockDesc(Long stock, Pageable pageRequest);
}
