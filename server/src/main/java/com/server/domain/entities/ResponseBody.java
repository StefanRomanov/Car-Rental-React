package com.server.domain.entities;

public class ResponseBody {
    private String message;
    private Object entity;

    public ResponseBody() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getEntity() {
        return entity;
    }

    public void setEntity(Object entity) {
        this.entity = entity;
    }
}
