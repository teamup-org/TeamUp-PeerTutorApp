package xyz.tamutheo.databaseAPI.tutorLocationPreference;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface TutorLocationPreferenceMapper {
    List<TutorLocationPreferenceModel> read(@Param("locationNameInList") List<String> locationNameInList,
                                            @Param("tutorEmailContains") String tutorEmailContains,
                                            @Param("limit") Integer limit,
                                            @Param("offset") Integer offset);
    void create(TutorLocationPreferenceModel tutorLocationPreferenceModel);
    void delete(TutorLocationPreferenceModel tutorLocationPreferenceModel);
    void deleteAll(@Param("tutorEmailEquals") String tutorEmailEquals);
}