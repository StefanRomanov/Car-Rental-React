package com.server.exceptions;

import com.server.util.constants.ExceptionMessages;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = ExceptionMessages.CAR_HAS_ACTIVE_RENTS)
public class CarHasActiveRentsException extends RuntimeException {
}
