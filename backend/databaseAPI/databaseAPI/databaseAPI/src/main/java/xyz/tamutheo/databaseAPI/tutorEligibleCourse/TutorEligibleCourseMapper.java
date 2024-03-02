package xyz.tamutheo.databaseAPI.tutorEligibleCourse;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface TutorEligibleCourseMapper {
    List<TutorEligibleCourseModel> read(@Param("tutorId") Integer tutorId);
    void create(TutorEligibleCourseModel tutorEligibleCourseModel);
}