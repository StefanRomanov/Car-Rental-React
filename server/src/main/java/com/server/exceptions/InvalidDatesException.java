package com.server.exceptions;

import com.server.util.constants.ExceptionMessages;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = ExceptionMessages.INVALID_DATES_MESSAGE)
public class InvalidDatesException extends RuntimeException {
}
