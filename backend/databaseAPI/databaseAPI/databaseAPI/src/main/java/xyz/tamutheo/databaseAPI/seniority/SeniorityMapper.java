package xyz.tamutheo.databaseAPI.seniority;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface SeniorityMapper {
    List<SeniorityModel> read(@Param("seniorityNameInList") List<String> seniorityNameInList,
                              @Param("limit") Integer limit,
                              @Param("offset") Integer offset);
}