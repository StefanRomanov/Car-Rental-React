package com.server.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.domain.models.ExceptionModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public void commence(HttpServletRequest httpServletRequest,
                         HttpServletResponse response,
                         AuthenticationException e) throws IOException {
        logger.error("Responding with unauthorized error. Message - {}", e.getMessage());

        response.setContentType("application/json");

        if(response.getHeader("Expired") != null){
            response.setStatus(HttpServletResponse.SC_GONE);
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }

        ExceptionModel exception = new ExceptionModel(LocalDateTime.now(),"Invalid Credentials", HttpStatus.UNAUTHORIZED, false, e.getMessage());
        response.getOutputStream().println(objectMapper.writeValueAsString(exception));
    }
}
