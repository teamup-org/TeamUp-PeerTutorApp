package xyz.tamutheo.databaseAPI.course;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CourseMapper {
    List<CourseModel> read(@Param("courseNumberEquals") Integer courseNumberEquals,
                           @Param("courseNumberLessThanOrEquals") Integer courseNumberLessThanOrEquals,
                           @Param("courseNumberGreaterThanOrEquals") Integer courseNumberGreaterThanOrEquals,
                           @Param("courseTitleContains") String courseTitleContains,
                           @Param("majorAbbreviationContains") String majorAbbreviationContains,
                           @Param("limit") Integer limit,
                           @Param("offset") Integer offset);
}

