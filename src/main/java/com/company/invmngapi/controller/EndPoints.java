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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.AuthorizationServerTokenServices;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class EndPoints {

    /**
     * EndPoints Controller.
     * Rest end points for all actions thought the application.
     * Protected by OAuth2.
     *
     * @author Ant Kaynak - Github/Exercon
     */

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthorizationServerTokenServices authorizationServerTokenServices;

    @Autowired
    private ConsumerTokenServices consumerTokenServices;

    @RequestMapping(path = "/validate", method = RequestMethod.GET)
    public ResponseEntity validateToken() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(path = "/register", method = RequestMethod.PUT)
    public ResponseEntity register(@Valid @RequestBody User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errMsg = new ArrayList<>();
            for (ObjectError i : bindingResult.getAllErrors()) {
                errMsg.add(i.getDefaultMessage());
            }
            return new ResponseEntity<>(errMsg, HttpStatus.BAD_REQUEST);
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setState("ACTIVE");
        userRepository.save(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(path="/oauth/logout", method = RequestMethod.GET)
    public ResponseEntity logOut(Principal principal){
        try{
            OAuth2Authentication oAuth2Authentication = (OAuth2Authentication) principal;
            OAuth2AccessToken accessToken = authorizationServerTokenServices.getAccessToken(oAuth2Authentication);
            consumerTokenServices.revokeToken(accessToken.getValue());
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

    @RequestMapping(path = "/item/search", method = RequestMethod.GET)
    public ResponseEntity searchItem(@RequestParam("by") String by, @RequestParam("keyword") String keyword, @RequestParam("page") Integer page) {
        Pageable pageRequest = new PageRequest(page, 10);
        List<Item> list = null;
        switch (by) {
            case "all":
                Page<Item> resultPage = itemRepository.findAll(pageRequest);
                list = resultPage.getContent();
                break;
            case "serial":
                list = new ArrayList<>();
                Optional optional = itemRepository.findById(Long.parseLong(keyword));
                if (optional.isPresent()) list.add((Item) optional.get());
                break;
            case "category":
                list = itemRepository.findByCategoryContains(keyword, pageRequest);
                break;
            case "name":
                list = itemRepository.findByNameContains(keyword, pageRequest);
                break;
            case "description":
                list = itemRepository.findByDescriptionContains(keyword, pageRequest);
                break;
            case "stock":
                list = itemRepository.findByStockLessThanEqualOrderByStockDesc(Long.parseLong(keyword), pageRequest);
                break;
            default:
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @RequestMapping(path = "/item/byId", method = RequestMethod.GET)
    public ResponseEntity getItemById(@RequestParam("id") Long id) {
        Item item = null;
        Optional optional = itemRepository.findById(id);
        if (optional.isPresent()) item = (Item) optional.get();
        assert item != null;
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @RequestMapping(path = "/item/register", method = RequestMethod.PUT)
    public ResponseEntity registerItem(@Valid @RequestBody Item item, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        item = itemRepository.save(item);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @RequestMapping(path = "/item/edit", method = RequestMethod.PUT)
    public ResponseEntity editItem(@Valid @RequestBody Item item, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        Item tempItem;
        Optional optional = itemRepository.findById(item.getID());
        if (optional.isPresent()) {
            tempItem = (Item) optional.get();
            tempItem.setCategory(item.getCategory());
            tempItem.setName(item.getName());
            tempItem.setDescription(item.getDescription());
            tempItem.setStock(item.getStock());
            tempItem = itemRepository.save(tempItem);
            return new ResponseEntity<>(tempItem, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(path = "/item/delete", method = RequestMethod.DELETE)
    public ResponseEntity deleteItem(@RequestParam("id") Long ID) {
        Item item = null;
        Optional optional = itemRepository.findById(ID);
        if (optional.isPresent()) {
            item = (Item) optional.get();
        }
        if (item != null) {
            itemRepository.delete(item);
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }


}
