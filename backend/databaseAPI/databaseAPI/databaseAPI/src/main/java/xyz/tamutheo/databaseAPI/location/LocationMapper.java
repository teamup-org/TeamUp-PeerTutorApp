package xyz.tamutheo.databaseAPI.location;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface LocationMapper {
    List<LocationModel> read(@Param("locationNameInList") List<String> locationNameInList,
                             @Param("limit") Integer limit,
                             @Param("offset") Integer offset);
}