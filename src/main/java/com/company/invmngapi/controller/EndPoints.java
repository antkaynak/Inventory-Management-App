package com.company.invmngapi.controller;

import com.company.invmngapi.dao.ItemRepository;
import com.company.invmngapi.dao.UserRepository;
import com.company.invmngapi.model.Item;
import com.company.invmngapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class EndPoints {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(path= "/register", method = RequestMethod.PUT)
    public ResponseEntity register(@Valid @RequestBody User user, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        user.setState("ACTIVE");
        try{
            userRepository.save(user);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(path = "/item/all", method = RequestMethod.GET)
    public ResponseEntity getItem(@RequestParam("page") Integer page){
        Pageable pageRequest = new PageRequest(page,10);
        Page<Item> list = itemRepository.findAll(pageRequest);
        return new ResponseEntity<>(list.getContent(),HttpStatus.OK);
    }

    @RequestMapping(path = "/item/search", method = RequestMethod.GET)
    public ResponseEntity searchItem(@RequestParam("keyword") String keyword){
       List<Item> list = itemRepository.findByNameContains(keyword);
       return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @RequestMapping(path = "/item/byId", method = RequestMethod.GET)
    public ResponseEntity getItemById(@RequestParam("id") Long id){
        Item item = null;
        Optional optional = itemRepository.findById(id);
        if(optional.isPresent()) item = (Item) optional.get();
        assert item != null;
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @RequestMapping(path = "/item/register", method = RequestMethod.PUT)
    public ResponseEntity registerItem(@Valid @RequestBody Item item, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        try{
            item = itemRepository.save(item);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(item,HttpStatus.OK);
    }

    @RequestMapping(path = "/item/edit", method = RequestMethod.PUT)
    public ResponseEntity editItem(@Valid @RequestBody Item item, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        try{
            Item tempItem;
            Optional optional = itemRepository.findById(item.getID());
            if(optional.isPresent()){
                tempItem = (Item) optional.get();
                tempItem.setCategory(item.getCategory());
                tempItem.setName(item.getName());
                tempItem.setDescription(item.getDescription());
                tempItem.setStock(item.getStock());
                tempItem = itemRepository.save(tempItem);
                return new ResponseEntity<>(tempItem,HttpStatus.OK);
            }else{
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
            }


        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

    }


}
