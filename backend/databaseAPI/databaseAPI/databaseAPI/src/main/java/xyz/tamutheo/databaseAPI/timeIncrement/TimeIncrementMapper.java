package xyz.tamutheo.databaseAPI.timeIncrement;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface TimeIncrementMapper {
    List<TimeIncrementModel> read();
}