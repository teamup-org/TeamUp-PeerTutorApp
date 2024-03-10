package xyz.tamutheo.databaseAPI.tutorCoursePreference;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface TutorCoursePreferenceMapper {
    List<TutorCoursePreferenceModel> read(@Param("courseGradeInList") List<String> courseGradeInList,
                                          @Param("courseNumberEquals") Integer courseNumberEquals,
                                          @Param("courseNumberGreaterThanOrEquals") Integer courseNumberGreaterThanOrEquals,
                                          @Param("courseNumberLessThanOrEquals") Integer courseNumberLessThanOrEquals,
                                          @Param("majorAbbreviationContains") String majorAbbreviationContains,
                                          @Param("tutorEmailContains") String tutorEmailContains,
                                          @Param("limit") Integer limit,
                                          @Param("offset") Integer offset);
    void create(TutorCoursePreferenceModel tutorCoursePreferenceModel);
    void delete(TutorCoursePreferenceModel tutorCoursePreferenceModel);
    void deleteAll(@Param("tutorEmailEquals") String tutorEmailEquals);
}
