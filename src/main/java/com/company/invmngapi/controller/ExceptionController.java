package com.company.invmngapi.controller;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.exceptions.InvalidGrantException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class ExceptionController {


    /**
     * Exception Controller.
     * Catches various exceptions thrown throughout the application runtime.
     *
     * @author Ant Kaynak - Github/Exercon
     */

    @ExceptionHandler(InvalidGrantException.class)
    public @ResponseBody
    ResponseEntity handleBadCredentials(Exception e) {
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(DataIntegrityViolationException.class)
    public @ResponseBody
    ResponseEntity handleAlreadyExists(Exception e) {
        return new ResponseEntity<>("Email already exists.", HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public String handleError404(Exception e)   {
        return "redirect:/index.html";
    }

    @ExceptionHandler(Exception.class)
    public @ResponseBody
    ResponseEntity handleAllException(Exception e) {
        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }


}
