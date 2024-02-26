package xyz.tamutheo.databaseAPI.activeStatus;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface ActiveStatusMapper {
    List<ActiveStatusModel> read();
}