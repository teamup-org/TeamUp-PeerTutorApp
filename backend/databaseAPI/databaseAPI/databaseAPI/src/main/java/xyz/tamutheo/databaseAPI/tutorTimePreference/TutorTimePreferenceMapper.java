package xyz.tamutheo.databaseAPI.tutorTimePreference;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalTime;
import java.util.List;


@Mapper
public interface TutorTimePreferenceMapper {
    List<TutorTimePreferenceModel> read(@Param("endTimeLessThanOrEquals") LocalTime endTimeLessThanOrEquals,
                                        @Param("startTimeGreaterThanOrEquals") LocalTime startTimeGreaterThanOrEquals,
                                        @Param("tutorEmailEquals") String tutorEmailEquals,
                                        @Param("weekdayNameInList") List<String> weekdayNameInList,
                                        @Param("limit") Integer limit,
                                        @Param("offset") Integer offset);
    void create(TutorTimePreferenceModel tutorTimePreferenceModel);
    void deleteAll(@Param("tutorEmail") String tutorEmail,
                   @Param("weekdayName") String weekdayName);
}

