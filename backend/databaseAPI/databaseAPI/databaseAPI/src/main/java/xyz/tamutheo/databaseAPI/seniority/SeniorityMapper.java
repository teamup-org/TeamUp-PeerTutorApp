package xyz.tamutheo.databaseAPI.seniority;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface SeniorityMapper {
    List<SeniorityModel> read();
}