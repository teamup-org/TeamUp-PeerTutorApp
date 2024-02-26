package xyz.tamutheo.databaseAPI.requestType;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface RequestTypeMapper {
    List<RequestTypeModel> read();
}