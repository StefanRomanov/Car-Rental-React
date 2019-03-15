package com.server.web.controllers;

import com.server.domain.models.ExceptionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionController extends ResponseEntityExceptionHandler {

    private static String DEFAULT_MESSAGE = "Something went wrong while processing your request !";

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionModel> getException(Exception e) {
        String message = e.getClass().isAnnotationPresent(ResponseStatus.class)
                ? e.getClass().getAnnotation(ResponseStatus.class).reason()
                : DEFAULT_MESSAGE;

        HttpStatus status = e.getClass().isAnnotationPresent(ResponseStatus.class)
                ? e.getClass().getAnnotation(ResponseStatus.class).value()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        ExceptionModel exception = new ExceptionModel(LocalDateTime.now(), message, status, false, e.getMessage());

        return new ResponseEntity<>(exception, status);
    }
}
