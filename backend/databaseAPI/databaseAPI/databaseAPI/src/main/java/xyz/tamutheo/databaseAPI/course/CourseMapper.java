package xyz.tamutheo.databaseAPI.course;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CourseMapper {
    List<CourseModel> read();
}