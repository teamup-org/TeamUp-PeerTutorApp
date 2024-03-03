package xyz.tamutheo.databaseAPI.util.tamuMajorAndCourse;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import xyz.tamutheo.databaseAPI.appointmentRequest.AppointmentRequestModel;
import xyz.tamutheo.databaseAPI.course.CourseModel;
import xyz.tamutheo.databaseAPI.major.MajorModel;
import xyz.tamutheo.databaseAPI.util.tamuMajorAndCourse.tamuMajor.TamuMajorModel;

import java.util.List;

@Mapper
public interface TamuMajorAndCourseMapper {
    void createMajor(@Param("majorAbbreviation") String majorAbbreviation,
                      @Param("majorName") String majorName);
    void createCourse(@Param("majorAbbreviation") String majorAbbreviation,
                       @Param("courseNumber") Integer courseNumber,
                       @Param("courseTitle") String courseTitle);
}
