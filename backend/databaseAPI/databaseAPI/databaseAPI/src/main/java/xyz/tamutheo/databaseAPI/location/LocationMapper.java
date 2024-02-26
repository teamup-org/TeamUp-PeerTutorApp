package xyz.tamutheo.databaseAPI.location;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface LocationMapper {
    List<LocationModel> read();
}