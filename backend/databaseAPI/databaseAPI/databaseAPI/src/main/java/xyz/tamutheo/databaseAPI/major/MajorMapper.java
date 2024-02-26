package xyz.tamutheo.databaseAPI.major;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface MajorMapper {
    List<MajorModel> read();
}