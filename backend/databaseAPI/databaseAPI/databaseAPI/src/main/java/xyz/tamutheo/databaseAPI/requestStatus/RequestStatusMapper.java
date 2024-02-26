package xyz.tamutheo.databaseAPI.requestStatus;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface RequestStatusMapper {
    List<RequestStatusModel> read();
}