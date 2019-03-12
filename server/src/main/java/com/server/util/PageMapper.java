package com.server.util;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;

public class PageMapper {

    public static <S, T> Page<T> mapPage(Page<S> source, Class<T> targetClass, ModelMapper mapper) {
        List<S> sourceList = source.getContent();

        List<T> list = new ArrayList<>();
        for (int i = 0; i < sourceList.size(); i++) {
            T target = mapper.map(sourceList.get(i), targetClass);
            list.add(target);
        }

        return new PageImpl<>(list, PageRequest.of(source.getNumber(), source.getSize(), source.getSort()),
                source.getTotalElements());
    }
}
