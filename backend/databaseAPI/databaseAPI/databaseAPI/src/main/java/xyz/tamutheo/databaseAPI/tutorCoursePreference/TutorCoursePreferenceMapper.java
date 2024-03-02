package xyz.tamutheo.databaseAPI.tutorCoursePreference;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface TutorCoursePreferenceMapper {
    List<TutorCoursePreferenceModel> read(@Param("tutorId") Integer tutorId);
    void create(TutorCoursePreferenceModel tutorCoursePreferenceModel);
    void delete(TutorCoursePreferenceModel tutorCoursePreferenceModel);
}