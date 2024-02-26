package xyz.tamutheo.databaseAPI.initiatorType;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InitiatorTypeMapper {
    List<InitiatorTypeModel> read();
}